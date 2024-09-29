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
