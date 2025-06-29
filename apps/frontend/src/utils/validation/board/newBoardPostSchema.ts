import { z } from "zod";
import { guestAuthorInputSchema } from "@/utils/validation/user/guestAuthorInputSchema";

const boardPostField = {
  title: z.string().min(1, "제목을 입력해주세요."),
  content: z.string().min(1, "내용을 입력해주세요."),
};

export const userBoardPostSchema = z.object({
  ...boardPostField,
});

export const guestBoardPostSchema = z.object({
  ...guestAuthorInputSchema,
  ...boardPostField,
});
