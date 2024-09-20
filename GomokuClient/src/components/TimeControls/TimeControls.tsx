import { Card, CardContent } from "@/components/ui/card.tsx";
import { Link } from "@tanstack/react-router";

interface TimeControlOption {
  time: string;
  type: string;
}

const timeControls: TimeControlOption[] = [
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

export const TimeControls = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Quick Pairing</h1>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {timeControls.map((control, index) => (
        <Card
          key={index}
          className="bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <CardContent className="p-4 text-center">
            <Link to={`/game`} className="text-2xl font-bold text-white">
              <h2 className="text-2xl font-bold text-white">{control.time}</h2>
              <p className="text-gray-400">{control.type}</p>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
