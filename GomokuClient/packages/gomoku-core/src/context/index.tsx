import { useEffect, useState, createContext, ReactElement } from "react";
import { useAuth } from "@clerk/clerk-react";

const AuthTokenContext = createContext<string | null>(null);

export const AuthTokenProvider = ({ children }: { children: ReactElement }) => {
  const authToken = useAuth();

  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => await authToken.getToken();

    if (authToken.isLoaded) {
      getToken().then((token) => {
        if (!token) return;
        localStorage.setItem("jwtToken", token);
        setJwtToken(token);
      });
    }
  }, [authToken]);

  return (
    <AuthTokenContext.Provider value={jwtToken}>
      {children}
    </AuthTokenContext.Provider>
  );
};
