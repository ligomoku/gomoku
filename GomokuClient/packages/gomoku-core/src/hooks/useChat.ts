import { useEffect, useState } from "react";
import { useSignalRConnection } from "@/context";

export const useChat = () => {
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

      // Cleanup to prevent double registration
      return () => {
        if (typeof unregister === "function") {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          unregister();
        }
      };
    }
  }, [isConnected, connection, registerEventHandlers]);

  useEffect(() => {
    console.log("Chat messages:", messages);
  }, [messages]);

  const sendMessage = async (gameId: string, user: string, message: string) => {
    if (connection && isConnected) {
      try {
        const messageRequest = {
          gameId,
          user,
          message,
        };
        await connection.invoke("SendMessage", messageRequest);
      } catch (error) {
        console.error("Sending message failed: ", error);
      }
    }
  };

  return { sendMessage, messages, isConnected, connection };
};
