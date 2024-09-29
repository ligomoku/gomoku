import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useContext, useEffect, useRef, useState, KeyboardEvent } from "react";
import { useChatSignalR } from "@/hooks/useSignlarR";
import { AuthTokenContext } from "@/context";

export const Chat = () => {
  const { jwtDecodedInfo } = useContext(AuthTokenContext);
  const [messageInput, setMessageInput] = useState("");
  const { sendMessage, messages, isConnected } = useChatSignalR();
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    console.log("JWT DECODED", jwtDecodedInfo);
    if (!jwtDecodedInfo?.username) {
      console.error("User information is missing. Cannot send message.");
      return;
    }

    sendMessage(jwtDecodedInfo.username, messageInput);
    setMessageInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
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
                onKeyDown={handleKeyDown}
                className="flex-1 rounded-md border px-3 py-2"
                placeholder="Type a message..."
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
              >
                Send
              </Button>
            </div>
            <ScrollArea
              className="h-[200px] w-full rounded-md border p-4"
              ref={scrollAreaRef}
            >
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div key={index} className="mb-2">
                    {msg}
                  </div>
                ))
              ) : (
                <div className="text-gray-500">
                  No messages yet. Start the conversation!
                </div>
              )}
            </ScrollArea>
          </div>
        ) : (
          <div>Connecting...</div>
        )}
      </CardContent>
    </Card>
  );
};
