import { SwaggerServices } from "@gomoku/api";
import { LoadingOverlay, toaster } from "@gomoku/story";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import type { SwaggerTypes } from "@gomoku/api";

import { useAuthToken } from "@/context";
import JoinGame from "@/pages/JoinGame";
import { fetchAuthFallback, Headers } from "@/utils";

export const getGameHistory = async (
  gameId: string,
  jwtToken?: string,
): Promise<SwaggerTypes.GetGameHistoryResponse> => {
  const response = await fetchAuthFallback<SwaggerTypes.GetGameHistoryResponse>(
    jwtToken,
    async (token) =>
      SwaggerServices.getApiGameRegisteredByGameIdHistory({
        headers: Headers.getDefaultHeaders(token),
        path: { gameId },
      }),
    async () =>
      SwaggerServices.getApiGameAnonymousByGameIdHistory({
        headers: Headers.getDefaultHeaders(),
        path: { gameId },
      }),
  );

  if (!response.data) {
    throw new Error("Game history not received!");
  }

  return response.data;
};

const joinRegisteredGame = async (
  gameID: SwaggerTypes.CreateGameResponse["gameId"],
  jwtToken: string,
) => {
  const response = await SwaggerServices.postApiGameRegisteredByGameIdJoin({
    path: { gameId: gameID },
    headers: Headers.getDefaultHeaders(jwtToken),
  });

  if (!response.data) {
    throw new Error("Failed to join game!");
  }

  return response.data;
};

const joinAnonymousGame = async (
  gameID: SwaggerTypes.CreateGameResponse["gameId"],
  playerID: string,
) => {
  const response = await SwaggerServices.postApiGameAnonymousByGameIdJoin({
    path: { gameId: gameID },
    headers: Headers.getDefaultHeaders(),
    body: {
      playerId: playerID,
    },
  });

  if (!response.data) {
    throw new Error("Failed to join game!");
  }

  return response.data;
};

const JoinGameComponent = ({
  gameID,
}: {
  gameID: SwaggerTypes.CreateGameResponse["gameId"];
}) => {
  const [isJoining, setIsJoining] = useState(false);
  const { jwtToken, anonymousSessionId } = useAuthToken();

  const {
    data: gameHistory,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["gameHistory", gameID],
    queryFn: () => getGameHistory(gameID, jwtToken),
  });

  useEffect(() => {
    if (!gameHistory) return;

    const asyncJoinGame = async () => {
      if (gameHistory.players.black || gameHistory.players.white) return;
      setIsJoining(true);
      try {
        if (jwtToken) {
          await joinRegisteredGame(gameID, jwtToken);
        }

        if (anonymousSessionId) {
          await joinAnonymousGame(gameID, anonymousSessionId);
        }
      } catch (err) {
        console.error("Error joining game:", err);
        toaster.show("Error joining game", "error");
      } finally {
        setIsJoining(false);
      }
    };

    asyncJoinGame();
  }, [gameHistory, gameID, jwtToken, anonymousSessionId]);

  if (isLoading || isJoining || !gameHistory)
    return <LoadingOverlay isVisible />;
  if (error) return <div>Error loading game history {error.toString()}</div>;

  return <JoinGame gameHistory={gameHistory} />;
};

export const Route = createFileRoute("/game/join/$gameID")({
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { gameID } = Route.useParams();
    return <JoinGameComponent gameID={gameID!} />;
  },
});
