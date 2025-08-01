import { BoardPost } from "@/types/board/boardPost.types";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  color: string;
  isActive: boolean;
}

const PostFields = ({ post }: { post?: BoardPost }) => {
  return (
    <>
      {/* <div className="w-full mb-4">
        <label htmlFor="category" className="block font-semibold mb-2">
          카테고리
        </label>
        <select
          id="category"
          name="category"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{
            color: "var(--text-color)",
            backgroundColor: "var(--input-bg)",
          }}
          defaultValue={post?.categoryId || ""}
        >
          <option value="">카테고리를 선택하세요</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div> */}
      <div className="w-full mb-4">
        <label htmlFor="title" className="block font-semibold mb-2">
          제목
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{
            color: "var(--text-color)",
            backgroundColor: "var(--input-bg)",
          }}
          placeholder="제목을 입력하세요"
          defaultValue={post?.title}
        />
      </div>
      <div className="w-full mb-4">
        <label htmlFor="content" className="block font-semibold mb-2">
          내용
        </label>
        <textarea
          id="content"
          name="content"
          rows={6}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{
            color: "var(--text-color)",
            backgroundColor: "var(--input-bg)",
          }}
          placeholder="내용을 입력하세요"
          defaultValue={post?.content}
        />
      </div>
    </>
  );
};

export default PostFields;
