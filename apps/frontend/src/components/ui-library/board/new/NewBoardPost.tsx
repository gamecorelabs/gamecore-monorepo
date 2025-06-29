"use client";
import dataApi from "@/utils/common-axios/dataApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { StatusCodes } from "http-status-codes";
import { useUserStore } from "@/store/userStore";
import useHydrated from "@/utils/hooks/useHydrated";
import { formDataToObject } from "@/utils/helpers/formDataToObject";
import {
  userBoardPostSchema,
  guestBoardPostSchema,
} from "@/utils/validation/board/newBoardPostSchema";
import type { ZodIssue } from "zod";
import { encodeBase64Unicode } from "@/utils/helpers/encodeBase64Unicode";
import { getZodErrorMessage } from "@/utils/helpers/getZodErrorMessage";

const NewBoardPost = ({ boardId }: { boardId: string }) => {
  const currentUser = useUserStore((state) => state.user);
  const hydrated = useHydrated();
  const router = useRouter();
  const formRef = React.useRef<HTMLFormElement>(null);
  const handlePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formRef.current === null) {
      window.alert("폼이 올바르게 로드되지 않았습니다. 다시 시도해주세요.");
      return;
    }
    const formData = new FormData(formRef.current);
    const formObject = formDataToObject(formData);

    const schema = currentUser ? userBoardPostSchema : guestBoardPostSchema;
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
      const result = await dataApi.post(`/board/${boardId}/post`, formData, {
        headers,
        withCredentials: true,
      });

      if (result.status === StatusCodes.CREATED && result.data.id > 0) {
        router.push(`/board/${boardId}/post`);
      }
    } catch (error) {
      window.alert("게시글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }
  };

  if (!hydrated) return null;

  return (
    <form
      className="flex flex-col items-center justify-center h-full w-full mx-auto p-6 bg-white rounded shadow"
      ref={formRef}
    >
      {!currentUser && (
        <div className="flex mb-4 w-full gap-4 flex-col xs:flex-row">
          <div className="flex-1">
            <label
              htmlFor="guestAuthorId"
              className="block text-gray-700 font-semibold mb-2"
            >
              아이디 (비회원)
            </label>
            <input
              id="guestAuthorId"
              name="guestAuthorId"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="guestAuthorPassword"
              className="block text-gray-700 font-semibold mb-2"
            >
              비밀번호 (비회원)
            </label>
            <input
              id="guestAuthorPassword"
              name="guestAuthorPassword"
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
        </div>
      )}

      <div className="w-full mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 font-semibold mb-2"
        >
          제목
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="content"
          className="block text-gray-700 font-semibold mb-2"
        >
          내용
        </label>
        <textarea
          id="content"
          name="content"
          rows={6}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="내용을 입력하세요"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        onClick={handlePost}
      >
        작성하기
      </button>
    </form>
  );
};

export default NewBoardPost;
