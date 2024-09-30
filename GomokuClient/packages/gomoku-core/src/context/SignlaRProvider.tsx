import {
  createContext,
  useEffect,
  useRef,
  ReactNode,
  useContext,
  useState,
} from "react";
import * as signalR from "@microsoft/signalr";
import { MessagePackHubProtocol } from "@microsoft/signalr-protocol-msgpack";

interface SignalRContextType {
  connection: signalR.HubConnection | null;
  isConnected: boolean;
}

export const SignalRContext = createContext<SignalRContextType | undefined>(
  undefined,
);

interface SignalRProviderProps {
  children: ReactNode;
}

export const SignalRProvider = ({ children }: SignalRProviderProps) => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  if (!connectionRef.current) {
    connectionRef.current = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/gamehub`, {
        accessTokenFactory: () => {
          const token = localStorage.getItem("authToken");
          return token ? token : "";
        },
      })
      .withHubProtocol(new MessagePackHubProtocol())
      .withAutomaticReconnect()
      .build();
  }

  useEffect(() => {
    const connection = connectionRef.current;

    const startConnection = async () => {
      if (connection?.state === signalR.HubConnectionState.Disconnected) {
        try {
          await connection.start();
          console.log("SignalR connection established");
          setIsConnected(true);
        } catch (error) {
          console.error("Error starting SignalR connection:", error);
          setTimeout(startConnection, 5000);
        }
      }
    };

    startConnection();

    connection?.onclose(() => {
      console.warn("SignalR connection lost. Attempting to reconnect...");
      setIsConnected(false);
      startConnection();
    });

    return () => {
      if (
        connection &&
        connection.state === signalR.HubConnectionState.Connected
      ) {
        connection
          .stop()
          .then(() => console.log("SignalR connection stopped"))
          .catch((error) =>
            console.error("Error stopping SignalR connection:", error),
          );
      }
    };
  }, []);

  return (
    <SignalRContext.Provider
      value={{ connection: connectionRef.current, isConnected }}
    >
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
