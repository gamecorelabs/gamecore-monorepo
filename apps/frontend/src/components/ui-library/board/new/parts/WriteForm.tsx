"use client";
import dataApi from "@/utils/common-axios/dataApi";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { StatusCodes } from "http-status-codes";
import { useUserStore } from "@/store/userStore";
import useHydrated from "@/utils/hooks/useHydrated";
import { formDataToObject } from "@/utils/helpers/formDataToObject";
import {
  userBoardPostSchema,
  guestBoardPostSchema,
} from "@/utils/validation/board/newBoardPostSchema";
import { encodeBase64Unicode } from "@/utils/helpers/base64Unicode";
import { getZodErrorMessage } from "@/utils/helpers/getZodErrorMessage";
import { BoardPost } from "@/types/board/boardPost.types";
import GuestAuthorFields from "./GuestAuthorFields";
import PostFields from "./PostFields";
import { BoardConfig } from "@/types/board/boardConfig.types";

const WriteForm = ({
  boardConfig,
  guestMode,
  post,
  guestInfo,
}: {
  boardConfig: BoardConfig;
  guestMode: boolean;
  post?: BoardPost;
  guestInfo?: {
    guestAuthorId: string;
    guestAuthorPassword: string;
  };
}) => {
  const isEditMode = !!post;
  const boardId = boardConfig.id;
  const currentUser = useUserStore((state) => state.user);
  const hydrated = useHydrated();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handlePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formRef.current === null) {
      window.alert("폼이 올바르게 로드되지 않았습니다. 다시 시도해주세요.");
      return;
    }
    // FIXME: Helper 함수로 분리
    const formData = new FormData(formRef.current);
    const formObject = formDataToObject(formData);

    const schema =
      currentUser && !guestMode ? userBoardPostSchema : guestBoardPostSchema;
    const validation = schema.safeParse(formObject);

    if (!validation.success) {
      const firstIssue = validation.error.issues[0];
      getZodErrorMessage(formRef, firstIssue);
      return;
    }

    const headers: Record<string, string> = {
      "Content-Type": "multipart/form-data",
    };

    if (
      guestMode &&
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

    if (isEditMode && post) {
      editPost(post.id, headers, formData);
    } else {
      newPost(headers, formData);
    }
  };

  const newPost = async (
    headers: Record<string, string>,
    formData: FormData
  ) => {
    try {
      const result = await dataApi.post(`/board/${boardId}/post`, formData, {
        headers,
        withCredentials: true,
      });

      if (result.status === StatusCodes.CREATED && result.data.id > 0) {
        router.push(`/board/${boardId}/post`);
      }
    } catch {
      window.alert("게시글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }
  };

  const editPost = async (
    postId: number,
    headers: Record<string, string>,
    formData: FormData
  ) => {
    try {
      const result = await dataApi.patch(`/board-post/${postId}`, formData, {
        headers,
        withCredentials: true,
      });

      if (result.status === StatusCodes.OK && result.data.id > 0) {
        router.push(`/board/${boardId}/post`);
      }
    } catch {
      window.alert("게시글 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }
  };

  if (!hydrated) return null;

  return (
    <form
      className="flex flex-col items-center justify-center h-full w-full mx-auto rounded"
      ref={formRef}
    >
      {guestMode && (
        <GuestAuthorFields isEditMode={isEditMode} guestInfo={guestInfo} />
      )}

      <PostFields boardConfig={boardConfig} post={post} />

      <button
        type="submit"
        className="w-full font-semibold py-2 rounded transition"
        style={{
          backgroundColor: "var(--primary-color)",
          borderColor: "var(--border-color)",
          color: "var(--text-color)",
        }}
        onClick={handlePost}
      >
        작성하기
      </button>
    </form>
  );
};

export default WriteForm;
