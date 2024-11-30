import { AlertDialog, toaster } from "@gomoku/story";
import { GamePlayersInfo } from "@gomoku/story";
import { GameTime, GameTimeMobile, Board } from "@gomoku/story";
import { Chat } from "@gomoku/story";
import { useParams } from "@tanstack/react-router";

import type { components } from "@gomoku/api/client/schema";
import type { GameTimeProps } from "@gomoku/story";

import { useAuthToken } from "@/context";
import { useChat, useJoinGame, useMobileDesign } from "@/hooks";

interface JoinGameProps {
  gameHistory: components["schemas"]["GetGameHistoryResponse"];
}

const JoinGame = ({ gameHistory }: JoinGameProps) => {
  const { gameID } = useParams({
    from: "/game/join/$gameID",
  });
  const { jwtDecodedInfo } = useAuthToken();
  const isMobile = useMobileDesign(1488);

  const {
    hubProxy,
    tiles,
    lastTile,
    handleMove,
    moves,
    winningSequence,
    undoRequested,
    setUndoRequested,
    rematchRequested,
    setRematchRequested,
    clock,
    players,
  } = useJoinGame(gameID, gameHistory);

  const { sendMessage, messages, isConnected } = useChat(
    gameID,
    jwtDecodedInfo?.username,
  );

  const commonGameTimeProps: Omit<
    GameTimeProps,
    "players" | "blackTimeLeft" | "whiteTimeLeft" | "clock"
  > = {
    moves:
      moves.length > 0
        ? [...transformMoves(gameHistory.movesHistory), ...moves]
        : transformMoves(gameHistory.movesHistory),
    onSkip: () => alert("Skip clicked"),
    //TODO: align IDs to match gameId and ID the ID letters to same cases
    onFlag: () => hubProxy?.resign({ gameId: gameID }),
    onReset: () => alert("Reset clicked"),
    onUndo: () => {
      hubProxy?.requestUndo({ gameId: gameID });
      toaster.show("Undo request sent");
    },
    onRematch: () => {
      hubProxy?.requestRematch({
        gameId: gameID,
      });
      toaster.show("Rematch request sent");
    },
  };

  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      {rematchRequested && (
        <AlertDialog
          title="Rematch Request"
          secondaryTitle="Your opponent is requesting a rematch"
          text="Would you like to play another game with the same settings?"
          acceptButtonText="Accept"
          onAccept={() => {
            hubProxy?.approveRematch({
              gameId: gameID,
            });
          }}
          declineButtonText="Decline"
          onDecline={() => {
            setRematchRequested(false);
          }}
        />
      )}
      {undoRequested && (
        <AlertDialog
          title="Undo Request"
          secondaryTitle="Your opponent is requesting a undo"
          text="Would you like to undo last move?"
          acceptButtonText="Accept"
          onAccept={() => {
            hubProxy?.approveUndo({
              gameId: gameID,
            });
          }}
          declineButtonText="Decline"
          onDecline={() => {
            setUndoRequested(false);
          }}
        />
      )}
      <div className="font-open-sans flex flex-col items-center p-4 font-light">
        {gameID && (
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
              <GamePlayersInfo
                gameType={`${gameHistory.boardSize}x${gameHistory.boardSize}`}
                players={[
                  {
                    title: "black",
                    name: players.black?.userName || "Anonymous",
                    isCurrentPlayer: false,
                    color: "black",
                  },
                  {
                    title: "white",
                    name: players.white?.userName || "Anonymous",
                    isCurrentPlayer: true,
                    color: "white",
                  },
                ]}
              />
              <div className="mt-4 flex flex-col justify-between">
                <Chat
                  messages={messages}
                  isConnected={isConnected}
                  sendMessage={sendMessage}
                  username={jwtDecodedInfo?.username || ""}
                  texts={{
                    title: "Chat",
                    inputPlaceholder: "Type a message...",
                    sendButtonText: "Send",
                    sendingButtonText: "Sending...",
                    charactersText: "characters",
                    connectingText: "Connecting...",
                    noMessagesText: "No messages yet. Start the conversation!",
                    errorSendingMessage: "Error sending message",
                  }}
                />
              </div>
            </div>
            <div className={isMobile ? "mb-4 flex w-full justify-center" : ""}>
              {isMobile && (
                <GameTimeMobile
                  opponentView
                  {...commonGameTimeProps}
                  player={players.black}
                  //TODO: we should not pass both one of them should be required both not both at same time
                  timeLeft={clock?.black}
                />
              )}
            </div>
            <Board
              tiles={tiles}
              lastTile={lastTile}
              size={gameHistory.boardSize || 19}
              onTileClick={handleMove}
              style={{
                order: isMobile ? 1 : "unset",
              }}
              winningSequence={gameHistory.winningSequence ?? winningSequence}
            />
            <div className={isMobile ? "mt-4 flex w-full justify-center" : ""}>
              {isMobile && (
                <GameTimeMobile
                  {...commonGameTimeProps}
                  player={players.white}
                  //TODO: we should not pass both one of them should be required both not both at same time
                  timeLeft={clock?.white}
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
                clock={clock}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const transformMoves = (
  movesHistory: components["schemas"]["GetGameHistoryResponse"]["movesHistory"],
) => {
  const movesArray: string[] = [];
  for (const move in movesHistory) {
    movesArray.push(`x${movesHistory[move].x} - y${movesHistory[move].y}`);
  }
  return movesArray;
};

JoinGame.displayName = "JoinGame";

export default JoinGame;
