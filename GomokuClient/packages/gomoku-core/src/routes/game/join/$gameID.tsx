import {
  useGetApiGameRegisteredGameidHistory,
  useGetApiGameAnonymousGameidHistory,
  usePostApiGameRegisteredGameidJoin,
  usePostApiGameAnonymousGameidJoin,
} from "@gomoku/api/client/hooks";
import { LoadingOverlay, toaster } from "@gomoku/story";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef, useCallback } from "react";

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
  const joinedRef = useRef(false);

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

  const joinGame = useCallback(async () => {
    if (gameHistory?.players.black || gameHistory?.players.white) return;
    setIsJoining(true);
    try {
      if (jwtToken) {
        //TODO: this is something wrong that we deal with Kubb
        await registeredJoinMutation.mutateAsync(undefined as never);
      }

      if (anonymousSessionId) {
        await anonymousJoinMutation.mutateAsync({
          playerId: anonymousSessionId,
        });
      }
      joinedRef.current = true;
    } catch (err) {
      console.error("Error joining game:", err);
      toaster.show("Error joining game", "error");
    } finally {
      setIsJoining(false);
    }
    //TODO: check why more deps causing multiple join calls
    //eslint-disable-next-line
  }, [gameHistory]);

  useEffect(() => {
    if (!gameHistory || joinedRef.current) return;

    joinGame();
  }, [gameHistory, joinGame]);

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
