import { useEffect, useState, createContext, ReactNode } from "react";
import { useAuth } from "@clerk/clerk-react";
import * as JWT from "jwt-decode";

interface JwtTokenPayload {
  exp: number;
  userName?: string;
  userId?: string;
  fullName?: string;
  username?: string;
  azp?: string;
  iat?: number;
  iss?: string;
  nbf?: number;
  sid?: string;
  sub?: string;
}

interface AuthTokenContextType {
  jwtToken: string | null;
  jwtDecodedInfo: JwtTokenPayload | null;
}

export const AuthTokenContext = createContext<AuthTokenContextType>({
  jwtToken: null,
  jwtDecodedInfo: null,
});

export const AuthTokenProvider = ({ children }: { children: ReactNode }) => {
  const { isLoaded, getToken } = useAuth();
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [jwtDecodedInfo, setJwtDecodedInfo] = useState<JwtTokenPayload | null>(
    null,
  );

  useEffect(() => {
    let isMounted = true;
    let refreshTimeout: NodeJS.Timeout;

    const fetchToken = async () => {
      if (!isLoaded) return;

      try {
        const token = await getToken();
        if (token && isMounted) {
          setJwtToken(token);
          localStorage.setItem("jwtToken", token);

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
