import { ApiConfig, ApiOptions } from "@/types/common/axios-api-types";
import { createBaseApi } from "./baseApi";

const isServer = () => typeof window === "undefined";

export const createApi = (config: ApiConfig, options?: ApiOptions) => {
  const url = isServer() ? config.internalUrl : config.publicUrl;

  // URL 유효성 검증
  if (!url || url === "undefined") {
    throw new Error(`API URL is undefined. Check environment variables.`);
  }

  return createBaseApi(url, options);
};

// 런타임에 환경 변경 감지 (HMR 등)
export const createDynamicApi = (config: ApiConfig, options: ApiOptions) => {
  return createBaseApi(
    isServer() ? config.internalUrl : config.publicUrl,
    options
  );
};
