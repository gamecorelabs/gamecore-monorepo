"use client";
import { useUserStore } from "@/store/userStore";
import AuthBlock from "./AuthBlock";
import UserProfile from "./UserProfile";
import useHydrated from "@/utils/hooks/useHydrated";

const ProfileBlock = () => {
  const hydrated = useHydrated();
  const user = useUserStore((state) => state.user);

  if (!hydrated) return null;
  return user ? <UserProfile /> : <AuthBlock />;
};

export default ProfileBlock;
