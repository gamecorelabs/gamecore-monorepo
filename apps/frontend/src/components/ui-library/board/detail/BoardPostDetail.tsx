import { getUserName } from "@/utils/helpers/getUsername";
import { BoardPost } from "@gamecoregg/types/board/boardPost.types";
import { Comment } from "@gamecoregg/types/comment/comment.types";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import CommentContainer from "@ui-library/comment/CommentContainer";
import CommentList from "@ui-library/comment/list/CommentList";
import CommentWriteForm from "@ui-library/comment/write/CommentWriteForm";

const BoardPostDetail = async ({
  post,
  comments,
}: {
  post: BoardPost;
  comments?: Comment[];
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <div className="flex items-center text-sm text-gray-600 space-x-3 justify-between">
          <div className="flex gap-3">
            <span>{getUserName(post)}</span>
            <span className="inline-block w-[1px] h-4 bg-gray-300"></span>
            <span>{new Date(post.created_at).toLocaleString("ko-KR")}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 space-x-3">
            <span className="flex items-center gap-1">
              <HandThumbUpIcon className="h-4 w-4 text-green-500" />
              <span className="text-xs text-gray-500">{0}</span>
            </span>
            <span className="flex items-center gap-1">
              <HandThumbDownIcon className="h-4 w-4 text-red-500" />
              <span className="text-xs text-gray-500">{0}</span>
            </span>
            <span>조회수 {post.view_count || 0}</span>
            <span>좋아요 {post.view_count || 0}</span>
          </div>
        </div>
      </header>

      <div className="prose max-w-none mb-6">
        <div className="text-gray-800 whitespace-pre-wrap">{post.content}</div>
      </div>

      <div className="flex justify-between items-center pb-4 border-b border-gray-200 space-x-4">
        <div>
          <button className="text-gray-600 hover:text-blue-600">
            <span className="text-lg font-semibold text-gray-900 mb-4">
              댓글 {post.comment_count || 0}개
            </span>
          </button>
        </div>
        <div>
          <button className="text-sm text-gray-600 hover:text-gray-800">
            공유하기
          </button>
        </div>
      </div>

      <CommentContainer>
        <CommentList comments={comments} />
        <CommentWriteForm postId={post.id} />
      </CommentContainer>
    </div>
  );
};

export default BoardPostDetail;
