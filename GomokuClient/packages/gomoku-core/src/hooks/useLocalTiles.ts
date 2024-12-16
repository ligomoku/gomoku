import { useCallback, useEffect, useRef, useState } from "react";

import { BoardGame } from "@/utils";

export type TileColor = "black" | "white" | null;
export type Winner = "black" | "white" | "draw" | undefined;

export const useLocalTiles = (boardSize: number) => {
  const [tiles, setTiles] = useState<TileColor[][]>(
    Array.from({ length: boardSize }, () => Array(boardSize).fill(null)),
  );
  const [winner, setWinner] = useState<Winner>(undefined);

  const [lastTile, setLastTile] = useState<
    { x: number; y: number } | undefined
  >(undefined);

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
    setWinner(result as Winner);
  }, [tiles]);

  const addTile = useCallback((x: number, y: number, newValue: TileColor) => {
    lastX.current = x;
    lastY.current = y;
    setLastTile({ x, y });

    setTiles((prevBoard) =>
      prevBoard.map((row, xIndex) => {
        if (xIndex !== x) return row;

        return row.map((col, yIndex) => {
          if (yIndex !== y) return col;
          return newValue;
        });
      }),
    );
  }, []);

  const removeTile = useCallback((x: number, y: number) => {
    setTiles((prevBoard) =>
      prevBoard.map((row, xIndex) => {
        if (xIndex !== x) return row;

        return row.map((col, yIndex) => {
          if (yIndex !== y) return col;
          return null;
        });
      }),
    );
    setLastTile(undefined);
    lastX.current = undefined;
    lastY.current = undefined;
  }, []);

  return {
    tiles,
    lastTile,
    winner,
    addTile,
    removeTile,
  };
};
