/**
 * 환경별 서브도메인 설정을 관리하는 파일
 * 이 파일을 통해 환경별로 다른 서브도메인 설정을 적용할 수 있습니다.
 */

const ENABLED_SUBDOMAINS = ["baram", "diablo4", "wow", "game", "lol"];

// 개발 환경 설정
export const DEV_SUBDOMAIN_CONFIG = {
  prefix: "dev",
  baseDomain: "gamecore.co.kr",
  protocol: "https",
  enabledSubdomains: ENABLED_SUBDOMAINS,
};

// 스테이징 환경 설정
export const STAGING_SUBDOMAIN_CONFIG = {
  prefix: "sta",
  baseDomain: "gamecore.co.kr",
  protocol: "https",
  enabledSubdomains: ENABLED_SUBDOMAINS,
};

// 프로덕션 환경 설정
export const PRODUCTION_SUBDOMAIN_CONFIG = {
  prefix: "",
  baseDomain: "gamecore.co.kr",
  protocol: "https",
  enabledSubdomains: ENABLED_SUBDOMAINS,
};

// 환경별 설정 맵
export const ENV_CONFIGS = {
  development: DEV_SUBDOMAIN_CONFIG,
  sta: STAGING_SUBDOMAIN_CONFIG,
  production: PRODUCTION_SUBDOMAIN_CONFIG,
} as const;

/**
 * 현재 환경의 서브도메인 설정 반환
 */
export function getEnvSubdomainConfig() {
  const env = process.env.NODE_ENV || "development";
  return (
    ENV_CONFIGS[env as keyof typeof ENV_CONFIGS] || ENV_CONFIGS.development
  );
}

/**
 * 서브도메인이 현재 환경에서 활성화되어 있는지 확인
 */
export function isSubdomainEnabled(subdomain: string): boolean {
  const config = getEnvSubdomainConfig();
  return config.enabledSubdomains.includes(subdomain);
}

/**
 * 환경별 도메인 URL 생성
 */
export function buildDomainUrl(subdomain?: string, path: string = "/"): string {
  const config = getEnvSubdomainConfig();

  let host: string;
  if (subdomain && isSubdomainEnabled(subdomain)) {
    if (config.prefix) {
      host = `${config.prefix}.${subdomain}.${config.baseDomain}`;
    } else {
      host = `${subdomain}.${config.baseDomain}`;
    }
  } else {
    if (config.prefix) {
      host = `${config.prefix}.${config.baseDomain}`;
    } else {
      host = config.baseDomain;
    }
  }

  return `${config.protocol}://${host}${path}`;
}

/**
 * 서브도메인 간 이동 URL 생성
 */
export function getSubdomainNavigationUrl(
  targetSubdomain: string,
  currentPath: string = "/"
): string {
  return buildDomainUrl(targetSubdomain, currentPath);
}

/**
 * 환경 정보를 포함한 디버그 정보 반환
 */
export function getSubdomainDebugInfo() {
  const config = getEnvSubdomainConfig();
  return {
    environment: process.env.NODE_ENV || "development",
    config,
    enabledSubdomains: config.enabledSubdomains,
    sampleUrls: {
      main: buildDomainUrl(),
      diablo4: buildDomainUrl("diablo4"),
      game: buildDomainUrl("game"),
      wow: buildDomainUrl("wow"),
    },
  };
}
