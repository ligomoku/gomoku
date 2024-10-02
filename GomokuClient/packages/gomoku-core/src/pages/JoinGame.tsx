import { useEffect } from "react";
import Square from "@/features/Square/Square";
import { useBoard } from "@/hooks/useBoard";
import { Timer } from "@/features/Timer";
import { Chat } from "@/features/Chat";
import { useParams } from "@tanstack/react-router";
import { typedStorage } from "@/shared/lib/utils";
import { useSignalRConnection } from "@/context";
import * as signalR from "@microsoft/signalr";

const JoinGame = () => {
  const { gameID } = useParams({ strict: false });

  useEffect(() => {
    const previousGameID = typedStorage.getItem("currentGameID");
    if (previousGameID && previousGameID !== gameID) {
      // TODO: Improve this logic by fetching if the game is available and if not, remove data
      typedStorage.removeItem(`gameBoard_${previousGameID}`);
      typedStorage.removeItem(`nextTurn_${previousGameID}`);
    }
    typedStorage.setItem("currentGameID", gameID!);
  }, [gameID]);

  const { board, winner, addPiece } = useBoard(gameID!);

  const { connection, isConnected, registerEventHandlers } =
    useSignalRConnection();

  useEffect(() => {
    if (isConnected && gameID) {
      connection?.invoke("JoinGameGroup", gameID);

      return registerEventHandlers({
        onPlayerJoined: ({ userName }) => {
          console.log(`Player ${userName} joined game.`);
        },
        onPlayerMadeMove: ({ playerId, tile, placedTileColor }) => {
          console.log("Player made move:", playerId, tile, placedTileColor);
          addPiece(tile.y, tile.x, placedTileColor);
        },
        onGameHubError: (error) => {
          console.warn("Error from game hub:", error.message);
        },
      });
    }
  }, [connection, isConnected, gameID, registerEventHandlers, addPiece]);

  useEffect(() => {
    if (winner) alert(`The winner is: ${winner}`);
  }, [winner]);

  const handleMove = async (row: number, col: number, value: string | null) => {
    if (!connection || winner || value) return;

    if (connection.state !== signalR.HubConnectionState.Connected) {
      console.warn("Cannot make a move, SignalR connection is not connected.");
      return;
    }

    const makeMoveMessage = {
      gameId: gameID,
      x: row,
      y: col,
    };

    try {
      await connection.invoke("MakeMove", makeMoveMessage);
    } catch (error) {
      console.error("Error making move:", error);
    }
  };

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

export default JoinGame;
