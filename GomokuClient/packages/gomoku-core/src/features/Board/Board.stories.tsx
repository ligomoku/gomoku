import { Meta } from "@storybook/react";
import { Board } from "./Board";

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
    onTileClick={(x, y) => console.log("Tile clicked", x, y)}
    tiles={Array.from({ length: boardSize }, () => Array(boardSize).fill(null))}
    lastTile={{ x: 0, y: 0 }}
  />
);

Default.args = {};
