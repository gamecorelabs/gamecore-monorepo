import { BoardPost } from "@/types/board/boardPost.types";
import { ResourceType } from "@/types/common/resource.types";
import CommentContainer from "@ui-library/comment/CommentContainer";
import BottomSection from "./parts/BottomSection";
import DetailContent from "./parts/DetailContent";
import DetailHeader from "./parts/DetailHeader";

const BoardPostDetail = ({ post }: { post: BoardPost }) => {
  return (
    <div
      className="mx-auto rounded-lg shadow-md"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
      }}
    >
      <DetailHeader post={post} />
      <DetailContent post={post} />
      <BottomSection post={post} />
      <CommentContainer
        resourceType={ResourceType.BOARD_POST}
        resourceId={post.id}
      />
    </div>
  );
};

export default BoardPostDetail;
