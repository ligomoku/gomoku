import { OnlinePlayersInfo } from "./OnlinePlayersInfo";

import type { OnlinePlayersInfoProps } from "./OnlinePlayersInfo";
import type { Meta, StoryFn } from "@storybook/react";


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
