type BaseUserInfo = {
  type: "user" | "guest";
  ipAddress: string;
};

export type UserRole = "user" | "admin" | "super_admin";

export type UserAccount = {
  id: number;
  createdAt: string;
  updatedAt: string;
  nickname: string;
  email: string;
  role: UserRole;
  grade: string;
};

export type GuestAccount = {
  guestAuthorId: string;
};

export type User =
  | (BaseUserInfo & { type: "user"; userAccount: UserAccount })
  | (BaseUserInfo & { type: "guest"; guestAccount: GuestAccount });
