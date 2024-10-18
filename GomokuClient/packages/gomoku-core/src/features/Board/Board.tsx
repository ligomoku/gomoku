import { TileColor } from "@/hooks/useTiles";
import { CSSProperties, memo, useMemo, useState } from "react";
import { cva } from "class-variance-authority";
import { useMobileDesign } from "@/hooks/useMobileDesign";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { SignalClientMessages, SwaggerTypes } from "@/api";

export interface TileProps {
  xIndex: SignalClientMessages.MakeMoveClientMessage["x"];
  yIndex: SignalClientMessages.MakeMoveClientMessage["y"];
  col: TileColor;
  lastTile?: SwaggerTypes.TileDto;
  onTileClick: (
    x: SignalClientMessages.MakeMoveClientMessage["x"],
    y: SignalClientMessages.MakeMoveClientMessage["y"],
  ) => void;
}

const Tile = memo(
  ({ xIndex, yIndex, col, lastTile, onTileClick }: TileProps) => {
    const isLastTile = xIndex === lastTile?.x && yIndex === lastTile?.y;

    return col !== null ? (
      <div
        key={`${xIndex}-${yIndex}`}
        className={`flex items-center justify-center border border-black ${isLastTile ? "bg-amber-400" : ""}`}
      >
        <div
          className={tileStyles({
            color: col === "black" ? "black" : "white",
          })}
        />
      </div>
    ) : (
      <div
        key={`${xIndex}-${yIndex}`}
        className="flex items-center justify-center border border-black"
        onClick={() => {
          console.log("Tile clicked: x=", xIndex, "y=", yIndex);
          onTileClick(xIndex, yIndex);
        }}
      />
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.col === nextProps.col &&
      prevProps.lastTile?.x === nextProps.lastTile?.x &&
      prevProps.lastTile?.y === nextProps.lastTile?.y &&
      prevProps.xIndex === nextProps.xIndex &&
      prevProps.yIndex === nextProps.yIndex
    );
  },
);

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

export interface BoardProps {
  size: number;
  onTileClick: Pick<TileProps, "onTileClick">["onTileClick"];
  tiles: TileColor[][];
  lastTile?: SwaggerTypes.TileDto;
  style?: CSSProperties;
}

export const Board = ({
  size,
  onTileClick,
  tiles,
  lastTile,
  style,
}: BoardProps) => {
  const isMobile = useMobileDesign();
  const [boardSize, setBoardSize] = useState(window.innerWidth / 2.2);

  const tilesElements = useMemo(
    () =>
      tiles.map((row, xIndex) =>
        row.map((col, yIndex) => (
          <Tile
            key={`${xIndex}-${yIndex}`}
            xIndex={xIndex}
            yIndex={yIndex}
            col={col}
            lastTile={lastTile}
            onTileClick={onTileClick}
          />
        )),
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
    <div className="rounded-lg bg-[#ba8c63] shadow-md" style={style}>
      <div
        className="grid rounded-lg"
        style={{
          gridTemplateColumns: `repeat(${size}, ${calculatedMobileSize / size}vmin)`,
          gridTemplateRows: `repeat(${size}, ${calculatedMobileSize / size}vmin)`,
        }}
      >
        {tilesElements}
      </div>
    </div>
  );
};
