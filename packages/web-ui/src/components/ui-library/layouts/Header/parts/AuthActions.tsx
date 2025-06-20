"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const AuthActions = () => {
  const authWebUrl = "http://localhost:3400/user";
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    setRedirectUrl(window.location.href);
  }, []);

  const buildAuthUrl = (path: string) => {
    let url = `${authWebUrl}${path}`;
    if (redirectUrl) {
      url +=
        (url.includes("?") ? "&" : "?") +
        `redirect_url=${encodeURIComponent(redirectUrl)}`;
    }
    return url;
  };

  return (
    <div className="flex items-center space-x-4">
      <Link
        href={buildAuthUrl("/login/")}
        className="text-white hover:text-blue-500 transition-colors"
      >
        로그인
      </Link>
      <Link
        href={buildAuthUrl("/register/")}
        className="text-white hover:text-blue-500 transition-colors"
      >
        회원가입
      </Link>
    </div>
  );
};

export default AuthActions;
