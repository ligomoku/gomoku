import { TileColor } from "@/hooks/useTiles";
import { CSSProperties, memo, useMemo, useState } from "react";
import { cva } from "class-variance-authority";
import { useMobileDesign } from "@/hooks/useMobileDesign";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { SignalClientMessages, SwaggerTypes } from "@/api";
import { Button } from "@/shared/ui/button";
import { TileDto } from "@/api/client";

export interface TileProps {
  xIndex: SignalClientMessages.MakeMoveClientMessage["x"];
  yIndex: SignalClientMessages.MakeMoveClientMessage["y"];
  col: TileColor;
  lastTile?: SwaggerTypes.TileDto;
  onTileClick: (
    x: SignalClientMessages.MakeMoveClientMessage["x"],
    y: SignalClientMessages.MakeMoveClientMessage["y"],
  ) => void;
  showAnnotations: boolean;
  winningSequence?: TileDto[]; //TODO: check maybe another type
}

const Tile = memo(
  ({
    xIndex,
    yIndex,
    col,
    lastTile,
    onTileClick,
    showAnnotations,
    winningSequence,
  }: TileProps) => {
    const isLastTile = xIndex === lastTile?.x && yIndex === lastTile?.y;
    const isWinningTile = winningSequence?.some(
      (tile) => tile.x === xIndex && tile.y === yIndex,
    );

    return col !== null ? (
      <div
        key={`${xIndex}-${yIndex}`}
        className={`relative flex items-center justify-center border border-black ${isLastTile ? "bg-amber-400" : ""} ${isWinningTile ? "bg-green-400" : ""} `}
      >
        <div
          className={tileStyles({
            color: col === "black" ? "black" : "white",
          })}
        />
        {showAnnotations && (
          <div className="absolute left-0 top-0 text-xs text-gray-700">
            {`x${xIndex} y${yIndex}`}
          </div>
        )}
      </div>
    ) : (
      <div
        key={`${xIndex}-${yIndex}`}
        className="relative flex items-center justify-center border border-black"
        onClick={() => {
          console.debug("Tile clicked: x=", xIndex, "y=", yIndex);
          onTileClick(xIndex, yIndex);
        }}
      >
        {showAnnotations && (
          <div className="absolute left-0 top-0 text-xs text-gray-700">
            {`x${xIndex} y${yIndex}`}
          </div>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.col === nextProps.col &&
      prevProps.lastTile?.x === nextProps.lastTile?.x &&
      prevProps.lastTile?.y === nextProps.lastTile?.y &&
      prevProps.xIndex === nextProps.xIndex &&
      prevProps.yIndex === nextProps.yIndex &&
      prevProps.showAnnotations === nextProps.showAnnotations &&
      //TODO: check if we need to do JSON.stringify here
      prevProps.winningSequence?.length === nextProps.winningSequence?.length
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
  winningSequence?: Pick<TileProps, "winningSequence">["winningSequence"];
}

export const Board = ({
  size,
  onTileClick,
  tiles,
  lastTile,
  style,
  winningSequence,
}: BoardProps) => {
  const isMobile = useMobileDesign();
  const [boardSize, setBoardSize] = useState(window.innerWidth / 2.2);
  const [showAnnotations, setShowAnnotations] = useState(false);

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
            showAnnotations={showAnnotations}
            winningSequence={winningSequence}
          />
        )),
      ),
    [tiles, lastTile, onTileClick, showAnnotations],
  );

  const calculatedSize = boardSize / size;
  const calculatedMobileSize = isMobile ? 100 : 80;
  const minConstraints = isMobile ? [300, 300] : [400, 400];

  if (!isMobile) {
    return (
      <ResizableBox
        width={boardSize}
        height={boardSize}
        onResize={(_event, { size }) => {
          setBoardSize(size.width);
        }}
        resizeHandles={["se"]}
        minConstraints={[minConstraints[0], minConstraints[1]]}
      >
        <div className="flex flex-col items-center">
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
          <div className="flex flex-col items-center">
            <Button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className="focus-visible:ring-ring relative mt-4 inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border-[#3e3e3e] bg-[#3e3e3e] px-4 py-2 text-base font-medium text-[#bababa] shadow transition-colors hover:bg-[#4a4a4a] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            >
              {showAnnotations ? "Hide Annotations" : "Show Annotations"}
            </Button>
          </div>
        </div>
      </ResizableBox>
    );
  }

  return (
    <div className="flex flex-col items-center">
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
    </div>
  );
};
