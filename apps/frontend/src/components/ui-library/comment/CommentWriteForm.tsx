"use client";

import { useUserStore } from "@/store/userStore";
import { getZodErrorMessage } from "@/utils/helpers/getZodErrorMessage";
import { formDataToObject } from "@/utils/helpers/formDataToObject";
import useHydrated from "@/utils/hooks/useHydrated";
import {
  guestCommentSchema,
  userCommentSchema,
} from "@/utils/validation/board/newPostCommentSchema";
import React, { useRef } from "react";
import { encodeBase64Unicode } from "@/utils/helpers/base64Unicode";
import { StatusCodes } from "http-status-codes";
import dataApi from "@/utils/common-axios/dataApi";
import { useRouter } from "next/navigation";
import { ResourceType } from "@/types/common/resource.types";

const CommentWriteForm = ({
  resourceType,
  resourceId,
}: {
  resourceType: ResourceType;
  resourceId: number;
}) => {
  const currentUser = useUserStore((state) => state.user);
  const hydrated = useHydrated();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleCommentSubmit = async (
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
        `/${resourceType}/${resourceId}/comment`,
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
    } catch {
      window.alert("댓글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }
  };

  if (!hydrated) {
    return null;
  }

  return (
    <div className="pt-6">
      <form className="gap-3" ref={formRef}>
        <div className="w-full md:flex md:items-center md:justify-between">
          <h4 className="font-medium text-gray-900 mb-3 w-full md:w-1/2">
            댓글 작성
          </h4>
          {!currentUser && (
            <div className="flex gap-3 mb-3 w-full md:w-1/2">
              <input
                type="text"
                placeholder="아이디"
                name="guestAuthorId"
                className="w-1/2 flex-1 p-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
              <input
                type="password"
                placeholder="비밀번호"
                name="guestAuthorPassword"
                className="w-1/2 flex-1 p-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
            </div>
          )}
        </div>
        <div>
          <textarea
            name="content"
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            rows={3}
            placeholder="댓글을 입력하세요..."
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleCommentSubmit}
          >
            댓글 등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentWriteForm;
