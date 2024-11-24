import { useAuth } from "@clerk/clerk-react";
import { SignalRClientService } from "@gomoku/api";
import * as signalR from "@microsoft/signalr";
import { JsonHubProtocol } from "@microsoft/signalr";
import { useCallback, useEffect, useRef, useState } from "react";

import type { SignalHubInterfaces } from "@gomoku/api";

import { useAuthToken } from "@/context/AuthContext";

export const useSignalR = (hubURL: string) => {
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

      const proxy =
        SignalRClientService.getHubProxyFactory("IGameHub")?.createHubProxy(
          connection,
        );
      if (proxy) {
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
  }, [jwtToken, jwtDecodedInfo, startConnection, getToken, hubURL]);

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
        bothPlayersJoined: async (message) =>
          handlers.bothPlayersJoined?.(message),
        gameGroupJoined: async (gameId) =>
          handlers.playerJoinedGame?.({
            userId: gameId,
          }),
        gameStarted: async (message) => handlers.gameStarted?.(message),
        playerMadeMove: async (message) => handlers.playerMadeMove?.(message),
        undoRequested: async () => handlers.undoRequested?.(),
        undoApproved: async (message) => handlers.undoApproved?.(message),
        sendMessage: async (message) => handlers.sendMessage?.(message),
        gameHubError: async (error) => handlers.gameHubError?.(error),
        gameIsOver: async (message) => handlers.gameIsOver?.(message),
        rematchApproved: async (message) => handlers.rematchApproved?.(message),
        rematchRequested: async (message) =>
          handlers.rematchRequested?.(message),
        clock: async (message) => handlers.clock?.(message),
        receiveInvitationToPlay: async (message) =>
          handlers.receiveInvitationToPlay?.(message),
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
