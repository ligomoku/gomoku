import { Card, CardContent } from "@/shared/ui/card";
import { SwaggerTypes } from "@/api";

export interface FeaturedBoxesProps {
  games: SwaggerTypes.GetAvailableGamesResponse[];
  onGameClick: (game: SwaggerTypes.GetAvailableGamesResponse) => void;
  noGamesText: string;
}

export const FeaturedBoxes = ({
  games = [],
  onGameClick,
  noGamesText,
}: FeaturedBoxesProps) => (
  <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
    {games.length > 0 ? (
      games.map((game) => (
        <div
          key={game.gameId}
          onClick={() => onGameClick(game)}
          className="cursor-pointer"
        >
          <Card className="border-[#2b2b2b] bg-[#2b2b2b] hover:bg-[#3e3e3e]">
            <CardContent className="p-4 sm:p-6">
              <div className="aspect-w-16 aspect-h-9 mb-4 bg-[#3e3e3e]"></div>
              <h3 className="text-xl font-bold text-[#bababa] sm:text-2xl">
                {game.opponent?.userName ?? game.gameId.slice(0, 6)}
              </h3>
              <p className="truncate text-base text-[#999999] sm:text-lg">
                {game.gameId}
              </p>
            </CardContent>
          </Card>
        </div>
      ))
    ) : (
      <span>{noGamesText}</span>
    )}
  </div>
);
