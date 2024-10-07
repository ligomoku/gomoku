import styles from "./Board.module.scss";
import { CellValue } from "@/hooks/useBoard";
import { useMemo } from "react";

export interface BoardProps {
  size: number;
  onTileClick: (x: number, y: number) => void;
  tiles: CellValue[][];
}

export const Board = ({ size, onTileClick, tiles }: BoardProps) => {
  const tilesElements = useMemo(
    () =>
      tiles.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          return col !== null ? (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={styles.tileContainer}
            >
              <div
                className={`${styles.tile} ${
                  col === "black" ? styles.tileBlack : styles.tileWhite
                }`}
              />
            </div>
          ) : (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={styles.tileContainer}
              onClick={() => onTileClick(rowIndex, colIndex)}
            />
          );
        }),
      ),
    [size, tiles, onTileClick],
  );

  return (
    <div className={styles.boardContainer}>
      <div className={styles.boardBackground}>
        <div
          className={styles.board}
          style={{
            gridTemplateColumns: `repeat(${size}, ${100 / size}vmin)`,
            gridTemplateRows: `repeat(${size}, ${100 / size}vmin)`,
          }}
        >
          {tilesElements}
        </div>
      </div>
    </div>
  );
};
