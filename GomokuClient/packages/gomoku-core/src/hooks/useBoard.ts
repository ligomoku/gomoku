import { useCallback, useEffect, useRef, useState } from "react";
import { findWinner, Winner } from "@/utils";
import { typedStorage } from "@/shared/lib/utils";

export type CellValue = "black" | "white" | null;

//TODO: refactor on IndexDB approach
export const useBoard = (gameID: string) => {
  const BOARD_KEY = `gameBoard_${gameID}` as `gameBoard_${string}`;
  const NEXT_TURN_KEY = `nextTurn_${gameID}` as `nextTurn_${string}`;

  const [board, setBoard] = useState<CellValue[][]>(() => {
    const savedBoard = typedStorage.getItem(BOARD_KEY);
    return savedBoard
      ? JSON.parse(savedBoard)
      : Array(19)
          .fill(null)
          .map(() => Array(19).fill(null));
  });

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

    const convertedBoard = board.map((row) =>
      row.map((cell) => (cell === null ? "" : cell)),
    );

    const result = findWinner(convertedBoard, lastRow.current, lastCol.current);
    setWinner(result);
  }, [board]);

  useEffect(() => {
    if (winner) {
      typedStorage.removeItem(BOARD_KEY);
      typedStorage.removeItem(NEXT_TURN_KEY);
    } else {
      typedStorage.setItem(BOARD_KEY, JSON.stringify(board));
      typedStorage.setItem(NEXT_TURN_KEY, JSON.stringify(isBlackNext.current));
    }
  }, [BOARD_KEY, NEXT_TURN_KEY, board, winner]);

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

  const handlePieceClick = (row: number, col: number, value: string | null) => {
    if (value !== null || winner) return;

    lastRow.current = row;
    lastCol.current = col;

    updateBoard(row, col, isBlackNext.current ? "black" : "white");

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
