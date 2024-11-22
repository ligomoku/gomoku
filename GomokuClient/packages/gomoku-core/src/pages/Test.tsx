import { FeaturedBoxes } from "@gomoku/story";
import { Users } from "lucide-react";

const mockedProps = {
  games: [
    {
      gameId: "123",
      title: "Game 1",
      icon: <Users className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />,
    },
    {
      gameId: "456",
      title: "Game 2",
      icon: <Users className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />,
    },
    {
      gameId: "789",
      title: "Game 3",
      icon: <Users className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />,
    },
    {
      gameId: "101112",
      title: "Game 4",
      icon: <Users className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />,
    },
  ],
  onGameClick: () => console.debug("Game clicked"),
  noGamesText: "No online games were created",
};

export const Test = () => {
  return <FeaturedBoxes {...mockedProps} />;
};
