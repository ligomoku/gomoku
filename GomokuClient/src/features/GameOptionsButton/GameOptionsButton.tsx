import { Button } from "@/shared/ui/button.tsx";

export const GameOptionsButtons = () => (
  <div className="space-y-4 sm:space-y-6">
    <Button className="h-12 w-full border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] hover:bg-[#4a4a4a] sm:h-14 sm:text-xl">
      CREATE A GAME
    </Button>
    <Button className="h-12 w-full border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] hover:bg-[#4a4a4a] sm:h-14 sm:text-xl">
      PLAY WITH A FRIEND
    </Button>
    <Button className="h-12 w-full border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] hover:bg-[#4a4a4a] sm:h-14 sm:text-xl">
      PLAY WITH AI
    </Button>
  </div>
);
