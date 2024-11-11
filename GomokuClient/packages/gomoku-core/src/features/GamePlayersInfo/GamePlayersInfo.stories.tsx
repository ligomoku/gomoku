import { GamePlayersInfo } from "./GamePlayersInfo";

import type { Meta } from "@storybook/react";


export default {
  title: "Components/GamePlayersInfo",
  component: GamePlayersInfo,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof GamePlayersInfo>;

export const Default = () => (
  <GamePlayersInfo
    gameType="Blitz"
    players={[
      {
        title: "FM",
        name: "tester",
        rating: 3191,
        isCurrentPlayer: true,
        color: "#7cb342",
      },
      {
        title: "GM",
        name: "vitaly",
        rating: 2924,
        isCurrentPlayer: false,
        color: "#b0b0b0",
      },
    ]}
  />
);
