import { Meta, StoryFn } from "@storybook/react";
import { FeaturedBoxes } from "./FeaturedBoxes.tsx";

export default {
  title: "Components/FeaturedBoxes",
  component: FeaturedBoxes,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof FeaturedBoxes>;

const Template: StoryFn<typeof FeaturedBoxes> = () => <FeaturedBoxes />;

export const Default = Template.bind({});

Default.args = {};
