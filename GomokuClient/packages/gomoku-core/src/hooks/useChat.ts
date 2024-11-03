import { useEffect, useState } from "react";
import { useSignalRConnection } from "@/context";
import { notification } from "@/shared/ui/notification";
import { SignalClientMessages, SwaggerTypes } from "@/api";

export const useChat = (
  gameID?: SwaggerTypes.CreateGameResponse["gameId"],
  username?: SignalClientMessages.ChatMessageClientMessage["user"],
) => {
  const { hubProxy, isConnected, registerEventHandlers } =
    useSignalRConnection();
  const [messages, setMessages] = useState<
    SignalClientMessages.ChatMessageClientMessage["message"][]
  >([]);

  useEffect(() => {
    if (isConnected && hubProxy) {
      const unregister = registerEventHandlers({
        onReceiveMessage: ({ user, message }) => {
          const receivedMessage = `${user}: ${message}`;
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          console.debug("Received message:", receivedMessage);
        },
      });
      return () => {
        if (typeof unregister === "function") {
          unregister();
        }
      };
    }
    return;
  }, [hubProxy, isConnected, registerEventHandlers]);

  const sendMessage = async (
    message: SignalClientMessages.ChatMessageClientMessage["message"],
  ) => {
    if (hubProxy && isConnected && gameID) {
      try {
        await hubProxy.sendMessage({
          gameId: gameID,
          //TODO: ideally should take ID assigned by server
          user: username || "Anonymous",
          message,
        });
      } catch (error) {
        console.error("Sending message failed: ", error);
        notification.show("Error sending message", "error");
      }
    }
  };

  return { sendMessage, messages, isConnected };
};
