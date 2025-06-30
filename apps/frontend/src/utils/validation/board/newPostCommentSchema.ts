import { z } from "zod";
import { guestAuthorInputSchema } from "@/utils/validation/user/guestAuthorInputSchema";

const commentField = {
  content: z.string().min(1, "댓글을 입력해주세요."),
};

export const userCommentSchema = z.object({
  ...commentField,
});

export const guestCommentSchema = z.object({
  ...guestAuthorInputSchema,
  ...commentField,
});
