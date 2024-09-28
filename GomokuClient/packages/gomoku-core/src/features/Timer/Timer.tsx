import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { useEffect, useState } from "react";

const playAgain = () => {
  //ToDo: implement play again
  window.location.reload();
};

export const Timer = () => {
  // const { playAgain } = useBoard();

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
    <Card className="bg-white p-4">
      <h2 className="mb-4 text-2xl font-semibold">Timer</h2>
      <div className="mb-4 font-mono text-4xl">{formatTime(time)}</div>
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
    </Card>
  );
};
