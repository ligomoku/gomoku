import { PlayerList } from "./PlayerList";

import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/PlayerList",
  component: PlayerList,
} as Meta<typeof PlayerList>;

// @ts-ignore
const Template: StoryFn<typeof PlayerList> = (args) => <PlayerList {...args} />;

export const Default = Template.bind({});
Default.args = {
  playersOnlineText: "5,247 players online",
  gamesInPlayText: "1,892 games in play",
};
