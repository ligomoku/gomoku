import { useParams } from "@tanstack/react-router";
import { Chat } from "@/features/Chat";
import { useChat } from "@/hooks/useChat";
import { useAuthToken } from "@/context";
import { Board } from "@/features/Board/Board";
import { useMobileDesign } from "@/hooks/useMobileDesign";
import { useJoinGame } from "@/hooks/useJoinGame";
import { SwaggerTypes } from "@/api";
import { useEffect, useState } from "react";

interface JoinGameProps {
  gameHistory: SwaggerTypes.GetGameHistoryResponse | undefined;
}

const JoinGame = ({ gameHistory }: JoinGameProps) => {
  const { gameID } = useParams({ from: "/game/join/$gameID" });
  const { jwtDecodedInfo } = useAuthToken();
  const isMobile = useMobileDesign();
  const [dynamicBoardSize, setDynamicBoardSize] = useState(19);
  const { tiles, lastTile, handleMove, setTiles, setLastTile } = useJoinGame(
    gameID,
    dynamicBoardSize,
  );

  const { sendMessage, messages, isConnected } = useChat(
    gameID,
    jwtDecodedInfo?.username,
  );

  //TODO: should be done without side effect
  useEffect(() => {
    if (gameHistory) {
      setDynamicBoardSize(gameHistory.boardSize);
      setTiles(genToArray(gameHistory?.gen));
      setLastTile(gameHistory.movesHistory[gameHistory.movesCount]);
    }
  }, [gameHistory, setTiles, setLastTile]);

  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      <div className="font-open-sans flex flex-col items-center p-4 font-light">
        {gameID && (
          <>
            <div className="mb-5 flex w-full flex-wrap justify-center">
              <Board
                tiles={tiles}
                lastTile={lastTile}
                size={dynamicBoardSize}
                onTileClick={(x, y) => handleMove(x, y)}
              />

              <div
                className="mt-4 flex flex-col justify-between"
                style={{
                  marginLeft: isMobile ? 0 : "1rem",
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

JoinGame.displayName = "JoinGame";

const genToArray = (gen?: SwaggerTypes.GetGameHistoryResponse["gen"]) => {
  if (!gen) return [];
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

export default JoinGame;
