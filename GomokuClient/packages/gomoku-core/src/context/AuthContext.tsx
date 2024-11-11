import { useAuth } from "@clerk/clerk-react";
import * as JWT from "jwt-decode";
import {
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";

import type {
  ReactNode} from "react";

import { toaster } from "@/shared/ui/toaster";

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
  const [jwtToken, setJwtToken] =
    useState<AuthTokenContextType["jwtToken"]>("");
  const [jwtDecodedInfo, setJwtDecodedInfo] = useState<JwtTokenPayload | null>(
    null,
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
