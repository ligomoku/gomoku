import { useCallback, useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { JsonHubProtocol } from "@microsoft/signalr";
import { useAuthToken } from "@/context/AuthContext";
import { useAuth } from "@clerk/clerk-react";
import { SignalHubInterfaces, SignalRClientService, SwaggerTypes } from "@/api";
import { notification } from "@/shared/ui/notification";

export const useSignalR = (
  playerID?: SwaggerTypes.AddPlayerToGameResponse["playerId"],
) => {
  const { jwtToken, jwtDecodedInfo } = useAuthToken();
  const { getToken } = useAuth();
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hubProxy, setHubProxy] = useState<SignalHubInterfaces.IGameHub | null>(
    null,
  );

  const startConnection = useCallback(
    async (connection: signalR.HubConnection) => {
      if (connection?.state === signalR.HubConnectionState.Disconnected) {
        try {
          await connection.start();
          console.debug("SignalR connection established");
          setIsConnected(true);
        } catch (error) {
          console.error("Error starting SignalR connection:", error);
          notification.show("Error starting SignalR connection", "error");
          setTimeout(() => startConnection(connection), 5000);
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (!connectionRef.current) {
      const constructURL = playerID
        ? `${import.meta.env.VITE_API_URL}/gamehub?player_id=${playerID}`
        : `${import.meta.env.VITE_API_URL}/gamehub`;

      connectionRef.current = new signalR.HubConnectionBuilder()
        .withUrl(constructURL, {
          accessTokenFactory: async () => (await getToken()) ?? "",
        })
        .withHubProtocol(new JsonHubProtocol())
        .withAutomaticReconnect()
        .build();
    }

    const connection = connectionRef.current;
    if (connection) {
      startConnection(connection);

      connection.onclose(async () => {
        console.warn("SignalR connection lost. Attempting to reconnect...");
        setIsConnected(false);
        startConnection(connection);
      });

      const proxy =
        SignalRClientService.getHubProxyFactory("IGameHub")?.createHubProxy(
          connection,
        );
      if (proxy) {
        setHubProxy(proxy);
      }
    }

    return () => {
      if (
        connection &&
        connection.state === signalR.HubConnectionState.Connected
      ) {
        connection
          .stop()
          .then(() => console.debug("SignalR connection stopped"))
          .catch((error) => {
            console.error("Error stopping SignalR connection:", error);
            notification.show("Error stopping SignalR connection", "error");
          });
      }
    };
  }, [jwtToken, jwtDecodedInfo, startConnection, getToken, playerID]);

  const registerEventHandlers = useCallback(
    //TODO: investigate partial to have inference for handlers
    (handlers: Partial<SignalHubInterfaces.IGameHubReceiver>) => {
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

      const receiver: SignalHubInterfaces.IGameHubReceiver = {
        playerJoinedGame: async (message) =>
          handlers.playerJoinedGame?.(message),
        gameGroupJoined: async (gameId) =>
          handlers.playerJoinedGame?.({ userId: gameId }),
        gameStarted: async (message) => handlers.gameStarted?.(message),
        playerMadeMove: async (message) => handlers.playerMadeMove?.(message),
        sendMessage: async (message) => handlers.sendMessage?.(message),
        gameHubError: async (error) => handlers.gameHubError?.(error),
        gameIsOver: async (message) => handlers.gameIsOver?.(message),
        rematchApproved: async (message) => handlers.rematchApproved?.(message),
        rematchRequested: async (message) =>
          handlers.rematchRequested?.(message),
        clock: async (message) => handlers.clock?.(message),
      };

      const disposable = SignalRClientService.getReceiverRegister(
        "IGameHubReceiver",
      )?.register(connection, receiver);

      return () => {
        if (disposable) {
          console.debug("Cleaning up SignalR event handlers...");
          disposable.dispose();
        }
      };
    },
    [],
  );

  return {
    connection: connectionRef.current,
    isConnected,
    registerEventHandlers,
    hubProxy,
  };
};
