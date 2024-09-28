import { Card, CardContent } from "@/shared/ui/card";
import { Trophy, Users, Zap } from "lucide-react";

export const Tournaments = () => {
  return (
    <Card className="mb-6 border-[#2b2b2b] bg-[#2b2b2b]">
      <CardContent className="p-4 sm:p-6">
        <h2 className="mb-4 text-xl font-bold text-[#bababa] sm:text-2xl">
          Tournaments
        </h2>
        <ul className="space-y-4 text-[#bababa]">
          <li className="flex items-center">
            <Trophy className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />
            <span className="text-base sm:text-xl">Daily Gomoku Challenge</span>
          </li>
          <li className="flex items-center">
            <Users className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />
            <span className="text-base sm:text-xl">Weekly Open Tournament</span>
          </li>
          <li className="flex items-center">
            <Zap className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />
            <span className="text-base sm:text-xl">Blitz Bonanza</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

Tournaments.displayName = "Tournaments";
