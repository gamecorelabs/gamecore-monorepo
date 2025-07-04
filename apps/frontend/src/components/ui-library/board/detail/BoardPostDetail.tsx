import { getUserName } from "@/utils/helpers/getUsername";
import { BoardPost } from "@gamecoregg/types/board/boardPost.types";
import { ResourceType } from "@gamecoregg/types/common/resource.types";
import CommentContainer from "@ui-library/comment/CommentContainer";
import LikeDetail from "../../like/LikeDetail";
import BottomSection from "./parts/BottomSection";

const BoardPostDetail = async ({
  boardId,
  post,
}: {
  boardId: string;
  post: BoardPost;
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <div className="flex items-center text-sm  space-x-3 justify-between">
          <div className="flex gap-3">
            <span>{getUserName(post)}</span>
            <span className="inline-block w-[1px] h-4 bg-gray-300"></span>
            <span>{new Date(post.created_at).toLocaleString("ko-KR")}</span>
          </div>
          <div className="flex items-center text-sm  space-x-3">
            <span>조회수 {post.view_count || 0}</span>
          </div>
        </div>
      </div>

      <div className="max-w-none min-h-48 mb-6 ">
        <div className="text-gray-800 whitespace-pre-wrap">{post.content}</div>
      </div>

      <LikeDetail
        resourceType={ResourceType.BOARD_POST}
        resourceId={post.id}
        likeCount={post.likeCount}
        dislikeCount={post.dislikeCount}
      />

      <BottomSection boardId={boardId} post={post} />

      <CommentContainer
        resourceType={ResourceType.BOARD_POST}
        resourceId={post.id}
      />
    </div>
  );
};

export default BoardPostDetail;
