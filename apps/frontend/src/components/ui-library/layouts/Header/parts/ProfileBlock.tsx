"use client";
import { useUserStore } from "@/store/userStore";
import AuthBlock from "./AuthBlock";
import UserProfile from "./UserProfile";

const ProfileBlock = ({ user }: any) => {
  const currentUser = user || useUserStore((state) => state.user);
  return currentUser ? <UserProfile /> : <AuthBlock />;
};

export default ProfileBlock;
