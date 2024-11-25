import { GameTime } from "./GameTime";

import type { Meta, StoryObj } from "@storybook/react";

import { toaster } from "@/ui";

const meta: Meta<typeof GameTime> = {
  title: "Components/GameTime",
  component: GameTime,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A game timer component showing player information, moves history, and game controls",
      },
    },
  },
  argTypes: {
    moves: {
      control: "object",
      description: "Array of game moves",
    },
    clock: {
      control: "object",
      description: "Time remaining for each player",
    },
    players: {
      control: "object",
      description: "Player information for black and white",
    },
  },
} satisfies Meta<typeof GameTime>;

export default meta;
type Story = StoryObj<typeof GameTime>;

const defaultProps = {
  onUndo: () => toaster.show("Undo clicked"),
  onSkip: (direction: "back" | "forward") =>
    toaster.show(`Skip ${direction} clicked`),
  onFlag: () => toaster.show("Flag clicked"),
  onReset: () => toaster.show("Reset clicked"),
  onRematch: () => toaster.show("Rematch clicked"),
};

export const Default: Story = {
  args: {
    ...defaultProps,
    moves: [],
    players: {
      black: {
        playerId: "1",
        color: "black",
        userName: "Gomoku Fan",
      },
      white: {
        playerId: "2",
        color: "white",
        userName: "Gomoku Master",
      },
    },
    clock: {
      black: 300, // 5 minutes
      white: 300,
    },
  },
};

export const GameInProgress: Story = {
  args: {
    ...defaultProps,
    moves: ["x6-y8", "x7-y9", "x8-y10", "x9-y11", "x10-y12", "x11-y13"],
    players: {
      black: {
        playerId: "1",
        color: "black",
        userName: "Gomoku Master",
      },
      white: {
        playerId: "2",
        color: "white",
        userName: "Gomku Fan",
      },
    },
    clock: {
      black: 240,
      white: 180,
    },
  },
};

export const ManyMoves: Story = {
  args: {
    ...defaultProps,
    moves: Array.from({ length: 20 }, (_, i) => `Move ${i + 1}`),
    players: Default.args!.players,
    clock: Default.args!.clock,
  },
};

export const LowTime: Story = {
  args: {
    ...defaultProps,
    moves: ["x1-y2", "x2-y3", "x3-y4", "x4-y5", "x5-y6", "x6-y7", "x7-y8"],
    players: Default.args!.players,
    clock: {
      black: 30, // 30 seconds
      white: 10, // 10 seconds
    },
  },
};

export const WaitingForOpponent: Story = {
  args: {
    ...defaultProps,
    moves: [],
    players: {
      black: undefined,
      white: undefined,
    },
    clock: undefined,
  },
};

export const SinglePlayerJoined: Story = {
  args: {
    ...defaultProps,
    moves: [],
    players: {
      black: {
        playerId: "1",
        color: "black",
        userName: "Magnus Carlsen",
      },
      white: undefined,
    },
    clock: undefined,
  },
};

export const LongPlayerNames: Story = {
  args: {
    ...defaultProps,
    moves: ["x1-y2", "x2-y3", "x3-y4", "x4-y5", "x5-y6", "x6-y7", "x7-y8"],
    players: {
      black: {
        playerId: "1",
        color: "black",
        userName: "Very Long Player Name That Might Break Layout",
      },
      white: {
        playerId: "2",
        color: "white",
        userName: "Another Very Long Player Name That Might Break Layout",
      },
    },
    clock: Default.args!.clock,
  },
};

export const NoClockGame: Story = {
  args: {
    ...defaultProps,
    moves: ["x1-y2", "x2-y3", "x3-y4", "x4-y5", "x5-y6", "x6-y7", "x7-y8"],
    players: Default.args!.players,
    clock: undefined,
  },
};

export const ZeroTime: Story = {
  args: {
    ...defaultProps,
    moves: ["x4-y5", "x5-y6", "x6-y7", "x7-y8", "x8-y9", "x9-y10"],
    players: Default.args!.players,
    clock: {
      black: 0,
      white: 0,
    },
  },
};
