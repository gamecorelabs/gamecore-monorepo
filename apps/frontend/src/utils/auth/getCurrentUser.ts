import { cookies } from "next/headers";
import authApi from "@/utils/common-axios/authApi";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  try {
    const res = await authApi.post(
      "/auth/me",
      {},
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch {
    return null;
  }
}
