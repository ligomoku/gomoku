import { SwaggerTypes } from "@/api";
import { useMemo } from "react";
import { genParser } from "@/utils/getParser";
import { Board } from "@/features/Board/Board";

export interface GamePreviewProps {
  gen: SwaggerTypes.GetGameHistoryResponse["gen"];
  lastTile?: SwaggerTypes.TileDto;
}

export const GamePreview = ({ gen, lastTile }: GamePreviewProps) => {
  const tiles = useMemo(() => genParser(gen), [gen]);

  const boardSize = tiles.length;

  const handleTileClick = (x: number, y: number) => {
    console.log("Clicked tile at:", x, y);
  };

  return (
    <div className="p-4">
      <Board
        size={boardSize}
        tiles={tiles}
        onTileClick={handleTileClick}
        lastTile={lastTile}
      />
    </div>
  );
};
