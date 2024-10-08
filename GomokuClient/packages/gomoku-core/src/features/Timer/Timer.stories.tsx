import { Meta, StoryFn } from "@storybook/react";
import { Timer, TimerProps } from "./Timer";

export default {
  title: "Components/Timer",
  component: Timer,
} as Meta<typeof Timer>;

const Template: StoryFn<TimerProps> = (args) => <Timer {...args} />;

export const Default = Template.bind({});
Default.args = {
  timerLabel: "Timer",
  startLabel: "Start",
  stopLabel: "Stop",
  resetLabel: "Reset",
  playAgainLabel: "Play again",
};
