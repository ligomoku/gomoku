import { Meta } from "@storybook/react";
import { GameOptionsButtons } from "./GameOptionsButton";

export default {
  title: "Components/GameOptionsButton",
  component: GameOptionsButtons,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof GameOptionsButtons>;

export const Default = () => (
  <GameOptionsButtons
    onCreateGameClick={() => alert("Create Game Clicked")}
    onPlayWithFriendClick={() => alert("Play with Friend Clicked")}
    onPlayWithAIClick={() => alert("Play with AI Clicked")}
  />
);

Default.args = {};
