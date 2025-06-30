import { z } from "zod";
import { withCommonRefines } from "../common/refineCommon";

export const userRegisterSchema = z.object({
  email: withCommonRefines(
    z
      .string()
      .trim()
      .min(1, { message: "이메일을 입력해주세요." })
      .email({ message: "올바른 이메일 형식으로 입력해주세요." })
      .max(320, { message: "이메일은 320자 이내로 입력해주세요." })
  ),
  password: withCommonRefines(
    z
      .string()
      .min(8, { message: "비밀번호는 8자 이상 입력해주세요." })
      .max(32, { message: "비밀번호는 32자 이내로 입력해주세요." })
  ),
});
