import {
  getEnvSubdomainConfig,
  isSubdomainEnabled,
  buildDomainUrl,
} from "./environment";

// 서브도메인 설정 중앙 관리
export interface SubdomainConfig {
  name: string;
  title: string;
  description: string;
  theme: string;
  routes: {
    home: string;
    specific: string[];
  };
  // 추가 메타데이터
  metadata?: {
    icon?: string;
    color?: string;
    keywords?: string[];
  };
}

export const SUBDOMAIN_CONFIGS: Record<string, SubdomainConfig> = {
  baram: {
    name: "baram",
    title: "바람의나라 클래식",
    description: "바람의나라 클래식 - 게임코어",
    theme: "baram-theme",
    routes: {
      home: "/channels/baram",
      specific: ["/news", "/events", "/guides", "/community"],
    },
    metadata: {
      icon: "/icons/baram.png",
      color: "#FF5733",
      keywords: ["baram", "game", "news", "events"],
    },
  },
};

// 공통 경로 설정
export const COMMON_PATHS = ["/board", "/user", "/api", "/auth", "/admin"];

// 환경별 도메인 설정 (환경 파일에서 가져옴)
export const DOMAIN_CONFIG = {
  development: {
    prefix: "dev",
    baseDomain: "gamecore.co.kr",
  },
  staging: {
    prefix: "sta",
    baseDomain: "gamecore.co.kr",
  },
  production: {
    prefix: "",
    baseDomain: "gamecore.co.kr",
  },
} as const;

export type Environment = keyof typeof DOMAIN_CONFIG;

/**
 * 현재 환경의 도메인 설정 반환
 */
export function getEnvironmentDomainConfig() {
  const env = (process.env.NODE_ENV || "development") as Environment;
  return DOMAIN_CONFIG[env] || DOMAIN_CONFIG.development;
}

/**
 * 서브도메인 설정 반환 (환경별 활성화 확인 포함)
 */
export function getSubdomainConfig(subdomain: string): SubdomainConfig | null {
  if (!isSubdomainEnabled(subdomain)) {
    return null;
  }
  return SUBDOMAIN_CONFIGS[subdomain] || null;
}

/**
 * 활성화된 서브도메인 목록 반환
 */
export function getAllSubdomains(): string[] {
  const envConfig = getEnvSubdomainConfig();
  return envConfig.enabledSubdomains.filter(
    (subdomain) => subdomain in SUBDOMAIN_CONFIGS
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
