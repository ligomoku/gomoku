import { client } from "./api/client";
import Square from "./components/Square/Square";
import { useBoard } from "./hooks/useBoardLocal";
import { useSignalR } from "./hooks/useSignlarR.ts";
import { Header } from "@/components/Header";

client.setConfig({ baseUrl: import.meta.env.VITE_API_URL });

const App = () => {
  const { board, winner, handlePieceClick, playAgain } = useBoard();
  const { sendMessage, messages, isConnected } = useSignalR();

  const handleSendMessage = () => {
    sendMessage("User1", "Hello from Gomoku!");
  };

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
        <div className="mt-5 border border-gray-300 p-4 w-full max-w-xl text-center">
          {isConnected ? (
            <button
              className="text-lg font-open-sans cursor-pointer my-5 mx-auto rounded bg-gray-300 text-gray-700 transition duration-300 p-2 border border-gray-300 hover:bg-gray-200"
              onClick={handleSendMessage}
            >
              Send Test Message
            </button>
          ) : (
            <div>Connecting...</div>
          )}
          <h3>Messages</h3>
          <ul>
            {messages.map((msg, index) => (
              <li key={msg + index}>{msg}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
