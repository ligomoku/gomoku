import { Meta } from "@storybook/react";
import { GameTimeMobile } from "./GameTimeMobile";
import { notification } from "@/shared/ui/notification";

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
    currentPlayer="black"
    players={[
      { name: "Player 1", color: "#7cb342" },
      { name: "Player 2", color: "#b0b0b0" },
    ]}
    clockTime="01:00"
    onAddMove={() => alert("Add move clicked")}
    onUndo={() => alert("Undo clicked")}
    onSkip={(direction) => alert(`Skip ${direction} clicked`)}
    onFlag={() => alert("Flag clicked")}
    onReset={() => alert("Reset clicked")}
  />
);

export const WithMoves = () => (
  <GameTimeMobile
    moves={["x1 - y2", "x3 - y4", "x5 - y6", "x7 - y8", "x9 - y10"]}
    currentPlayer="black"
    players={[
      { name: "Player 1", color: "#7cb342" },
      { name: "Player 2", color: "#b0b0b0" },
    ]}
    clockTime="01:00"
    onAddMove={() => notification.show("Add move clicked")}
    onUndo={() => notification.show("Undo clicked")}
    onSkip={(direction) => notification.show(`Skip ${direction} clicked`)}
    onFlag={() => notification.show("Flag clicked")}
    onReset={() => notification.show("Reset clicked")}
  />
);
