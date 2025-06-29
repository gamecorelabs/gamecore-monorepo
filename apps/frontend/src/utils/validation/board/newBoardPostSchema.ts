import { z } from "zod";

export const newBoardPostSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  content: z.string().min(1, "내용을 입력해주세요."),
  guestId: z.string().optional(),
  guestPassword: z.string().optional(),
});

export type NewBoardPostForm = z.infer<typeof newBoardPostSchema>;
