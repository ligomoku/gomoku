import { Card, CardContent } from "@/shared/ui/card";
import { t } from "@lingui/macro";

const gameTypes = [
  { time: "5+0", type: t`Blitz` },
  { time: "10+0", type: t`Quick` },
  { time: "15+5", type: t`Standard` },
  { time: "30+0", type: t`Long` },
  { time: "1 day", type: t`Correspondence` },
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
