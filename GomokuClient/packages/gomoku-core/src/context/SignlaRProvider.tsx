import {
  createContext,
  useEffect,
  useRef,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";
import * as signalR from "@microsoft/signalr";
import { JsonHubProtocol } from "@microsoft/signalr";
import { typedStorage } from "@/shared/lib/utils";
import { useAuthToken } from "@/context/AuthContext";
import { useAuth } from "@clerk/clerk-react";
import {
  SignalClientMessages,
  SignalHubInterfaces,
  SignalRClientService,
  SignalServerMessages,
} from "@/api";

interface SignalREventHandlers {
  onPlayerJoined?: (
    message: SignalServerMessages.PlayerJoinedGameMessage,
  ) => void;
  onGameStarted?: (message: SignalServerMessages.GameStartedMessage) => void;
  onPlayerMadeMove?: (
    message: SignalServerMessages.PlayerMadeMoveMessage,
  ) => void;
  onReceiveMessage?: (
    message: SignalClientMessages.ChatMessageClientMessage,
  ) => void;
  onGameHubError?: (error: SignalServerMessages.ErrorMessage) => void;
}

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
}

export const SignalRProvider = ({ children }: SignalRProviderProps) => {
  const { jwtToken, jwtDecodedInfo } = useAuthToken();
  const { getToken } = useAuth();
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hubProxy, setHubProxy] = useState<SignalHubInterfaces.IGameHub | null>(
    null,
  );
  const [playerID, setPlayerID] = useState<string | null>(null);

  useEffect(() => {
    if (!typedStorage.getItem("anonymousPlayerID")) return;

    setPlayerID(typedStorage.getItem("anonymousPlayerID"));
  }, [typedStorage.getItem("anonymousPlayerID")]);

  const startConnection = useCallback(
    async (connection: signalR.HubConnection) => {
      if (connection?.state === signalR.HubConnectionState.Disconnected) {
        try {
          await connection.start();
          console.log("SignalR connection established");
          setIsConnected(true);
        } catch (error) {
          console.error("Error starting SignalR connection:", error);
          setTimeout(() => startConnection(connection), 5000);
        }
      }
    },
    [],
  );

  if (!connectionRef.current) {
    connectionRef.current = new signalR.HubConnectionBuilder()
      .withUrl(
        `${import.meta.env.VITE_API_URL}/gamehub?player_id=${playerID}`,
        {
          accessTokenFactory: async () => {
            let token = typedStorage.getItem("jwtToken");
            if (jwtDecodedInfo && jwtDecodedInfo.exp * 1000 < Date.now()) {
              console.log("JWT token expired, refreshing token...");
              try {
                token = await getToken({ skipCache: true });
                if (token) {
                  typedStorage.setItem("jwtToken", token);
                }
              } catch (error) {
                console.error("Error refreshing token:", error);
              }
            }
            return token ? token : "";
          },
        },
      )
      .withHubProtocol(new JsonHubProtocol())
      .withAutomaticReconnect()
      .build();
  }

  useEffect(() => {
    const connection = connectionRef.current;

    if (connection) {
      startConnection(connection);

      connection.onclose(async () => {
        console.warn("SignalR connection lost. Attempting to reconnect...");
        setIsConnected(false);
        try {
          if (jwtDecodedInfo && jwtDecodedInfo.exp * 1000 < Date.now()) {
            console.log("JWT token expired. Refreshing token...");
            const token = await getToken({ skipCache: true });
            if (token) {
              typedStorage.setItem("jwtToken", token);
            }
          }
        } catch (error) {
          console.error("Error refreshing token on connection close:", error);
        }

        startConnection(connection!);
      });

      const proxy =
        SignalRClientService.getHubProxyFactory("IGameHub")?.createHubProxy(
          connection,
        );
      if (proxy) {
        setHubProxy(proxy);
      }
    }

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
  }, [jwtToken, jwtDecodedInfo, startConnection, getToken]);

  const registerEventHandlers = useCallback(
    (handlers: SignalREventHandlers) => {
      const { current: connection } = connectionRef;

      if (
        !connection ||
        connection.state !== signalR.HubConnectionState.Connected
      ) {
        console.warn(
          "SignalR connection is not available for attaching event handlers.",
        );
        return () => {};
      }

      console.log("Attaching SignalR event handlers...");

      const receiver: SignalHubInterfaces.IGameHubReceiver = {
        playerJoinedGame: async (
          message: SignalServerMessages.PlayerJoinedGameMessage,
        ) => {
          handlers.onPlayerJoined?.(message);
        },
        gameGroupJoined: async (gameId: string) => {
          handlers.onPlayerJoined?.({ userName: gameId });
        },
        gameStarted: async (
          message: SignalServerMessages.GameStartedMessage,
        ) => {
          handlers.onGameStarted?.(message);
        },
        playerMadeMove: async (
          message: SignalServerMessages.PlayerMadeMoveMessage,
        ) => {
          handlers.onPlayerMadeMove?.(message);
        },
        sendMessage: async (
          message: SignalClientMessages.ChatMessageClientMessage,
        ) => {
          handlers.onReceiveMessage?.(message);
        },
        gameHubError: async (error: SignalServerMessages.ErrorMessage) => {
          handlers.onGameHubError?.(error);
        },
      };

      const disposable = SignalRClientService.getReceiverRegister(
        "IGameHubReceiver",
      )?.register(connection, receiver);

      return () => {
        if (disposable) {
          console.log("Cleaning up SignalR event handlers...");
          disposable.dispose();
        }
      };
    },
    [],
  );

  return (
    <SignalRContext.Provider
      value={{
        connection: connectionRef.current,
        isConnected,
        registerEventHandlers,
        hubProxy,
      }}
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
