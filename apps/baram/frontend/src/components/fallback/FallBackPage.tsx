"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// FIXME: 타입 분리
type FallbackPageProps = {
  message?: string;
  redirectTo?: string;
  delay?: number;
};

export default function FallbackPage({
  message = "잘못된 접근입니다.",
  redirectTo = "",
  delay = 2000,
}: FallbackPageProps) {
  const router = useRouter();

  useEffect(() => {
    if (redirectTo) {
      const timer = setTimeout(() => {
        router.push(redirectTo);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [redirectTo, delay, router]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>{message}</h2>
      {redirectTo && <p>{delay / 1000}초 후 자동 이동합니다...</p>}
    </div>
  );
}
