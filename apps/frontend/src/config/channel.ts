import { ChannelConfig } from "@/types/channel/channel.types";
import { isChannelEnabled, buildUrl, URL_ENV_CONFIGS } from "./environment";
import { CHANNEL_CONFIG } from "@/config/channel_config";

/**
 * 현재 환경의 URL 정보 반환
 */
export function getUrlEnvironmentConfig() {
  const env = (process.env.NODE_ENV || "development") as
    | "development"
    | "staging"
    | "production";
  return URL_ENV_CONFIGS[env] || URL_ENV_CONFIGS.development;
}

/**
 * 채널 설정 반환 (환경별 활성화 확인 포함)
 */
export function getChannelConfig(channel: string): ChannelConfig | null {
  if (!isChannelEnabled(channel)) {
    return null;
  }
  return CHANNEL_CONFIG[channel] || null;
}

/**
 * 활성화된 채널 목록 반환
 */
export function getAllChannels() {
  const channels = Object.entries(CHANNEL_CONFIG).filter(([key]) => {
    return isChannelEnabled(key);
  });
  return channels.map(([key, value]) => value);
}

/**
 * 채널의 풀 URL 생성 (환경별 대응)
 */
export function getChannelUrl(channel: string, path: string = "/"): string {
  return buildUrl(channel, path);
}

/**
 * 메인 URL 생성 (환경별 대응)
 */
export function getMainUrl(path: string = "/"): string {
  return buildUrl(undefined, path);
}
