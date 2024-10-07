import { CellValue } from "@/hooks/useBoard";
import { useMemo } from "react";
import { cva } from "class-variance-authority";
import { useMobileDesign } from "@/hooks/useMobileDesign";

export interface BoardProps {
  size: number;
  onTileClick: (x: number, y: number) => void;
  tiles: CellValue[][];
}

const tileStyles = cva("rounded-full h-[90%] w-[90%]", {
  variants: {
    color: {
      black: "bg-black",
      white: "bg-white",
    },
  },
  defaultVariants: {
    color: "white",
  },
});

export const Board = ({ size, onTileClick, tiles }: BoardProps) => {
  const isMobile = useMobileDesign();
  const tilesElements = useMemo(
    () =>
      tiles.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          return col !== null ? (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="flex items-center justify-center border border-black"
            >
              <div
                className={tileStyles({
                  color: col === "black" ? "black" : "white",
                })}
              />
            </div>
          ) : (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="flex items-center justify-center border border-black"
              onClick={() => onTileClick(rowIndex, colIndex)}
            />
          );
        }),
      ),
    [tiles, onTileClick],
  );

  const calculatedSize = isMobile ? 100 : 80;

  return (
    <div className="rounded-lg bg-[#ba8c63] p-2.5 shadow-md">
      <div
        className="grid rounded-lg"
        style={{
          //TODO: should be based on window size
          gridTemplateColumns: `repeat(${size}, ${calculatedSize / size}vmin)`,
          gridTemplateRows: `repeat(${size}, ${calculatedSize / size}vmin)`,
        }}
      >
        {tilesElements}
      </div>
    </div>
  );
};
