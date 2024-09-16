type Board = string[][];

const countTotal = (
  board: Board,
  currentY: number,
  currentX: number,
  directionY: number,
  directionX: number
): number => {
  const now = board[currentY][currentX];
  let total = 0;

  for (
    let tempY = currentY + directionY, tempX = currentX + directionX;
    tempY >= 0 &&
    tempY < board.length &&
    tempX >= 0 &&
    tempX < board[0].length;
    tempY += directionY, tempX += directionX
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

export const findWinner = (board: Board, y: number, x: number): Winner => {
  if (
    countTotal(board, y, x, 1, 0) + countTotal(board, y, x, -1, 0) >= 4 ||
    countTotal(board, y, x, 0, 1) + countTotal(board, y, x, 0, -1) >= 4 ||
    countTotal(board, y, x, 1, 1) + countTotal(board, y, x, -1, -1) >= 4 ||
    countTotal(board, y, x, 1, -1) + countTotal(board, y, x, -1, 1) >= 4
  ) {
    return board[y][x];
  }

  if (board.every((row) => row.every((col) => col))) {
    return "draw";
  }

  return undefined;
};
