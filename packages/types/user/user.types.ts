type BaseUserInfo = {
  type: "user" | "guest";
  ip_address: string;
};

type UserAccount = {
  id: number;
  created_at: string;
  updated_at: string;
  nickname: string;
  email: string;
  role: string;
  grade: string;
};

type GuestAccount = {
  guest_author_id: string;
  guest_author_password: string;
};

export type User =
  | (BaseUserInfo & { type: "user"; user_account: UserAccount })
  | (BaseUserInfo & { type: "guest"; guest_account: GuestAccount });
