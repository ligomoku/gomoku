import { Meta, StoryFn } from "@storybook/react";
import { GameOptionsButtons } from "./GameOptionsButton";

export default {
  title: "Components/GameOptionsButton",
  component: GameOptionsButtons,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof GameOptionsButtons>;

const Template: StoryFn<typeof GameOptionsButtons> = () => (
  <GameOptionsButtons />
);

export const Default = Template.bind({});

Default.args = {};
