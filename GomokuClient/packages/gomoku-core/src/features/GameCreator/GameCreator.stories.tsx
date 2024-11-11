import { GameCreator } from "./GameCreator";

import type { GameCreatorProps } from "./GameCreator";
import type { Meta } from "@storybook/react";


export default {
  title: "Components/GameCreator",
  component: GameCreator,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    timeControl: {
      control: { type: "object" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
    isOpen: {
      control: { type: "boolean" },
    },
  },
} as Meta<GameCreatorProps>;

export const Default = (args: GameCreatorProps) => <GameCreator {...args} />;

Default.args = {
  isOpen: true,
  onClose: () => console.debug("Dialog closed"),
  onCreate: (boardSize: number) =>
    console.debug(`Game created with board size: ${boardSize}`),
  isLoading: false,
  timeControl: {
    duration: 5,
    increment: 2,
  },
};
