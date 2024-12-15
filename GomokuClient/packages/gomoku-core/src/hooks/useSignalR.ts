import { useAuth } from "@clerk/clerk-react";
import { SignalRClientService } from "@gomoku/api";
import * as signalR from "@microsoft/signalr";
import { JsonHubProtocol } from "@microsoft/signalr";
import { useCallback, useEffect, useRef, useState } from "react";

import type { SignalHubInterfaces } from "@gomoku/api";

import { useAuthToken } from "@/context/AuthContext";

const MAX_RETRY_ATTEMPTS = 5;
const RETRY_DELAY_MS = 2000;
const HEARTBEAT_INTERVAL_MS = 5000;
const HEARTBEAT_TIMEOUT_MS = 15000;

type KnownHubType = "IGameHub";
type KnownReceiverType = "IGameHubReceiver";
type TimeoutHandle = ReturnType<typeof setTimeout>;
type IntervalHandle = ReturnType<typeof setInterval>;

export const useSignalR = <
  THub extends SignalHubInterfaces.IGameHub,
  TReceiver extends SignalHubInterfaces.IGameHubReceiver,
>(
  hubURL: string,
  hubType: KnownHubType,
  receiverType: KnownReceiverType,
) => {
  const { jwtToken, jwtDecodedInfo } = useAuthToken();
  const { getToken } = useAuth();

  // Refs and State
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [hubProxy, setHubProxy] = useState<THub | null>(null);

  const retryAttemptsRef = useRef<number>(0);
  const lastHeartbeatRef = useRef<number>(Date.now());
  const heartbeatIntervalRef = useRef<IntervalHandle | null>(null);
  const heartbeatTimeoutRef = useRef<IntervalHandle | null>(null);
  const reconnectTimeoutRef = useRef<TimeoutHandle | null>(null);

  // Clear timers
  const clearTimers = useCallback((): void => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
    if (heartbeatTimeoutRef.current) {
      clearInterval(heartbeatTimeoutRef.current);
      heartbeatTimeoutRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const handleHeartbeat = useCallback((): void => {
    lastHeartbeatRef.current = Date.now();
  }, []);

  const checkHeartbeat = useCallback((): void => {
    const timeSinceLastHeartbeat = Date.now() - lastHeartbeatRef.current;
    if (timeSinceLastHeartbeat > HEARTBEAT_TIMEOUT_MS) {
      console.warn("Heartbeat timeout - reconnecting...");
      setIsConnected(false);
      const connection = connectionRef.current;
      if (connection) {
        connection.stop().then(() => {
          if (connection === connectionRef.current) {
            startConnection(connection);
          }
        });
      }
    }
    //eslint-disable-next-line
  }, [clearTimers]);

  const startHeartbeatMonitoring = useCallback((): void => {
    clearTimers();

    heartbeatIntervalRef.current = setInterval(() => {
      connectionRef.current?.invoke("KeepAlive").catch((error) => {
        console.error("Error sending heartbeat:", error);
      });
    }, HEARTBEAT_INTERVAL_MS);

    heartbeatTimeoutRef.current = setInterval(() => {
      checkHeartbeat();
    }, HEARTBEAT_INTERVAL_MS);
  }, [clearTimers, checkHeartbeat]);

  const startConnection = useCallback(
    async (connection: signalR.HubConnection): Promise<void> => {
      if (connection?.state === signalR.HubConnectionState.Disconnected) {
        try {
          await connection.start();
          console.debug("SignalR connection established");
          setIsConnected(true);
          retryAttemptsRef.current = 0;
          startHeartbeatMonitoring();
        } catch (error) {
          console.error("Error starting SignalR connection:", error);
          setIsConnected(false);

          if (retryAttemptsRef.current < MAX_RETRY_ATTEMPTS) {
            const delay =
              RETRY_DELAY_MS * Math.pow(2, retryAttemptsRef.current);
            retryAttemptsRef.current++;
            console.debug(
              `Retrying connection in ${delay}ms (attempt ${retryAttemptsRef.current}/${MAX_RETRY_ATTEMPTS})`,
            );

            clearTimers();
            reconnectTimeoutRef.current = setTimeout(
              () => startConnection(connection),
              delay,
            );
          }
        }
      }
    },
    [clearTimers, startHeartbeatMonitoring],
  );

  // Register event handlers
  const registerEventHandlers = useCallback(
    (handlers: Partial<TReceiver>): (() => void) => {
      const { current: connection } = connectionRef;

      if (
        !connection ||
        connection.state !== signalR.HubConnectionState.Connected
      ) {
        console.warn(
          "SignalR connection is not available for attaching event handlers.",
        );
        return () => {};
      }

      console.debug("Attaching SignalR event handlers...");

      const receiverRegister =
        SignalRClientService.getReceiverRegister(receiverType);
      const disposable = receiverRegister?.register(
        connection,
        handlers as TReceiver,
      );

      return () => {
        if (disposable) {
          console.debug("Cleaning up SignalR event handlers...");
          disposable.dispose();
        }
      };
    },
    [receiverType],
  );

  // Effect to establish and manage SignalR connection
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubURL, {
        accessTokenFactory: async () => (await getToken()) ?? "",
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
      })
      .withHubProtocol(new JsonHubProtocol())
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          if (retryContext.previousRetryCount >= MAX_RETRY_ATTEMPTS) {
            return null;
          }
          return RETRY_DELAY_MS * Math.pow(2, retryContext.previousRetryCount);
        },
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connectionRef.current = connection;

    connection.on("Heartbeat", handleHeartbeat);

    connection.onreconnecting((error) => {
      console.debug("SignalR reconnecting:", error);
      setIsConnected(false);
      clearTimers();
    });

    connection.onreconnected((connectionId) => {
      console.debug("SignalR reconnected:", connectionId);
      setIsConnected(true);
      startHeartbeatMonitoring();
    });

    connection.onclose((error) => {
      console.debug("SignalR connection closed:", error);
      setIsConnected(false);
      clearTimers();
    });

    startConnection(connection);

    const proxyFactory = SignalRClientService.getHubProxyFactory(hubType);
    if (proxyFactory) {
      const proxy = proxyFactory.createHubProxy(connection) as THub;
      setHubProxy(proxy);
    }

    return () => {
      clearTimers();

      if (connection) {
        connection.off("Heartbeat", handleHeartbeat);
        connection
          .stop()
          .then(() => console.debug("SignalR connection stopped"))
          .catch((error) => {
            console.error("Error stopping SignalR connection:", error);
          });
      }
    };
  }, [
    jwtToken,
    jwtDecodedInfo,
    startConnection,
    getToken,
    hubURL,
    hubType,
    handleHeartbeat,
    startHeartbeatMonitoring,
    clearTimers,
  ]);

  return {
    connection: connectionRef.current,
    isConnected,
    registerEventHandlers,
    hubProxy,
  };
};

export const useGameSignalR = (hubURL: string) =>
  useSignalR<
    SignalHubInterfaces.IGameHub,
    SignalHubInterfaces.IGameHubReceiver
  >(hubURL, "IGameHub", "IGameHubReceiver");
