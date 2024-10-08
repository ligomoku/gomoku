import { Meta, StoryFn } from "@storybook/react";
import { TimeControls, TimeControlsProps } from "./TimeControls";

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
Default.args = {
  gameTypes: [
    { time: "5+0", type: "Blitz" },
    { time: "10+0", type: "Quick" },
    { time: "15+5", type: "Standard" },
    { time: "30+0", type: "Long" },
    { time: "1 day", type: "Correspondence" },
    { time: "Custom", type: "" },
  ],
};

Default.args = {};
