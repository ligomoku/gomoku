import { useEffect, useRef, useState } from "react";
import { TileColor, useTiles } from "@/hooks/useTiles";
import { useSignalRConnection } from "@/context";
import { notification } from "@/shared/ui/notification";
import { useRouter } from "@tanstack/react-router";
import {
  SignalClientMessages,
  SignalServerMessages,
  SignalDto,
  SwaggerTypes,
} from "@/api";
import { formatErrorMessage } from "@/utils/errorUtils";
import { typedSessionStorage } from "@/shared/lib/utils";

export const useJoinGame = (
  gameID: SwaggerTypes.CreateGameResponse["gameId"],
  boardSize: SwaggerTypes.CreateGameResponse["boardSize"],
  playerID?: string,
) => {
  //TODO: refactor to separate hook or place inside tile hook
  const [moves, setMoves] = useState<string[]>([]);
  const [winningSequence, setWinningSequence] = useState<
    SignalServerMessages.GameIsOverMessage["winningSequence"]
  >([]);
  const [rematchRequested, setRematchRequested] = useState(false);
  const [clock, setClock] = useState<SignalDto.ClockDto>();

  const router = useRouter();

  const { tiles, winner, addTile, lastTile, setLastTile, setTiles } =
    useTiles(boardSize);

  const { hubProxy, isConnected, registerEventHandlers } =
    useSignalRConnection();

  useEffect(() => {
    if (isConnected && gameID && hubProxy) {
      hubProxy.joinGameGroup(gameID).catch((error) => {
        console.error("Error joining game group:", error);
      });

      const unregister = registerEventHandlers({
        playerJoinedGame: async () => {
          notification.show(`You have joined the game`);
        },
        gameStarted: async ({ isMyMoveFirst }) => {
          if (isMyMoveFirst) {
            notification.show("It's your turn. Place your tile");
          } else {
            notification.show("Wait for your opponent's move");
          }
        },
        playerMadeMove: async ({ playerId, tile, placedTileColor }) => {
          console.debug(
            `Player ${playerId.slice(0, 6)} made move: x${tile.x} - y${tile.y}`,
          );
          addTile(tile, placedTileColor as TileColor);
          setMoves((prevMoves) => [...prevMoves, `x${tile.x} - y${tile.y}`]);
        },
        gameIsOver: async (message) => {
          notification.show(formatErrorMessage(message.result));
          setWinningSequence(message.winningSequence);
        },
        gameHubError: async (error) => {
          notification.show(formatErrorMessage(error.message), "error");
          console.warn("Error from game hub:", error.message);
        },
        rematchRequested: async (message) => {
          console.debug("Rematch requested", message);
          setRematchRequested(true);
        },
        clock: async (message) => {
          setClock(message);
        },
        rematchApproved: async ({ newGameId }) => {
          typedSessionStorage.setItem(`game_${newGameId}`, playerID!);
          await router.navigate({
            to: `/game/join/${newGameId}`,
          });
        },
      });
      return () => {
        if (typeof unregister === "function") {
          unregister();
        }
      };
    }
    return;
    //TODO: investigate how to memoize properly addTile
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameID, isConnected, hubProxy, registerEventHandlers]);

  useInterval(() => {
    if (isConnected && gameID && hubProxy && moves.length !== 0) {
      hubProxy.getClock({ gameId: gameID });
    }
  }, 500); //TODO: play with this delay value for clock sync

  const handleMove = async (
    x: SignalClientMessages.MakeMoveClientMessage["x"],
    y: SignalClientMessages.MakeMoveClientMessage["y"],
  ) => {
    if (!hubProxy || winner) return;

    const makeMoveMessage = {
      gameId: gameID,
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
    winningSequence,
    rematchRequested,
    setRematchRequested,
    clock,
  };
};

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};
