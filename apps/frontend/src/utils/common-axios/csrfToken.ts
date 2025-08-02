import axios from "axios";

let cachedToken: string | null = null;
let tokenExpiry: number = 0;
const TOKEN_CACHE_DURATION = 5 * 60 * 1000; // 5분 캐시

/**
 * auth-api에서 CSRF 토큰을 발급받는 함수
 * 토큰을 5분간 캐시하여 불필요한 요청 방지
 * 순환 의존성을 피하기 위해 직접 axios 인스턴스 사용
 */
export const getCsrfToken = async (): Promise<string | null> => {
  const now = Date.now();

  // 캐시된 토큰이 있고 만료되지 않았으면 재사용
  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  try {
    // 순환 의존성 방지를 위해 직접 axios 인스턴스 생성
    const isServer = typeof window === "undefined";
    const authApiUrl = isServer
      ? process.env.INTERNAL_AUTH_API_URL
      : process.env.NEXT_PUBLIC_AUTH_API_URL;

    if (!authApiUrl || authApiUrl === "undefined") {
      throw new Error("인증 서버 URL이 정의되지 않았습니다.");
    }

    const response = await axios.get(`${authApiUrl}/auth/csrf-token`, {
      withCredentials: true,
      timeout: 5000,
    });

    const tokenData = response.data;

    if (!tokenData) {
      throw new Error("CSRF 토큰 발급 오류: 페이지를 새로고침 해주세요.");
    }

    cachedToken = tokenData;
    tokenExpiry = now + TOKEN_CACHE_DURATION;

    return cachedToken;
  } catch (error) {
    console.error("CSRF 토큰 발급 실패:", error);
    throw new Error("CSRF token generation failed");
  }
};

/**
 * 캐시된 CSRF 토큰을 강제로 무효화
 */
export const invalidateCsrfToken = (): void => {
  cachedToken = null;
  tokenExpiry = 0;
};
