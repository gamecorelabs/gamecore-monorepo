import { cookies } from "next/headers";

export async function hasRefreshToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  return !!refreshToken;
}
