import { useAuth } from "@clerk/clerk-react";
import { toaster } from "@gomoku/story";
import * as JWT from "jwt-decode";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import type { ReactNode } from "react";

import { typedSessionStorage } from "@/utils";

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
  const [jwtDecodedInfo, setJwtDecodedInfo] = useState<JwtTokenPayload | null>(null);

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

        if (!token && !typedSessionStorage.getItem("anonymousSessionID")) {
          typedSessionStorage.setItem("anonymousSessionID", uuidv4());
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
    }),
    [jwtToken, jwtDecodedInfo],
  );

  return <AuthTokenContext.Provider value={memoValue}>{children}</AuthTokenContext.Provider>;
};

export const useAuthToken = () => {
  const context = useContext(AuthTokenContext);
  if (context === undefined) {
    throw new Error("useAuthToken must be used within a AuthTokenProvider");
  }
  return context;
};
