import { useEffect, useState, createContext, ReactNode } from "react";
import { useAuth } from "@clerk/clerk-react";
import * as JWT from "jwt-decode";

export const AuthTokenContext = createContext<string | null>(null);

interface JwtTokenPayload {
  exp: number;
}

export const AuthTokenProvider = ({ children }: { children: ReactNode }) => {
  const { isLoaded, getToken } = useAuth();
  const [jwtToken, setJwtToken] = useState<string | null>(null);

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
    <AuthTokenContext.Provider value={jwtToken}>
      {children}
    </AuthTokenContext.Provider>
  );
};
