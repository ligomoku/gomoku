import { client } from "./api/client";
import Square from "./components/Square/Square";
import { useBoard } from "./hooks/useBoardLocal";
import { Header } from "@/components/Header";
import { Chat } from "@/components/Chat";

client.setConfig({ baseUrl: import.meta.env.VITE_API_URL });

const App = () => {
  const { board, winner, handlePieceClick, playAgain } = useBoard();

  return (
    <>
      <Header />
      <div className="font-open-sans font-light p-4 flex flex-col items-center">
        <div className="text-center mb-5">
          {winner && (
            <div className="text-2xl mb-2">The Winner is: {winner}!</div>
          )}
          <button
            className="text-lg font-open-sans cursor-pointer my-5 mx-auto rounded bg-gray-300 text-gray-700 transition duration-300 p-2 border border-gray-300 hover:bg-gray-200"
            onClick={playAgain}
          >
            Play again
          </button>
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
        </div>
        <Chat />
      </div>
    </>
  );
};

export default App;
