import { useCallback, useEffect, useRef, useState } from "react";
import { findWinner, Winner } from "@/utils";
import { typedStorage } from "@/shared/lib/utils";
import { TileDto } from "@/api/client";

export type TileColor = "black" | "white" | null;

//TODO: refactor on IndexDB approach
export const useTiles = (gameID: string) => {
  const BOARD_KEY = `gameBoard_${gameID}` as `gameBoard_${string}`;
  const NEXT_TURN_KEY = `nextTurn_${gameID}` as `nextTurn_${string}`;
  const LAST_TILE_KEY = `lastTile_${gameID}` as `lastTile_${string}`;

  const [tiles, setTiles] = useState<TileColor[][]>(() => {
    const savedBoard = typedStorage.getItem(BOARD_KEY);
    return savedBoard
      ? JSON.parse(savedBoard)
      : Array(19)
          .fill(null)
          .map(() => Array(19).fill(null));
  });
  const [lastTile, setLastTile] = useState<TileDto>(
    JSON.parse(typedStorage.getItem(LAST_TILE_KEY)!) ?? { x: 0, y: 0 },
  );

  const isBlackNext = useRef<boolean>(
    typedStorage.getItem(NEXT_TURN_KEY) !== null
      ? JSON.parse(typedStorage.getItem(NEXT_TURN_KEY)!)
      : true,
  );

  const [winner, setWinner] = useState<Winner>(undefined);

  const lastRow = useRef<number | undefined>(undefined);
  const lastCol = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (lastRow.current === undefined || lastCol.current === undefined) return;

    const convertedBoard = tiles.map((row) =>
      row.map((cell) => (cell === null ? "" : cell)),
    );

    const result = findWinner(convertedBoard, {
      x: lastCol.current,
      y: lastRow.current,
    });
    setWinner(result);
  }, [tiles]);

  useEffect(() => {
    if (winner) {
      typedStorage.removeItem(BOARD_KEY);
      typedStorage.removeItem(NEXT_TURN_KEY);
    } else {
      typedStorage.setItem(BOARD_KEY, JSON.stringify(tiles));
      typedStorage.setItem(NEXT_TURN_KEY, JSON.stringify(isBlackNext.current));
    }
  }, [BOARD_KEY, NEXT_TURN_KEY, tiles, winner]);

  const addTile = useCallback(
    (x: number, y: number, newValue: TileColor) => {
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
      typedStorage.setItem(LAST_TILE_KEY, JSON.stringify(tile));
    },
    [LAST_TILE_KEY],
  );

  return {
    tiles,
    lastTile,
    winner,
    addTile,
  };
};
