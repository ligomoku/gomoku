import { useCallback, useEffect, useRef, useState } from "react";

import type { SwaggerTypes } from "@/api";
import type { Winner } from "@/utils";

//TODO: check import combining type on tree-shaking
import { genParser, BoardGame } from "@/utils";

//TODO: this should come from server side generated types
export type TileColor = "black" | "white" | null;

export const useTiles = (gameHistory: SwaggerTypes.GetGameHistoryResponse) => {
  const [tiles, setTiles] = useState<TileColor[][]>(() =>
    genParser(gameHistory.gen),
  );
  const [lastTile, setLastTile] = useState<SwaggerTypes.TileDto>(
    gameHistory.movesHistory[gameHistory.movesCount],
  );

  const [winner, setWinner] = useState<Winner>(undefined);

  const lastX = useRef<number | undefined>(undefined);
  const lastY = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (lastX.current === undefined || lastY.current === undefined) return;

    const boardGame = new BoardGame(
      tiles.map((row) => row.map((cell) => (cell === null ? "" : cell))),
    );

    const result = boardGame.findWinner({
      x: lastX.current,
      y: lastY.current,
    });
    setWinner(result);
  }, [tiles]);

  const addTile = useCallback(
    (tile: SwaggerTypes.TileDto, newValue: TileColor) => {
      const { x, y } = tile;
      lastX.current = x;
      lastY.current = y;

      setTiles((prevBoard) =>
        prevBoard.map((row, xIndex) => {
          if (xIndex !== x) return row;

          return row.map((col, yIndex) => {
            if (yIndex !== y) return col;
            return newValue;
          });
        }),
      );
      setLastTile(tile);
    },
    [],
  );

  const removeTile = useCallback(
    (
      tileToRemove: SwaggerTypes.TileDto,
      previousPlacedTile: SwaggerTypes.TileDto,
    ) => {
      const { x, y } = tileToRemove;

      setTiles((prevBoard) =>
        prevBoard.map((row, xIndex) => {
          if (xIndex !== x) return row;

          return row.map((col, yIndex) => {
            if (yIndex !== y) return col;
            return null;
          });
        }),
      );
      setLastTile(previousPlacedTile);
    },
    [],
  );

  return {
    tiles,
    lastTile,
    winner,
    addTile,
    removeTile,
  };
};
