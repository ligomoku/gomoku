import {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { useAuth } from "@clerk/clerk-react";
import * as JWT from "jwt-decode";
import { notification } from "@/shared/ui/notification";

interface JwtTokenPayload {
  exp: number;
  username?: string;
  userId?: string;
  fullName?: string;
  azp?: string;
  iat?: number;
  iss?: string;
  nbf?: number;
  sid?: string;
  sub?: string;
}

interface AuthTokenContextType {
  jwtToken: string;
  jwtDecodedInfo: JwtTokenPayload | null;
}

export const AuthTokenContext = createContext<AuthTokenContextType>({
  jwtToken: "",
  jwtDecodedInfo: null,
});

export const AuthTokenProvider = ({ children }: { children: ReactNode }) => {
  const { isLoaded, getToken } = useAuth();
  const [jwtToken, setJwtToken] = useState<AuthTokenContextType["jwtToken"]>("");
  const [jwtDecodedInfo, setJwtDecodedInfo] = useState<JwtTokenPayload | null>(
    null,
  );

  //TODO: check if we need refetching token logic here or it's redundant
  useEffect(() => {
    let isMounted = true;
    let refreshTimeout: NodeJS.Timeout;

    const fetchToken = async () => {
      if (!isLoaded) return;

      try {
        const token = await getToken();
        if (token && isMounted) {
          setJwtToken(token);

          const decoded: JwtTokenPayload = JWT.jwtDecode(token);
          setJwtDecodedInfo(decoded);

          const expiresAt = decoded.exp * 1000;

          const timeUntilRefresh = expiresAt - Date.now() - 5 * 60 * 1000;
          if (timeUntilRefresh > 0) {
            refreshTimeout = setTimeout(fetchToken, timeUntilRefresh);
          }
        }
      } catch (error) {
        console.error("Error getting auth token:", error);
        notification.show("Error getting auth token", "error");
      }
    };

    fetchToken();

    return () => {
      isMounted = false;
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }
    };
  }, [isLoaded, getToken]);

  return (
    <AuthTokenContext.Provider
      value={{
        jwtToken,
        jwtDecodedInfo,
      }}
    >
      {children}
    </AuthTokenContext.Provider>
  );
};

export const useAuthToken = () => {
  const context = useContext(AuthTokenContext);
  if (context === undefined) {
    throw new Error("useAuthToken must be used within a AuthTokenProvider");
  }
  return context;
};
