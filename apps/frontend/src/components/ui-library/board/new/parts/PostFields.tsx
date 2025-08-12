"use client";
import TiptapEditor from "@/components/ui-library/editor/TiptapEditor";
import { BoardConfig } from "@/types/board/boardConfig.types";
import { BoardPost } from "@/types/board/boardPost.types";

const PostFields = ({
  boardConfig,
  post,
}: {
  boardConfig: BoardConfig;
  post?: BoardPost;
}) => {
  return (
    <>
      <div className="w-full mb-4">
        <label htmlFor="categoryId" className="block font-semibold mb-2">
          분류
        </label>
        <select
          id="categoryId"
          name="categoryId"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{
            color: "var(--text-color)",
            backgroundColor: "var(--input-bg)",
          }}
          defaultValue={post?.category?.id || ""}
        >
          {boardConfig.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
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
        <TiptapEditor
          defaultValue={post?.content}
          placeholder="내용을 입력하세요"
          className="border-gray-300 focus-within:ring-2 focus-within:ring-blue-400"
        />
      </div>
    </>
  );
};

export default PostFields;
