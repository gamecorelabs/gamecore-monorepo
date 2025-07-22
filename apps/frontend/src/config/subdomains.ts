import { SubdomainConfig } from "@/types/common/domain.types";
import {
  getEnvSubdomainConfig,
  isSubdomainEnabled,
  buildDomainUrl,
  ENV_CONFIGS,
} from "./environment";
import { SUBDOMAIN_CHANNELS } from "@/config/subdomain_channels";

// 공통 경로 설정
export const COMMON_PATHS = ["/board", "/user", "/api", "/auth", "/admin"];

/**
 * 현재 환경의 도메인 설정 반환
 */
export function getEnvironmentDomainConfig() {
  const env = (process.env.NODE_ENV || "development") as
    | "development"
    | "staging"
    | "production";
  return ENV_CONFIGS[env] || ENV_CONFIGS.development;
}

/**
 * 서브도메인 설정 반환 (환경별 활성화 확인 포함)
 */
export function getSubdomainConfig(subdomain: string): SubdomainConfig | null {
  if (!isSubdomainEnabled(subdomain)) {
    return null;
  }
  return SUBDOMAIN_CHANNELS[subdomain] || null;
}

/**
 * 활성화된 서브도메인 목록 반환
 */
export function getAllSubdomains(): string[] {
  const envConfig = getEnvSubdomainConfig();
  return envConfig.enabledSubdomains.filter(
    (subdomain) => subdomain in SUBDOMAIN_CHANNELS
  );
}

/**
 * 서브도메인의 풀 URL 생성 (환경별 대응)
 */
export function getSubdomainUrl(subdomain: string, path: string = "/"): string {
  return buildDomainUrl(subdomain, path);
}

/**
 * 메인 도메인 URL 생성 (환경별 대응)
 */
export function getMainDomainUrl(path: string = "/"): string {
  return buildDomainUrl(undefined, path);
}
