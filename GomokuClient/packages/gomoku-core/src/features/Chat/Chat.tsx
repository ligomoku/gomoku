import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useChat } from "@/hooks/useChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { useAuthToken } from "@/context";

export const Chat = ({ gameID }: { gameID: string }) => {
  const { jwtDecodedInfo } = useAuthToken();
  const [messageInput, setMessageInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { sendMessage, messages, isConnected } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (jwtDecodedInfo?.username && messageInput.trim()) {
      setIsSending(true);
      try {
        await sendMessage(gameID, jwtDecodedInfo.username, messageInput);
        setMessageInput("");
      } catch (error) {
        console.error("Failed to send message", error);
      } finally {
        setIsSending(false);
      }
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 rounded-md border px-3 py-2"
                placeholder="Type a message..."
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || isSending}
              >
                {isSending ? "Sending..." : "Send"}
              </Button>
            </div>
            <ScrollArea
              ref={scrollAreaRef}
              className="h-[200px] w-full overflow-y-auto rounded-md border p-4"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 rounded p-2 ${
                    msg.startsWith(`${jwtDecodedInfo?.username}:`)
                      ? "bg-blue-100 text-blue-900"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {msg}
                </div>
              ))}
            </ScrollArea>
          </div>
        ) : (
          <div>Connecting...</div>
        )}
      </CardContent>
    </Card>
  );
};
