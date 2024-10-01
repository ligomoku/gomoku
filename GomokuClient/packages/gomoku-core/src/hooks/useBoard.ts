import { useCallback, useEffect, useRef, useState } from "react";
import { findWinner, Winner } from "@/utils";

export type CellValue = "Black" | "White" | null;

// TODO: This hook probably should be refactored.
// Ideally it should be responsible just for keeping board state with possible add new pieces
// And as well it should accept boardInitialState as incoming parameter to be able to recover game
// when active game state received from server
// Every other logic, like calculating winner and keeping in state what player color made move should be
// removed and received from server
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

  // TODO: Currently function named with 'Piece' word as it was previously in this code. My suggestion is to align names how call stuff in FE and BE
  // TODO: In backend I call one piece tile. Coordinates are x and y. For better and cleaner solution let's align on namings
  // TODO: We can even write documentation and figure out how we call things.
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
