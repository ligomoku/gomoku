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
import { CellValue } from "@/hooks/useBoard";

interface PlayerJoinedGameServerMessage {
  userName: string;
}

interface GameStartedServerMessage {
  isMyMoveFirst: boolean;
}

interface PlayerMadeMoveServerMessage {
  playerId: string;
  tile: TileItem;
  placedTileColor: CellValue;
}

interface SendMessageServerMessage {
  gameId: string;
  user: string;
  message: string;
}

interface TileItem {
  x: number;
  y: number;
}

interface GameHubError {
  message: string;
}

interface SignalRContextType {
  connection: signalR.HubConnection | null;
  isConnected: boolean;
  registerEventHandlers: (
    handlers: SignalREventHandlers,
  ) => void | (() => void);
}

interface SignalREventHandlers {
  onPlayerJoined?: (message: PlayerJoinedGameServerMessage) => void;
  onGameStarted?: (message: GameStartedServerMessage) => void;
  onPlayerMadeMove?: (message: PlayerMadeMoveServerMessage) => void;
  onReceiveMessage?: (message: SendMessageServerMessage) => void;
  onGameHubError?: (error: GameHubError) => void;
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

  const startConnection = async (connection: signalR.HubConnection) => {
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
  };

  if (!connectionRef.current) {
    connectionRef.current = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/gamehub`, {
        accessTokenFactory: async () => {
          let token = typedStorage.getItem("jwtToken");
          // TODO: place consistent token refresh logic in a single place
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
      })
      .withHubProtocol(new JsonHubProtocol())
      .withAutomaticReconnect()
      .build();
  }

  useEffect(() => {
    const connection = connectionRef.current;

    const handleConnectionClose = async () => {
      console.warn("SignalR connection lost. Attempting to reconnect...");
      setIsConnected(false);
      try {
        console.log(jwtDecodedInfo); //TODO: remove latter check jwt expired format on different env's
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
    };

    if (connection) {
      startConnection(connection);

      connection.onclose(handleConnectionClose);
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
  }, [jwtToken, jwtDecodedInfo]);

  //TODO: refactor to iterate over handlers that were passed to the context provider instead of predefined statements
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

        //TODO: check return a no-op function to maintain consistent return type
        return () => {};
      }

      console.log("Attaching SignalR event handlers...");

      const eventMapping: [string, ((...args: never[]) => void) | undefined][] =
        [
          ["PlayerJoinedGame", handlers.onPlayerJoined],
          ["GameStarted", handlers.onGameStarted],
          ["PlayerMadeMove", handlers.onPlayerMadeMove],
          ["SendMessage", handlers.onReceiveMessage],
          ["GameHubError", handlers.onGameHubError],
        ];

      eventMapping.forEach(([eventName, handler]) => {
        if (handler) {
          connection.on(eventName, handler);
        }
      });

      return () => {
        console.log("Cleaning up SignalR event handlers...");
        eventMapping.forEach(([eventName, handler]) => {
          if (handler) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            connection.off(eventName, handler);
          }
        });
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
