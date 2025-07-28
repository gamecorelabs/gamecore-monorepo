import { NextResponse } from "next/server";
import { COMMON_PATHS } from "@/config/environment";
import { CHANNEL_CONFIG } from "@/config/channel_config";
import {
  getEnvSubdomainConfig,
  isSubdomainEnabled,
  buildDomainUrl,
} from "@/config/environment";

/**
 * 호스트에서 서브도메인 추출
 */
export function extractSubdomain(host: string): string | null {
  const domainConfig = getEnvSubdomainConfig(); // development, staging, production 환경 설정
  const parts = host.split(".");
  // 개발 환경: dev.{subdomain}.gamecore.co.kr -> {subdomain}
  // 스테이징 환경 : sta.{subdomain}.gamecore.co.kr -> {subdomain}
  // 프로덕션 환경: {subdoma in}.gamecore.co.kr -> {subdomain}
  if (domainConfig.prefix) {
    // 개발/스테이징 환경 (prefix 있음)
    if (parts.length >= 4 && parts[0] === domainConfig.prefix) {
      const subdomain = parts[1];
      if (subdomain === "gamecore") return "main"; // 메인 페이지는 "main"으로 처리
      return subdomain;
    }
  } else {
    // 프로덕션 환경 (prefix 없음)
    if (parts.length >= 3 && parts[0] !== "www") {
      const subdomain = parts[0];
      if (subdomain === "gamecore") return "main"; // 메인 페이지는 "main"으로 처리
      return subdomain;
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
 * 서브도메인이 유효한지 확인
 */
export function isValidSubdomain(subdomain: string): boolean {
  return isSubdomainEnabled(subdomain) && subdomain in CHANNEL_CONFIG;
}

/**
 * 메인 도메인 URL 생성
 */
export function getMainDomainUrl(originalUrl: URL): URL {
  const mainUrl = buildDomainUrl(
    undefined,
    originalUrl.pathname + originalUrl.search
  );
  return new URL(mainUrl);
}

/**
 * 서브도메인별 라우팅 핸들러
 */
export function handleSubdomainRouting(
  subdomain: string,
  url: URL
  // request: NextRequest,
): NextResponse {
  // 공통 경로는 그대로 처리하되 서브도메인 정보를 헤더로 전달
  if (isCommonPath(url.pathname)) {
    const response = NextResponse.next();
    response.headers.set("x-subdomain", subdomain);
    response.headers.set("x-pathname", url.pathname);
    return response;
  }

  // 유효하지 않은 서브도메인은 메인으로 리다이렉션
  if (!isValidSubdomain(subdomain)) {
    const mainUrl = getMainDomainUrl(url);
    return NextResponse.redirect(mainUrl);
  }

  // 서브도메인별 전용 경로 처리
  // return handleSubdomainSpecificRouting(subdomain, url, request);
  return handleSubdomainSpecificRouting(subdomain, url);
}

/**
 * 서브도메인 전용 라우팅 처리
 */
function handleSubdomainSpecificRouting(
  subdomain: string,
  url: URL
  // request: NextRequest // NOTE: request는 추후 특정 path에서 인증 처리 및 추가적인 작업이 필요할 때 활용하자
): NextResponse {
  const config = CHANNEL_CONFIG[subdomain];

  // 루트 경로 처리
  if (url.pathname === "/") {
    url.pathname = config.routes.home;
    const response = NextResponse.rewrite(url);
    response.headers.set("x-subdomain", subdomain); // 헤더 추가
    return response;
  }

  // 서브도메인 전용 경로 처리
  for (const specificPath of config.routes.specific) {
    if (url.pathname.startsWith(specificPath)) {
      // 경로를 서브도메인별 네임스페이스로 rewrite
      url.pathname = `${config.routes.home}${url.pathname}`;
      const response = NextResponse.rewrite(url);
      response.headers.set("x-subdomain", subdomain);
      return response;
    }
  }

  // 기본 응답에 서브도메인 정보 추가
  const response = NextResponse.next();
  response.headers.set("x-subdomain", subdomain);
  return response;
}
