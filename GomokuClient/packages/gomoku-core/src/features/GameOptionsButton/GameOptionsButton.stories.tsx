import { Meta } from "@storybook/react";
import {
  GameOptionsButtons,
  GameOptionsButtonsProps,
} from "./GameOptionsButton";

export default {
  title: "Components/GameOptionsButton",
  component: GameOptionsButtons,
  parameters: {
    layout: "centered",
  },
} as Meta<GameOptionsButtonsProps>;

export const Default = (args: GameOptionsButtonsProps) => (
  <GameOptionsButtons
    onCreateGameClick={() => alert("Create Game Clicked")}
    onPlayWithFriendClick={() => alert("Play with Friend Clicked")}
    onPlayWithAIClick={() => alert("Play with AI Clicked")}
    {...args}
  />
);

Default.args = {
  createGameText: "CREATE A GAME",
  playWithFriendText: "PLAY WITH A FRIEND",
  playWithAIText: "PLAY WITH AI",
  onCreateGameClick: () => alert("Create a Game clicked!"),
  onPlayWithFriendClick: () => alert("Play with a Friend clicked!"),
  onPlayWithAIClick: () => alert("Play with AI clicked!"),
};
