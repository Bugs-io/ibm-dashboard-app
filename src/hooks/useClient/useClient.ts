import { useMemo } from "react";

import HTTPClient from "./httpClient";

const useClient = (): HTTPClient => {
  const accessToken = "";
  const client = useMemo(
    () => new HTTPClient("http://localhost:8000", accessToken),
    [accessToken]
  );

  return client;
};

export default useClient;
