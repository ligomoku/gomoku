import { Meta } from "@storybook/react";
import { GameTime, GameTimeProps } from "./GameTime";

export default {
  title: "Components/GameTime",
  component: GameTime,
  parameters: {
    layout: "centered",
  },
} as Meta<GameTimeProps>;

const Default = (args: GameTimeProps) => <GameTime {...args} />;

Default.args = {
  timeLeft: "01:00",
  player: {
    name: "asd121231234",
    rating: 1886,
  },
  opponent: {
    name: "Kuprins",
    rating: 1908,
  },
  isTurn: true,
  turnMessage: "It's your turn!",
  moveTimeMessage: "17 seconds to play the first move",
};
