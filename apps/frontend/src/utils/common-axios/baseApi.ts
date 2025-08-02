import { ApiOptions } from "@/types/common/axios-api-types";
import axios, { AxiosInstance } from "axios";
import { getCsrfToken, invalidateCsrfToken } from "./csrfToken";

export const createBaseApi = (
  baseURL: string,
  options: ApiOptions = {}
): AxiosInstance => {
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

  instance.interceptors.request.use(async (config) => {
    // CSRF 토큰이 필요한 메서드들 (상태 변경 작업)
    const methodsRequiringCsrf = ["post", "put", "patch", "delete"];
    const method = config.method?.toLowerCase();

    if (method && methodsRequiringCsrf.includes(method)) {
      const isCsrfTokenEndpoint = config.url?.includes("/auth/csrf-token");

      if (!isCsrfTokenEndpoint) {
        try {
          const csrfToken = await getCsrfToken();
          config.headers = config.headers || {};
          config.headers["X-CSRF-Token"] = csrfToken;
        } catch (error) {
          console.error("CSRF 토큰 설정 실패:", error);
        }
      }
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // CSRF 토큰 검증 실패 시 캐시된 토큰 무효화
      if (
        error.response?.status === 403 &&
        error.response?.data?.message?.includes("CSRF")
      ) {
        console.warn("CSRF 토큰 검증 실패, 캐시된 토큰 무효화");
        invalidateCsrfToken();
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
