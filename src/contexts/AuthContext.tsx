import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import HTTPClient from "@/hooks/useClient/httpClient";
import { useRouter } from "next/router";

interface User {
  token: string;
  email: string;
}

interface AuthContextValue {
  accessToken: string;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  saveAuthToken?: (access: string) => Promise<void>;
  clearAuth?: () => Promise<void>;
  user: User | null;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
let client = new HTTPClient(API_URL);

const AuthContext = createContext<AuthContextValue>({
  accessToken: "",
  isAuthenticated: false,
  isLoadingAuth: true,
  user: null,
});

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadUserFromLocalStorage = async () => {
      const token = localStorage.getItem("token");
      setAccessToken(token!);
      
      if (token) {
        client = new HTTPClient(API_URL, token);
        const fetchedUser = await client.me();

        if (fetchedUser) {
          setUser(fetchedUser);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }

      setIsLoadingAuth(false);
    };

    loadUserFromLocalStorage();
  }, [accessToken]);

  useEffect(() => {
    console.log(isAuthenticated);
    router.push("/");
  }, [isAuthenticated]);

  const saveAuthToken = useCallback(async (access: string): Promise<void> => {
    setAccessToken(access);
    localStorage.setItem("token", access);
  }, []);

  const clearAuth = useCallback(() => {
    setAccessToken("");
    localStorage.clear();
  }, []);

  const contextValue: AuthContextValue = useMemo(
    () => ({
      user: user,
      accessToken: accessToken,
      isAuthenticated: isAuthenticated,
      isLoadingAuth: isLoadingAuth,
      saveAuthToken,
      clearAuth,
    }),
    [accessToken, isLoadingAuth]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuthContext };
