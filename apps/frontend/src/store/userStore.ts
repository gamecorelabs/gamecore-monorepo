// /store/userStore.ts
import { create } from "zustand";

interface User {
  type: "user";
  user_account: {
    id: number;
    created_at: string; // FIXME: REMOVE
    updated_at: string; // FIXME: REMOVE
    nickname: string;
    email: string;
    password: string; // FIXME: REMOVE
    role: string;
    grade: string;
  };
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
