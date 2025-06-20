import axios, { AxiosInstance } from "axios";

export function createBaseApi(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
  });

  // TODO: 공통 Request 인터셉터 설정
  instance.interceptors.request.use((config) => {
    return config;
  });

  // TODO: 공통 Response 인터셉터 설정
  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return instance;
}
