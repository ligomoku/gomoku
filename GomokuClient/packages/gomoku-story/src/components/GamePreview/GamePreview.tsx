import { useMemo } from "react";

import type { BoardProps } from "@/components";
import type { SwaggerTypes } from "@gomoku/api";

import { Board } from "@/components";
import { genParser } from "@/utils";

export interface GamePreviewProps {
  gen: SwaggerTypes.GetGameHistoryResponse["gen"];
  lastTile?: Pick<BoardProps, "lastTile">["lastTile"];
}

export const GamePreview = ({ gen, lastTile }: GamePreviewProps) => {
  const tiles = useMemo(() => genParser(gen), [gen]);

  const boardSize = tiles.length;

  const handleTileClick = (x: number, y: number) => {
    console.debug("Clicked tile at:", x, y);
  };

  return (
    <div className="p-4">
      <Board
        size={boardSize}
        tiles={tiles}
        onTileClick={handleTileClick}
        lastTile={lastTile}
        winningSequence={null}
      />
    </div>
  );
};
