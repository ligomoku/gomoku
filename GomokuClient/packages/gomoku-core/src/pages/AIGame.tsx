import { Board } from "@gomoku/story";
import { useState, useEffect } from "react";

import { useMobileDesign } from "@/hooks";
import { useLocalTiles } from "@/hooks/useLocalTiles";

interface AIGameProps {
  gameHistory: {
    boardSize: number;
    timeControl?: unknown;
  };
}

const AIGame = ({ gameHistory }: AIGameProps) => {
  const { boardSize } = gameHistory;
  const { tiles, addTile, winner, lastTile } = useLocalTiles(boardSize);
  const [switchColor, setSwitchColor] = useState<"black" | "white">("black");
  const isMobile = useMobileDesign(1488);
  const [aiThinking, setAiThinking] = useState(false);

  let worker: Worker;

  if (typeof window !== "undefined") {
    worker = new Worker(new URL("/build/rapfi-single.js", import.meta.url), {
      type: "module",
    });

    worker.onmessage = (event) => {
      console.log("Worker message received:", event.data);
    };
  }

  const handleTileClick = (x: number, y: number) => {
    if (!tiles[x][y] && !winner && !aiThinking) {
      addTile(x, y, switchColor);
      setSwitchColor(switchColor === "black" ? "white" : "black");
    }
  };

  const handleAITurn = () => {
    if (winner || aiThinking) return;

    setAiThinking(true);

    // Send the AI command
    worker.postMessage("YXNBEST 1");

    // Handle response
    worker.onmessage = (event) => {
      const response = event.data;

      console.log("AI Worker Response:", response);

      if (response.pos) {
        const [x, y] = response.pos;
        if (!tiles[x][y]) {
          addTile(x, y, switchColor);
          setSwitchColor(switchColor === "black" ? "white" : "black");
        }
      } else if (response.error) {
        console.error("AI Engine Error:", response.error);
      }

      setAiThinking(false);
    };
  };

  useEffect(() => {
    // Cleanup worker on component unmount
    return () => {
      console.log("Terminating worker");
      worker.terminate();
    };
  }, []);

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
        {!winner && !aiThinking && (
          <button
            onClick={handleAITurn}
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          >
            AI Turn
          </button>
        )}
        {aiThinking && (
          <div className="mt-4 text-center text-lg text-amber-400">
            {"AI is thinking..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGame;
