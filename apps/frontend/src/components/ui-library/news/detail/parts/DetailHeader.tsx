import { getUserName } from "@/utils/helpers/getUserName";
import { NewsPost } from "@/types/news/newsPost.types";
import { formatDate } from "@/utils/helpers/formatDate";

const DetailHeader = ({ post }: { post: NewsPost }) => {
  return (
    <>
      <div className="mb-6">
        {/* 카테고리 */}
        <div className="mb-3">
          <span
            className="px-3 py-1 text-sm rounded-full"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "white",
            }}
          >
            {post.category?.title || "카테고리 없음"}
          </span>
        </div>

        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--text-color)" }}
        >
          {post.title}
        </h1>
        <div
          className="flex items-center text-sm space-x-3 justify-between"
          style={{ color: "var(--text-secondary)" }}
        >
          <div className="flex gap-3">
            <span>{getUserName(post)}</span>
            <span
              className="inline-block w-[1px] h-4"
              style={{ backgroundColor: "var(--border-color)" }}
            ></span>
            <span>{formatDate(post.createdAt, { year: "numeric" })}</span>
          </div>
          <div
            className="flex items-center text-sm space-x-3"
            style={{ color: "var(--text-muted)" }}
          >
            <span>조회수 {post.viewCount || 0}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailHeader;
