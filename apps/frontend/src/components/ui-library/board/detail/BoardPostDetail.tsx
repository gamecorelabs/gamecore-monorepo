import { BoardPost } from "@/types/board/boardPost.types";
import { ResourceType } from "@/types/common/resource.types";
import CommentContainer from "@ui-library/comment/CommentContainer";
import BottomSection from "./parts/BottomSection";
import DetailContent from "./parts/DetailContent";
import DetailHeader from "./parts/DetailHeader";

const BoardPostDetail = ({
  boardId,
  post,
}: {
  boardId: string;
  post: BoardPost;
}) => {
  return (
    <div className="max-w-4xl mx-auto py-4 px-1 bg-white rounded-lg shadow-md">
      <DetailHeader post={post} />
      <DetailContent post={post} />
      <BottomSection boardId={boardId} post={post} />
      <CommentContainer
        resourceType={ResourceType.BOARD_POST}
        resourceId={post.id}
      />
    </div>
  );
};

export default BoardPostDetail;
