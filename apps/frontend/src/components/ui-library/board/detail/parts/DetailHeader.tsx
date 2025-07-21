import { getUserName } from "@/utils/helpers/getUserName";
import { BoardPost } from "@/types/board/boardPost.types";
import { formatDate } from "@/utils/helpers/formatDate";

const DetailHeader = ({ post }: { post: BoardPost }) => {
  return (
    <>
      <div className="mb-6">
        <h1 
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--text-color)' }}
        >
          {post.title}
        </h1>
        <div 
          className="flex items-center text-sm space-x-3 justify-between"
          style={{ color: 'var(--text-secondary)' }}
        >
          <div className="flex gap-3">
            <span>{getUserName(post)}</span>
            <span 
              className="inline-block w-[1px] h-4"
              style={{ backgroundColor: 'var(--border-color)' }}
            ></span>
            <span>{formatDate(post.created_at, { year: "numeric" })}</span>
          </div>
          <div 
            className="flex items-center text-sm space-x-3"
            style={{ color: 'var(--text-muted)' }}
          >
            <span>조회수 {post.view_count || 0}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailHeader;
