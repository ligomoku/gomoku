import {
  useGetApiGameRegisteredGameidHistory,
  useGetApiGameAnonymousGameidHistory,
  usePostApiGameRegisteredGameidJoin,
  usePostApiGameAnonymousGameidJoin,
} from "@gomoku/api/client/hooks";
import { LoadingOverlay, toaster } from "@gomoku/story";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";

import type { SwaggerTypes } from "@gomoku/api";

import { useAuthToken } from "@/context";
import JoinGame from "@/pages/JoinGame";
import { Headers } from "@/utils";

const JoinGameComponent = ({
  gameID,
}: {
  gameID: SwaggerTypes.CreateGameResponse["gameId"];
}) => {
  const [isJoining, setIsJoining] = useState(false);
  const { jwtToken, anonymousSessionId } = useAuthToken();
  const joinAttemptedRef = useRef(false);

  const { data: registeredGameHistory } = useGetApiGameRegisteredGameidHistory(
    gameID,
    Headers.getDefaultHeadersWithAuth(jwtToken),
    {
      query: {
        enabled: !!jwtToken,
      },
    },
  );

  const { data: anonymousGameHistory } = useGetApiGameAnonymousGameidHistory(
    gameID,
    Headers.getDefaultHeaders(),
    {
      query: {
        enabled: !jwtToken,
      },
    },
  );

  const registeredJoinMutation = usePostApiGameRegisteredGameidJoin(
    gameID,
    Headers.getDefaultHeadersWithAuth(jwtToken),
  );

  const anonymousJoinMutation = usePostApiGameAnonymousGameidJoin(
    gameID,
    Headers.getDefaultHeaders(),
  );

  const gameHistory = jwtToken ? registeredGameHistory : anonymousGameHistory;

  useEffect(() => {
    const joinGame = async () => {
      // Don't attempt to join if:
      // 1. We've already attempted to join
      // 2. We don't have game history yet
      // 3. The game already has both players
      if (
        joinAttemptedRef.current ||
        !gameHistory ||
        (gameHistory.players.black && gameHistory.players.white)
      ) {
        return;
      }

      setIsJoining(true);
      joinAttemptedRef.current = true;

      try {
        if (jwtToken) {
          await registeredJoinMutation.mutateAsync(undefined as never);
        } else if (anonymousSessionId) {
          await anonymousJoinMutation.mutateAsync({
            playerId: anonymousSessionId,
          });
        }
      } catch (err) {
        console.error("Error joining game:", err);
        toaster.show("Error joining game", "error");
        joinAttemptedRef.current = false; // Reset attempted state
      } finally {
        setIsJoining(false);
      }
    };

    joinGame();
  }, [
    gameHistory,
    jwtToken,
    anonymousSessionId,
    registeredJoinMutation,
    anonymousJoinMutation,
  ]);

  if (!gameHistory || isJoining) return <LoadingOverlay isVisible />;

  return <JoinGame gameHistory={gameHistory} />;
};

export const Route = createFileRoute("/game/join/$gameID")({
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { gameID } = Route.useParams();
    return <JoinGameComponent gameID={gameID!} />;
  },
});
