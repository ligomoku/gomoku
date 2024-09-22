import { useEffect, useState } from "react";
import Square from "@/features/Square/Square.tsx";
import { useBoard } from "../hooks/useBoard.ts";
import { Timer } from "@/features/Timer";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateGameResponse,
  getApiGameByGameId,
  GetApiGameByGameIdError,
  GetApiGameByGameIdResponse,
  postApiGame,
  PostApiGameError,
} from "@/api/client";
import { Chat } from "@/features/Chat";

const Game = () => {
  const { board, winner, handlePieceClick } = useBoard();
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);

  const createGame = useCreateGame();
  const { data: gameData, isLoading: gameLoading } =
    useFetchGame(currentGameId);

  useEffect(() => {
    if (gameData) {
      console.log("Game data received: ", gameData);
    }
  }, [gameData]);

  const handleCreateGame = () => {
    createGame.mutate(
      { boardSize: 19 },
      {
        onSuccess: (data) => {
          if (data?.gameId) {
            setCurrentGameId(data.gameId);
            console.log("Game created with id: ", data.gameId);
          }
        },
      },
    );
  };

  const handleMove = (row: number, col: number, value: string | null) => {
    if (winner || value) return;
    handlePieceClick(row, col, value);
  };

  if (gameLoading) {
    return <div>Loading game data...</div>;
  }

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

Game.displayName = "Game";

const useCreateGame = () =>
  useMutation<
    CreateGameResponse | undefined,
    PostApiGameError,
    { boardSize: number }
  >({
    mutationFn: async ({ boardSize }) => {
      const response = await postApiGame({
        body: { boardSize },
        headers: {
          "X-Version": "1",
          //TODO: Add the content type header to Swagger schema as required
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });

const useFetchGame = (gameId: string | null) =>
  useQuery<
    GetApiGameByGameIdResponse,
    GetApiGameByGameIdError,
    GetApiGameByGameIdResponse,
    [string, string | null]
  >({
    queryKey: ["game", gameId],
    queryFn: async () => {
      if (!gameId) {
        throw new Error("Game ID is required");
      }
      const response = await getApiGameByGameId({
        path: { gameId },
        headers: {
          "X-Version": "1",
          //TODO: Add the content type header to Swagger schema as required
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          "Content-Type": "application/json",
        },
      });

      if (!response.data) {
        throw new Error("Invalid game data received");
      }

      return response.data;
    },
    enabled: !!gameId,
  });

export default Game;
