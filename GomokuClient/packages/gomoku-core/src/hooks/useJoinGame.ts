import { useEffect } from "react";
import { useBoard } from "@/hooks/useBoard";
import { typedStorage } from "@/shared/lib/utils";
import { useSignalRConnection } from "@/context";
import * as signalR from "@microsoft/signalr";

export const useJoinGame = (gameID: string) => {
  const { board, winner, addPiece } = useBoard(gameID);
  const { connection, isConnected, registerEventHandlers } =
    useSignalRConnection();

  useEffect(() => {
    const previousGameID = typedStorage.getItem("currentGameID");
    if (previousGameID && previousGameID !== gameID) {
      // TODO: Improve this logic by fetching if the game is available and if not, remove data
      typedStorage.removeItem(`gameBoard_${previousGameID}`);
      typedStorage.removeItem(`nextTurn_${previousGameID}`);
    }
    typedStorage.setItem("currentGameID", gameID);
  }, [gameID]);

  useEffect(() => {
    if (isConnected && gameID) {
      connection?.invoke("JoinGameGroup", gameID);

      return registerEventHandlers({
        onPlayerJoined: ({ userName }) => {
          console.log(`Player ${userName} joined game.`);
        },
        onGameStarted: ({ isMyMoveFirst }) => {
          if (isMyMoveFirst) {
            alert("It's your turn. Place your tile");
          } else {
            alert("Wait for your opponent move");
          }
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

  return { board, winner, handleMove };
};
