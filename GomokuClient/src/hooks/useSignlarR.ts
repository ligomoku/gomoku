import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export const useSignalR = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null,
  );
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/gamehub`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

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

          connection.on("GameUpdate", (data: any) => {
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
