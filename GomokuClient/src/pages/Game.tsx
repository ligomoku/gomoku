import { useState } from "react";
import Square from "@/features/Square/Square.tsx";
import { useBoard } from "../hooks/useBoard.ts";
import { Timer } from "@/features/Timer";
import { useMutation } from "@tanstack/react-query";
import {
  CreateGameResponse,
  postApiV2Game,
  PostApiV2GameError,
} from "@/api/client";
import { Chat } from "@/features/Chat";

const Game = () => {
  const { board, winner, handlePieceClick } = useBoard();
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);

  const createGame = useCreateGame();

  const handleCreateGame = () => {
    createGame.mutate(
      {
        //TODO: Add boardSize to Swagger schema as required parameter, otherwise API returns weird error
        boardSize: 19,
      },
      {
        onSuccess: (data) => {
          if (data?.gameId) {
            setCurrentGameId(data.gameId);
          }
        },
      },
    );
  };

  const handleMove = (row: number, col: number, value: string | null) => {
    if (winner || value) return;
    handlePieceClick(row, col, value);
  };

  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      <div className="font-open-sans flex flex-col items-center p-4 font-light">
        {!currentGameId && (
          <button
            onClick={handleCreateGame}
            className="mb-5 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Create Game
          </button>
        )}

        <div className="mb-5 text-center">
          {winner && (
            <div className="mb-2 text-2xl">The Winner is: {winner}!</div>
          )}
        </div>

        {currentGameId && (
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
              <Timer />
              <br />
              <Chat />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const useCreateGame = () => {
  return useMutation<
    CreateGameResponse | undefined,
    PostApiV2GameError,
    { boardSize: number }
  >({
    mutationFn: async ({ boardSize }) => {
      const response = await postApiV2Game({
        body: { boardSize }, // Send the board size in the request body
        headers: {
          "X-Version": "2",
          //TODO: Add the content type header to Swagger schema as required
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });
};

export default Game;
