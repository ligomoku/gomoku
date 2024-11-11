import { QueryClient, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import type { SwaggerTypes } from "@/api";

import { SwaggerServices } from "@/api";
import { SignalRProvider, useAuthToken } from "@/context";
import JoinGame from "@/pages/JoinGame";
import { getDefaultHeaders, typedSessionStorage } from "@/shared/lib/utils";
import { LoadingOverlay } from "@/shared/ui/loading-overlay";
import { toaster } from "@/shared/ui/toaster";

const getGameHistory = async (
  gameID: SwaggerTypes.CreateGameResponse["gameId"],
) => {
  const response = await SwaggerServices.getApiGameByGameIdHistory({
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
  const response = await SwaggerServices.postApiGameByGameIdJoin<true>({
    path: { gameId: gameID },
    headers: getDefaultHeaders(jwtToken),
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
  const [playerID, setPlayerID] =
    useState<SwaggerTypes.AddPlayerToGameResponse["playerId"]>();
  const [isJoining, setIsJoining] = useState(false);
  const { jwtToken } = useAuthToken();

  const {
    data: gameHistory,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["gameHistory", gameID],
    queryFn: () => getGameHistory(gameID),
  });

  useEffect(() => {
    if (!gameHistory || playerID) return;

    const asyncJoinGame = async () => {
      if (gameHistory.players.black || gameHistory.players.white) return;
      setIsJoining(true);
      try {
        const joinGameResponse = await joinGame(gameID, jwtToken);
        setPlayerID(joinGameResponse.playerId);
        if (!jwtToken) {
          typedSessionStorage.setItem(
            `game_${gameID}`,
            joinGameResponse.playerId,
          );
        }
      } catch (err) {
        console.error("Error joining game:", err);
        toaster.show("Error joining game", "error");
      } finally {
        setIsJoining(false);
      }
    };

    asyncJoinGame();
  }, [gameHistory, gameID, jwtToken, playerID]);

  if (isLoading || (isJoining && !playerID) || !gameHistory)
    return <LoadingOverlay isVisible />;
  if (error) return <div>Error loading game history {error.toString()}</div>;

  const calculatePlayerID = jwtToken
    ? playerID
    : typedSessionStorage.getItem(`game_${gameID}`);

  return (
    <SignalRProvider playerID={calculatePlayerID}>
      <JoinGame gameHistory={gameHistory} playerID={calculatePlayerID!} />
    </SignalRProvider>
  );
};

export const Route = createFileRoute("/game/join/$gameID")({
  loader: async ({ params }) => {
    const queryClient = new QueryClient();
    const { gameID } = params;
    await queryClient.ensureQueryData({
      queryKey: ["gameHistory", gameID],
      queryFn: () => getGameHistory(gameID),
    });
    return { gameID };
  },
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { gameID } = Route.useParams();
    return <JoinGameComponent gameID={gameID!} />;
  },
});
