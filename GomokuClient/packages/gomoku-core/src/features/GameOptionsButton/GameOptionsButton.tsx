import { Button } from "@/shared/ui/button";
import { t } from "@lingui/macro";

interface GameOptionsButtonsProps {
  onCreateGameClick?: () => void;
  onPlayWithFriendClick?: () => void;
  onPlayWithAIClick?: () => void;
}

export const GameOptionsButtons = ({
  onCreateGameClick,
  onPlayWithFriendClick,
  onPlayWithAIClick,
}: GameOptionsButtonsProps) => (
  <div className="space-y-4 sm:space-y-6">
    <Button
      onClick={onCreateGameClick}
      className="h-12 w-full border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] hover:bg-[#4a4a4a] sm:h-14 sm:text-xl"
    >
      {t`CREATE A GAME`}
    </Button>
    <Button
      onClick={onPlayWithFriendClick}
      className="h-12 w-full border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] hover:bg-[#4a4a4a] sm:h-14 sm:text-xl"
    >
      {t`PLAY WITH A FRIEND`}
    </Button>
    <Button
      onClick={onPlayWithAIClick}
      className="h-12 w-full border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] hover:bg-[#4a4a4a] sm:h-14 sm:text-xl"
    >
      {t`PLAY WITH AI`}
    </Button>
  </div>
);
