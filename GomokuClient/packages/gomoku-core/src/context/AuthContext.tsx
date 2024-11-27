import { useAuth } from "@clerk/clerk-react";
import { toaster } from "@gomoku/story";
import * as JWT from "jwt-decode";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { getUUID, typedSessionStorage } from "@/utils";

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
  anonymousSessionId: string | null;
}

export const AuthTokenContext = createContext<AuthTokenContextType>({
  jwtToken: "",
  jwtDecodedInfo: null,
  anonymousSessionId: null,
});

export const AuthTokenProvider = ({ children }: { children: ReactNode }) => {
  const { isLoaded, getToken } = useAuth();
  const [jwtToken, setJwtToken] =
    useState<AuthTokenContextType["jwtToken"]>("");
  const [jwtDecodedInfo, setJwtDecodedInfo] = useState<JwtTokenPayload | null>(
    null,
  );
  const [anonymousSessionId, setAnonymousSessionId] = useState(
    typedSessionStorage.getItem("anonymousSessionID"),
  );

  useEffect(() => {
    let isMounted = true;

    const fetchToken = async () => {
      if (!isLoaded) return;

      try {
        const token = await getToken();
        if (token && isMounted) {
          setJwtToken(token);

          const decoded: JwtTokenPayload = JWT.jwtDecode(token);
          setJwtDecodedInfo(decoded);
        }

        if (!token && !anonymousSessionId) {
          const anonymousSessionId = getUUID();
          setAnonymousSessionId(anonymousSessionId);
          typedSessionStorage.setItem("anonymousSessionID", anonymousSessionId);
        }
      } catch (error) {
        console.error("Error getting auth token:", error);
        toaster.show("Error getting auth token", "error");
      }
    };

    fetchToken();

    return () => {
      isMounted = false;
    };
  }, [isLoaded, getToken]);

  const memoValue = useMemo(
    () => ({
      jwtToken,
      jwtDecodedInfo,
      anonymousSessionId,
    }),
    [jwtToken, jwtDecodedInfo, anonymousSessionId],
  );

  return (
    <AuthTokenContext.Provider value={memoValue}>
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
