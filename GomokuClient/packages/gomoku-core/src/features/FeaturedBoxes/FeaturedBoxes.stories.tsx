import { Meta, StoryFn } from "@storybook/react";
import { GetAvailableGamesResponse } from "@/api/client";
import { FeaturedBoxes } from "./FeaturedBoxes";
import type { FeaturedBoxesProps } from "./FeaturedBoxes";

export default {
  title: "Components/FeaturedBoxes",
  component: FeaturedBoxes,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof FeaturedBoxes>;

const mockedGames: GetAvailableGamesResponse[] = [
  {
    gameId: "123",
    opponent: {
      userName: "Player1",
      playerId: "Player1Id",
    },
  },
  {
    gameId: "456",
    opponent: {
      userName: "Player2",
      playerId: "Player2Id",
    },
  },
];

const Template: StoryFn<FeaturedBoxesProps> = () => (
  <FeaturedBoxes
    games={mockedGames}
    onGameClick={() => alert("Game Clicked")}
  />
);

export const Default = Template.bind({});

Default.args = {};
