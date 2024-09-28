import { Card, CardContent } from "@/shared/ui/card";
import { useEffect, useState } from "react";
import {
  getApiGames,
  GetApiGamesError,
  GetApiGamesResponse,
  GetAvailableGamesResponse,
} from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export const FeaturedBoxes = () => {
  const { data: gameData } = useFetchGames();
  const [games, setGames] = useState<GetAvailableGamesResponse[]>([]);

  useEffect(() => {
    if (gameData) {
      setGames(gameData);
    }
    console.log("Game data received: ", gameData);
  }, [gameData]);

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
      {games.length > 0 ? (
        games.map((game, index) => (
          <Link key={game.gameId} to={`/game/${game.gameId}`}>
            <Card
              key={game.gameId}
              className="cursor-pointer border-[#2b2b2b] bg-[#2b2b2b] hover:bg-[#3e3e3e]"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="aspect-w-16 aspect-h-9 mb-4 bg-[#3e3e3e]"></div>
                <h3 className="text-xl font-bold text-[#bababa] sm:text-2xl">
                  Game {index + 1}
                </h3>
                <p className="truncate text-base text-[#999999] sm:text-lg">
                  {game.gameId}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <span>No games available</span>
      )}
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
