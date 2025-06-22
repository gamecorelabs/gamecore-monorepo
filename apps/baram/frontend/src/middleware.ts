import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

export async function middleware(req: NextRequest) {
  const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  const accessTokenExpired = checkTokenExpired(accessToken);
  const refreshTokenExpired = checkTokenExpired(refreshToken);

  // refresh token 값 없을 시 로그인 화면으로 리다이렉트
  if (refreshTokenExpired) {
    return NextResponse.redirect(new URL("/user/auth/login", req.url));
  }

  if (accessTokenExpired) {
    // 액세스 토큰이 유효하지 않을 경우 액세스 토큰을 재발급
    try {
      const response = await fetch(`${AUTH_API_URL}/auth/token/access`, {
        method: "POST",
        headers: {
          Cookie: req.headers.get("cookie") || "", // 중요: 기존 쿠키 같이 전달
        },
        credentials: "include",
      });

      if (!response.ok) {
        return NextResponse.redirect(new URL("/user/auth/login", req.url));
      }

      if (response.ok) {
        const res = NextResponse.next();
        const responseCookies = new ResponseCookies(response.headers);
        const accessToken = responseCookies.get("access_token");

        if (accessToken) {
          // 새 액세스 토큰을 설정
          res.cookies.set("access_token", accessToken.value, {
            httpOnly: accessToken.httpOnly,
            sameSite: accessToken.sameSite,
            path: accessToken.path,
            secure: accessToken.secure,
            maxAge: accessToken.maxAge,
          });
        }

        return res;
      }
    } catch (error) {
      console.error("access token 재발급 오류", error);
      return NextResponse.redirect(new URL("/user/auth/login", req.url));
    }
  }
}

function checkTokenExpired(token: string | undefined): boolean {
  if (!token) return true;

  try {
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch {
    return true;
  }
}

export const config = {
  matcher: ["/board/:id/new"],
};
