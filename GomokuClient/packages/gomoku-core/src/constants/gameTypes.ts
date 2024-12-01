import { t } from "@lingui/core/macro";

import type { GameType } from "@gomoku/story";

export const gameTypes: GameType[] = [
  {
    timeLabel: "1+0",
    type: t`Bullet`,
    boardSize: 13,
    timeControl: {
      initialTimeInSeconds: 60,
      incrementPerMove: 0,
    },
  },
  {
    timeLabel: "1+1",
    type: t`Bullet`,
    boardSize: 13,
    timeControl: {
      initialTimeInSeconds: 60,
      incrementPerMove: 1,
    },
  },
  {
    timeLabel: "1+2",
    type: t`Bullet`,
    boardSize: 13,
    timeControl: {
      initialTimeInSeconds: 60,
      incrementPerMove: 2,
    },
  },
  {
    timeLabel: "2+1",
    type: t`Bullet`,
    boardSize: 13,
    timeControl: {
      initialTimeInSeconds: 120,
      incrementPerMove: 1,
    },
  },
  {
    timeLabel: "5+0",
    type: t`Blitz`,
    boardSize: 13,
    timeControl: {
      initialTimeInSeconds: 300,
      incrementPerMove: 0,
    },
  },
  {
    timeLabel: "7+0",
    type: t`Rapid`,
    boardSize: 17,
    timeControl: {
      initialTimeInSeconds: 420,
      incrementPerMove: 0,
    },
  },
  {
    timeLabel: "10+0",
    type: t`Rapid`,
    boardSize: 17,
    timeControl: {
      initialTimeInSeconds: 600,
      incrementPerMove: 0,
    },
  },
  {
    timeLabel: "15+0",
    type: t`Rapid`,
    boardSize: 19,
    timeControl: {
      initialTimeInSeconds: 900,
      incrementPerMove: 0,
    },
  },
  {
    timeLabel: "30+0",
    type: t`Classic`,
    boardSize: 19,
    timeControl: {
      initialTimeInSeconds: 1800,
      incrementPerMove: 0,
    },
  },
];
