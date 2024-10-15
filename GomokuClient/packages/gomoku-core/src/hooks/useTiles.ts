import { useCallback, useEffect, useRef, useState } from "react";
import { findWinner, Winner } from "@/utils";
import { TileDto } from "@/api/client";

export type TileColor = "black" | "white" | null;

export const useTiles = (boardSize: number) => {
  const [tiles, setTiles] = useState<TileColor[][]>(
    Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(null)),
  );
  const [lastTile, setLastTile] = useState<TileDto>({ x: 0, y: 0 });

  const [winner, setWinner] = useState<Winner>(undefined);

  const lastX = useRef<number | undefined>(undefined);
  const lastY = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (lastX.current === undefined || lastY.current === undefined) return;

    const convertedBoard = tiles.map((row) =>
      row.map((cell) => (cell === null ? "" : cell)),
    );

    const result = findWinner(convertedBoard, {
      x: lastX.current,
      y: lastY.current,
    });
    setWinner(result);
  }, [tiles]);

  const addTile = useCallback((x: number, y: number, newValue: TileColor) => {
    lastX.current = x;
    lastY.current = y;

    setTiles((prevBoard) =>
      prevBoard.map((row, currentY) => {
        if (currentY !== y) return row;

        return row.map((col, currentX) => {
          if (currentX !== x) return col;
          return newValue;
        });
      }),
    );

    const tile = { x, y };
    setLastTile(tile);
  }, []);

  return {
    tiles,
    setTiles,
    lastTile,
    setLastTile,
    winner,
    addTile,
  };
};
