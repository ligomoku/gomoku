import { createContext, ReactNode, useContext, useState } from "react";

import type { SignalHubInterfaces } from "@/api";
import type * as signalR from "@microsoft/signalr";

import { useSignalR } from "@/hooks/useSignalR";
import { useAuthToken } from "@/context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { typedSessionStorage } from "@/shared/lib/utils";

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

const getHubBaseURL = (jwtToken?: string) => {
  if (jwtToken) {
    return `${import.meta.env.VITE_API_URL}/gamehub/registered`;
  }

  return `${import.meta.env.VITE_API_URL}/gamehub/anonymous?player_id=${typedSessionStorage.getItem("anonymousPlayerID")}`;
};

export const SignalRProvider = ({ children }: SignalRProviderProps) => {
  const { jwtToken } = useAuthToken();
  console.log("SignalRProvider jwtToken =", jwtToken);
  const signalRState = useSignalR(getHubBaseURL(jwtToken));

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
