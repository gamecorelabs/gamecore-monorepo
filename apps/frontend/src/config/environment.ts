/**
 * 환경별 URL 설정을 관리하는 파일
 * 이 파일을 통해 환경별로 다른 URL 설정을 적용할 수 있습니다.
 */
const ENABLED_CHANNELS = ["main", "baram", "djmax"];

// 공통 경로 설정
export const COMMON_PATHS = [
  "/board",
  "/user",
  "/api",
  "/auth",
  "/admin",
  "/news",
];

// 개발 환경 설정
export const DEV_URL_CONFIG = {
  prefix: "dev-server",
  siteDomain: "gamecore.co.kr",
  protocol: "https",
  enabledChannels: ENABLED_CHANNELS,
};

// 스테이징 환경 설정
export const STAGING_URL_CONFIG = {
  prefix: "sta",
  siteDomain: "gamecore.co.kr",
  protocol: "https",
  enabledChannels: ENABLED_CHANNELS,
};

// 프로덕션 환경 설정
export const PRODUCTION_URL_CONFIG = {
  prefix: "",
  siteDomain: "gamecore.co.kr",
  protocol: "https",
  enabledChannels: ENABLED_CHANNELS,
};

// 환경별 설정 맵
export const URL_ENV_CONFIGS = {
  development: DEV_URL_CONFIG,
  staging: STAGING_URL_CONFIG,
  production: PRODUCTION_URL_CONFIG,
} as const;

/**
 * 현재 환경의 URL 설정 반환
 */
export function getUrlEnvConfig() {
  const env = process.env.NODE_ENV || "development";
  return (
    URL_ENV_CONFIGS[env as keyof typeof URL_ENV_CONFIGS] ||
    URL_ENV_CONFIGS.development
  );
}

/**
 * 채널이 현재 환경에서 활성화되어 있는지 확인
 */
export function isChannelEnabled(channel: string): boolean {
  const config = getUrlEnvConfig();
  return config.enabledChannels.includes(channel);
}

/**
 * 환경별 URL 생성
 */
export function buildUrl(channel?: string, path: string = "/"): string {
  const config = getUrlEnvConfig();

  let host: string;
  if (channel && channel !== "main" && isChannelEnabled(channel)) {
    if (config.prefix) {
      host = `${config.prefix}.${channel}.${config.siteDomain}`;
    } else {
      host = `${channel}.${config.siteDomain}`;
    }
  } else {
    if (config.prefix) {
      host = `${config.prefix}.${config.siteDomain}`;
    } else {
      host = config.siteDomain;
    }
  }

  return `${config.protocol}://${host}${path}`;
}

/**
 * 채널 간 이동 URL 생성
 */
export function getChannelNavigationUrl(
  targetChannel: string,
  currentPath: string = "/"
): string {
  return buildUrl(targetChannel, currentPath);
}

/**
 * 환경 정보를 포함한 디버그 정보 반환
 */
export function getChannelDebugInfo() {
  const config = getUrlEnvConfig();
  return {
    environment: process.env.NODE_ENV || "development",
    config,
    enabledChannels: config.enabledChannels,
    sampleUrls: {
      main: buildUrl(),
      diablo4: buildUrl("diablo4"),
      game: buildUrl("game"),
      wow: buildUrl("wow"),
    },
  };
}
