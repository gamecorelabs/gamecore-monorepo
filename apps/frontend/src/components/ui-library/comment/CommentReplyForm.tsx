"use client";

import { useUserStore } from "@/store/userStore";
import dataApi from "@/utils/common-axios/dataApi";
import { encodeBase64Unicode } from "@/utils/helpers/base64Unicode";
import { formDataToObject } from "@/utils/helpers/formDataToObject";
import { getZodErrorMessage } from "@/utils/helpers/getZodErrorMessage";
import {
  guestCommentSchema,
  userCommentSchema,
} from "@/utils/validation/board/newPostCommentSchema";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface ReplyFormProps {
  parentId: number | undefined;
  postId: number;
  onCancel: () => void;
  placeholder?: string;
  defaultValue?: string;
}

const CommentReplyForm = ({
  parentId,
  postId,
  onCancel,
  placeholder = "답글을 작성하세요...",
  defaultValue,
}: ReplyFormProps) => {
  const currentUser = useUserStore((state) => state.user);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (textareaRef.current) {
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
      textareaRef.current.focus();
    }
  }, []); // mount 시 한 번만 실행

  const handleCommentReplySubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (formRef.current === null) {
      window.alert("폼이 올바르게 로드되지 않았습니다. 다시 시도해주세요.");
      return;
    }

    // FIXME: Helper 함수로 분리
    const formData = new FormData(formRef.current);
    const formObject = formDataToObject(formData);

    const schema = currentUser ? userCommentSchema : guestCommentSchema;
    const validation = schema.safeParse(formObject);

    if (!validation.success) {
      const firstIssue = validation.error.issues[0];
      getZodErrorMessage(formRef, firstIssue);
      return;
    }

    const headers: Record<string, string> = {};

    if (
      !currentUser &&
      formObject.guestAuthorId &&
      formObject.guestAuthorPassword
    ) {
      const encoded = encodeBase64Unicode(
        `${formObject.guestAuthorId}:${formObject.guestAuthorPassword}`
      );
      headers["Authorization"] = `Basic ${encoded}`;
      formData.delete("guestAuthorId");
      formData.delete("guestAuthorPassword");
    }

    try {
      const result = await dataApi.post(
        `/board-post/${postId}/comment`,
        formData,
        {
          headers,
          withCredentials: true,
        }
      );

      if (result.status === StatusCodes.CREATED && result.data.id > 0) {
        onCancel();
        formRef.current.reset();
        router.refresh();
      }
    } catch {
      window.alert("댓글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }
  };

  return (
    <div className="my-3 px-4 pt-2 pb-4 rounded-lg border border-gray-200">
      <form className="space-y-3" ref={formRef}>
        <input type="hidden" name="parent_id" value={parentId} />
        {!currentUser && (
          <div className="flex gap-3 mb-3 max-w-full md:w-1/2 justify-self-end">
            <input
              type="text"
              placeholder="아이디"
              name="guestAuthorId"
              className="w-1/2 flex-1 p-1 border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                color: "var(--text-color)",
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--border-color)",
              }}
            />
            <input
              type="password"
              placeholder="비밀번호"
              name="guestAuthorPassword"
              className="w-1/2 flex-1 p-1 border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                color: "var(--text-color)",
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--border-color)",
              }}
            />
          </div>
        )}
        <textarea
          name="content"
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          defaultValue={defaultValue}
          autoFocus
          ref={textareaRef}
          style={{
            color: "var(--text-color)",
            backgroundColor: "var(--input-bg)",
            borderColor: "var(--border-color)",
          }}
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "var(--primary-color)",
              borderColor: "var(--border-color)",
              color: "var(--text-color)",
            }}
            onClick={handleCommentReplySubmit}
          >
            답글 작성
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentReplyForm;
