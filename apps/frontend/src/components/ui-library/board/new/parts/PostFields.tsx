import { BoardPost } from "@/types/board/boardPost.types";

const PostFields = ({ post }: { post?: BoardPost }) => {
  return (
    <>
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
