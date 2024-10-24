import { Card, CardContent } from "@/shared/ui/card";
import { GameCreatorButton } from "@/features/GameCreator";
import { SwaggerTypes } from "@/api";

export interface GameType {
  timeLabel: string;
  type: string;
  timeControl?: SwaggerTypes.TimeControlDto;
}

export interface TimeControlsProps {
  gameTypes: GameType[];
}

export const TimeControls = ({ gameTypes }: TimeControlsProps) => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
    {gameTypes.map((game, index) => (
      <GameCreatorButton key={index} timeControl={game.timeControl}>
        <Card
          key={index}
          className="cursor-pointer border-[#2b2b2b] bg-[#2b2b2b] transition-colors hover:bg-[#3e3e3e]"
          onClick={() => console.log("Card click")}
        >
          <CardContent className="p-4 text-center sm:p-6">
            <h3 className="text-xl font-bold text-[#bababa] sm:text-3xl">
              {game.timeLabel}
            </h3>
            <p className="text-sm text-[#999999] sm:text-xl">{game.type}</p>
          </CardContent>
        </Card>
      </GameCreatorButton>
    ))}
  </div>
);

TimeControls.displayName = "TimeControls";
