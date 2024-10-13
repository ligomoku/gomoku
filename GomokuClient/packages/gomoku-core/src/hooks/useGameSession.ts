import { useEffect } from "react";
import { TileColor, useTiles } from "@/hooks/useTiles";
import { getDefaultHeaders } from "@/shared/lib/utils";
import { useAuthToken, useSignalRConnection } from "@/context";
import { SwaggerServices, SwaggerTypes } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGameSession = (gameID?: string) => {
  const { tiles, setTiles, winner, addTile, lastTile, setLastTile } =
    useTiles();
  const { hubProxy, isConnected, registerEventHandlers } =
    useSignalRConnection();
  // const { jwtToken } = useAuthToken();

  // TODO: check server acceptance of empty string errors
  // const { data: gameHistory } = useGameHistory(gameID || "");
  // const { mutate: joinGame } = useJoinGame(jwtToken);

  // useEffect(() => {
  //   if (gameHistory && gameID) {
  //     if ((!gameHistory.players.black || !gameHistory.players.white)) joinGame(gameID);
  //
  //     setTiles(genToArray(gameHistory.gen));
  //     setLastTile(gameHistory.movesHistory[gameHistory.movesCount]);
  //   }
  // }, [gameHistory, setTiles, setLastTile, gameID, joinGame]);

  // useEffect(() => {
  //   if (isConnected && gameID && hubProxy) {
  //     hubProxy.joinGameGroup(gameID).catch((error) => {
  //       console.error("Error joining game group:", error);
  //     });
  //
  //     registerEventHandlers({
  //       onPlayerJoined: ({ userId }) => {
  //         console.log(`Player ${userId} joined game.`);
  //       },
  //       onGameStarted: ({ isMyMoveFirst }) => {
  //         if (isMyMoveFirst) {
  //           alert("It's your turn. Place your tile");
  //         } else {
  //           alert("Wait for your opponent's move");
  //         }
  //       },
  //       onPlayerMadeMove: ({ playerId, tile, placedTileColor }) => {
  //         console.log("Player made move:", playerId, tile, placedTileColor);
  //         addTile(tile.y, tile.x, placedTileColor as TileColor);
  //         setLastTile({ x: tile.x, y: tile.y });
  //       },
  //       onGameHubError: (error) => {
  //         console.warn("Error from game hub:", error.message);
  //       },
  //     });
  //   }
  // }, [
  //   hubProxy,
  //   isConnected,
  //   gameID,
  //   registerEventHandlers,
  //   addTile,
  //   setLastTile,
  // ]);

  useEffect(() => {
    if (winner) {
      alert(`The winner is: ${winner}`);
    }
  }, [winner]);

  const handleMove = async (x: number, y: number) => {
    if (!hubProxy || winner || !gameID) return;

    try {
      await hubProxy.makeMove({ gameId: gameID, x, y });
    } catch (error) {
      console.error("Error making move:", error);
    }
  };

  return { tiles, lastTile, winner, handleMove };
};

const useGameHistory = (gameID: string) =>
  useQuery<
    SwaggerTypes.GetApiGameByGameIdHistoryResponse,
    SwaggerTypes.GetApiGameByGameIdHistoryError,
    SwaggerTypes.GetApiGameByGameIdHistoryResponse,
    [string, string]
  >({
    queryKey: ["gameHistory", gameID],
    queryFn: async () => {
      const response = await SwaggerServices.getApiGameByGameIdHistory({
        headers: getDefaultHeaders(),
        path: { gameId: gameID },
      });

      if (!response.data) {
        throw new Error("Game history not received!");
      }

      return response.data;
    },
  });

const genToArray = (gen: string) => {
  const rowsAndMetadata = gen.split("/");
  const rows = gen.split("/").slice(0, rowsAndMetadata.length - 2);

  return rows.map((row) =>
    row.split("").map((char) => {
      if (char === "X") return "black";
      if (char === "O") return "white";
      return null;
    }),
  );
};

//TODO: we are already dublicating this as it exists in router
// const useJoinGame = (authToken: string) =>
//   useMutation<
//     SwaggerTypes.PostApiGameByGameIdJoinResponse,
//     SwaggerTypes.PostApiGameByGameIdJoinError,
//     string
//   >({
//     mutationFn: async (gameId) => {
//       const response = await SwaggerServices.postApiGameByGameIdJoin({
//         path: { gameId },
//         headers: getDefaultHeaders(authToken),
//       });
//
//       if (!response.data) {
//         throw new Error("Invalid game data received");
//       }
//
//       return response.data;
//     },
//   });
