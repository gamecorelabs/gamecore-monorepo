import { NextRequest, NextResponse } from "next/server";
// import { jwtDecode } from "jwt-decode";

/**
 * 인증이 필요한 경로들
 */
const PROTECTED_PATHS = [
  "/admin",
  "/user/profile",
  "/user/settings",
  "/board/write",
  "/board/edit",
];

/**
 * 인증 체크가 필요한 경로인지 확인
 */
export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some((path) => pathname.startsWith(path));
}

/**
 * 인증 미들웨어
 * TODO: JWT 토큰 검증 로직 구현
 */
export function handleAuthentication(
  request: NextRequest,
  response: NextResponse
): NextResponse {
  const pathname = request.nextUrl.pathname;

  // 보호된 경로가 아니면 그대로 진행
  if (!isProtectedPath(pathname)) {
    return response;
  }

  // TODO: 쿠키에서 JWT 토큰 확인
  // const token = request.cookies.get('auth-token')?.value;

  // TODO: 토큰 검증 로직
  // if (!token || !isValidToken(token)) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/auth/login';
  //   url.searchParams.set('redirect', pathname);
  //   return NextResponse.redirect(url);
  // }

  return response;
}

/**
 * JWT 토큰 검증 (TODO: 구현 필요)
 */
// function isValidToken(token: string): boolean {
//   try {
//     const decoded = jwtDecode(token);
//     return decoded.exp > Date.now() / 1000;
//   } catch {
//     return false;
//   }
// }
