import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Router, { useRouter } from "next/router";
import HTTPClient from "@/hooks/useClient/httpClient";
import { Loading } from "carbon-components-react";

interface AuthContextValue {
  accessToken: string;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  saveAuthToken: (access: string) => Promise<void>;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
let client = new HTTPClient(API_URL);

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromLocalStorage = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        console.log("We have a token!");
        console.log(token);
        client = new HTTPClient(API_URL, token);
        const res = await client.hello();
        console.log(res);
        /*const fetchedUser = await client.me();
        console.log(fetchedUser);*/
        /*if (fetchedUser) setUser(user);*/
      }
      setLoading(false);
    };
    loadUserFromLocalStorage();
  }, []);

  const saveAuthToken = useCallback(async (access: string): Promise<void> => {
    setAccessToken(access);

    await localStorage.setItem("token", access);
  }, []);

  const clearAuth = useCallback(async () => {
    setAccessToken("");

    await localStorage.clear();
  }, []);

  const contextValue: AuthContextValue = useMemo(
    () => ({
      accessToken,
      isAuthenticated: accessToken !== "",
      isLoadingAuth: isLoading,
      saveAuthToken,
    }),
    [accessToken, isLoading]
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

interface ProotectRouteProps {
  children: JSX.Element | JSX.Element[];
}

const ProtectRoute = ({ children }: Props) => {
  const { isAuthenticated, isLoadingAuth } = useAuthContext();
  console.log(window.location.pathname);
  if (
    isLoadingAuth ||
    (!isAuthenticated && window.location.pathname !== "/login")
  ) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return children;
};
export { AuthProvider, useAuthContext, ProtectRoute };
