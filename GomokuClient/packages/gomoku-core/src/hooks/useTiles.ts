import { useCallback, useEffect, useRef, useState } from "react";
import { findWinner, Winner } from "@/utils";
import { SwaggerTypes } from "@/api";
import { TileDto } from "@/api/client";

//TODO: this should come from server side generated types
export type TileColor = "black" | "white" | null;

export const useTiles = (
  boardSize: SwaggerTypes.CreateGameResponse["boardSize"],
) => {
  const [tiles, setTiles] = useState<TileColor[][]>(
    Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(null)),
  );
  const [lastTile, setLastTile] = useState<SwaggerTypes.TileDto>({
    x: 0,
    y: 0,
  });

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

  const addTile = useCallback((tile: TileDto, newValue: TileColor) => {
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
