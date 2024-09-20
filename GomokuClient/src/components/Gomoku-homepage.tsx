import { Button } from "@/components/ui/button";
import { Tournaments } from "@/components/Tournamets";
import { TimeControls } from "./TimeControls";
import { FeaturedBoxes } from "@/components/FeaturedBoxes";

export const GomokuHomepage = () => (
  <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
    <main className="container mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Tournaments />
          <p className="text-base sm:text-lg">
            Gomoku.org is a free, open-source Five in a Row game platform.
          </p>
        </div>
        <div className="lg:col-span-6">
          <h2 className="mb-6 text-2xl font-bold text-[#bababa] sm:text-3xl">
            Quick pairing
          </h2>
          <TimeControls />
        </div>
        <div className="lg:col-span-3">
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
          <div className="mt-6 text-center">
            <p className="text-base sm:text-xl">5,247 players online</p>
            <p className="text-base sm:text-xl">1,892 games in play</p>
          </div>
        </div>
      </div>
      <FeaturedBoxes />
    </main>
  </div>
);
