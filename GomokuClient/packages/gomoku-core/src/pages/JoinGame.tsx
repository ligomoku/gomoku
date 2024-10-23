import { useParams } from "@tanstack/react-router";
import { Chat } from "@/features/Chat";
import { useChat } from "@/hooks/useChat";
import { useAuthToken } from "@/context";
import { Board } from "@/features/Board/Board";
import { useMobileDesign } from "@/hooks/useMobileDesign";
import { useJoinGame } from "@/hooks/useJoinGame";
import { SwaggerTypes } from "@/api";
import { Dispatch, SetStateAction, useEffect } from "react";
import { genParser } from "@/utils/getParser";
import { GameTime } from "@/features/GameTime";
import { TileColor } from "@/hooks/useTiles";

interface JoinGameProps {
  gameHistory: SwaggerTypes.GetGameHistoryResponse;
}

const JoinGame = ({ gameHistory }: JoinGameProps) => {
  const { gameID } = useParams({ from: "/game/join/$gameID" });
  const { jwtDecodedInfo } = useAuthToken();
  const isMobile = useMobileDesign(1180);
  const { tiles, lastTile, handleMove, setTiles, setLastTile } = useJoinGame(
    gameID,
    gameHistory.boardSize,
  );

  useInitialStateGameHistory(gameHistory, setTiles, setLastTile);

  const { sendMessage, messages, isConnected } = useChat(
    gameID,
    jwtDecodedInfo?.username,
  );

  const transformMoves = (
    movesHistory: SwaggerTypes.GetGameHistoryResponse["movesHistory"],
  ) => {
    const movesArray: string[] = [];
    for (const move in movesHistory) {
      movesArray.push(`x${movesHistory[move].x} - y${movesHistory[move].y}`);
    }
    return movesArray;
  };

  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      <div className="font-open-sans flex flex-col items-center p-4 font-light">
        {gameID && (
          <>
            <div className="mb-5 flex w-full flex-wrap justify-center">
              <div
                className="mt-4 flex flex-col justify-between"
                style={{
                  order: isMobile ? 2 : "unset",
                  marginRight: isMobile ? 0 : "1rem",
                  width: isMobile ? "100%" : "unset",
                }}
              >
                <Chat
                  messages={messages}
                  isConnected={isConnected}
                  sendMessage={sendMessage}
                  username={jwtDecodedInfo?.username || ""}
                />
              </div>

              <Board
                tiles={tiles}
                lastTile={lastTile}
                size={gameHistory.boardSize || 19}
                onTileClick={(x, y) => handleMove(x, y)}
                style={{ order: isMobile ? 1 : "unset" }}
              />
              <div
                className="mt-4 flex flex-col justify-between"
                style={{
                  order: isMobile ? 3 : "unset",
                  marginLeft: isMobile ? 0 : "1rem",
                  width: isMobile ? "100%" : "unset",
                  display: isMobile ? "none" : "unset",
                }}
              >
                <GameTime
                  moves={transformMoves(gameHistory.movesHistory)}
                  currentPlayer="black"
                  players={[
                    {
                      name: gameHistory.players.black || "Anonymous",
                      color: "#7cb342",
                    },
                    {
                      name: gameHistory.players.white || "Anonymous",
                      color: "#b0b0b0",
                    },
                  ]}
                  initialTimeInSeconds={100}
                  clockTime="01:00"
                  onAddMove={() => alert("Add move clicked")}
                  onUndo={() => alert("Undo clicked")}
                  onSkip={(direction) => alert(`Skip ${direction} clicked`)}
                  onFlag={() => alert("Flag clicked")}
                  onReset={() => alert("Reset clicked")}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

//TODO: should be moved to router
const useInitialStateGameHistory = (
  gameHistory: JoinGameProps["gameHistory"],
  setTiles: Dispatch<SetStateAction<TileColor[][]>>,
  setLastTile: Dispatch<SetStateAction<SwaggerTypes.TileDto>>,
) => {
  //TODO: should be done without side effect
  useEffect(() => {
    if (gameHistory) {
      setTiles(genParser(gameHistory.gen));
      setLastTile(gameHistory.movesHistory[gameHistory.movesCount]);
    }
  }, [gameHistory, setTiles, setLastTile]);
};

JoinGame.displayName = "JoinGame";

export default JoinGame;
