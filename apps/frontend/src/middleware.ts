import { NextRequest, NextResponse } from "next/server";
import { extractChannel, handleChannelRouting } from "@/middleware/channel";
// import { handleAuthentication } from "@/lib/middleware/auth";

/**
 * 메인 미들웨어 함수
 */
export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  // 1. 채널 추출 및 라우팅 처리
  const channel = extractChannel(host);
  let response: NextResponse;

  if (channel) {
    // response = handleChannelRouting(channel, url, request);
    response = handleChannelRouting(channel, url);
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
