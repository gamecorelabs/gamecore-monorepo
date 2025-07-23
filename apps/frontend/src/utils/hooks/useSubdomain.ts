import { headers } from "next/headers";
import { getSubdomainConfig } from "@/config/channel";
import { ChannelConfig } from "@/types/common/channel.types";

/**
 * 서버 컴포넌트에서 서브도메인 정보를 가져오는 함수
 */
export async function getSubdomainInfo(): Promise<{
  subdomain: string | null;
  config: ChannelConfig | null;
}> {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");

  if (!subdomain) {
    throw new Error("존재하지 않는 채널입니다.");
  }

  const config = getSubdomainConfig(subdomain);

  return { subdomain, config };
}

/**
 * 클라이언트 컴포넌트에서 서브도메인 정보를 가져오는 함수
 */
export function getSubdomainFromHost(): {
  subdomain: string | null;
  config: ChannelConfig | null;
} {
  if (typeof window === "undefined") {
    return { subdomain: null, config: null };
  }

  const host = window.location.host;
  const parts = host.split(".");

  let subdomain: string | null = null;

  // dev.diablo4.gamecore.co.kr -> diablo4
  // diablo4.gamecore.co.kr -> diablo4
  if (parts.length >= 4 && parts[0] === "dev") {
    subdomain = parts[1];
  } else if (parts.length >= 3 && parts[0] !== "www") {
    subdomain = parts[0];
  }

  if (!subdomain) {
    return { subdomain: null, config: null };
  }

  const config = getSubdomainConfig(subdomain);

  return { subdomain, config };
}

/**
 * 서브도메인 기반 테마 클래스 반환
 */
export function getSubdomainThemeClass(subdomain: string | null): string {
  if (!subdomain) return "theme-default";

  const config = getSubdomainConfig(subdomain);
  return config?.theme || "theme-default";
}

/**
 * 서브도메인 기반 메타데이터 반환
 */
export function getSubdomainMetadata(subdomain: string | null) {
  if (!subdomain) {
    return {
      title: "GameCore",
      description: "게임 종합 포털",
      keywords: ["game", "gaming", "portal"],
    };
  }

  const config = getSubdomainConfig(subdomain);
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
    keywords: config.metadata?.keywords || [config.domain],
  };
}
