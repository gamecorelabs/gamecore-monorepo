"use client";
import dataApi from "@/utils/common-axios/dataApi";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { StatusCodes } from "http-status-codes";
import { useUserStore } from "@/store/userStore";
import useHydrated from "@/utils/hooks/useHydrated";
import { formDataToObject } from "@/utils/helpers/formDataToObject";
import { getZodErrorMessage } from "@/utils/helpers/getZodErrorMessage";
import PostFields from "./PostFields";
import { NewsConfig } from "@/types/news/newsConfig.types";
import { userNewsPostSchema } from "@/utils/validation/news/newNewsPostSchema";
import { NewsPost } from "@/types/news/newsPost.types";

const WriteForm = ({
  newsConfig,
  post,
}: {
  newsConfig: NewsConfig;
  post?: NewsPost;
}) => {
  const isEditMode = !!post;
  const newsId = newsConfig.id;
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

    const schema = userNewsPostSchema;
    const validation = schema.safeParse(formObject);

    if (!validation.success) {
      const firstIssue = validation.error.issues[0];
      getZodErrorMessage(formRef, firstIssue);
      return;
    }

    const headers: Record<string, string> = {
      "Content-Type": "multipart/form-data",
    };

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
      const result = await dataApi.post(`/news/${newsId}/post`, formData, {
        headers,
        withCredentials: true,
      });

      if (result.status === StatusCodes.CREATED && result.data.id > 0) {
        router.push(`/news/${newsId}/post`);
      }
    } catch {
      window.alert("뉴스 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }
  };

  const editPost = async (
    postId: number,
    headers: Record<string, string>,
    formData: FormData
  ) => {
    try {
      const result = await dataApi.patch(`/news-post/${postId}`, formData, {
        headers,
        withCredentials: true,
      });

      if (result.status === StatusCodes.OK && result.data.id > 0) {
        router.push(`/news/${newsId}/post`);
      }
    } catch {
      window.alert("뉴스 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }
  };

  if (!hydrated) return null;

  return (
    <form
      className="flex flex-col items-center justify-center h-full w-full mx-auto rounded"
      ref={formRef}
    >
      <PostFields newsConfig={newsConfig} post={post} />

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
