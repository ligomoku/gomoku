import Square from "@/features/Square/Square.tsx";
import { useBoard } from "../hooks/useBoardLocal.ts";
import { Timer } from "@/features/Timer";

const Game = () => {
  const { board, winner, handlePieceClick } = useBoard();

  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      <div className="font-open-sans flex flex-col items-center p-4 font-light">
        <div className="mb-5 text-center">
          {winner && (
            <div className="mb-2 text-2xl">The Winner is: {winner}!</div>
          )}
        </div>
        <div className="mb-5 flex w-full flex-wrap justify-center">
          <div className="grid-cols-19 grid">
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
            <Timer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
