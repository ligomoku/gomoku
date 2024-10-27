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
      registerEventHandlers({
        onReceiveMessage: ({ user, message }) => {
          const receivedMessage = `${user}: ${message}`;
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          console.debug("Received message:", receivedMessage);
        },
      });
    }
    //TODO: should be one dependecy ideally check by git commit history previous returning function solution
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

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
