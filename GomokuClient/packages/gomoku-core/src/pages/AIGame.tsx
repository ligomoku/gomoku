import { Board } from "@gomoku/story";
import { useState } from "react";

import type { SwaggerTypes } from "@gomoku/api";

import { useMobileDesign } from "@/hooks";
import { useLocalTiles } from "@/hooks/useLocalTiles";

interface AIGameProps {
  gameHistory: {
    boardSize: number;
    timeControl?: SwaggerTypes.TimeControlDto;
  };
}

const AIGame = ({ gameHistory }: AIGameProps) => {
  const { boardSize } = gameHistory;

  const { tiles, addTile, winner, lastTile } = useLocalTiles(boardSize);
  const [switchColor, setSwitchColor] = useState<"black" | "white">("black");

  const isMobile = useMobileDesign(1488);

  const handleTileClick = (x: number, y: number) => {
    if (!tiles[x][y] && !winner) {
      addTile(x, y, switchColor);
      setSwitchColor(switchColor === "black" ? "white" : "black");
    }
  };

  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      <div className="font-open-sans flex flex-col items-center p-4 font-light">
        <div
          className="mb-5 flex w-full flex-wrap justify-center"
          style={{
            alignItems: isMobile ? "unset" : "center",
          }}
        >
          <Board
            size={boardSize}
            onTileClick={handleTileClick}
            tiles={tiles}
            lastTile={lastTile}
            winningSequence={undefined}
          />
        </div>
        {winner && (
          <div className="mt-4 text-center text-lg text-amber-400">
            {`Winner: ${winner}`}
          </div>
        )}
      </div>
    </div>
  );
};

AIGame.displayName = "AIGame";

export default AIGame;
