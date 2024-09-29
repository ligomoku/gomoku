import { useEffect } from "react";
import Square from "@/features/Square/Square";
import { useBoard } from "@/hooks/useBoard";
import { Timer } from "@/features/Timer";
import { useMutation } from "@tanstack/react-query";
import {
  CreateGameResponse,
  postApiGame,
  PostApiGameError,
} from "@/api/client";
import { Chat } from "@/features/Chat";
import { useParams } from "@tanstack/react-router";

const JoinGame = () => {
  const { board, winner, handlePieceClick } = useBoard();
  //TODO: check for better way to get gameID from url, should be considered routing file params loaders
  const { gameID } = useParams({ strict: false });

  const createGame = useCreateGame(localStorage.getItem("jwtToken") || "");

  useEffect(() => {
    if (!gameID) {
      console.log("Game ID is not provided");
      handleCreateGame();
    }
  }, []);

  const handleCreateGame = () => {
    createGame.mutate({ boardSize: 19 });
  };

  const handleMove = (row: number, col: number, value: string | null) => {
    if (winner || value) return;
    handlePieceClick(row, col, value);
  };

  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      <div className="font-open-sans flex flex-col items-center p-4 font-light">
        <div className="mb-5 text-center">
          {winner && (
            <div className="mb-2 text-2xl">The Winner is: {winner}!</div>
          )}
        </div>

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

JoinGame.displayName = "JoinGame";

const useCreateGame = (authToken: string) =>
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
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });

export default JoinGame;
