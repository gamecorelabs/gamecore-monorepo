import { z } from "zod";

export const guestAuthorInputSchema = {
  guestAuthorId: z
    .string()
    .trim()
    .min(1, "아이디를 1글자 이상으로 입력해주세요.")
    .refine((val) => !val.includes(" "), {
      message: "아이디에는 공백이 포함될 수 없습니다.",
    })
    .refine(
      (val) =>
        /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(
          val
        ),
      {
        message: "아이디는 영문, 숫자, 한글, 특수문자만 사용할 수 있습니다.",
      }
    ),
  guestAuthorPassword: z
    .string()
    .min(4, "비밀번호를 4글자 이상으로 입력해주세요.")
    .refine(
      (val) => /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(val),
      {
        message: "비밀번호는 영문, 숫자, 특수문자만 사용할 수 있습니다.",
      }
    ),
};
