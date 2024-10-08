import { createFileRoute } from "@tanstack/react-router";
import JoinGame from "@/pages/JoinGame";
import { getDefaultHeaders, typedStorage } from "@/shared/lib/utils";
import { SwaggerServices } from "@/api";

export const Route = createFileRoute("/game/join/$gameID")({
  component: JoinGame,
  loader: joinGameLoader,
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
    await SwaggerServices.postApiGameByGameIdJoin({
      path: { gameId: gameID },
      headers: getDefaultHeaders(authToken),
    });
  } catch (error) {
    console.error("Failed to join game:", error);
    throw error;
  }

  return { gameID };
}
