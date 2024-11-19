import type { Meta } from "@storybook/react";

import { GameTimeMobile } from "@/features";
import { toaster } from "@/ui";

export default {
  title: "Components/GameTime/Mobile",
  component: GameTimeMobile,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof GameTimeMobile>;

export const Default = () => (
  <GameTimeMobile
    moves={[]}
    player={{ playerId: "1", userName: "Player 1", color: "#7cb342" }}
    timeLeft={1000}
    onUndo={() => alert("Undo clicked")}
    onSkip={(direction) => alert(`Skip ${direction} clicked`)}
    onFlag={() => alert("Flag clicked")}
    onReset={() => alert("Reset clicked")}
    onRematch={() => alert("Rematch clicked")}
  />
);

export const WithMoves = () => (
  <GameTimeMobile
    moves={["x1 - y2", "x3 - y4", "x5 - y6", "x7 - y8", "x9 - y10"]}
    player={{ playerId: "1", userName: "Player 1", color: "#b0b0b0" }}
    timeLeft={1000}
    onUndo={() => toaster.show("Undo clicked")}
    onSkip={(direction) => toaster.show(`Skip ${direction} clicked`)}
    onFlag={() => toaster.show("Flag clicked")}
    onReset={() => toaster.show("Reset clicked")}
    onRematch={() => toaster.show("Rematch clicked")}
  />
);
