import { Comment } from "@gamecoregg/types/comment/comment.types";
import CommentItem from "@ui-library/comment/list/CommentItem";

const CommentList = ({ comments }: { comments?: Comment[] }) => {
  return comments && comments.length > 0 ? (
    <div className="mb-6">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  ) : null;
};

export default CommentList;
