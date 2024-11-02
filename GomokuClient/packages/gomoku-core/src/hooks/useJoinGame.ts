import { useEffect, useState } from "react";
import { TileColor, useTiles } from "@/hooks/useTiles";
import { useSignalRConnection } from "@/context";
import { notification } from "@/shared/ui/notification";
import { SignalClientMessages, SwaggerTypes } from "@/api";
import { formatErrorMessage } from "@/utils/errorUtils";

export const useJoinGame = (
  gameID: SwaggerTypes.CreateGameResponse["gameId"],
  boardSize: SwaggerTypes.CreateGameResponse["boardSize"],
  initialTimeInSeconds: number,
  incrementPerMove: number,
) => {
  const [moves, setMoves] = useState<string[]>([]);
  const {
    tiles,
    winner,
    addTile,
    lastTile,
    setLastTile,
    setTiles,
    blackTimeLeft,
    whiteTimeLeft,
    activePlayer,
  } = useTiles(boardSize, initialTimeInSeconds, incrementPerMove, (winner) => {
    notification.show(`The winner is: ${winner}`);
  });

  const { hubProxy, isConnected, registerEventHandlers } =
    useSignalRConnection();

  useEffect(() => {
    if (isConnected && gameID && hubProxy) {
      hubProxy.joinGameGroup(gameID).catch((error) => {
        console.error("Error joining game group:", error);
      });

      registerEventHandlers({
        onPlayerJoined: () => {
          notification.show(`You have joined the game`);
        },
        onGameStarted: ({ isMyMoveFirst }) => {
          if (isMyMoveFirst) {
            notification.show("It's your turn. Place your tile");
          } else {
            notification.show("Wait for your opponent's move");
          }
        },
        onPlayerMadeMove: ({ playerId, tile, placedTileColor }) => {
          console.debug(
            `Player ${playerId.slice(0, 6)} made move: x${tile.x} - y${tile.y}`,
          );
          addTile(tile, placedTileColor as TileColor);
          setMoves((prevMoves) => [...prevMoves, `x${tile.x} - y${tile.y}`]);
        },
        onGameIsOver: ({ result }) => {
          notification.show(formatErrorMessage(result));
        },
        onGameHubError: (error) => {
          console.log("this is here");
          notification.show(formatErrorMessage(error.message), "error");
          console.warn("Error from game hub:", error.message);
        },
      });
    }
    //TODO: should be one dependecy ideally
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

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

  return {
    moves,
    tiles,
    lastTile,
    setLastTile,
    winner,
    handleMove,
    setTiles,
    blackTimeLeft,
    whiteTimeLeft,
    activePlayer,
  };
};
