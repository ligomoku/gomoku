import { Board } from "./Board";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Board> = {
  title: "Components/Board",
  component: Board,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "number", min: 5, max: 19 },
      description: "Size of the game board (NxN)",
    },
    onTileClick: {
      description: "Callback function when a tile is clicked",
    },
    tiles: {
      description: "2D array representing the board state",
    },
    lastTile: {
      description: "Coordinates of the last placed tile",
    },
    winningSequence: {
      description: "Array of winning tile coordinates",
    },
  },
} satisfies Meta<typeof Board>;

export default meta;
type Story = StoryObj<typeof Board>;

const boardSize = 19;

const createBoard = (
  size: number,
  filledPositions: { x: number; y: number; color: "black" | "white" }[],
) => {
  const board = Array.from({ length: size }, () => Array(size).fill(null));
  filledPositions.forEach(({ x, y, color }) => {
    board[x][y] = color;
  });
  return board;
};

export const EmptyBoard: Story = {
  args: {
    size: boardSize,
    onTileClick: (x, y) => console.debug("Tile clicked", x, y),
    tiles: Array.from({ length: boardSize }, () => Array(boardSize).fill(null)),
    lastTile: undefined,
    winningSequence: undefined,
  },
};

export const GameInProgress: Story = {
  args: {
    size: boardSize,
    onTileClick: (x, y) => console.debug("Tile clicked", x, y),
    tiles: createBoard(boardSize, [
      { x: 9, y: 9, color: "black" },
      { x: 9, y: 10, color: "white" },
      { x: 8, y: 9, color: "black" },
      { x: 8, y: 10, color: "white" },
      { x: 10, y: 9, color: "black" },
    ]),
    lastTile: { x: 10, y: 9 },
    winningSequence: undefined,
  },
};

export const WinningGame: Story = {
  args: {
    size: boardSize,
    onTileClick: (x, y) => console.debug("Tile clicked", x, y),
    tiles: createBoard(boardSize, [
      { x: 5, y: 5, color: "black" },
      { x: 4, y: 6, color: "white" },
      { x: 6, y: 6, color: "black" },
      { x: 4, y: 7, color: "white" },
      { x: 7, y: 7, color: "black" },
      { x: 4, y: 8, color: "white" },
      { x: 8, y: 8, color: "black" },
      { x: 4, y: 9, color: "white" },
      { x: 9, y: 9, color: "black" },
    ]),
    lastTile: { x: 9, y: 9 },
    winningSequence: [
      { x: 5, y: 5 },
      { x: 6, y: 6 },
      { x: 7, y: 7 },
      { x: 8, y: 8 },
      { x: 9, y: 9 },
    ],
  },
};

export const SmallBoard: Story = {
  args: {
    size: 9,
    onTileClick: (x, y) => console.debug("Tile clicked", x, y),
    tiles: createBoard(9, [
      { x: 4, y: 4, color: "black" },
      { x: 4, y: 5, color: "white" },
    ]),
    lastTile: { x: 4, y: 5 },
    winningSequence: undefined,
  },
};

export const CustomStyledBoard: Story = {
  args: {
    ...EmptyBoard.args,
    style: {
      backgroundColor: "#8B4513",
      padding: "1rem",
      border: "2px solid #4A2501",
    },
  },
};

export const InteractiveBoard: Story = {
  render: () => {
    const size = 15;
    const initialTiles = Array.from({ length: size }, () =>
      Array(size).fill(null),
    );

    return (
      <Board
        size={size}
        onTileClick={(x, y) => {
          alert(`Clicked position: x=${x}, y=${y}`);
        }}
        tiles={initialTiles}
        style={{
          cursor: "pointer",
        }}
      />
    );
  },
};
