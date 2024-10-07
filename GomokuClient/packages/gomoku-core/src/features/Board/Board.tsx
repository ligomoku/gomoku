import { TileColor } from "@/hooks/useTiles";
import { useMemo, useState } from "react";
import { cva } from "class-variance-authority";
import { useMobileDesign } from "@/hooks/useMobileDesign";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { TileDto } from "@/api/client";

export interface BoardProps {
  size: number;
  onTileClick: (x: number, y: number) => void;
  tiles: TileColor[][];
  lastTile: TileDto;
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

export const Board = ({ size, onTileClick, tiles, lastTile }: BoardProps) => {
  const isMobile = useMobileDesign();
  const [boardSize, setBoardSize] = useState(window.innerWidth / 2.2);

  const tilesElements = useMemo(
    () =>
      tiles.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          return col !== null ? (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`flex items-center justify-center border border-black ${colIndex === lastTile.x && rowIndex === lastTile.y ? "bg-amber-400" : ""}`}
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
              onClick={() => {
                onTileClick(rowIndex, colIndex);
              }}
            />
          );
        }),
      ),
    [tiles, lastTile, onTileClick],
  );

  const calculatedSize = boardSize / size;
  const calculatedMobileSize = isMobile ? 100 : 80;

  if (!isMobile) {
    return (
      <ResizableBox
        width={boardSize}
        height={boardSize}
        onResize={(_event, { size }) => {
          setBoardSize(size.width);
        }}
        resizeHandles={["se"]}
      >
        <div
          className={`rounded-lg bg-[#ba8c63] shadow-md`}
          style={{ width: "100%", height: "100%" }}
        >
          <div
            className="grid rounded-lg"
            style={{
              gridTemplateColumns: `repeat(${size}, ${calculatedSize}px)`,
              gridTemplateRows: `repeat(${size}, ${calculatedSize}px)`,
            }}
          >
            {tilesElements}
          </div>
        </div>
      </ResizableBox>
    );
  }
  return (
    <div className="rounded-lg bg-[#ba8c63] shadow-md">
      <div
        className="grid rounded-lg"
        style={{
          //TODO: should be based on window size
          gridTemplateColumns: `repeat(${size}, ${calculatedMobileSize / size}vmin)`,
          gridTemplateRows: `repeat(${size}, ${calculatedMobileSize / size}vmin)`,
        }}
      >
        {tilesElements}
      </div>
    </div>
  );
};
