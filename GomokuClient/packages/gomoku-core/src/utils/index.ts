import { TileDto } from "@/api/client";

type Board = string[][];

const countTotal = (
  board: Board,
  currentTile: TileDto,
  direction: TileDto,
): number => {
  const now = board[currentTile.y][currentTile.x];
  let total = 0;

  for (
    let tempY = currentTile.y + direction.y,
      tempX = currentTile.x + direction.x;
    tempY >= 0 && tempY < board.length && tempX >= 0 && tempX < board[0].length;
    tempY += direction.y, tempX += direction.x
  ) {
    if (board[tempY][tempX] === now) {
      total++;
    } else {
      break;
    }
  }

  return total;
};

export type Winner = string | "draw" | undefined;

export const findWinner = (board: Board, tile: TileDto): Winner => {
  if (
    countTotal(board, tile, { y: 1, x: 0 }) +
      countTotal(board, tile, { y: -1, x: 0 }) >=
      4 ||
    countTotal(board, tile, { y: 0, x: 1 }) +
      countTotal(board, tile, { y: 0, x: -1 }) >=
      4 ||
    countTotal(board, tile, { y: 1, x: 1 }) +
      countTotal(board, tile, { y: -1, x: -1 }) >=
      4 ||
    countTotal(board, tile, { y: 1, x: -1 }) +
      countTotal(board, tile, { y: -1, x: 1 }) >=
      4
  ) {
    return board[tile.y][tile.x];
  }

  if (board.every((row) => row.every((col) => col))) {
    return "draw";
  }

  return undefined;
};
