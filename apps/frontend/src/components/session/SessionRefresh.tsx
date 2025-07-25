"use client";

import { useEffect } from "react";
import authApi from "@/utils/common-axios/authApi";
import { useUserStore } from "@/store/userStore";
import { User } from "@/types/user/user.types";

export default function SessionRefresher({
  user,
  hasRefreshToken,
}: {
  user: User | null;
  hasRefreshToken: boolean;
}) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user); // SSR에서 받아온 user를 클라이언트 상태로 동기화
      return;
    }

    if (!hasRefreshToken) {
      return;
    }

    (async () => {
      try {
        const res = await authApi.post("/auth/token/access");

        if (res.data.success === true) {
          const res = await authApi.post("/auth/me");
          setUser(res.data);
        }
      } catch {
        setUser(null);
      }
    })();
  }, [user, hasRefreshToken, setUser]);

  return null;
}
