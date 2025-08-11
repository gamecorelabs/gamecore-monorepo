"use client";
import { buildAuthUrl } from "@/utils/helpers/buildAuthUrl";
import Link from "next/link";

const AuthBlock = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link
        href={buildAuthUrl("/user/auth/login/", window.location.href)}
        className="hover:text-blue-500 transition-colors"
      >
        로그인
      </Link>
      <Link
        href={buildAuthUrl("/user/auth/register/", window.location.href)}
        className="hover:text-blue-500 transition-colors"
      >
        회원가입
      </Link>
    </div>
  );
};

export default AuthBlock;
