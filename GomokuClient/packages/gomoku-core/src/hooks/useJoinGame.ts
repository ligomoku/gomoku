import { useRouter } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import type { SignalClientMessages, SignalDto, SwaggerTypes } from "@/api";
import type { TileColor } from "@/hooks/useTiles";

import { useSignalRConnection } from "@/context";
import { useTiles } from "@/hooks/useTiles";
import { toaster } from "@/ui/toaster";
import { formatErrorMessage } from "@/utils/errors";

export const useJoinGame = (
  gameID: SwaggerTypes.CreateGameResponse["gameId"],
  gameHistory: SwaggerTypes.GetGameHistoryResponse,
) => {
  //TODO: refactor to separate hook or place inside tile hook
  const [moves, setMoves] = useState<string[]>([]);
  const [winningSequence, setWinningSequence] = useState<
    SwaggerTypes.GetGameHistoryResponse["winningSequence"]
  >(gameHistory?.winningSequence);
  const [rematchRequested, setRematchRequested] = useState(false);
  const [clock, setClock] = useState<SignalDto.ClockDto | undefined>(
    gameHistory.clock,
  );
  const [players, setPlayers] = useState<SwaggerTypes.PlayersDto>(
    gameHistory.players,
  );

  const router = useRouter();

  const { tiles, winner, addTile, lastTile } = useTiles(gameHistory);

  const { hubProxy, isConnected, registerEventHandlers } =
    useSignalRConnection();

  useEffect(() => {
    if (isConnected && gameID && hubProxy) {
      hubProxy.joinGameGroup(gameID).catch((error) => {
        console.error("Error joining game group:", error);
      });

      const unregister = registerEventHandlers({
        playerJoinedGame: async () => {
          toaster.show(`You have joined the game`);
        },
        bothPlayersJoined: async ({ players }) => {
          setPlayers(players);
        },
        gameStarted: async ({ isMyMoveFirst }) => {
          if (isMyMoveFirst) {
            toaster.show("It's your turn. Place your tile");
          } else {
            toaster.show("Wait for your opponent's move");
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
          toaster.show(formatErrorMessage(message.result));
          setWinningSequence(message.winningSequence);
        },
        gameHubError: async (error) => {
          toaster.show(formatErrorMessage(error.message), "error");
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
    if (
      isConnected &&
      gameID &&
      hubProxy &&
      moves.length !== 0 &&
      gameHistory.timeControl
    ) {
      hubProxy.getClock({ gameId: gameID });
    }
  }, 500); //TODO: play with this delay value for clock sync

  const handleMove = useCallback(
    async (
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
        toaster.show("Error making move", "error");
      }
    },
    [hubProxy, winner, gameID],
  );

  return {
    hubProxy,
    moves,
    tiles,
    lastTile,
    winner,
    handleMove,
    winningSequence,
    rematchRequested,
    setRematchRequested,
    clock,
    players,
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
