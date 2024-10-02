import { createFileRoute } from "@tanstack/react-router";
import JoinGame from "@/pages/JoinGame";
import { getDefaultHeaders, typedStorage } from "@/shared/lib/utils";
import { postApiGameByGameIdJoin } from "@/api/client";

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
    throw new Error("No authorization token available");
  }

  try {
    await postApiGameByGameIdJoin({
      path: { gameId: gameID },
      headers: getDefaultHeaders(authToken),
    });
  } catch (error) {
    console.error("Failed to join game:", error);
    throw error;
  }

  return { gameID };
}

// const useJoinGame = (authToken: string) =>
//   useMutation<void, Error, string>({
//     mutationFn: async (gameId) => {
//       const response = await postApiGameByGameIdJoin({
//         path: { gameId },
//         headers: getDefaultHeaders(authToken),
//       });
//
//       if (!response.data) {
//         throw new Error("Invalid game data received");
//       }
//     },
//   });
