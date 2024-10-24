import { useCallback, useEffect, useRef, useState } from "react";
import { findWinner, Winner } from "@/utils";
import { SwaggerTypes } from "@/api";

//TODO: this should come from server side generated types
export type TileColor = "black" | "white" | null;

export const useTiles = (
  boardSize: SwaggerTypes.CreateGameResponse["boardSize"],
  initialTimeInSeconds: number,
  incrementPerMove: number,
  onEndGame: (winner: string) => void,
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

  const [blackTimeLeft, setBlackTimeLeft] = useState(initialTimeInSeconds);
  const [whiteTimeLeft, setWhiteTimeLeft] = useState(initialTimeInSeconds);
  const [activePlayer, setActivePlayer] = useState<TileColor>("black");
  const [isGameOver, setIsGameOver] = useState(false);

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

  const switchPlayer = useCallback(() => {
    if (activePlayer === "black") {
      setBlackTimeLeft((prev) => prev + incrementPerMove);
      setActivePlayer("white");
    } else {
      setWhiteTimeLeft((prev) => prev + incrementPerMove);
      setActivePlayer("black");
    }
  }, [activePlayer, incrementPerMove]);

  useEffect(() => {
    if (isGameOver) return;

    const timerId = setInterval(() => {
      if (activePlayer === "black") {
        setBlackTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            setIsGameOver(true);
            onEndGame("white");
            return 0;
          }
          return prev - 1;
        });
      } else {
        setWhiteTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            setIsGameOver(true);
            onEndGame("black");
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [activePlayer, isGameOver, onEndGame]);

  const addTile = useCallback(
    (tile: SwaggerTypes.TileDto, newValue: TileColor) => {
      if (isGameOver) return;

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

      if (winner) {
        setIsGameOver(true);
        onEndGame(winner === "black" ? "black" : "white");
      } else {
        switchPlayer();
      }
    },
    [isGameOver, winner, onEndGame, switchPlayer],
  );

  return {
    tiles,
    setTiles,
    lastTile,
    setLastTile,
    winner,
    addTile,
    blackTimeLeft,
    whiteTimeLeft,
    activePlayer,
  };
};
