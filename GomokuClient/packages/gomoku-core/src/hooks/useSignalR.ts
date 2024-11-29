import { useAuth } from "@clerk/clerk-react";
import { SignalRClientService } from "@gomoku/api";
import * as signalR from "@microsoft/signalr";
import { JsonHubProtocol } from "@microsoft/signalr";
import { useCallback, useEffect, useRef, useState } from "react";

import type { SignalHubInterfaces } from "@gomoku/api";

import { useAuthToken } from "@/context/AuthContext";

type KnownHubType = "IGameHub";
type KnownReceiverType = "IGameHubReceiver";

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
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hubProxy, setHubProxy] = useState<THub | null>(null);

  const startConnection = useCallback(
    async (connection: signalR.HubConnection) => {
      if (connection?.state === signalR.HubConnectionState.Disconnected) {
        try {
          await connection.start();
          console.debug("SignalR connection established");
          setIsConnected(true);
        } catch (error) {
          console.error("Error starting SignalR connection:", error);
          setIsConnected(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    connectionRef.current = new signalR.HubConnectionBuilder()
      .withUrl(hubURL, {
        accessTokenFactory: async () => (await getToken()) ?? "",
      })
      .withHubProtocol(new JsonHubProtocol())
      .withAutomaticReconnect()
      .build();

    const connection = connectionRef.current;
    if (connection) {
      startConnection(connection);

      const proxyFactory = SignalRClientService.getHubProxyFactory(hubType);
      if (proxyFactory) {
        const proxy = proxyFactory.createHubProxy(connection) as THub;
        setHubProxy(proxy);
      }
    }

    return () => {
      if (connection) {
        connection
          .stop()
          .then(() => console.debug("SignalR connection stopped"))
          .catch((error) => {
            console.error("Error stopping SignalR connection:", error);
          });
      }
    };
  }, [jwtToken, jwtDecodedInfo, startConnection, getToken, hubURL, hubType]);

  const registerEventHandlers = useCallback(
    (handlers: Partial<TReceiver>) => {
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
        handlers as SignalHubInterfaces.IGameHubReceiver,
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
