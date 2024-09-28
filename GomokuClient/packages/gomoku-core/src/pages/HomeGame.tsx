import { SectionList } from "@/features/SectionList";
import { TimeControls } from "@/features/TimeControls";
import { OnlinePlayersInfo } from "@/features/OnlinePlayersInfo";
import { GameOptionsButtons } from "@/features/GameOptionsButton";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  getApiGames,
  GetApiGamesError,
  GetApiGamesResponse,
  GetAvailableGamesResponse,
} from "@/api/client";
import { Users } from "lucide-react";

export const HomeGame = () => {
  const navigate = useNavigate();
  const { data: gameData } = useFetchGames();

  const transformGameData = (
    games: GetAvailableGamesResponse[] | undefined,
  ) => {
    return games?.map((game) => ({
      id: game.gameId,
      title: game.opponent.userName,
      icon: <Users className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />,
    }));
  };

  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      <main className="container mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionList
              title="Online games"
              items={transformGameData(gameData)}
              onItemClick={(item) => navigate({ to: `/game/join/${item.id}` })}
            />
            <p className="text-base sm:text-lg">
              Gomoku.org is a free, open-source Five in a Row game platform.
            </p>
          </div>
          <div className="lg:col-span-6">
            <h2 className="mb-6 text-2xl font-bold text-[#bababa] sm:text-3xl">
              Quick pairing
            </h2>
            <TimeControls />
          </div>
          <div className="lg:col-span-3">
            <GameOptionsButtons
              onCreateGameClick={() => navigate({ to: "/game/create" })}
            />
            <OnlinePlayersInfo />
          </div>
        </div>
      </main>
    </div>
  );
};

const useFetchGames = () =>
  useQuery<
    GetApiGamesResponse,
    GetApiGamesError,
    GetApiGamesResponse,
    [string, string | null]
  >({
    queryKey: ["games", null],
    queryFn: async () => {
      const response = await getApiGames({
        path: {},
        headers: {
          "X-Version": "1",
          "Content-Type": "application/json",
        },
      });

      if (!response.data) {
        throw new Error("Invalid game data received");
      }

      return response.data;
    },
  });
