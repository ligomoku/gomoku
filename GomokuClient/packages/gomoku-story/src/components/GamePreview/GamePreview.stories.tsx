import type { GamePreviewProps } from "@/components";
import type { Meta } from "@storybook/react";

import { GamePreview } from "@/components";

export default {
  title: "Components/GamePreview",
  component: GamePreview,
  parameters: {
    layout: "centered",
  },
} as Meta<GamePreviewProps>;

export const Default = (args: GamePreviewProps) => <GamePreview {...args} />;

Default.args = {
  gen: "X..../.O.../..X../...O./....X/w/5",
  lastTile: {
    x: 0,
    y: 0,
  },
};
