import { getUserName } from "@/utils/helpers/getUsername";
import { BoardPost } from "@/types/board/boardPost.types";
import { formatDate } from "@/utils/helpers/formatDate";

const DetailHeader = ({ post }: { post: BoardPost }) => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <div className="flex items-center text-sm  space-x-3 justify-between">
          <div className="flex gap-3">
            <span>{getUserName(post)}</span>
            <span className="inline-block w-[1px] h-4 bg-gray-300"></span>
            <span>{formatDate(post.created_at, { year: "numeric" })}</span>
          </div>
          <div className="flex items-center text-sm  space-x-3">
            <span>조회수 {post.view_count || 0}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailHeader;
