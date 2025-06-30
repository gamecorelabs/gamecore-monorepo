import { Comment } from "@gamecoregg/types/comment/comment.types";
import CommentItem from "@ui-library/comment/list/CommentItem";

const CommentList = ({ comments }: { comments?: Comment[] }) => {
  return comments && comments.length > 0 ? (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  ) : null;
};

export default CommentList;
