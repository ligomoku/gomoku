import { Button } from "@/shared/ui/button";

export interface GameOptionsButtonsProps {
  onCreateGameClick?: () => void;
  onPlayWithFriendClick?: () => void;
  onPlayWithAIClick?: () => void;
  createGameText: string;
  playWithFriendText: string;
  playWithAIText: string;
}

export const GameOptionsButtons = ({
  onCreateGameClick,
  onPlayWithFriendClick,
  onPlayWithAIClick,
  createGameText,
  playWithFriendText,
  playWithAIText,
}: GameOptionsButtonsProps) => (
  <div className="space-y-4 sm:space-y-6">
    <Button
      onClick={onCreateGameClick}
      className="h-12 w-full border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] hover:bg-[#4a4a4a] sm:h-14 sm:text-xl"
    >
      {createGameText}
    </Button>
    <Button
      onClick={onPlayWithFriendClick}
      className="h-12 w-full border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] hover:bg-[#4a4a4a] sm:h-14 sm:text-xl"
    >
      {playWithFriendText}
    </Button>
    <Button
      onClick={onPlayWithAIClick}
      className="h-12 w-full border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] hover:bg-[#4a4a4a] sm:h-14 sm:text-xl"
    >
      {playWithAIText}
    </Button>
  </div>
);
