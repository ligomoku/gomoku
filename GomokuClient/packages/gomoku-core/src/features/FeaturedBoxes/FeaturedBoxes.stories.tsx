import { Meta, StoryFn } from "@storybook/react";
import { FeaturedBoxes } from "./FeaturedBoxes";
import { GetAvailableGamesResponse } from "@/api/client";

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

const Template: StoryFn<typeof FeaturedBoxes> = () => (
  <FeaturedBoxes
    games={mockedGames}
    onGameClick={() => alert("Game Clicked")}
  />
);

export const Default = Template.bind({});

Default.args = {};
