import { createContext, useContext } from "react";
import type { SignalHubInterfaces } from "@gomoku/api";
import type * as signalR from "@microsoft/signalr";
import type { ReactNode } from "react";

import { useAuthToken } from "@/context/AuthContext";
import { useGameSignalR } from "@/hooks";
import { typedSessionStorage } from "@/utils";

type SignalREventHandlers = SignalHubInterfaces.IGameHubReceiver;

interface SignalRContextType {
  connection: signalR.HubConnection | null;
  isConnected: boolean;
  registerEventHandlers: (
    handlers: Partial<SignalREventHandlers>,
  ) => () => void;
  hubProxy: SignalHubInterfaces.IGameHub | null;
}

export const SignalRContext = createContext<SignalRContextType | undefined>(
  undefined,
);

interface SignalRProviderProps {
  children: ReactNode;
}

export const SignalRProvider = ({ children }: SignalRProviderProps) => {
  const { jwtToken } = useAuthToken();
  const signalRState = useGameSignalR(
    `${import.meta.env.VITE_API_URL}/gamehub/${
      jwtToken
        ? "registered"
        : `anonymous?player_id=${typedSessionStorage.getItem(
            "anonymousSessionID",
          )}`
    }`,
  );

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
