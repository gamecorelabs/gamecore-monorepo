"use client";
import { useUserStore } from "@/store/userStore";
import dataApi from "@/utils/common-axios/dataApi";
import { encodeBase64Unicode } from "@/utils/helpers/base64Unicode";
import { useFingerprint } from "@/utils/hooks/useFingerprint";
import { useLikeSelection } from "@/utils/hooks/useLikeSelection";
import { Comment } from "@gamecoregg/types/comment/comment.types";
import { ResourceType } from "@gamecoregg/types/common/resource.types";
import { LikeType } from "@gamecoregg/types/like/like.types";
import CommentItem from "@ui-library/comment/CommentItem";
import { useEffect, useMemo, useState } from "react";

const CommentList = ({ comments }: { comments: Comment[] }) => {
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const commentIds = useMemo(() => comments.map((c) => c.id), [comments]);

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
