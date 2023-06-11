import { useMemo } from "react";

import { useAuthContext } from "@/contexts/AuthContext";
import HTTPClient from "./httpClient";

const useClient = (): HTTPClient => {
  const { accessToken } = useAuthContext();
  
  const client = useMemo(
    () => new HTTPClient(process.env.NEXT_PUBLIC_API_URL, accessToken),
    [accessToken]
  );

  return client;
};

export default useClient;
