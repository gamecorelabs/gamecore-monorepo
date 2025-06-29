/**
 * Zod 유효성 검사 실패 시 메세지를 반환하며, 해당 element로 포커싱함
 * 다수의 유효성 검사 실패시 맨 첫번째 fail element만 타겟으로 한다.
 */

import { ZodIssue } from "zod";

export function getZodErrorMessage(
  formRef: React.RefObject<HTMLFormElement | null>,
  firstIssue: ZodIssue
) {
  const fieldName = firstIssue.path[0] as string;
  const fieldElement = formRef.current?.querySelector(
    `[name="${fieldName}"]`
  ) as HTMLInputElement | HTMLTextAreaElement;
  if (fieldElement) {
    window.alert(firstIssue.message);
    fieldElement.focus();
  }

  return;
}
