import { SwaggerTypes } from "@gomoku/api";
type Board = string[][];
export type Winner = string | "draw" | undefined;
export declare class BoardGame {
  private readonly board;
  constructor(board: Board);
  private countTotal;
  findWinner(tile: SwaggerTypes.TileDto): Winner;
}
export {};
//# sourceMappingURL=boardGame.d.ts.map
