import { GuestAccount, UserAccount } from "@/types/user/user.types";

export const getUserName = (user: {
  guestAccount?: GuestAccount;
  author?: UserAccount;
}) => {
  return user.guestAccount?.guestAuthorId || user.author?.nickname || "익명";
};
