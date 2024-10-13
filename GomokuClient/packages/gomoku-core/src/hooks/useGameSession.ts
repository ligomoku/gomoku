import { useEffect } from "react";
import { TileColor, useTiles } from "@/hooks/useTiles";
import { getDefaultHeaders } from "@/shared/lib/utils";
import { useSignalRConnection } from "@/context";
import { SwaggerServices } from "@/api";
import { genToArray } from "@/utils/gen.utility";

export const useGameSession = (gameID: string) => {
  const { tiles, setTiles, winner, addTile, lastTile, setLastTile } =
    useTiles();
  const { hubProxy, isConnected, registerEventHandlers } =
    useSignalRConnection();

  const getGameHistory = () => {
    SwaggerServices.getApiGameByGameIdHistory({
      headers: getDefaultHeaders(),
      path: { gameId: gameID },
    })
      .then((response) => {
        if (!response.data) {
          throw new Error("Game history not received!");
        }

        setTiles(genToArray(response.data.gen));
        setLastTile(response.data.movesHistory[response.data.movesCount]);
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    getGameHistory();
  }, [gameID]);

  useEffect(() => {
    if (isConnected && gameID && hubProxy) {
      hubProxy.joinGameGroup(gameID).catch((error) => {
        console.error("Error joining game group:", error);
      });

      return registerEventHandlers({
        onPlayerJoined: ({ userName }) => {
          console.log(`Player ${userName} joined game.`);
        },
        onGameStarted: ({ isMyMoveFirst }) => {
          if (isMyMoveFirst) {
            alert("It's your turn. Place your tile");
          } else {
            alert("Wait for your opponent's move");
          }
        },
        onPlayerMadeMove: ({ playerId, tile, placedTileColor }) => {
          console.log("Player made move:", playerId, tile, placedTileColor);
          addTile(tile.y, tile.x, placedTileColor as TileColor);
          setLastTile({ x: tile.x, y: tile.y });
        },
        onGameHubError: (error) => {
          console.warn("Error from game hub:", error.message);
        },
      });
    }
  }, [hubProxy, isConnected, gameID, registerEventHandlers, addTile]);

  useEffect(() => {
    if (winner) {
      alert(`The winner is: ${winner}`);
    }
  }, [winner]);

  const handleMove = async (x: number, y: number) => {
    if (!hubProxy || winner) return;

    const makeMoveMessage = {
      gameId: gameID,
      x,
      y,
    };

    try {
      await hubProxy.makeMove(makeMoveMessage);
    } catch (error) {
      console.error("Error making move:", error);
    }
  };

  return { tiles, lastTile, winner, handleMove };
};
