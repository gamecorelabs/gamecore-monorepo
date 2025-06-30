import { z } from "zod";
import {
  refineNoDangerousChars,
  refineNoScriptKeywords,
  refineNoSpace,
} from "../common/refineCommon";

export const userRegisterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "올바른 이메일 형식으로 입력해주세요." })
    .max(320, { message: "이메일은 320자 이내로 입력해주세요." })
    .refine(refineNoSpace.validation, {
      message: "이메일에는 " + refineNoSpace.message,
    })
    .refine(refineNoDangerousChars.validation, {
      message: "이메일에는 " + refineNoDangerousChars.message,
    })
    .refine(refineNoScriptKeywords.validation, {
      message: "이메일에 " + refineNoScriptKeywords.message,
    }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상 입력해주세요." })
    .max(32, { message: "비밀번호는 32자 이내로 입력해주세요." })
    .refine(refineNoSpace.validation, {
      message: "비밀번호에는 " + refineNoSpace.message,
    })
    .refine(refineNoDangerousChars.validation, {
      message: "비밀번호에는 " + refineNoDangerousChars.message,
    })
    .refine(refineNoScriptKeywords.validation, {
      message: "비밀번호에 " + refineNoScriptKeywords.message,
    }),
});
