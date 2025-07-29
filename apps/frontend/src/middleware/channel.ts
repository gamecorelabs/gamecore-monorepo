import { NextResponse } from "next/server";
import { COMMON_PATHS } from "@/config/environment";
import { CHANNEL_CONFIG } from "@/config/channel_config";
import {
  getUrlEnvConfig,
  isChannelEnabled,
  buildUrl,
} from "@/config/environment";
import adminApi from "@/utils/common-axios/adminApi";
import { ChannelStatus } from "@/types/channel/channel.types";

/**
 * 호스트에서 채널 추출
 */
export function extractChannel(host: string): string | null {
  const urlEnvConfig = getUrlEnvConfig(); // development, staging, production 환경 설정
  const parts = host.split(".");
  // 개발 환경: dev.{channel}.gamecore.co.kr -> {channel}
  // 스테이징 환경 : sta.{channel}.gamecore.co.kr -> {channel}
  // 프로덕션 환경: {subdoma in}.gamecore.co.kr -> {channel}
  if (urlEnvConfig.prefix) {
    // 개발/스테이징 환경 (prefix 있음)
    if (parts.length >= 4 && parts[0] === urlEnvConfig.prefix) {
      const channel = parts[1];
      if (channel === "gamecore") return "main"; // 메인 페이지는 "main"으로 처리
      return channel;
    }
  } else {
    // 프로덕션 환경 (prefix 없음)
    if (parts.length >= 3 && parts[0] !== "www") {
      const channel = parts[0];
      if (channel === "gamecore") return "main"; // 메인 페이지는 "main"으로 처리
      return channel;
    }
  }

  return null;
}

/**
 * 공통 경로 체크
 */
export function isCommonPath(pathname: string): boolean {
  return COMMON_PATHS.some((path) => pathname.startsWith(path));
}

/**
 * 채널이 유효한지 확인
 */
export async function isValidChannel(channel: string) {
  // 채널 유효한지 확인
  let response = await adminApi.get(`/config/channel/${channel}/status`);
  const isActiveChannel = response.data.status === ChannelStatus.ACTIVE;

  return (
    isActiveChannel && isChannelEnabled(channel) && channel in CHANNEL_CONFIG
  );
}

/**
 * 메인 채널 URL 생성
 */
export function getMainChannelUrl(originalUrl: URL): URL {
  const mainUrl = buildUrl(
    undefined,
    originalUrl.pathname + originalUrl.search
  );
  return new URL(mainUrl);
}

/**
 * 채널별 라우팅 핸들러
 */
export async function handleChannelRouting(
  channel: string,
  url: URL
  // request: NextRequest,
): Promise<NextResponse> {
  const isValideChannel = await isValidChannel(channel);

  // 유효하지 않은 채널은 메인으로 리다이렉션
  if (!isValideChannel) {
    const mainUrl = getMainChannelUrl(url);
    return NextResponse.redirect(mainUrl);
  }

  // 공통 경로는 그대로 처리하되 채널 정보를 헤더로 전달
  if (isCommonPath(url.pathname)) {
    const response = NextResponse.next();
    response.headers.set("x-channel", channel);
    response.headers.set("x-pathname", url.pathname);
    return response;
  }

  // 채널별 전용 경로 처리
  // return handleChannelSpecificRouting(channel, url, request);
  return handleChannelSpecificRouting(channel, url);
}

/**
 * 채널 전용 라우팅 처리
 */
function handleChannelSpecificRouting(
  channel: string,
  url: URL
  // request: NextRequest // NOTE: request는 추후 특정 path에서 인증 처리 및 추가적인 작업이 필요할 때 활용하자
): NextResponse {
  const config = CHANNEL_CONFIG[channel];

  // 루트 경로 처리
  if (url.pathname === "/") {
    url.pathname = config.routes.home;
    const response = NextResponse.rewrite(url);
    response.headers.set("x-channel", channel); // 헤더 추가
    return response;
  }

  // 채널 전용 경로 처리
  for (const specificPath of config.routes.specific) {
    if (url.pathname.startsWith(specificPath)) {
      // 경로를 채널별 네임스페이스로 rewrite
      url.pathname = `${config.routes.home}${url.pathname}`;
      const response = NextResponse.rewrite(url);
      response.headers.set("x-channel", channel);
      return response;
    }
  }

  // 기본 응답에 채널 정보 추가
  const response = NextResponse.next();
  response.headers.set("x-channel", channel);
  return response;
}
