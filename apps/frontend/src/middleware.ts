import { NextRequest, NextResponse } from "next/server";
import {
  extractSubdomain,
  handleSubdomainRouting,
} from "@/middleware/subdomain";
// import { handleAuthentication } from "@/lib/middleware/auth";

/**
 * 메인 미들웨어 함수
 */
export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  // 1. 서브도메인 추출 및 라우팅 처리
  const subdomain = extractSubdomain(host);
  let response: NextResponse;

  if (subdomain) {
    // response = handleSubdomainRouting(subdomain, url, request);
    response = handleSubdomainRouting(subdomain, url);
  } else {
    response = NextResponse.next();
  }

  // 2. 인증 처리 (일단 제외)
  // response = handleAuthentication(request, response);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
