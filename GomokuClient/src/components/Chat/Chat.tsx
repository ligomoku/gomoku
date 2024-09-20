import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import { useSignalR } from "@/hooks/useSignlarR.ts";

export const Chat = () => {
  const [messageInput, setMessageInput] = useState("");
  const { sendMessage, messages, isConnected } = useSignalR();

  const handleSendMessage = () => {
    sendMessage("User1", "Hello from Gomoku!");
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
                className="flex-1 px-3 py-2 border rounded-md"
                placeholder="Type a message..."
              />
              <Button onClick={handleSendMessage}>Send</Button>
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
