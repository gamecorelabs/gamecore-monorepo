"use client";
import Link from "next/link";

const UserProfile = ({ user }: any) => {
  return (
    <div className="flex items-center space-x-4">
      {/* TODO: Profile 이미지 추가 */}
      <Link href="/user/profile" className="">
        프로필
      </Link>
      <Link href="/user/logout" className="">
        로그아웃
      </Link>
    </div>
  );
};

export default UserProfile;
