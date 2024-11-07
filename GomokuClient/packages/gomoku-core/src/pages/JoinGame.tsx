import { useParams } from "@tanstack/react-router";
import { Chat } from "@/features/Chat";
import { useChat } from "@/hooks/useChat";
import { useAuthToken, useSignalRConnection } from "@/context";
import { Board, BoardProps } from "@/features/Board/Board";
import { useMobileDesign } from "@/hooks/useMobileDesign";
import { useJoinGame } from "@/hooks/useJoinGame";
import { SwaggerTypes } from "@/api";
import { GameTime, GameTimeProps } from "@/features/GameTime";
import { GameTimeMobile } from "@/features/GameTime/mobile/GameTimeMobile";
import { RematchAlert } from "@/shared/ui/rematch-alert";
import { useCallback } from "react";

interface JoinGameProps {
  gameHistory: SwaggerTypes.GetGameHistoryResponse;
  playerID?: string;
}

const JoinGame = ({ gameHistory, playerID }: JoinGameProps) => {
  const { gameID } = useParams({ from: "/game/join/$gameID" });
  const { jwtDecodedInfo } = useAuthToken();
  const isMobile = useMobileDesign(1488);

  const {
    tiles,
    lastTile,
    handleMove,
    moves,
    winningSequence,
    rematchRequested,
    setRematchRequested,
    clock,
    players,
  } = useJoinGame(gameID, gameHistory, playerID);

  const { hubProxy } = useSignalRConnection();

  const { sendMessage, messages, isConnected } = useChat(
    gameID,
    jwtDecodedInfo?.username,
  );

  const commonGameTimeProps: Omit<
    GameTimeProps,
    "players" | "blackTimeLeft" | "whiteTimeLeft"
  > = {
    moves:
      moves.length > 0
        ? [...transformMoves(gameHistory.movesHistory), ...moves]
        : transformMoves(gameHistory.movesHistory),
    activePlayer: "KEK",
    onSkip: () => alert("Skip clicked"),
    //TODO: align IDs to match gameId and ID the ID letters to same cases
    onFlag: () => hubProxy?.resign({ gameId: gameID }),
    onReset: () => alert("Reset clicked"),
    onUndo: () => alert("Undo clicked"),
    onRematch: () => hubProxy?.requestRematch({ gameId: gameID }),
  };

  const playerClock: Partial<
    Pick<GameTimeProps, "blackTimeLeft" | "whiteTimeLeft">
  > = {
    whiteTimeLeft:
      clock?.white || gameHistory.timeControl?.initialTimeInSeconds,
    blackTimeLeft:
      clock?.black || gameHistory.timeControl?.initialTimeInSeconds,
  };

  const onTileCLick = useCallback<BoardProps["onTileClick"]>(
    (x, y) => handleMove(x, y),
    [handleMove],
  );

  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      {rematchRequested && (
        <RematchAlert
          onAccept={() => {
            hubProxy?.approveRematch({ gameId: gameID });
          }}
          onDecline={() => {
            setRematchRequested(false);
          }}
        />
      )}
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
                  <GameTimeMobile
                    opponentView
                    {...commonGameTimeProps}
                    player={players.black}
                    //TODO: we should not pass both one of them should be required both not both at same time
                    timeLeft={playerClock.whiteTimeLeft}
                  />
                )}
              </div>
              <Board
                tiles={tiles}
                lastTile={lastTile}
                size={gameHistory.boardSize || 19}
                onTileClick={onTileCLick}
                style={{ order: isMobile ? 1 : "unset" }}
                winningSequence={gameHistory.winningSequence ?? winningSequence}
              />
              <div
                className={isMobile ? "mt-4 flex w-full justify-center" : ""}
              >
                {isMobile && (
                  <GameTimeMobile
                    {...commonGameTimeProps}
                    player={players.white}
                    //TODO: we should not pass both one of them should be required both not both at same time
                    timeLeft={playerClock.blackTimeLeft}
                  />
                )}
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
                <GameTime
                  {...commonGameTimeProps}
                  players={players}
                  blackTimeLeft={playerClock.blackTimeLeft}
                  whiteTimeLeft={playerClock.whiteTimeLeft}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
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
