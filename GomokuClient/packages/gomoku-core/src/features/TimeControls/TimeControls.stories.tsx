import { TimeControls } from "./TimeControls";

import type { TimeControlsProps } from "./TimeControls";
import type { Meta, StoryFn } from "@storybook/react";


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
