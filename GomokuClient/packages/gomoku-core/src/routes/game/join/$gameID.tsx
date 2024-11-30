import {
  useGetApiGameRegisteredGameidHistory,
  useGetApiGameAnonymousGameidHistory,
  usePostApiGameRegisteredGameidJoin,
  usePostApiGameAnonymousGameidJoin,
} from "@gomoku/api/client/hooks";
import { LoadingOverlay, toaster } from "@gomoku/story";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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

  const { data: registeredGameHistory } = useGetApiGameRegisteredGameidHistory(
    gameID,
    Headers.getDefaultHeadersWithAuth(jwtToken!),
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
    Headers.getDefaultHeadersWithAuth(jwtToken!),
  );

  const anonymousJoinMutation = usePostApiGameAnonymousGameidJoin(
    gameID,
    Headers.getDefaultHeaders(),
  );

  const gameHistory = jwtToken ? registeredGameHistory : anonymousGameHistory;

  useEffect(() => {
    if (!gameHistory) return;

    const joinGame = async () => {
      if (gameHistory.players.black || gameHistory.players.white) return;
      setIsJoining(true);
      try {
        if (jwtToken) {
          //@ts-expect-error
          await registeredJoinMutation.mutateAsync(undefined);
        }

        if (anonymousSessionId) {
          await anonymousJoinMutation.mutateAsync({
            playerId: anonymousSessionId,
          });
        }
      } catch (err) {
        console.error("Error joining game:", err);
        toaster.show("Error joining game", "error");
      } finally {
        setIsJoining(false);
      }
    };

    joinGame();
  }, [
    gameHistory,
    gameID,
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
