import { useCallback, useEffect, useRef, useState } from "react";
import { findWinner, Winner } from "@/utils";

export type CellValue = "black" | "white" | null;

export const useBoard = () => {
  const [board, setBoard] = useState(
    Array(19)
      .fill(null)
      .map(() => Array(19).fill(null)),
  );

  const updateBoard = useCallback(
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

  const isBlackNext = useRef(true);
  const lastRow = useRef<number | undefined>(undefined);
  const lastCol = useRef<number | undefined>(undefined);

  const handlePieceClick = (row: number, col: number, value: string | null) => {
    if (value !== null) return;
    lastRow.current = row;
    lastCol.current = col;
    updateBoard(row, col, isBlackNext.current ? "black" : "white");
    isBlackNext.current = !isBlackNext.current;
  };

  const [winner, setWinner] = useState<Winner>(undefined);

  // Check for a winner after every move
  useEffect(() => {
    if (lastRow.current === undefined || lastCol.current === undefined) return;
    const result = findWinner(board, lastRow.current, lastCol.current);
    setWinner(result);
  }, [board]);

  // Update the board when the opponent makes a move
  const setOpponentMove = useCallback(
    (x: number, y: number, color: CellValue) => {
      updateBoard(y, x, color);
    },
    [updateBoard],
  );

  return {
    board,
    winner,
    handlePieceClick,
    setOpponentMove,
  };
};
