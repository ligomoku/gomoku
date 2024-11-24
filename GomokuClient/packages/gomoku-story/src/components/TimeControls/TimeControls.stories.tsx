import { TimeControls } from "./TimeControls";

import type { TimeControlsProps } from "./TimeControls";
import type { Meta, StoryFn } from "@storybook/react";

export const gameTypes = [
  {
    timeLabel: "1+0",
    type: `Bullet`,
    boardSize: 13,
    timeControl: {
      initialTimeInSeconds: 60,
      incrementPerMove: 0,
    },
  },
  {
    timeLabel: "1+1",
    type: `Bullet`,
    boardSize: 13,
    timeControl: {
      initialTimeInSeconds: 60,
      incrementPerMove: 1,
    },
  },
  {
    timeLabel: "1+2",
    type: `Bullet`,
    boardSize: 13,
    timeControl: {
      initialTimeInSeconds: 60,
      incrementPerMove: 2,
    },
  },
  {
    timeLabel: "2+1",
    type: `Bullet`,
    boardSize: 13,
    timeControl: {
      initialTimeInSeconds: 120,
      incrementPerMove: 1,
    },
  },
  {
    timeLabel: "5+0",
    type: `Blitz`,
    boardSize: 13,
    timeControl: {
      initialTimeInSeconds: 300,
      incrementPerMove: 0,
    },
  },
  {
    timeLabel: "7+0",
    type: `Rapid`,
    boardSize: 17,
    timeControl: {
      initialTimeInSeconds: 420,
      incrementPerMove: 5,
    },
  },
  {
    timeLabel: "10+0",
    type: `Rapid`,
    boardSize: 17,
    timeControl: {
      initialTimeInSeconds: 600,
      incrementPerMove: 0,
    },
  },
  {
    timeLabel: "15+0",
    type: `Rapid`,
    boardSize: 19,
    timeControl: {
      initialTimeInSeconds: 900,
      incrementPerMove: 0,
    },
  },
  {
    timeLabel: "30+0",
    type: `Classic`,
    boardSize: 19,
    timeControl: {
      initialTimeInSeconds: 1800,
      incrementPerMove: 0,
    },
  },
];

export default {
  title: "Components/TimeControls",
  component: TimeControls,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof TimeControls>;

const Template: StoryFn<TimeControlsProps> = (args) => (
  <TimeControls {...args} />
);

export const Default = Template.bind({});
Default.args = { gameTypes };
