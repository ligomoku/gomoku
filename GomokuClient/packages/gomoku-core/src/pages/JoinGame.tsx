import { useParams } from "@tanstack/react-router";
import { Chat } from "@/features/Chat";
import Square from "@/features/Square/Square";
import { useJoinGame } from "@/hooks/useJoinGame";

const JoinGame = () => {
  const { gameID } = useParams({ strict: false });
  const { board, handleMove } = useJoinGame(gameID!);

  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      <div className="font-open-sans flex flex-col items-center p-4 font-light">
        {gameID && (
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
                      onClick={() => handleMove(rowIndex, colIndex, col)}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="ml-4 flex flex-col justify-between">
              {/*<Timer />*/}
              <br />
              <br />
              <Chat gameID={gameID} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

JoinGame.displayName = "JoinGame";

export default JoinGame;
