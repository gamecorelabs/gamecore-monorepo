"use client";
import { useUserStore } from "@/store/userStore";
import AuthBlock from "./AuthBlock";
import UserProfile from "./UserProfile";

const ProfileBlock = () => {
  const user = useUserStore((state) => state.user);
  return user ? <UserProfile /> : <AuthBlock />;
};

export default ProfileBlock;
