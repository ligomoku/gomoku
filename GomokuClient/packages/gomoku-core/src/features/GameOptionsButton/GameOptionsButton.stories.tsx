import { Meta } from "@storybook/react";
import {
  GameOptionsButtons,
  GameOptionsButtonsProps,
} from "./GameOptionsButton";
import { notification } from "@/shared/ui/notification";

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
  onCreateGameClick: () => notification.show("Create a Game clicked!"),
  onPlayWithFriendClick: () => notification.show("Play with a Friend clicked!"),
  onPlayWithAIClick: () => notification.show("Play with AI clicked!"),
};
