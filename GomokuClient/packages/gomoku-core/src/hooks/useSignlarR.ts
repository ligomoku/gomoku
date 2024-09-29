import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { MessagePackHubProtocol } from "@microsoft/signalr-protocol-msgpack";

export const useCustomSignalR = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null,
  );

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/gamehub`, {
        accessTokenFactory: () => {
          const token = localStorage.getItem("authToken");
          return token ? token : "";
        },
      })
      .withHubProtocol(new MessagePackHubProtocol())
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  return connection;
};

export const useChatSignalR = () => {
  const connection = useCustomSignalR();
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR hub");
          setIsConnected(true);

          connection.on("ReceiveMessage", (user: string, message: string) => {
            setMessages((messages) => [...messages, `${user}: ${message}`]);
          });

          connection.on("GameUpdate", (data) => {
            console.log("Game update received:", data);
          });
        })
        .catch((error) => console.error("Connection failed: ", error));

      return () => {
        connection.stop();
      };
    }
  }, [connection]);

  const sendMessage = async (user: string, message: string) => {
    if (connection && isConnected) {
      try {
        await connection.send("SendMessage", user, message);
      } catch (error) {
        console.error("Sending message failed: ", error);
      }
    }
  };

  return { sendMessage, messages, isConnected };
};
