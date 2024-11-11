import { GameTime } from "./GameTime";

import type { Meta } from "@storybook/react";


import { toaster } from "@/shared/ui/toaster";

export default {
  title: "Components/GameTime",
  component: GameTime,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof GameTime>;

export const Default = () => (
  <GameTime
    moves={[]}
    players={{
      black: { playerId: "1", color: "black", userName: "black player" },
      white: { playerId: "2", color: "white", userName: "white player" },
    }}
    onUndo={() => alert("Undo clicked")}
    onSkip={(direction) => alert(`Skip ${direction} clicked`)}
    onFlag={() => alert("Flag clicked")}
    onReset={() => alert("Reset clicked")}
    onRematch={() => alert("Rematch clicked")}
    clock={{
      black: 1000,
      white: 1000,
    }}
  />
);

export const WithMoves = () => (
  <GameTime
    moves={["x1 - y2", "x3 - y4", "x5 - y6", "x7 - y8", "x9 - y10"]}
    players={{
      black: { playerId: "1", color: "black", userName: "black player" },
      white: { playerId: "2", color: "white", userName: "white player" },
    }}
    onUndo={() => toaster.show("Undo clicked")}
    onSkip={(direction) => toaster.show(`Skip ${direction} clicked`)}
    onFlag={() => toaster.show("Flag clicked")}
    onReset={() => toaster.show("Reset clicked")}
    onRematch={() => toaster.show("Rematch clicked")}
    clock={{
      black: 1000,
      white: 1000,
    }}
  />
);
