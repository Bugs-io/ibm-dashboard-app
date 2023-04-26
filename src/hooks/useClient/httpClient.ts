import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

interface AxiosInstanceHeaders {
  "Content-Type": string;
  Authorization?: string;
}

interface Tokens {
  refresh: string;
  access: string;
}

interface HelloWorldResponse {
  res: string;
}

class HTTPClient {
  private readonly instance: AxiosInstance;
  private readonly token: string;

  public constructor(baseURL?: string, token?: string) {
    if (baseURL === null || baseURL === undefined) {
      throw new Error("Invalid base URL");
    }

    this.token = token ?? "";

    const headers: AxiosInstanceHeaders = {
      "Content-Type": "application/json",
    };

    if (this.token !== "") {
      headers.Authorization = `Bearer ${this.token}`;
    }

    this.instance = axios.create({ baseURL, headers, withCredentials: true });

    this._initializeResponseReceptor();
  }

  private readonly _initializeResponseReceptor = (): void => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  private readonly _handleResponse = ({ data }: AxiosResponse): any => data;

  private readonly _handleError = async (error: AxiosError): Promise<any> => {
    //ONLY WHEN NOT A PRODUCTION ENV!
    console.log(error.response?.data);

    return await Promise.reject(error);
  };

  public helloWorld = async (): Promise<HelloWorldResponse | null> => {
    try {
      return this.instance.get("/posts/1");
    } catch (error) {
      if ((error as AxiosError).response?.status === 409) {
        return null;
      }
      throw error;
    }
  };
}

export default HTTPClient;
