import { useParams } from "@tanstack/react-router";
import { Chat } from "@/features/Chat";
import { useJoinGame } from "@/hooks/useJoinGame";
import MobileSquare from "@/features/Square/Mobile/MobileSquare";
import { useMobileDesign } from "@/hooks/useMobileDesign";
import { useChat } from "@/hooks/useChat";
import { useAuthToken } from "@/context";
import { Board } from "@/pages/Board";

const JoinGame = () => {
  const { gameID } = useParams({ strict: false });
  const { board, handleMove } = useJoinGame(gameID!);
  const isMobile = useMobileDesign();
  const { jwtDecodedInfo } = useAuthToken();

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
                tiles={board}
                size={19}
                onTileClick={(x, y) => handleMove(x, y)}
              />

              <div className="ml-4 flex flex-col justify-between">
                <br />
                <br />
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
