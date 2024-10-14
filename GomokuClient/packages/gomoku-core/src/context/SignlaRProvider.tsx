import { createContext, ReactNode, useContext } from "react";
import { SignalREventHandlers, useSignalR } from "@/hooks/useSignalR";
import * as signalR from "@microsoft/signalr";
import { SignalHubInterfaces } from "@/api";

interface SignalRContextType {
  connection: signalR.HubConnection | null;
  isConnected: boolean;
  registerEventHandlers: (
    handlers: SignalREventHandlers,
  ) => void | (() => void);
  hubProxy: SignalHubInterfaces.IGameHub | null;
}

export const SignalRContext = createContext<SignalRContextType | undefined>(
  undefined,
);

interface SignalRProviderProps {
  children: ReactNode;
  playerID?: string | null;
}

export const SignalRProvider = ({
  children,
  playerID,
}: SignalRProviderProps) => {
  const signalRState = useSignalR(playerID!);

  return (
    <SignalRContext.Provider value={signalRState}>
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
