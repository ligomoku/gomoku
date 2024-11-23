import { Board } from "./Board";

import type { Meta } from "@storybook/react";

export default {
  title: "Components/Board",
  component: Board,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof Board>;

const boardSize = 19;

export const Default = () => (
  <Board
    size={boardSize}
    onTileClick={(x, y) => console.debug("Tile clicked", x, y)}
    tiles={Array.from({ length: boardSize }, () => Array(boardSize).fill(null))}
    lastTile={{ x: 0, y: 0 }}
    winningSequence={null}
  />
);

Default.args = {};
