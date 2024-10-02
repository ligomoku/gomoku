import { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useChat } from "@/hooks/useChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { useAuthToken } from "@/context";

export const Chat = ({ gameID }: { gameID: string }) => {
  const { jwtDecodedInfo } = useAuthToken();
  const [messageInput, setMessageInput] = useState("");
  const { sendMessage, messages, isConnected } = useChat();

  const handleSendMessage = () => {
    if (jwtDecodedInfo?.username && messageInput.trim()) {
      sendMessage(gameID, jwtDecodedInfo.username, messageInput).then(() => {
        setMessageInput("");
      });
    }
  };

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
                disabled={!messageInput.trim()}
              >
                Send
              </Button>
            </div>
            <ScrollArea className="h-[200px] w-full overflow-y-auto rounded-md border p-4">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
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
