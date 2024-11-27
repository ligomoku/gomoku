import { GamePlayersInfo } from "./GamePlayersInfo";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GamePlayersInfo> = {
  title: "Components/GamePlayersInfo",
  component: GamePlayersInfo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays game information and player details for a Gomoku match.",
      },
    },
  },
  argTypes: {
    gameType: {
      control: "select",
      options: ["19x19", "15x15", "13x13", "Quick Game", "Tournament"],
      description: "Type/format of the Gomoku game",
    },
    players: {
      control: "object",
      description: "Array of player information",
    },
  },
} satisfies Meta<typeof GamePlayersInfo>;

export default meta;
type Story = StoryObj<typeof GamePlayersInfo>;

export const Default: Story = {
  args: {
    gameType: "19x19",
    players: [
      {
        title: "Pro",
        name: "BlackStone",
        rating: 1850,
        isCurrentPlayer: true,
        color: "#7cb342",
      },
      {
        title: "",
        name: "WhiteStone",
        rating: 1756,
        isCurrentPlayer: false,
        color: "#b0b0b0",
      },
    ],
  },
};

export const QuickGame: Story = {
  args: {
    gameType: "Quick Game",
    players: [
      {
        title: "",
        name: "Player1",
        rating: 1523,
        isCurrentPlayer: true,
        color: "#7cb342",
      },
      {
        title: "",
        name: "Player2",
        rating: 1489,
        isCurrentPlayer: false,
        color: "#b0b0b0",
      },
    ],
  },
};

export const TournamentMatch: Story = {
  args: {
    gameType: "Tournament",
    players: [
      {
        title: "Master",
        name: "GomokuPro",
        rating: 2100,
        isCurrentPlayer: true,
        color: "#7cb342",
      },
      {
        title: "Master",
        name: "StoneExpert",
        rating: 2089,
        isCurrentPlayer: false,
        color: "#b0b0b0",
      },
    ],
  },
};

export const WaitingForOpponent: Story = {
  args: {
    gameType: "15x15",
    players: [
      {
        title: "",
        name: "WaitingPlayer",
        rating: 1645,
        isCurrentPlayer: true,
        color: "#7cb342",
      },
    ],
  },
};

export const SmallBoard: Story = {
  args: {
    gameType: "13x13",
    players: [
      {
        title: "",
        name: "player123",
        rating: 1432,
        isCurrentPlayer: true,
        color: "#7cb342",
      },
      {
        title: "",
        name: "opponent456",
        rating: 1445,
        isCurrentPlayer: false,
        color: "#b0b0b0",
      },
    ],
  },
};

export const HighRatedMatch: Story = {
  args: {
    gameType: "19x19",
    players: [
      {
        title: "Expert",
        name: "GomokuMaster",
        rating: 2300,
        isCurrentPlayer: true,
        color: "#7cb342",
      },
      {
        title: "Expert",
        name: "StoneWizard",
        rating: 2275,
        isCurrentPlayer: false,
        color: "#b0b0b0",
      },
    ],
  },
};

export const NewPlayers: Story = {
  args: {
    gameType: "15x15",
    players: [
      {
        title: "",
        name: "NewPlayer1",
        rating: 1000,
        isCurrentPlayer: true,
        color: "#7cb342",
      },
      {
        title: "",
        name: "NewPlayer2",
        rating: 1050,
        isCurrentPlayer: false,
        color: "#b0b0b0",
      },
    ],
  },
};

export const LongUsernames: Story = {
  args: {
    gameType: "19x19",
    players: [
      {
        title: "",
        name: "VeryLongGomokuUsername123",
        rating: 1678,
        isCurrentPlayer: true,
        color: "#7cb342",
      },
      {
        title: "",
        name: "AnotherLongUsername456",
        rating: 1702,
        isCurrentPlayer: false,
        color: "#b0b0b0",
      },
    ],
  },
};

export const NoRating: Story = {
  args: {
    gameType: "19x19",
    players: [
      {
        title: "",
        name: "NoRatingPlayer",
        isCurrentPlayer: true,
        color: "#7cb342",
      },
      {
        title: "",
        name: "NoRatingOpponent",
        isCurrentPlayer: false,
        color: "#b0b0b0",
      },
    ],
  },
};
