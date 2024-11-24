import type { SwaggerTypes } from "@gomoku/api";

type Board = string[][];

export type Winner = string | "draw" | undefined;

export class BoardGame {
  private readonly board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  private countTotal(currentTile: SwaggerTypes.TileDto, direction: SwaggerTypes.TileDto): number {
    const now = this.board[currentTile.y][currentTile.x];
    let total = 0;

    for (
      let tempY = currentTile.y + direction.y, tempX = currentTile.x + direction.x;
      tempY >= 0 && tempY < this.board.length && tempX >= 0 && tempX < this.board[0].length;
      tempY += direction.y, tempX += direction.x
    ) {
      if (this.board[tempY][tempX] === now) {
        total++;
      } else {
        break;
      }
    }

    return total;
  }

  public findWinner(tile: SwaggerTypes.TileDto): Winner {
    if (
      this.countTotal(tile, { y: 1, x: 0 }) + this.countTotal(tile, { y: -1, x: 0 }) >= 4 ||
      this.countTotal(tile, { y: 0, x: 1 }) + this.countTotal(tile, { y: 0, x: -1 }) >= 4 ||
      this.countTotal(tile, { y: 1, x: 1 }) + this.countTotal(tile, { y: -1, x: -1 }) >= 4 ||
      this.countTotal(tile, { y: 1, x: -1 }) + this.countTotal(tile, { y: -1, x: 1 }) >= 4
    ) {
      return this.board[tile.y][tile.x];
    }

    if (this.board.every((row) => row.every((col) => col))) {
      return "draw";
    }

    return undefined;
  }
}
