import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import * as signalR from "@microsoft/signalr";
import { MessagePackHubProtocol } from "@microsoft/signalr-protocol-msgpack";

interface SignalRContextType {
  connection: signalR.HubConnection | null;
}

export const SignalRContext = createContext<SignalRContextType | undefined>(
  undefined,
);

interface SignalRProviderProps {
  children: ReactNode;
}

export const SignalRProvider = ({ children }: SignalRProviderProps) => {
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

    // Start the connection immediately when it's built
    const startConnection = async () => {
      try {
        await newConnection.start();
        console.log("SignalR connection established");
      } catch (error) {
        console.error("Error starting SignalR connection:", error);
      }
    };

    startConnection();

    // Handle reconnection if the connection is closed
    newConnection.onclose(() => {
      console.warn("SignalR connection lost. Attempting to reconnect...");
      startConnection();
    });

    return () => {
      if (newConnection.state === signalR.HubConnectionState.Connected) {
        newConnection
          .stop()
          .then(() => console.log("SignalR connection stopped"))
          .catch((error) =>
            console.error("Error stopping SignalR connection:", error),
          );
      }
    };
  }, []);

  return (
    <SignalRContext.Provider value={{ connection }}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalRConnection = () => {
  const context = useContext(SignalRContext);
  if (context === undefined) {
    throw new Error(
      "useSignalRConnection must be used within a SignalRProvider",
    );
  }
  return context;
};
