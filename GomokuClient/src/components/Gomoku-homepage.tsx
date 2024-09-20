import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Zap } from "lucide-react";

// const timeControls = [
//   { time: "1+0", type: "Bullet" },
//   { time: "2+1", type: "Bullet" },
//   { time: "3+0", type: "Blitz" },
//   { time: "3+2", type: "Blitz" },
//   { time: "5+0", type: "Blitz" },
//   { time: "5+3", type: "Blitz" },
//   { time: "10+0", type: "Rapid" },
//   { time: "10+5", type: "Rapid" },
//   { time: "15+10", type: "Rapid" },
//   { time: "30+0", type: "Classical" },
//   { time: "30+20", type: "Classical" },
//   { time: "Custom", type: "" },
// ];

const gameTypes = [
  { time: "5+0", type: "Blitz" },
  { time: "10+0", type: "Quick" },
  { time: "15+5", type: "Standard" },
  { time: "30+0", type: "Long" },
  { time: "1 day", type: "Correspondence" },
  { time: "Custom", type: "" },
];

export function GomokuHomepage() {
  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      <main className="container mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Card className="mb-6 border-[#2b2b2b] bg-[#2b2b2b]">
              <CardContent className="p-4 sm:p-6">
                <h2 className="mb-4 text-xl font-bold text-[#bababa] sm:text-2xl">
                  Tournaments
                </h2>
                <ul className="space-y-4 text-[#bababa]">
                  <li className="flex items-center">
                    <Trophy className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />
                    <span className="text-base sm:text-xl">
                      Daily Gomoku Challenge
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Users className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />
                    <span className="text-base sm:text-xl">
                      Weekly Open Tournament
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />
                    <span className="text-base sm:text-xl">Blitz Bonanza</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <p className="text-base sm:text-lg">
              Gomoku.org is a free, open-source Five in a Row game platform.
            </p>
          </div>
          <div className="lg:col-span-6">
            <h2 className="mb-6 text-2xl font-bold text-[#bababa] sm:text-3xl">
              Quick pairing
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {gameTypes.map((game, index) => (
                <Card
                  key={index}
                  className="cursor-pointer border-[#2b2b2b] bg-[#2b2b2b] transition-colors hover:bg-[#3e3e3e]"
                >
                  <CardContent className="p-4 text-center sm:p-6">
                    <h3 className="text-xl font-bold text-[#bababa] sm:text-3xl">
                      {game.time}
                    </h3>
                    <p className="text-sm text-[#999999] sm:text-xl">
                      {game.type}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
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
        <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-[#2b2b2b] bg-[#2b2b2b]">
              <CardContent className="p-4 sm:p-6">
                <div className="aspect-w-16 aspect-h-9 mb-4 bg-[#3e3e3e]"></div>
                <h3 className="text-xl font-bold text-[#bababa] sm:text-2xl">
                  Featured Content {i}
                </h3>
                <p className="text-base text-[#999999] sm:text-lg">
                  Description of featured Gomoku content...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
