import { useEffect, useState } from "react";
import { useSignalRConnection } from "@/context";

export const useChat = (gameID?: string, username?: string) => {
  const { hubProxy, isConnected, registerEventHandlers } =
    useSignalRConnection();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (isConnected && hubProxy) {
      const unregister = registerEventHandlers({
        onReceiveMessage: ({ user, message }) => {
          const receivedMessage = `${user}: ${message}`;
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          console.log("Received message:", receivedMessage);
        },
      });

      return () => {
        if (typeof unregister === "function") {
          unregister();
        }
      };
    }

    return undefined;
  }, [isConnected, hubProxy, registerEventHandlers]);

  const sendMessage = async (message: string) => {
    if (hubProxy && isConnected && gameID && username) {
      try {
        await hubProxy.sendMessage({
          gameId: gameID,
          user: username,
          message,
        });
      } catch (error) {
        console.error("Sending message failed: ", error);
      }
    }
  };

  return { sendMessage, messages, isConnected };
};
