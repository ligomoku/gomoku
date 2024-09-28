import { Card, CardContent } from "@/shared/ui/card";

// const timeControls: TimeControlOption[] = [
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

export const TimeControls = () => (
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
          <p className="text-sm text-[#999999] sm:text-xl">{game.type}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);
