const noSpace = (val: string) => !val.includes(" ");
const noDangerousChars = (val: string) => !/[<>'"&]/.test(val);
const noScriptKeywords = (val: string) =>
  !/(?:script|javascript|vbscript|onload|onerror)/i.test(val);

export const refineNoSpace = {
  message: "공백이 포함될 수 없습니다.",
  validation: noSpace,
};
export const refineNoDangerousChars = {
  message: "특수문자 < > ' \" & 는 사용할 수 없습니다.",
  validation: noDangerousChars,
};
export const refineNoScriptKeywords = {
  message: "허용되지 않는 문자열이 포함되어 있습니다.",
  validation: noScriptKeywords,
};
