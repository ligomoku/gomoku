import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Users, Zap } from "lucide-react";

const timeControls = [
  { time: "1+0", type: "Bullet" },
  { time: "2+1", type: "Bullet" },
  { time: "3+0", type: "Blitz" },
  { time: "3+2", type: "Blitz" },
  { time: "5+0", type: "Blitz" },
  { time: "5+3", type: "Blitz" },
  { time: "10+0", type: "Rapid" },
  { time: "10+5", type: "Rapid" },
  { time: "15+10", type: "Rapid" },
  { time: "30+0", type: "Classical" },
  { time: "30+20", type: "Classical" },
  { time: "Custom", type: "" },
];

export function GomokuHomepage() {
  return (
    <div className="min-h-screen bg-[#161512] text-[#bababa] pt-3 flex">
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <Card className="bg-[#2b2b2b] mb-4 border-[#2b2b2b]">
              <CardContent>
                <h2 className="font-bold mb-2 text-[#bababa] pt-4">
                  Tournaments
                </h2>
                <ul className="space-y-2 text-[#bababa]">
                  <li className="flex items-center">
                    <ShieldCheck className="mr-2 text-[#bababa]" />
                    <span>Atomic Shield Arena</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="mr-2 text-[#bababa]" />
                    <span>Weekly Classical Arena</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="mr-2 text-[#bababa]" />
                    <span>Weekly AntiGomoku Arena</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <p className="text-sm">
              Gomoku is a free (really), libre, no-ads, open source gomoku
              server.
            </p>
          </div>
          <div className="col-span-6">
            <h2 className="text-xl font-bold mb-4 text-[#bababa]">
              Quick pairing
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {timeControls.map((control, index) => (
                <Card
                  key={index}
                  className="bg-[#2b2b2b] hover:bg-[#3e3e3e] transition-colors cursor-pointer border-[#2b2b2b]"
                >
                  <CardContent className="p-4 text-center">
                    <h3 className="text-2xl font-bold text-[#bababa]">
                      {control.time}
                    </h3>
                    <p className="text-[#999999]">{control.type}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="col-span-3">
            <div className="space-y-4">
              <Button className="w-full bg-[#3e3e3e] hover:bg-[#4a4a4a] text-[#bababa] border-[#3e3e3e]">
                CREATE A GAME
              </Button>
              <Button className="w-full bg-[#3e3e3e] hover:bg-[#4a4a4a] text-[#bababa] border-[#3e3e3e]">
                PLAY WITH A FRIEND
              </Button>
              <Button className="w-full bg-[#3e3e3e] hover:bg-[#4a4a4a] text-[#bababa] border-[#3e3e3e]">
                PLAY WITH THE COMPUTER
              </Button>
            </div>
            <div className="mt-4 text-center">
              <p>78,047 players</p>
              <p>33,694 games in play</p>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-[#2b2b2b] border-[#2b2b2b]">
              <CardContent>
                <div className="aspect-w-1 aspect-h-1 bg-[#3e3e3e] mb-2"></div>
                <h3 className="font-bold text-[#bababa]">
                  Featured Content {i}
                </h3>
                <p className="text-sm text-[#999999]">
                  Description of featured content...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
