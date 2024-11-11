import { GameOptionsButtons } from "./GameOptionsButton";

import type { GameOptionsButtonsProps } from "./GameOptionsButton";
import type { Meta } from "@storybook/react";

import { toaster } from "@/shared/ui/toaster";

export default {
  title: "Components/GameOptionsButton",
  component: GameOptionsButtons,
  parameters: {
    layout: "centered",
  },
} as Meta<GameOptionsButtonsProps>;

export const Default = (args: GameOptionsButtonsProps) => (
  <GameOptionsButtons {...args} />
);

Default.args = {
  createGameText: "CREATE A GAME",
  playWithFriendText: "PLAY WITH A FRIEND",
  playWithAIText: "PLAY WITH AI",
  onCreateGameClick: () => toaster.show("Create a Game clicked!"),
  onPlayWithFriendClick: () => toaster.show("Play with a Friend clicked!"),
  onPlayWithAIClick: () => toaster.show("Play with AI clicked!"),
};
