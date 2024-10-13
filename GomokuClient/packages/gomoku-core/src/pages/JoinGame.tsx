import { useParams } from "@tanstack/react-router";
import { Chat } from "@/features/Chat";
import { useGameSession } from "@/hooks/useGameSession";
import { useChat } from "@/hooks/useChat";
import { useAuthToken } from "@/context";
import { Board } from "@/features/Board/Board";
import { useMobileDesign } from "@/hooks/useMobileDesign";
import { SwaggerTypes } from "@/api";

interface JoinGameProps {
  gameHistory: SwaggerTypes.GetGameHistoryResponse | undefined;
}

const JoinGame = ({ gameHistory }: JoinGameProps) => {
  const { gameID } = useParams({ from: "/game/join/$gameID" });
  const { tiles, lastTile, handleMove } = useGameSession(gameID);
  const { jwtDecodedInfo } = useAuthToken();
  const isMobile = useMobileDesign();

  const { sendMessage, messages, isConnected } = useChat(
    gameID,
    jwtDecodedInfo?.username,
  );

  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      <div className="font-open-sans flex flex-col items-center p-4 font-light">
        {gameID && (
          <>
            <div className="mb-5 flex w-full flex-wrap justify-center">
              <Board
                tiles={tiles}
                lastTile={lastTile}
                size={19}
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

export default JoinGame;
