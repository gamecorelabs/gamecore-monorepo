import { GuestAccount, UserAccount } from "@/types/user/user.types";

export const getUserName = (user: {
  guest_account?: GuestAccount;
  author?: UserAccount;
}) => {
  return user.guest_account?.guest_author_id || user.author?.nickname || "익명";
};
