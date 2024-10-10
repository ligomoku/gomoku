import { createFileRoute } from "@tanstack/react-router";
import JoinGame from "@/pages/JoinGame";
import { getDefaultHeaders, typedStorage } from "@/shared/lib/utils";
import { SwaggerServices } from "@/api";
import { SignalRProvider } from "@/context";

let playerID: string | null | undefined = undefined;

export const Route = createFileRoute("/game/join/$gameID")({
  loader: async (route) => {
    playerID = await joinGameLoader({ params: route.params });
  },
  component: () => {
    return (
      <SignalRProvider playerID={playerID!}>
        <JoinGame />
      </SignalRProvider>
    );
  },
});

async function joinGameLoader({ params }: { params: { gameID: string } }) {
  const { gameID } = params;

  if (!gameID) {
    throw new Error("Game ID is required");
  }

  const authToken = typedStorage.getItem("jwtToken");
  if (!authToken) {
    console.warn("No authorization token available, anonymous user detected");
  }

  try {
    const response = await SwaggerServices.postApiGameByGameIdJoin({
      path: { gameId: gameID },
      headers: getDefaultHeaders(authToken!),
    });
    console.log("Joined game:", response);
    return response?.data?.playerId;
  } catch (error) {
    console.error("Failed to join game:", error);
    throw error;
  }
}
