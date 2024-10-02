import { useEffect, useState } from "react";
import { useSignalRConnection } from "@/context";

export const useChat = () => {
  const { connection, isConnected, registerEventHandlers } =
    useSignalRConnection();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (isConnected && connection) {
      const unregister = registerEventHandlers({
        onReceiveMessage: (user, message) => {
          const receivedMessage = `${user}: ${message}`;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        },
      });

      return () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (unregister) unregister();
      };
    }
  }, [isConnected, connection, registerEventHandlers]);

  const sendMessage = async (user: string, message: string) => {
    if (connection && isConnected) {
      try {
        await connection.invoke("ReceiveMessage", user, message);
      } catch (error) {
        console.error("Sending message failed: ", error);
      }
    }
  };

  return { sendMessage, messages, isConnected, connection };
};
