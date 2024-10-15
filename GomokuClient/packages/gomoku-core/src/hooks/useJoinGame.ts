import { useEffect } from "react";
import { TileColor, useTiles } from "@/hooks/useTiles";
import { useSignalRConnection } from "@/context";
import { notification } from "@/shared/ui/notification";

export const useJoinGame = (gameID: string) => {
  const { tiles, winner, addTile, lastTile, setLastTile, setTiles } =
    useTiles();
  const { hubProxy, isConnected, registerEventHandlers } =
    useSignalRConnection();

  useEffect(() => {
    if (isConnected && gameID && hubProxy) {
      hubProxy.joinGameGroup(gameID).catch((error) => {
        console.error("Error joining game group:", error);
      });

      registerEventHandlers({
        onPlayerJoined: ({ userId }) => {
          console.log(`Player ${userId} joined game.`);
        },
        onGameStarted: ({ isMyMoveFirst }) => {
          if (isMyMoveFirst) {
            alert("It's your turn. Place your tile");
          } else {
            alert("Wait for your opponent's move");
          }
        },
        onPlayerMadeMove: ({ playerId, tile, placedTileColor }) => {
          console.log("Player made move:", playerId, tile, placedTileColor);
          addTile(tile.y, tile.x, placedTileColor as TileColor);
        },
        onGameHubError: (error) => {
          notification.show("Error from game hub", "error");
          console.warn("Error from game hub:", error.message);
        },
      });
    }
  }, [hubProxy, isConnected, gameID, registerEventHandlers, addTile]);

  useEffect(() => {
    if (winner) {
      alert(`The winner is: ${winner}`);
    }
  }, [winner]);

  const handleMove = async (row: number, col: number) => {
    if (!hubProxy || winner) return;

    const makeMoveMessage = {
      gameId: gameID,
      x: row,
      y: col,
    };

    try {
      await hubProxy.makeMove(makeMoveMessage);
    } catch (error) {
      console.error("Error making move:", error);
      notification.show("Error making move", "error");
    }
  };

  return { tiles, lastTile, setLastTile, winner, handleMove, setTiles };
};
