import { QueryClient, useQuery } from "@tanstack/react-query";
import { SwaggerServices } from "@/api";
import JoinGame from "@/pages/JoinGame";
import { SignalRProvider, useAuthToken } from "@/context";
import { getDefaultHeaders } from "@/shared/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LoadingOverlay } from "@/shared/ui/loading-overlay";
import { notification } from "@/shared/ui/notification";

const getGameHistory = async (gameID: string) => {
  const response = await SwaggerServices.getApiGameByGameIdHistory({
    headers: getDefaultHeaders(),
    path: { gameId: gameID },
  });

  if (!response.data) {
    throw new Error("Game history not received!");
  }

  return response.data;
};

const joinGame = async (gameID: string, jwtToken: string) => {
  const response = await SwaggerServices.postApiGameByGameIdJoin({
    path: { gameId: gameID },
    headers: getDefaultHeaders(jwtToken),
  });

  return response.data;
};

const JoinGameComponent = ({ gameID }: { gameID: string }) => {
  const [playerID, setPlayerID] = useState<string | null>();
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
        setPlayerID(joinGameResponse?.playerId);
      } catch (err) {
        console.error("Error joining game:", err);
        notification.show("Error joining game", "error");
      } finally {
        setIsJoining(false);
      }
    };

    asyncJoinGame();
  }, [gameHistory, gameID, jwtToken, playerID]);

  if (isLoading || (isJoining && !playerID))
    return <LoadingOverlay isVisible />;
  if (error) return <div>Error loading game history {error.toString()}</div>;

  return (
    <SignalRProvider playerID={playerID}>
      <JoinGame gameHistory={gameHistory} />
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
    //TODO: this should be done via router itself here
    const gameID = window.location.pathname.split("/").pop();
    return <JoinGameComponent gameID={gameID!} />;
  },
});
