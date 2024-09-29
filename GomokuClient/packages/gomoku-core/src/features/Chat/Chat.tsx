import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { useAuthToken, useSignalRConnection } from "@/context";

export const Chat = () => {
  const { jwtDecodedInfo } = useAuthToken();
  const { connection } = useSignalRConnection();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR hub");
          setIsConnected(true);

          //TODO: wait for backend implementation for ReceiveMessage event
          connection.on("ReceiveMessage", (user: string, message: string) => {
            setMessages((prevMessages) => [
              ...prevMessages,
              `${user}: ${message}`,
            ]);
          });
        })
        .catch((error) => console.error("Connection failed: ", error));

      return () => {
        connection
          .stop()
          .then(() => console.log("Disconnected from SignalR hub"));
      };
    }
  }, [connection]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    if (!jwtDecodedInfo?.username) {
      console.error("User information is missing. Cannot send message.");
      return;
    }

    if (connection && isConnected) {
      connection
        //TODO: wait for backend implementation for SendMessage event
        .send("SendMessage", jwtDecodedInfo.username, messageInput)
        .then(() => {
          setMessageInput("");
        })
        .catch((error) => console.error("Sending message failed: ", error));
    }
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
