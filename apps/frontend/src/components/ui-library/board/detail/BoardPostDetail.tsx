import { BoardPost } from "@gamecoregg/types/board/boardPost.types";
import { ResourceType } from "@gamecoregg/types/common/resource.types";
import CommentContainer from "@ui-library/comment/CommentContainer";
import BottomSection from "./parts/BottomSection";
import DetailContent from "./parts/detailContent";
import DetailHeader from "./parts/DetailHeader";

const BoardPostDetail = ({
  boardId,
  post,
}: {
  boardId: string;
  post: BoardPost;
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
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
