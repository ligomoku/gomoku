import { useEffect, useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useChat } from "@/hooks/useChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { useAuthToken } from "@/context";

export const Chat = () => {
  const { jwtDecodedInfo } = useAuthToken();
  const [messageInput, setMessageInput] = useState("");
  const { sendMessage, messages, isConnected, connection } = useChat();

  useEffect(() => {
    if (connection) {
      connection.on("ReceiveMessage", (user, message) => {
        console.log("Received message from:", user, message);
      });

      return () => {
        connection.off("ReceiveMessage");
      };
    }
  }, [connection]);

  const handleSendMessage = async () => {
    if (jwtDecodedInfo?.username && messageInput.trim()) {
      await sendMessage(jwtDecodedInfo.username, messageInput);
      setMessageInput("");
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
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
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
