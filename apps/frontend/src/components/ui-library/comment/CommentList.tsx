"use client";
import { Comment } from "@gamecoregg/types/comment/comment.types";
import CommentItem from "@ui-library/comment/CommentItem";
import { useState } from "react";

const CommentList = ({ comments }: { comments: Comment[] }) => {
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

  return comments && comments.length > 0 ? (
    <>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          type="parent"
          comment={comment}
          activeReplyId={activeReplyId}
          setActiveReplyId={setActiveReplyId}
        />
      ))}
    </>
  ) : null;
};

export default CommentList;
