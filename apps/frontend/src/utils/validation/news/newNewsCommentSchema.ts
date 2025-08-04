import { z } from "zod";
import { guestAuthorInputSchema } from "@/utils/validation/user/guestAuthorInputSchema";
import {
  refineNoDangerousChars,
  refineNoScriptKeywords,
} from "../common/refineCommon";

const commentField = {
  content: z
    .string()
    .min(1, "댓글을 입력해주세요.")
    .refine(
      refineNoDangerousChars.validation,
      "댓글에는" + refineNoDangerousChars.message
    )
    .refine(
      refineNoScriptKeywords.validation,
      "댓글에" + refineNoScriptKeywords.message
    ),
};

export const userCommentSchema = z.object({
  ...commentField,
});

export const guestCommentSchema = z.object({
  ...guestAuthorInputSchema,
  ...commentField,
});
