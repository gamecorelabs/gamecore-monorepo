"use client";
import { useUserStore } from "@/store/userStore";
import { userLogout } from "@/utils/auth/logout";
import Link from "next/link";

const UserProfile = () => {
  const currentUser = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const result = await userLogout();
    if (!result) return;
    setUser(null);
  };

  return (
    <div className="flex items-center space-x-4">
      <Link href="/user/profile">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          style={{
            backgroundColor: "var(--primary-color)",
            color: "white",
          }}
        >
          {currentUser && currentUser.type === "user"
            ? currentUser.userAccount.nickname.charAt(0)
            : ""}
        </div>
      </Link>
      {/* <Link href="/user/profile" className="">
        프로필
      </Link> */}
      <Link href="" className="" onClick={handleLogout}>
        로그아웃
      </Link>
    </div>
  );
};

export default UserProfile;
