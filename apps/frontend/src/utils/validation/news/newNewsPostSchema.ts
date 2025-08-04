import { z } from "zod";

const newsPostField = {
  title: z.string().min(1, "제목을 입력해주세요."),
  content: z.string().min(1, "내용을 입력해주세요."),
};

export const userNewsPostSchema = z.object({
  ...newsPostField,
});
