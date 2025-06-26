import axios, { AxiosInstance } from "axios";

type ApiOptions = {
  withCredentials?: boolean;
  headers?: Record<string, string>;
  timeout?: number;
};

export function createBaseApi(
  baseURL: string,
  options: ApiOptions = {}
): AxiosInstance {
  const {
    headers = { "Content-Type": "application/json" },
    timeout = 5000,
    withCredentials = false,
  } = options;

  const instance = axios.create({
    baseURL,
    headers,
    timeout,
    withCredentials,
  });

  instance.interceptors.request.use((config) => {
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return instance;
}
