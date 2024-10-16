import { useEffect } from "react";
import { TileColor, useTiles } from "@/hooks/useTiles";
import { useSignalRConnection } from "@/context";
import { notification } from "@/shared/ui/notification";
import { SignalClientMessages, SwaggerTypes } from "@/api";

export const useJoinGame = (
  gameID: SwaggerTypes.CreateGameResponse["gameId"],
  boardSize: SwaggerTypes.CreateGameResponse["boardSize"],
) => {
  const { tiles, winner, addTile, lastTile, setLastTile, setTiles } =
    useTiles(boardSize);
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
            notification.show("It's your turn. Place your tile");
          } else {
            notification.show("Wait for your opponent's move");
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
      notification.show(`The winner is: ${winner}`);
    }
  }, [winner]);

  const handleMove = async (
    x: SignalClientMessages.MakeMoveClientMessage["x"],
    y: SignalClientMessages.MakeMoveClientMessage["y"],
  ) => {
    if (!hubProxy || winner) return;

    const makeMoveMessage = {
      gameId: gameID ? gameID : "",
      x,
      y,
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
