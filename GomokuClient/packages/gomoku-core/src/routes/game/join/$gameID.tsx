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

  const {
    data: gameHistory,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["gameHistory", gameID],
    queryFn: () => getGameHistory(gameID),
  });

  useEffect(() => {
    const asyncJoinGame = async () => {
      try {
        const joinGameResponse = await joinGame(gameID);
        console.count("KEK");
        const playerIDFromResponse =
          joinGameResponse?.playerId || sessionStorage.getItem("playerID")!;
        setPlayerID(playerIDFromResponse);
        console.log("Joined game:", joinGameResponse);
        console.log("PlayerIDResponse", playerIDFromResponse);
      } catch (error) {
        console.error("Failed to join the game:", error);
      }
    };

    asyncJoinGame();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading game history</div>;

  if (!playerID) return <div>Joining game...</div>;

  console.log("Joined game:", gameHistory);
  console.log("Player ID:", playerID);

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
  },
  component: () => {
    //TODO: this should be done via router itself here
    const gameID = window.location.pathname.split("/").pop();
    return <JoinGameComponent gameID={gameID!} />;
  },
});
