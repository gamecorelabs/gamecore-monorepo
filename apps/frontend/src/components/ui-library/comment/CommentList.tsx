"use client";
import { useLikeSelection } from "@/utils/hooks/useLikeSelection";
import { Comment } from "@/types/comment/comment.types";
import { ResourceType } from "@/types/common/resource.types";
import CommentItem from "@ui-library/comment/CommentItem";
import { useMemo, useState } from "react";

const CommentList = ({ comments }: { comments: Comment[] }) => {
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const commentIds = useMemo(() => {
    const ids: number[] = [];
    comments.forEach((comment) => {
      ids.push(comment.id);
      if (comment.children && comment.children?.length > 0) {
        comment.children.forEach((childComment) => {
          ids.push(childComment.id);
        });
      }
    });
    return ids;
  }, [comments]);

  const { selectedMap, isLoading } = useLikeSelection(
    ResourceType.COMMENT,
    commentIds
  );

  if (isLoading) return null;

  return comments && comments.length > 0 ? (
    <>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          type="parent"
          comment={comment}
          activeReplyId={activeReplyId}
          setActiveReplyId={setActiveReplyId}
          selectedMap={selectedMap}
        />
      ))}
    </>
  ) : null;
};

export default CommentList;
