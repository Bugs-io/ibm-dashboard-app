import { useMemo } from "react";

import HTTPClient from "./httpClient";

const useClient = (): HTTPClient => {
  const accessToken = "";
  const client = useMemo(
    () => new HTTPClient("https://jsonplaceholder.typicode.com", accessToken),
    [accessToken]
  );

  return client;
};

export default useClient;
