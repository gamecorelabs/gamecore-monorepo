import { ChannelConfig } from "@/types/channel/channel.types";
import { isChannelEnabled, buildUrl, URL_ENV_CONFIGS } from "./environment";
import { CHANNEL_CONFIG } from "@/config/channel-config";

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
  return channels.map(([_, value]) => value);
}

/**
 * 활성화 된 채널 중 키워드에 속한 채널을 가져온다.
 */
export function getChannelsByKeyword(keyword: string): ChannelConfig[] {
  const lowerKeyword = keyword.toLowerCase();
  const channels = getAllChannels();
  return channels.filter(
    (channel) =>
      channel.title.toLowerCase().includes(lowerKeyword) ||
      channel.shortTitle.toLowerCase().includes(lowerKeyword) ||
      channel.description.toLowerCase().includes(lowerKeyword)
  );
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
