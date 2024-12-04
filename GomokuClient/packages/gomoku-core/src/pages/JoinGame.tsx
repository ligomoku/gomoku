import { AlertDialog, toaster } from "@gomoku/story";
import { GamePlayersInfo } from "@gomoku/story";
import { GameTime, GameTimeMobile, Board } from "@gomoku/story";
import { Chat } from "@gomoku/story";
import { useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import type { SwaggerTypes } from "@gomoku/api";
import type { GameTimeProps } from "@gomoku/story";

import { useAuthToken } from "@/context";
import { useChat, useJoinGame, useMobileDesign } from "@/hooks";

interface JoinGameProps {
  gameHistory: SwaggerTypes.GetGameHistoryResponse;
}

const JoinGame = ({ gameHistory }: JoinGameProps) => {
  const { gameID } = useParams({
    from: "/game/join/$gameID",
  });
  const { jwtDecodedInfo } = useAuthToken();
  const isMobile = useMobileDesign(1488);

  const [bothPlayersJoined, setBothPlayersJoined] = useState(false);

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

  useEffect(() => {
    if (players.black && players.white) {
      setBothPlayersJoined(true);
    }
  }, [players]);

  const commonGameTimeProps: Omit<
    GameTimeProps,
    "players" | "blackTimeLeft" | "whiteTimeLeft" | "clock"
  > = {
    moves:
      moves.length > 0
        ? [...transformMoves(gameHistory.movesHistory), ...moves]
        : transformMoves(gameHistory.movesHistory),
    onSkip: () => alert("Skip clicked"),
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
    currentPlayer:
      players.black?.playerId === jwtDecodedInfo?.userId ? "black" : "white",
  };

  const isCurrentPlayerBlack =
    players.black?.playerId === jwtDecodedInfo?.userId;

  const currentPlayer = isCurrentPlayerBlack ? players.black : players.white;
  const opponentPlayer = isCurrentPlayerBlack ? players.white : players.black;
  const currentPlayerClock = isCurrentPlayerBlack ? clock?.black : clock?.white;
  const opponentClock = isCurrentPlayerBlack ? clock?.white : clock?.black;

  const orderedPlayers = [
    {
      title: isCurrentPlayerBlack ? "white" : "black",
      name: opponentPlayer?.userName || "Anonymous",
      isCurrentPlayer: false,
      color: isCurrentPlayerBlack ? "white" : "black",
    },
    {
      title: isCurrentPlayerBlack ? "black" : "white",
      name: currentPlayer?.userName || "Anonymous",
      isCurrentPlayer: true,
      color: isCurrentPlayerBlack ? "black" : "white",
    },
  ];

  const orderedPlayersObject = {
    black: isCurrentPlayerBlack ? currentPlayer : opponentPlayer,
    white: isCurrentPlayerBlack ? opponentPlayer : currentPlayer,
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
                players={orderedPlayers}
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
                  player={opponentPlayer}
                  timeLeft={opponentClock}
                />
              )}
            </div>
            <Board
              tiles={tiles}
              lastTile={lastTile}
              size={gameHistory.boardSize || 19}
              onTileClick={bothPlayersJoined ? handleMove : undefined}
              style={{
                order: isMobile ? 1 : "unset",
              }}
              winningSequence={gameHistory.winningSequence ?? winningSequence}
            />
            <div className={isMobile ? "mt-4 flex w-full justify-center" : ""}>
              {isMobile && (
                <GameTimeMobile
                  {...commonGameTimeProps}
                  player={currentPlayer}
                  timeLeft={currentPlayerClock}
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
                players={orderedPlayersObject}
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
