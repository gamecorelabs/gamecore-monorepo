import { z } from "zod";
import {
  refineNoDangerousChars,
  refineNoScriptKeywords,
} from "../common/refineCommon";

export const newsListSearchSchema = z.object({
  searchType: z.enum(["title", "content"], {
    errorMap: () => ({ message: "검색 옵션이 잘못 되었습니다." }),
  }),
  searchValue: z
    .string()
    .refine(
      refineNoDangerousChars.validation,
      "검색어는" + refineNoDangerousChars.message
    )
    .refine(
      refineNoScriptKeywords.validation,
      "검색어에" + refineNoScriptKeywords.message
    ),
});
