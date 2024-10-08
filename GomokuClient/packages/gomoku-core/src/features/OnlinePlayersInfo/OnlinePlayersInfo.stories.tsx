import { Meta, StoryFn } from "@storybook/react";
import { OnlinePlayersInfo, OnlinePlayersInfoProps } from "./OnlinePlayersInfo";

export default {
  title: "Components/OnlinePlayersInfo",
  component: OnlinePlayersInfo,
} as Meta<typeof OnlinePlayersInfo>;

const Template: StoryFn<OnlinePlayersInfoProps> = (args) => (
  <OnlinePlayersInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  playersOnlineText: "5,247 players online",
  gamesInPlayText: "1,892 games in play",
};
