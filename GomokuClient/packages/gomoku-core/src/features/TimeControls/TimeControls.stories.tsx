import { Meta, StoryFn } from "@storybook/react";
import { TimeControls, TimeControlsProps } from "./TimeControls";
import { gameTypes } from "@/pages/HomeGame";

export default {
  title: "Components/TimeControls",
  component: TimeControls,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof TimeControls>;

const Template: StoryFn<TimeControlsProps> = (args) => (
  <TimeControls {...args} />
);

export const Default = Template.bind({});
Default.args = { gameTypes };
