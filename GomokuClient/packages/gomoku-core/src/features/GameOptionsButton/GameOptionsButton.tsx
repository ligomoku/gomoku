import { Button } from "@/shared/ui/button.tsx";
import { Link } from "@tanstack/react-router";

export const GameOptionsButtons = () => (
  <div className="space-y-4 sm:space-y-6">
    <Link to="/game">
      <Button className="h-12 w-full border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] hover:bg-[#4a4a4a] sm:h-14 sm:text-xl">
        CREATE A GAME
      </Button>
    </Link>
    <Button className="h-12 w-full border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] hover:bg-[#4a4a4a] sm:h-14 sm:text-xl">
      PLAY WITH A FRIEND
    </Button>
    <Button className="h-12 w-full border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] hover:bg-[#4a4a4a] sm:h-14 sm:text-xl">
      PLAY WITH AI
    </Button>
  </div>
);
