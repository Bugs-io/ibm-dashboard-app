import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

interface AxiosInstanceHeaders {
  "Content-Type": string;
  Authorization?: string;
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

    this.instance = axios.create({ baseURL, headers });

    this._initializeResponseReceptor();
  }

  private readonly _initializeResponseReceptor = (): void => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  // eslint-disable-next-line class-methods-use-this
  private readonly _handleResponse = ({ data }: AxiosResponse): any => data;

  // eslint-disable-next-line class-methods-use-this
  private readonly _handleError = async (error: AxiosError): Promise<any> => {
    // ONLY WHEN NOT A PRODUCTION ENV!
    console.log("Error on the httpClient: ", error.response?.data);

    return Promise.reject(error);
  };

  public login = async (email: string, password: string): Promise<any> => {
    const res = await this.instance.post<{
      id: string;
      emailResponse: string;
      access: string;
    }>("/login", { email, password });

    return res;
  };

  public signup = async (
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<any> => {
    const res = await this.instance.post<{
      id: string;
      emailResponse: string;
      access: string;
    }>("/signup", { email, password, first_name: firstName, last_name: lastName });
    return res;
  };

  public me = async (): Promise<any> => {
    const res = await this.instance.get("/me");
    return res;
  };

  public uploadInternalDataset = async (formData: FormData): Promise<any> => {
    const res = await this.instance.post("/upload-internal-dataset", formData, {
      headers: {
        ...this.instance.defaults.headers,
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  };

  public getMostAttendedCertifications = async (limit: number, targetPeriod: string): Promise<any> => {
    const res = await this.instance.get(
      "/graphs/most-attended-certifications",
      {
        params: {
          limit,
          target_period: targetPeriod,
        }
      }
    );
    return res;
  }
}

export default HTTPClient;
