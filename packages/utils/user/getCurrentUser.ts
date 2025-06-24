import { cookies } from "next/headers";

export async function getCurrentUser() {
  const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  const res = await fetch(`${AUTH_API_URL}/auth/me`, {
    method: "POST",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
    credentials: "include", // 실제 prod 환경에서는 필요
  });

  if (!res.ok) return null;

  return res.json();
}
