import { Button } from "@/shared/ui/button";
import { GameCreatorButton } from "@/features/GameCreator";

export interface GameOptionsButtonsProps {
  onCreateGameClick?: () => void;
  onPlayWithFriendClick?: () => void;
  onPlayWithAIClick?: () => void;
  createGameText: string;
  playWithFriendText: string;
  playWithAIText: string;
  isLoadingCreateGame?: boolean;
  isLoadingPlayWithFriend?: boolean;
  isLoadingPlayWithAI?: boolean;
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
    className="h-12 w-full border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] hover:bg-[#4a4a4a] sm:h-14 sm:text-xl"
  >
    {text}
  </Button>
);

export const GameOptionsButtons = ({
  onPlayWithFriendClick,
  onPlayWithAIClick,
  createGameText,
  playWithFriendText,
  playWithAIText,
  isLoadingCreateGame = false,
  isLoadingPlayWithFriend = false,
  isLoadingPlayWithAI = false,
}: GameOptionsButtonsProps) => (
  <div className="space-y-4 sm:space-y-6">
    <GameCreatorButton>
      <GameButton text={createGameText} loading={isLoadingCreateGame} />
    </GameCreatorButton>
    <GameButton
      onClick={onPlayWithFriendClick}
      text={playWithFriendText}
      loading={isLoadingPlayWithFriend}
    />
    <GameButton
      onClick={onPlayWithAIClick}
      text={playWithAIText}
      loading={isLoadingPlayWithAI}
    />
  </div>
);
