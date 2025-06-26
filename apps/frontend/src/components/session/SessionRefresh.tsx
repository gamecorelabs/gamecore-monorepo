"use client";

import { useEffect } from "react";
import authApi from "@/utils/common-axios/authApi";
import { useUserStore } from "@/store/userStore";
import Cookies from "js-cookie";

// FIXME: any type
export default function SessionRefresher({ user }: any) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user); // SSR에서 받아온 user를 클라이언트 상태로 동기화
      return;
    }

    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) return;

    (async () => {
      try {
        const res = await authApi.post(
          "/auth/token/access",
          {},
          { withCredentials: true }
        );

        if (res.data.success === true) {
          const res = await authApi.post(
            "/auth/me",
            {},
            { withCredentials: true }
          );
          setUser(res.data);
        }
      } catch (err) {
        setUser(null);
      }
    })();
  }, [user, setUser]);

  return null;
}
