import { useMemo } from "react";

import HTTPClient from "./httpClient";
import { useAuthContext } from "@/contexts/AuthContext";

const useClient = (): HTTPClient => {
  const { accessToken } = useAuthContext();
  
  const client = useMemo(
    () => new HTTPClient(process.env.NEXT_PUBLIC_API_URL, accessToken),
    [accessToken]
  );

  return client;
};

export default useClient;
