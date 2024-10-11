import { createFileRoute } from "@tanstack/react-router";
import JoinGame from "@/pages/JoinGame";
import { getDefaultHeaders, typedStorage } from "@/shared/lib/utils";
import { SwaggerServices } from "@/api";
import { SignalRProvider } from "@/context";

let playerID: string | null | undefined = null;

export const Route = createFileRoute("/game/join/$gameID")({
  // TODO: don't use loader if playerID is already set from useLocation hook
  loader: async (route) => {
    playerID = await joinGameLoader({ params: route.params });
  },
  component: () => {
    return (
      <SignalRProvider
        playerID={playerID! || sessionStorage.getItem("playerID")!}
      >
        <JoinGame />
      </SignalRProvider>
    );
  },
});

const joinGameLoader = async ({ params }: { params: { gameID: string } }) => {
  const { gameID } = params;

  if (!gameID) {
    throw new Error("Game ID is required");
  }

  if (sessionStorage.getItem("playerID")) {
    return;
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
};
