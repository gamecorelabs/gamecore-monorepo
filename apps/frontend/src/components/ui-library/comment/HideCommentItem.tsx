import { CommentStatus } from "@/types/comment/comment.types";

const infoMessage = {
  [CommentStatus.DELETED]: "삭제된 댓글입니다.",
  [CommentStatus.ADMIN_DELETED]: "관리자에 의해 삭제된 댓글입니다.",
};

const HideCommentItem = ({
  status,
}: {
  status: CommentStatus.DELETED | CommentStatus.ADMIN_DELETED;
}) => {
  return (
    <div className="flex justify-between items-start my-2 py-4">
      <div className="flex items-center justify-center space-x-2">
        <span className="text-red-500 text-sm">{infoMessage[status]}</span>
      </div>
    </div>
  );
};

export default HideCommentItem;
