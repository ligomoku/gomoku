import { Meta, StoryFn } from "@storybook/react";
import { OnlinePlayersInfo } from "./OnlinePlayersInfo";

export default {
  title: "Components/OnlinePlayersInfo",
  component: OnlinePlayersInfo,
} as Meta<typeof OnlinePlayersInfo>;

const Template: StoryFn<typeof OnlinePlayersInfo> = () => <OnlinePlayersInfo />;

export const Default = Template.bind({});

Default.args = {};
