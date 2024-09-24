import { Meta, StoryFn } from "@storybook/react";
import { TimeControls } from "./TimeControls.tsx";

export default {
  title: "Components/TimeControls",
  component: TimeControls,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof TimeControls>;

const Template: StoryFn<typeof TimeControls> = () => <TimeControls />;

export const Default = Template.bind({});

Default.args = {};
