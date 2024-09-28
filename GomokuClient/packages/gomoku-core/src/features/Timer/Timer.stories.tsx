import { Meta, StoryFn } from "@storybook/react";
import { Timer } from "./Timer";

export default {
  title: "Components/Timer",
  component: Timer,
} as Meta<typeof Timer>;

const Template: StoryFn<typeof Timer> = () => <Timer />;

export const Default = Template.bind({});

Default.args = {};
