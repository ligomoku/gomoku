import { Tournaments } from "@/components/Tournamets";
import { TimeControls } from "@/components/TimeControls";
import { FeaturedBoxes } from "@/components/FeaturedBoxes";
import { GameOptionsButtons } from "@/components/GameOptionsButton";
import { OnlinePlayersInfo } from "@/components/OnlinePlayersInfo";

export const Home = () => (
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
          <GameOptionsButtons />
          <OnlinePlayersInfo />
        </div>
      </div>
      <FeaturedBoxes />
    </main>
  </div>
);
