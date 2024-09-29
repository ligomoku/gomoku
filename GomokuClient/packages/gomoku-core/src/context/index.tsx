import { useEffect, useState, createContext, ReactNode } from "react";
import { useAuth } from "@clerk/clerk-react";

export const AuthTokenContext = createContext<string | null>(null);

export const AuthTokenProvider = ({ children }: { children: ReactNode }) => {
  const { isLoaded, getToken } = useAuth();
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchToken = async () => {
      if (!isLoaded) return;

      try {
        const token = await getToken();
        if (token && isMounted) {
          setJwtToken(token);
          //TODO: provide interval to refetch token with same interval as in claims of jtw token
          localStorage.setItem("jwtToken", token);
        }
      } catch (error) {
        console.error("Error getting auth token:", error);
      }
    };

    fetchToken();

    return () => {
      isMounted = false;
    };
  }, [isLoaded, getToken]);

  return (
    <AuthTokenContext.Provider value={jwtToken}>
      {children}
    </AuthTokenContext.Provider>
  );
};
