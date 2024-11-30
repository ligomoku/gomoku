import type { SwaggerTypes } from "@gomoku/api";
import { Card, CardContent, Spinner } from "@/ui";
import { useState } from "react";

export interface GameType {
  timeLabel: string;
  type: string;
  boardSize: number;
  timeControl: SwaggerTypes.TimeControlDto;
}

export interface TimeControlsProps {
  gameTypes: GameType[];
  onGameTypeSelected: (gameType: GameType) => void;
  onGameTypeUnselected: () => void;
  isLoading: boolean;
}

export const TimeControls = ({
  gameTypes,
  onGameTypeSelected,
  onGameTypeUnselected,
}: TimeControlsProps) => {
  const [selectedGameType, setSelectedGameType] = useState<GameType>();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
      {gameTypes.map((game) => (
        <Card
          key={`${game.type}-${game.boardSize}`}
          className="flex cursor-pointer justify-center border-[#2b2b2b] bg-[#2b2b2b] align-middle
            transition-colors hover:bg-[#3e3e3e]"
          onClick={() => {
            if (selectedGameType?.timeControl == game.timeControl) {
              setSelectedGameType(undefined);
              onGameTypeUnselected();
            } else {
              setSelectedGameType(game);
              onGameTypeSelected(game);
            }
          }}
        >
          {selectedGameType?.timeControl === game.timeControl ? (
            <div className="flex flex-1 items-center justify-center">
              <Spinner size={"lg"} />
            </div>
          ) : (
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
          )}
        </Card>
      ))}
    </div>
  );
};

TimeControls.displayName = "TimeControls";
