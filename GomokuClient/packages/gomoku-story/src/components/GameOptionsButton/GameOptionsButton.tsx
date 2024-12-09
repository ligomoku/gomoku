import type { SwaggerTypes } from "@gomoku/api";

import { GameCreatorButton } from "@/components";
import { Button } from "@/ui";

export interface GameOptionsButtonsProps {
  onCreateGame: (
    boardSize: number,
    timeControl?: SwaggerTypes.TimeControlDto,
  ) => void;
  createGameText: string;
  isLoadingCreateGame?: boolean;
}

const GameButton = ({
  onClick,
  text,
  loading,
}: {
  onClick?: () => void;
  text: string;
  loading?: boolean;
}) => (
  <Button
    onClick={onClick}
    loading={loading}
    className="h-12 w-full border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa]
      hover:bg-[#4a4a4a] sm:h-14 sm:text-xl"
  >
    {text}
  </Button>
);

export const GameOptionsButtons = ({
  onCreateGame,
  createGameText,
  isLoadingCreateGame = false,
}: GameOptionsButtonsProps) => (
  <div className="space-y-4 sm:space-y-6">
    <GameCreatorButton
      onCreateGame={onCreateGame}
      isLoading={isLoadingCreateGame}
    >
      <GameButton text={createGameText} loading={isLoadingCreateGame} />
    </GameCreatorButton>
  </div>
);
