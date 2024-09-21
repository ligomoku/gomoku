import { Meta, StoryFn } from "@storybook/react";
import { Chat } from "./Chat";

export default {
  title: "Components/Chat",
  component: Chat,
} as Meta<typeof Chat>;

const Template: StoryFn<typeof Chat> = () => <Chat />;

export const Default = Template.bind({});

Default.args = {};
