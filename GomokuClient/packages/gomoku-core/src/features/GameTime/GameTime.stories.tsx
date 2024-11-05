import { Meta } from "@storybook/react";
import { GameTime } from "./GameTime";
import { notification } from "@/shared/ui/notification";

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
    activePlayer="black"
    players={{
      black: { playerId: "1", color: "black", userName: "black player" },
      white: { playerId: "2", color: "white", userName: "white player" },
    }}
    onUndo={() => alert("Undo clicked")}
    onSkip={(direction) => alert(`Skip ${direction} clicked`)}
    onFlag={() => alert("Flag clicked")}
    onReset={() => alert("Reset clicked")}
    onRematch={() => alert("Rematch clicked")}
    blackTimeLeft={1000}
    whiteTimeLeft={1000}
  />
);

export const WithMoves = () => (
  <GameTime
    moves={["x1 - y2", "x3 - y4", "x5 - y6", "x7 - y8", "x9 - y10"]}
    activePlayer="black"
    players={{
      black: { playerId: "1", color: "black", userName: "black player" },
      white: { playerId: "2", color: "white", userName: "white player" },
    }}
    onUndo={() => notification.show("Undo clicked")}
    onSkip={(direction) => notification.show(`Skip ${direction} clicked`)}
    onFlag={() => notification.show("Flag clicked")}
    onReset={() => notification.show("Reset clicked")}
    onRematch={() => notification.show("Rematch clicked")}
    blackTimeLeft={1000}
    whiteTimeLeft={1000}
  />
);
