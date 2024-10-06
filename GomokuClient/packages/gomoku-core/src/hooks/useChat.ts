import { useEffect, useState } from "react";
import { useSignalRConnection } from "@/context";

export const useChat = (gameID?: string, username?: string) => {
  const { connection, isConnected, registerEventHandlers } =
    useSignalRConnection();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (isConnected && connection) {
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
  }, [isConnected, connection, registerEventHandlers]);

  const sendMessage = async (message: string) => {
    if (connection && isConnected && gameID && username) {
      try {
        const messageRequest = {
          gameId: gameID,
          user: username,
          message,
        };
        await connection.invoke("SendMessage", messageRequest);
      } catch (error) {
        console.error("Sending message failed: ", error);
      }
    }
  };

  return { sendMessage, messages, isConnected };
};
