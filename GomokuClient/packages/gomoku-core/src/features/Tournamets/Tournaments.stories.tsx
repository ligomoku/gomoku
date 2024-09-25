import { Meta, StoryFn } from "@storybook/react";
import { Tournaments } from "./Tournaments.tsx";

export default {
  title: "Components/Tournaments",
  component: Tournaments,
} as Meta<typeof Tournaments>;

const Template: StoryFn<typeof Tournaments> = () => <Tournaments />;

export const Default = Template.bind({});

Default.args = {};
