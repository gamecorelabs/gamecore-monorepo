import { headers } from "next/headers";
import { getChannelConfig } from "@/config/channel";
import { ChannelConfig } from "@/types/channel/channel.types";

/**
 * 서버 컴포넌트에서 채널 정보를 가져오는 함수
 */
export async function getChannelInfo(): Promise<{
  channel: string | null;
  config: ChannelConfig | null;
}> {
  const headersList = await headers();
  const channel = headersList.get("x-channel");

  if (!channel) {
    throw new Error("존재하지 않는 채널입니다.");
  }

  const config = getChannelConfig(channel);

  return { channel, config };
}

/**
 * 클라이언트 컴포넌트에서 채널 정보를 가져오는 함수
 */
export function getChannelFromHost(): {
  channel: string | null;
  config: ChannelConfig | null;
} {
  if (typeof window === "undefined") {
    return { channel: null, config: null };
  }

  const host = window.location.host;
  const parts = host.split(".");

  let channel: string | null = null;

  // dev.diablo4.gamecore.co.kr -> diablo4
  // diablo4.gamecore.co.kr -> diablo4
  if (parts.length >= 4 && parts[0] === "dev") {
    channel = parts[1];
  } else if (parts.length >= 3 && parts[0] !== "www") {
    channel = parts[0];
  }

  if (!channel) {
    return { channel: null, config: null };
  }

  const config = getChannelConfig(channel);

  return { channel, config };
}

/**
 * 채널 기반 테마 클래스 반환
 */
export function getChannelThemeClass(channel: string | null): string {
  if (!channel) return "theme-default";

  const config = getChannelConfig(channel);
  return config?.theme || "theme-default";
}

/**
 * 채널 기반 메타데이터 반환
 */
export function getChannelMetadata(channel: string | null) {
  if (!channel) {
    return {
      title: "GameCore",
      description: "게임 종합 포털",
      keywords: ["game", "gaming", "portal"],
    };
  }

  const config = getChannelConfig(channel);
  if (!config) {
    return {
      title: "GameCore",
      description: "게임 종합 포털",
      keywords: ["game", "gaming", "portal"],
    };
  }

  return {
    title: config.title,
    description: config.description,
    keywords: config.metadata?.keywords || [config.channel],
  };
}
