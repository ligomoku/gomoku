import { QueryClient, useQuery } from "@tanstack/react-query";
import { SwaggerServices } from "@/api";
import JoinGame from "@/pages/JoinGame";
import { SignalRProvider } from "@/context";
import { getDefaultHeaders } from "@/shared/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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

const joinGame = async (gameID: string) => {
  const response = await SwaggerServices.postApiGameByGameIdJoin({
    path: { gameId: gameID },
    headers: getDefaultHeaders(),
  });

  if (!response.data) {
    console.log(response);
  }

  console.count("Joined game");

  return response.data;
};

const JoinGameComponent = ({ gameID }: { gameID: string }) => {
  const [playerID, setPlayerID] = useState<string | null>(
    sessionStorage.getItem("playerID"),
  );
  const [isJoining, setIsJoining] = useState(false);

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
        const joinGameResponse = await joinGame(gameID);
        setPlayerID(
          joinGameResponse?.playerId || sessionStorage.getItem("playerID")!,
        );
      } catch (err) {
        console.error("Error joining game:", err);
      } finally {
        setIsJoining(false);
      }
    };

    asyncJoinGame();
  }, [gameHistory, gameID, playerID]);

  if (isLoading || (isJoining && !playerID)) return <div>Loading...</div>;
  if (error) return <div>Error loading game history {error.toString()}</div>;

  return (
    <SignalRProvider playerID={playerID}>
      <JoinGame />
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
  },
  component: () => {
    //TODO: this should be done via router itself here
    const gameID = window.location.pathname.split("/").pop();
    return <JoinGameComponent gameID={gameID!} />;
  },
});
