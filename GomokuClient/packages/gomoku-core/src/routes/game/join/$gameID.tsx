import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import type { SwaggerTypes } from "@/api";

import { SwaggerServices } from "@/api";
import { useAuthToken } from "@/context";
import JoinGame from "@/pages/JoinGame";
import { getDefaultHeaders, typedSessionStorage } from "@/shared/lib/utils";
import { LoadingOverlay } from "@/shared/ui/loading-overlay";
import { toaster } from "@/shared/ui/toaster";

const getGameHistory = async (
  gameID: SwaggerTypes.CreateGameResponse["gameId"],
  jwtToken?: string,
) => {
  const response = jwtToken
    ? await SwaggerServices.getApiGameRegisteredByGameIdHistory({
        headers: getDefaultHeaders(jwtToken),
        path: { gameId: gameID },
      })
    : await SwaggerServices.getApiGameAnonymousByGameIdHistory({
        headers: getDefaultHeaders(),
        path: { gameId: gameID },
      });

  if (!response.data) {
    throw new Error("Game history not received!");
  }

  return response.data;
};

const joinGame = async (
  gameID: SwaggerTypes.CreateGameResponse["gameId"],
  jwtToken: string,
) => {
  const response = jwtToken
    ? await SwaggerServices.postApiGameRegisteredByGameIdJoin<true>({
        path: { gameId: gameID },
        headers: getDefaultHeaders(jwtToken),
      })
    : await SwaggerServices.postApiGameAnonymousByGameIdJoin<true>({
        path: { gameId: gameID },
        headers: getDefaultHeaders(),
        body: {
          playerId: typedSessionStorage.getItem("anonymousSessionID"),
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
  const { jwtToken } = useAuthToken();

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
        await joinGame(gameID, jwtToken);
      } catch (err) {
        console.error("Error joining game:", err);
        toaster.show("Error joining game", "error");
      } finally {
        setIsJoining(false);
      }
    };

    asyncJoinGame();
  }, [gameHistory, gameID, jwtToken]);

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
