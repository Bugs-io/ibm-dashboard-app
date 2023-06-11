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

    // @ts-expect-error
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
    }>("/signup", {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
    return res;
  };

  public me = async (): Promise<any> => {
    const res = await this.instance.get("/me");
    return res;
  };

  public uploadInternalDataset = async (formData: FormData): Promise<any> => {
    const res = await this.instance.post("/upload-internal-dataset", formData, {
      // @ts-expect-error
      headers: {
        ...this.instance.defaults.headers,
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  };

  public getMostAttendedCertifications = async (
    limit: number,
    targetPeriod: string
  ): Promise<any> => {
    const res = await this.instance.get(
      "/graphs/most-attended-certifications",
      {
        params: {
          limit,
          target_period: targetPeriod,
        },
      }
    );
    return res;
  };

  public getMatchedCertifications = async (): Promise<any> => {
    const res = await this.instance.get("/graphs/matched-certifications");

    return res;
  };

  public getTopIndustryCourses = async (): Promise<any> => {
    const res = await this.instance.get("/graphs/top-industry-courses");

    return res;
  };

  public getCertificationsCategorized = async (): Promise<any> => {
    const res = await this.instance.get("/graphs/certifications-categorized");

    return res;
  };

  public getCertificationsCategorizedByEmployee = async (
    employeeID: string
  ): Promise<any> => {
    const res = await this.instance.get(
      `/graphs/employees/${employeeID}/certifications-categorized`
    );

    return res;
  };

  public getCertificationsTakenOverTheYears = async (): Promise<any> => {
    const res = await this.instance.get(
      "graphs/certifications-taken-over-the-years"
    );

    return res;
  };

  public getCertificationsDistribution = async (): Promise<any> => {
    const res = await this.instance.get("graphs/certifications-distribution");

    return res;
  };
}

export default HTTPClient;
