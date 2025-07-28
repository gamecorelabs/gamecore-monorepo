type BaseUserInfo = {
  type: "user" | "guest";
  ip_address: string;
};

export type UserRole = "user" | "admin" | "super_admin";

export type UserAccount = {
  id: number;
  created_at: string;
  updated_at: string;
  nickname: string;
  email: string;
  role: UserRole;
  grade: string;
};

export type GuestAccount = {
  guest_author_id: string;
};

export type User =
  | (BaseUserInfo & { type: "user"; user_account: UserAccount })
  | (BaseUserInfo & { type: "guest"; guest_account: GuestAccount });
