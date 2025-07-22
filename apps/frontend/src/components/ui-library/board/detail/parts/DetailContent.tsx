"use client";
import LikeDetail from "@/components/ui-library/like/LikeDetail";
import { useLikeSelection } from "@/utils/hooks/useLikeSelection";
import { BoardPost } from "@/types/board/boardPost.types";
import { ResourceType } from "@/types/common/resource.types";
import { useMemo } from "react";

const DetailContent = ({ post }: { post: BoardPost }) => {
  const { selectedMap, isLoading } = useLikeSelection(
    ResourceType.BOARD_POST,
    useMemo(() => [post.id], [post.id])
  );

  return (
    <>
      <div className="max-w-none min-h-48 mb-6 ">
        <div className="whitespace-pre-wrap">{post.content}</div>
      </div>

      {!isLoading && (
        <LikeDetail
          resourceType={ResourceType.BOARD_POST}
          resourceId={post.id}
          likeCount={post.like_count}
          dislikeCount={post.dislike_count}
          selectedMap={selectedMap}
        />
      )}
    </>
  );
};

export default DetailContent;
