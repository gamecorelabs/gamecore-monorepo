// /store/userStore.ts
import { create } from "zustand";
import { User } from "@/types/user/user.types";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
