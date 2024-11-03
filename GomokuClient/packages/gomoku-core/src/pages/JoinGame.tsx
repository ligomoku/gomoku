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
import { GameTime, GameTimeProps } from "@/features/GameTime";
import { TileColor } from "@/hooks/useTiles";
import { GameTimeMobile } from "@/features/GameTime/mobile/GameTimeMobile";

interface JoinGameProps {
  gameHistory: SwaggerTypes.GetGameHistoryResponse;
}

const JoinGame = ({ gameHistory }: JoinGameProps) => {
  const { gameID } = useParams({ from: "/game/join/$gameID" });
  const { jwtDecodedInfo } = useAuthToken();
  const isMobile = useMobileDesign(1488);

  const {
    tiles,
    lastTile,
    handleMove,
    setTiles,
    setLastTile,
    blackTimeLeft,
    whiteTimeLeft,
    activePlayer,
    moves,
    winningSequence,
  } = useJoinGame(gameID, gameHistory.boardSize, 300, 10);

  useInitialStateGameHistory(gameHistory, setTiles, setLastTile);

  const { sendMessage, messages, isConnected } = useChat(
    gameID,
    jwtDecodedInfo?.username,
  );

  const commonGameTimeProps: GameTimeProps = {
    moves:
      moves.length > 0
        ? [...transformMoves(gameHistory.movesHistory), ...moves]
        : transformMoves(gameHistory.movesHistory),
    players: [
      {
        name: gameHistory.players.black || "Anonymous",
        color: "#7cb342",
      },
      {
        name: gameHistory.players.white || "Anonymous",
        color: "#b0b0b0",
      },
    ],
    activePlayer: activePlayer!,
    whiteTimeLeft,
    blackTimeLeft,
    onSkip: () => alert("Skip clicked"),
    onFlag: () => alert("Flag clicked"),
    onReset: () => alert("Reset clicked"),
    onUndo: () => alert("Undo clicked"),
  };

  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      <div className="font-open-sans flex flex-col items-center p-4 font-light">
        {gameID && (
          <>
            <div
              className="mb-5 flex w-full flex-wrap justify-center"
              style={{
                alignItems: isMobile ? "unset" : "center",
              }}
            >
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
              <div
                className={isMobile ? "mb-4 flex w-full justify-center" : ""}
              >
                {isMobile && (
                  <GameTimeMobile opponentView {...commonGameTimeProps} />
                )}
              </div>
              <Board
                tiles={tiles}
                lastTile={lastTile}
                size={gameHistory.boardSize || 19}
                onTileClick={(x, y) => handleMove(x, y)}
                style={{ order: isMobile ? 1 : "unset" }}
                winningSequence={gameHistory.winningSequence ?? winningSequence}
              />
              <div
                className={isMobile ? "mt-4 flex w-full justify-center" : ""}
              >
                {isMobile && <GameTimeMobile {...commonGameTimeProps} />}
              </div>
              <div
                className="mt-4 flex flex-col justify-between"
                style={{
                  order: isMobile ? 3 : "unset",
                  marginLeft: isMobile ? 0 : "1rem",
                  width: isMobile ? "100%" : "unset",
                  display: isMobile ? "none" : "unset",
                }}
              >
                <GameTime {...commonGameTimeProps} />
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
  useEffect(() => {
    if (gameHistory) {
      setTiles(genParser(gameHistory.gen));
      setLastTile(gameHistory.movesHistory[gameHistory.movesCount]);
    }
  }, [gameHistory, setTiles, setLastTile]);
};

const transformMoves = (
  movesHistory: SwaggerTypes.GetGameHistoryResponse["movesHistory"],
) => {
  const movesArray: string[] = [];
  for (const move in movesHistory) {
    movesArray.push(`x${movesHistory[move].x} - y${movesHistory[move].y}`);
  }
  return movesArray;
};

JoinGame.displayName = "JoinGame";

export default JoinGame;
