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
  isConnected: boolean;
  onPlayerJoined?: (message: PlayerJoinedGameServerMessage) => void;
  onPlayerMadeMove?: (message: PlayerMadeMoveServerMessage) => void;
  onReceiveMessage?: (user: string, message: string) => void;
}

export const useSignalRReconnection = ({
  connection,
  isConnected,
  onPlayerJoined,
  onPlayerMadeMove,
  onReceiveMessage,
}: UseSignalRReconnectionProps) => {
  useEffect(() => {
    if (!connection) {
      console.warn("No connection available for SignalR");
      return;
    }

    if (!isConnected) {
      console.warn(
        "SignalR connection is not established yet. Waiting to attach listeners...",
      );
      return;
    }

    console.log("Attaching SignalR listeners...");

    if (onPlayerJoined) {
      connection.on("PlayerJoinedGame", onPlayerJoined);
    }

    if (onPlayerMadeMove) {
      connection.on("PlayerMadeMove", onPlayerMadeMove);
    }

    if (onReceiveMessage) {
      connection.on("ReceiveMessage", onReceiveMessage);
    }

    // Clean up listeners on disconnection or unmount
    return () => {
      console.log("Cleaning up SignalR listeners...");
      if (onPlayerJoined) {
        connection.off("PlayerJoinedGame", onPlayerJoined);
      }
      if (onPlayerMadeMove) {
        connection.off("PlayerMadeMove", onPlayerMadeMove);
      }
      if (onReceiveMessage) {
        connection.off("ReceiveMessage", onReceiveMessage);
      }
    };
  }, [
    connection,
    isConnected,
    onPlayerJoined,
    onPlayerMadeMove,
    onReceiveMessage,
  ]);
};
