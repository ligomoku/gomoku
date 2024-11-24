import type { TileColor } from "@/hooks";
import type { SwaggerTypes } from "@gomoku/api";

/**
 * Parses gen string to array of arrays of tiles
 * GEN format: X..../.O.../..X../...O./....X/w/5/
 */
export const genParser = (gen?: SwaggerTypes.GetGameHistoryResponse["gen"]): TileColor[][] => {
  if (!gen) return [];
  const rowsAndMetadata = gen.split("/");
  const rows = gen.split("/").slice(0, rowsAndMetadata.length - 2);

  return rows.map((row) =>
    row.split("").map((char) => {
      if (char === "X") return "black";
      if (char === "O") return "white";
      return null;
    }),
  );
};
