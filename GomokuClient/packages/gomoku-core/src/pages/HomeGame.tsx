import { SectionList } from "@/features/SectionList";
import { TimeControls } from "@/features/TimeControls";
import { OnlinePlayersInfo } from "@/features/OnlinePlayersInfo";
import { GameOptionsButtons } from "@/features/GameOptionsButton";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { getDefaultHeaders, typedStorage } from "@/shared/lib/utils";
import { useCreateGameAndNavigate } from "@/hooks/useCreateGame";
import { SwaggerTypes, SwaggerServices } from "@/api";

import { useAuthToken } from "@/context";
import { t } from "@lingui/macro";
import { postApiGameByGameIdJoin } from "@/api/client";

export const HomeGame = () => {
  const navigate = useNavigate();
  const { jwtToken } = useAuthToken();
  const { data: paginatedGames } = useFetchGames(
    jwtToken || typedStorage.getItem("jwtToken") || "",
  );

  const handleJoinGame = useJoinGame(
    jwtToken || typedStorage.getItem("jwtToken") || "",
  );

  const handleCreateGame = useCreateGameAndNavigate(
    jwtToken || typedStorage.getItem("jwtToken") || "",
  );

  const transformGameData = (
    games: SwaggerTypes.GetAvailableGamesResponse[] | undefined,
  ) => {
    return games?.map((game) => ({
      id: game.gameId,
      title: game.opponent.userName,
      icon: <Users className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />,
    }));
  };

  const handleJoinNavigate = (gameId: string) => {
    handleJoinGame.mutate(gameId, {
      onSuccess: (data) => {
        console.log("Game joined", data);
        navigate({ to: `/game/join/${gameId}` });
      },
      onError: (error) => {
        console.error("Error joining game:", error);
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      <main className="container mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionList
              title="Online games"
              items={transformGameData(paginatedGames?.data)}
              onItemClick={(item) => handleJoinNavigate(item.id)}
              noItemsText={t`No online games were created`}
            />
            <p className="text-base sm:text-lg">
              {t`Gomoku.org is a free, open-source Five in a Row game platform.`}
            </p>
          </div>
          <div className="lg:col-span-6">
            <h2 className="mb-6 text-2xl font-bold text-[#bababa] sm:text-3xl">
              {t`Quick pairing`}
            </h2>
            <TimeControls gameTypes={gameTypes} />
          </div>
          <div className="lg:col-span-3">
            <GameOptionsButtons
              onCreateGameClick={handleCreateGame}
              createGameText={t`CREATE A GAME`}
              playWithFriendText={t`PLAY WITH A FRIEND`}
              playWithAIText={t`PLAY WITH AI`}
            />
            <OnlinePlayersInfo
              gamesInPlayText={t`1,892 games in play`}
              playersOnlineText={t`5,247 players online`}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const useFetchGames = (authToken: string) =>
  useQuery<
    SwaggerTypes.GetApiGamesAvailableToJoinResponse,
    SwaggerTypes.GetApiGamesAvailableToJoinError,
    SwaggerTypes.GetApiGamesAvailableToJoinResponse,
    [string, string | null]
  >({
    queryKey: ["games", null],
    queryFn: async () => {
      const response = await SwaggerServices.getApiGamesAvailableToJoin({
        headers: getDefaultHeaders(authToken),
        query: { isAnonymous: !authToken },
      });

      if (!response.data) {
        throw new Error("Invalid game data received");
      }

      return response.data;
    },
    refetchInterval: 5000,
  });

const useJoinGame = (authToken: string) =>
  useMutation<void, Error, string>({
    mutationFn: async (gameId) => {
      const response = await postApiGameByGameIdJoin({
        path: { gameId },
        headers: getDefaultHeaders(authToken),
      });

      if (!response.data) {
        throw new Error("Invalid game data received");
      }

      if (response.data.playerId) {
        typedStorage.setItem("anonymousPlayerID", response.data.playerId);
      }
    },
  });

//TODO: properly wrap with i18n
const gameTypes = [
  { time: "5+0", type: "Blitz" },
  { time: "10+0", type: "Quick" },
  { time: "15+5", type: "Standard" },
  { time: "30+0", type: "Long" },
  { time: "1 day", type: "Correspondence" },
  { time: "Custom", type: "" },
];
