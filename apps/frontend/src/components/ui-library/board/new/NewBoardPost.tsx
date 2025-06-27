"use client";
import dataApi from "@/utils/common-axios/dataApi";
import React from "react";

const NewBoardPost = ({ boardId }: { boardId: string }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const handlePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formRef.current === null) {
      window.alert("폼이 올바르게 로드되지 않았습니다. 다시 시도해주세요.");
      return;
    }
    const formData = new FormData(formRef.current);

    try {
      const result = await dataApi.post(`/board/${boardId}/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log(result.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto p-6 bg-white rounded shadow"
      ref={formRef}
    >
      <h1 className="text-2xl font-bold mb-4">New Post</h1>
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
