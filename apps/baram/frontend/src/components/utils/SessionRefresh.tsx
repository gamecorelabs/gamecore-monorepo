"use client";

import { useEffect } from "react";
import authApi from "@gamecoregg/utils/common-axios/src/authApi";
import { useUserStore } from "@/store/userStore";

// FIXME: any type
export default function SessionRefresher({ user }: any) {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (user) {
      setUser(user); // SSR에서 받아온 user를 클라이언트 상태로 동기화
      return;
    }
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

    console.log("zustand userStore 상태:", useUserStore.getState());
  }, [user, setUser]);

  return null;
}
