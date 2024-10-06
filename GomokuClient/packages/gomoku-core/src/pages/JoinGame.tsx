import { useParams } from "@tanstack/react-router";
import { Chat } from "@/features/Chat";
import { useJoinGame } from "@/hooks/useJoinGame";
import MobileSquare from "@/features/Square/Mobile/MobileSquare";
import { useMobileDesign } from "@/hooks/useMobileDesign";
import { useChat } from "@/hooks/useChat";
import { useAuthToken } from "@/context";

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
              <div className="grid-cols-19 grid">
                {board.map((row, rowIndex) => (
                  <div className="flex" key={rowIndex}>
                    {row.map((col, colIndex) => (
                      <MobileSquare
                        key={`${rowIndex}-${colIndex}`}
                        row={rowIndex}
                        col={colIndex}
                        value={col}
                        onClick={() => handleMove(rowIndex, colIndex, col)}
                        size={isMobile ? 5 : 10}
                      />
                    ))}
                  </div>
                ))}
              </div>

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
