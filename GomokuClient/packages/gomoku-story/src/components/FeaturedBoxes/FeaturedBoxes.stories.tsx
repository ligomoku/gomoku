import { FeaturedBoxes } from "./FeaturedBoxes";

import type { Meta, StoryObj } from "@storybook/react";

import { toaster } from "@/ui";

type MockSwaggerTypes = {
  GetAvailableGamesResponse: {
    gameId: string;
    opponent?: {
      userName: string;
      playerId: string;
    };
  };
};

const meta: Meta<typeof FeaturedBoxes> = {
  title: "Components/FeaturedBoxes",
  component: FeaturedBoxes,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A grid of game boxes displaying available games and their opponents.",
      },
    },
  },
  argTypes: {
    games: {
      control: { type: "object" },
      description: "Array of available games",
    },
    onGameClick: {
      description: "Callback function when a game is clicked",
    },
    noGamesText: {
      control: { type: "text" },
      description: "Text to display when no games are available",
    },
    onGameClickLoading: {
      control: { type: "boolean" },
      description: "Loading state for game click action",
    },
  },
} satisfies Meta<typeof FeaturedBoxes>;

export default meta;
type Story = StoryObj<typeof FeaturedBoxes>;

const mockedGames: MockSwaggerTypes["GetAvailableGamesResponse"][] = [
  {
    gameId: "game_123456789",
    opponent: {
      userName: "GrandMaster",
      playerId: "player_123",
    },
  },
  {
    gameId: "game_987654321",
    opponent: {
      userName: "ChessWhiz",
      playerId: "player_456",
    },
  },
  {
    gameId: "game_456789123",
    opponent: {
      userName: "StrategistPro",
      playerId: "player_789",
    },
  },
  {
    gameId: "game_321654987",
    opponent: {
      userName: "TacticalPlayer",
      playerId: "player_012",
    },
  },
];

export const Default: Story = {
  args: {
    games: mockedGames,
    onGameClick: (game) => toaster.show(`Selected game: ${game.gameId}`),
    noGamesText: "No games available",
    onGameClickLoading: false,
  },
};

export const NoGames: Story = {
  args: {
    games: [],
    onGameClick: (game) => toaster.show(`Selected game: ${game.gameId}`),
    noGamesText: "No available games. Create a new game or wait for opponents.",
    onGameClickLoading: false,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    onGameClickLoading: true,
  },
};

export const SingleGame: Story = {
  args: {
    games: [mockedGames[0]],
    onGameClick: (game) => toaster.show(`Selected game: ${game.gameId}`),
    noGamesText: "No games available",
    onGameClickLoading: false,
  },
};

export const GamesWithoutOpponents: Story = {
  args: {
    games: [
      { gameId: "game_111222333" },
      { gameId: "game_444555666" },
      { gameId: "game_777888999" },
    ],
    onGameClick: (game) => toaster.show(`Selected game: ${game.gameId}`),
    noGamesText: "No games available",
    onGameClickLoading: false,
  },
};

export const ManyGames: Story = {
  args: {
    games: Array.from({ length: 12 }, (_, index) => ({
      gameId: `game_${index + 1}`,
      opponent: {
        userName: `Player${index + 1}`,
        playerId: `player_${index + 1}`,
      },
    })),
    onGameClick: (game) => toaster.show(`Selected game: ${game.gameId}`),
    noGamesText: "No games available",
    onGameClickLoading: false,
  },
};

export const MobileView: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const LoadingSimulation: Story = {
  args: {
    ...Default.args,
    onGameClick: async (game) => {
      toaster.show(`Loading game: ${game.gameId}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toaster.show(`Loaded game: ${game.gameId}`);
    },
  },
};

export const CustomThemed: Story = {
  args: {
    games: mockedGames.map((game) => ({
      ...game,
      opponent: {
        ...game.opponent,
        userName: `★ ${game.opponent?.userName}`,
      },
    })) as typeof mockedGames,
    onGameClick: (game) => toaster.show(`Selected game: ${game.gameId}`),
    noGamesText: "No games available",
    onGameClickLoading: false,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};
