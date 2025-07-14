import { ApiConfig, ApiOptions } from "@/types/common/axios-api-types";
import { createBaseApi } from "./baseApi";

const isServer = () => typeof window === "undefined";

export const createApi = (config: ApiConfig, options?: ApiOptions) => {
  const url = isServer() ? config.internalUrl : config.publicUrl;

  // 디버깅 로그 추가
  if (process.env.NODE_ENV === "production") {
    console.log("🔍 API Factory Debug:", {
      isServer: isServer(),
      publicUrl: config.publicUrl,
      internalUrl: config.internalUrl,
      selectedUrl: url,
      env: process.env.NODE_ENV,
    });
  }

  // URL 유효성 검증
  if (!url || url === "undefined") {
    console.error("❌ API URL is undefined:", config);
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
