import { z } from "zod";
import { withCommonRefines } from "../common/refineCommon";

export const userLoginSchema = z.object({
  email: withCommonRefines(
    z
      .string()
      .trim()
      .min(1, { message: "이메일을 입력해주세요." })
      .email({ message: "올바른 이메일 형식으로 입력해주세요." })
  ),
  password: withCommonRefines(z.string()),
});
