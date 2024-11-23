import type { SwaggerTypes } from "@gomoku/api";

import { GameCreatorButton } from "@/components";
import { Card, CardContent } from "@/ui";

export interface GameType {
  timeLabel: string;
  type: string;
  boardSize: number;
  timeControl: SwaggerTypes.TimeControlDto;
}

export interface TimeControlsProps {
  gameTypes: GameType[];
  onCreateGame: (
    boardSize: number,
    timeControl?: SwaggerTypes.TimeControlDto,
  ) => void;
  isLoading: boolean;
}

export const TimeControls = ({
  gameTypes,
  onCreateGame,
  isLoading,
}: TimeControlsProps) => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
    {gameTypes.map((game, index) => (
      <GameCreatorButton
        key={index}
        timeControl={game.timeControl}
        onCreateGame={onCreateGame}
        isLoading={isLoading}
      >
        <Card className="cursor-pointer border-[#2b2b2b] bg-[#2b2b2b] transition-colors hover:bg-[#3e3e3e]">
          <CardContent className="p-4 text-center sm:p-6">
            <h3 className="text-xl font-bold text-[#bababa] sm:text-3xl">
              {game.timeLabel}
            </h3>
            <p className="truncate text-sm text-[#999999] sm:text-xl">
              {game.type}
            </p>
            <p className="text-xs text-[#999999] sm:text-lg">
              Board size: {game.boardSize}{" "}
            </p>
          </CardContent>
        </Card>
      </GameCreatorButton>
    ))}
  </div>
);

TimeControls.displayName = "TimeControls";
