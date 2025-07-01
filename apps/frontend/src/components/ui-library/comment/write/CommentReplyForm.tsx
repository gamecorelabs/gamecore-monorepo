"use client";

import { useUserStore } from "@/store/userStore";
import dataApi from "@/utils/common-axios/dataApi";
import { encodeBase64Unicode } from "@/utils/helpers/encodeBase64Unicode";
import { formDataToObject } from "@/utils/helpers/formDataToObject";
import { getZodErrorMessage } from "@/utils/helpers/getZodErrorMessage";
import {
  guestCommentSchema,
  userCommentSchema,
} from "@/utils/validation/board/newPostCommentSchema";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/navigation";
import React from "react";

interface ReplyFormProps {
  parentId: number;
  postId: number;
  onCancel: () => void;
  placeholder?: string;
}

const CommentReplyForm = ({
  parentId,
  postId,
  onCancel,
  placeholder = "답글을 작성하세요...",
}: ReplyFormProps) => {
  const currentUser = useUserStore((state) => state.user);
  const formRef = React.useRef<HTMLFormElement>(null);
  const router = useRouter();

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
        formRef.current.reset();
        router.refresh();
      }
    } catch (error) {
      window.alert("댓글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }
  };

  return (
    <div className="mt-3 ml-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <form className="space-y-3" ref={formRef}>
        <input type="hidden" name="parent_id" value={parentId} />
        <textarea
          name="content"
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
