import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";

interface PlayerJoinedGameServerMessage {
  gameId: string;
}

interface PlayerMadeMoveServerMessage {
  playerId: string;
  tile: TileItem;
}

interface TileItem {
  x: number;
  y: number;
}

interface UseSignalRReconnectionProps {
  connection: signalR.HubConnection | null;
  onPlayerJoined?: (message: PlayerJoinedGameServerMessage) => void;
  onPlayerMadeMove?: (message: PlayerMadeMoveServerMessage) => void;
  onReceiveMessage?: (user: string, message: string) => void;
}

export const useSignalRReconnection = ({
  connection,
  onPlayerJoined,
  onPlayerMadeMove,
  onReceiveMessage,
}: UseSignalRReconnectionProps) => {
  useEffect(() => {
    if (!connection) return;

    const startConnection = async () => {
      try {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
          await connection.start();
          console.log("Reconnected to SignalR hub");
        }
      } catch (error) {
        console.error("Error starting connection:", error);
      }
    };

    connection.onclose(() => {
      console.warn("Connection closed, attempting to reconnect...");
      startConnection();
    });

    if (connection.state === signalR.HubConnectionState.Disconnected) {
      startConnection();
    }

    if (onPlayerJoined) {
      connection.on("PlayerJoinedGame", onPlayerJoined);
    }

    if (onPlayerMadeMove) {
      connection.on("PlayerMadeMove", onPlayerMadeMove);
    }

    if (onReceiveMessage) {
      connection.on("ReceiveMessage", onReceiveMessage);
    }

    return () => {
      connection.off("PlayerJoinedGame");
      connection.off("PlayerMadeMove");
      connection.off("ReceiveMessage");
    };
  }, [connection, onPlayerJoined, onPlayerMadeMove, onReceiveMessage]);
};
