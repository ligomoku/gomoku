import type { SwaggerTypes } from "@gomoku/api";

import { GameCreatorButton } from "@/components";
import { Button } from "@/ui";

export interface GameOptionsButtonsProps {
  onCreate: {
    game: (
      boardSize: number,
      timeControl?: SwaggerTypes.TimeControlDto,
    ) => void;
    ai: (boardSize: number, timeControl?: SwaggerTypes.TimeControlDto) => void;
  };
  loading: {
    game: boolean;
    ai: boolean;
  };
  text: {
    game: string;
    ai: string;
  };
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
  onCreate,
  loading,
  text,
}: GameOptionsButtonsProps) => (
  <div className="space-y-4 sm:space-y-6">
    <GameCreatorButton onCreateGame={onCreate.game} isLoading={loading?.game}>
      <GameButton text={text?.game} loading={loading?.game} />
    </GameCreatorButton>
    <GameCreatorButton onCreateGame={onCreate.ai} isLoading={loading?.ai}>
      <GameButton text="PLAY LOCAL" loading={loading?.ai} />
    </GameCreatorButton>
  </div>
);
