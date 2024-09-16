import { useState, useRef, useEffect, useCallback } from "react";
import {findWinner, Winner} from "../utils";

interface Board extends Array<Array<CellValue | null>> {}
type CellValue = "black" | "white" | null;

export default function useBoard() {
  const [board, setBoard] = useState<Board>(Array(19).fill(null).map(() => Array(19).fill(null)));

  const updateBoard = useCallback((y: number, x: number, newValue: CellValue) => {
    setBoard((prevBoard) =>
      prevBoard.map((row, currentY) => {
        if (currentY !== y) return row;

        return row.map((col, currentX) => {
          if (currentX !== x) return col;
          return newValue;
        });
      })
    );
  }, []);

  const isBlackNext = useRef(true);
  const lastRow = useRef<number | undefined>(undefined);
  const lastCol = useRef<number | undefined>(undefined);

  const handlePieceClick = (row: number, col: number, value: CellValue) => {
    if (winner !== undefined) {
      return;
    }
    if (value !== null) return;
    lastRow.current = row;
    lastCol.current = col;
    updateBoard(row, col, isBlackNext.current ? "black" : "white");
    isBlackNext.current = !isBlackNext.current;
  };

  const [winner, setWinner] = useState<Winner>(undefined);

  useEffect(() => {
    if (lastRow.current === undefined || lastCol.current === undefined) return;
    // ToDo: check correct typing
    // @ts-expect-error
    const result = findWinner(board, lastRow.current, lastCol.current);
    setWinner(result);
  }, [board]);

  const playAgain = useCallback(() => {
    window.location.reload();
  }, []);

  return {
    board,
    winner,
    handlePieceClick,
    playAgain,
  };
}
