import { client } from "./api/client";
import Square from "./components/Square/Square";
import { useBoard } from "./hooks/useBoardLocal";
import { Header } from "@/components/Header";
import { Chat } from "@/components/Chat";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";

client.setConfig({ baseUrl: import.meta.env.VITE_API_URL });

const App = () => {
  const { board, winner, handlePieceClick, playAgain } = useBoard();

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Header />
      <div className="font-open-sans font-light p-4 flex flex-col items-center">
        <div className="text-center mb-5">
          {winner && (
            <div className="text-2xl mb-2">The Winner is: {winner}!</div>
          )}
        </div>
        <div className="flex justify-center flex-wrap w-full mb-5">
          <div className="grid grid-cols-19">
            {board.map((row, rowIndex) => (
              <div className="flex" key={rowIndex}>
                {row.map((col, colIndex) => (
                  <Square
                    key={`${rowIndex}-${colIndex}`}
                    row={rowIndex}
                    col={colIndex}
                    value={col}
                    onClick={handlePieceClick}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="ml-4 flex flex-col justify-between">
            <Card className="p-4 bg-white">
              <h2 className="text-2xl font-semibold mb-4">Timer</h2>
              <div className="text-4xl font-mono mb-4">{formatTime(time)}</div>
              <div className="flex flex-col gap-2">
                <Button onClick={startTimer} disabled={isRunning}>
                  Start
                </Button>
                <Button onClick={stopTimer} disabled={!isRunning}>
                  Stop
                </Button>
                <Button onClick={resetTimer}>Reset</Button>
                <Button className="mt-4" onClick={playAgain}>
                  Play again
                </Button>
              </div>
              <br />
              <Chat />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
