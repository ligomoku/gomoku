import { TileColor } from "../hooks";
import { SwaggerTypes } from "@gomoku/api";
/**
 * Parses gen string to array of arrays of tiles
 * GEN format: X..../.O.../..X../...O./....X/w/5/
 */
export declare const genParser: (
  gen?: SwaggerTypes.GetGameHistoryResponse["gen"],
) => TileColor[][];
//# sourceMappingURL=genParser.d.ts.map
