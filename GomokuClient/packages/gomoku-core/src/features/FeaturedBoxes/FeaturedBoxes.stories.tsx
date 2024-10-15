import { Meta, StoryFn } from "@storybook/react";
import { FeaturedBoxes } from "./FeaturedBoxes";
import type { FeaturedBoxesProps } from "./FeaturedBoxes";
import { SwaggerTypes } from "@/api";
import { notification } from "@/shared/ui/notification";

export default {
  title: "Components/FeaturedBoxes",
  component: FeaturedBoxes,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof FeaturedBoxes>;

const mockedGames: SwaggerTypes.GetAvailableGamesResponse[] = [
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

const Template: StoryFn<FeaturedBoxesProps> = (args) => (
  <FeaturedBoxes {...args} />
);

export const Default = Template.bind({});

Default.args = {
  games: mockedGames,
  onGameClick: (game) => notification.show(`Game clicked: ${game.gameId}`),
  noGamesText: "No games available",
};

export const NoGames = Template.bind({});
NoGames.args = {
  games: [],
  onGameClick: (game) => notification.show(`Game clicked: ${game.gameId}`),
  noGamesText: "No games available",
};
