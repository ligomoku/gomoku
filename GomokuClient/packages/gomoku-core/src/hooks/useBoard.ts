import { useCallback, useEffect, useRef, useState } from "react";
import { findWinner, Winner } from "@/utils";

export type CellValue = "Black" | "White" | null;

export const useBoard = () => {
  const [winner, setWinner] = useState<Winner>(undefined);
  const [board, setBoard] = useState(
    // This data structure probably will work not optimal, when we will need to recover board state from backend history. My suggestion is to use Record<string, MoveData>, where record key will be "x.y" and it will be easy to access all data at any time.
    Array(19)
      .fill(null)
      .map(() => Array(19).fill(null)),
  );
  const isBlackNext = useRef(true);
  const lastRow = useRef<number | undefined>(undefined);
  const lastCol = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (lastRow.current === undefined || lastCol.current === undefined) return;
    const result = findWinner(board, lastRow.current, lastCol.current);
    setWinner(result);
  }, [board]);

  const updateBoard = useCallback(
    // TODO: What point of using useCallback? Function is not passed as dependency or components props. No improvement at all.
    (y: number, x: number, newValue: CellValue) => {
      setBoard((prevBoard) =>
        prevBoard.map((row, currentY) => {
          if (currentY !== y) return row;

          return row.map((col, currentX) => {
            if (currentX !== x) return col;
            return newValue;
          });
        }),
      );
    },
    [],
  );

  const handlePieceClick = (row: number, col: number, value: string | null) => {
    if (value !== null) return;
    lastRow.current = row;
    lastCol.current = col;
    updateBoard(row, col, isBlackNext.current ? "Black" : "White");
    isBlackNext.current = !isBlackNext.current;
  };

  const addPiece = useCallback(
    (x: number, y: number, color: CellValue) => {
      updateBoard(y, x, color);
    },
    [updateBoard],
  );

  return {
    board,
    winner,
    handlePieceClick,
    addPiece,
  };
};
