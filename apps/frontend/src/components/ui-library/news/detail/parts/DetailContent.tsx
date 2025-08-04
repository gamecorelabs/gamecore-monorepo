"use client";
import LikeDetail from "@/components/ui-library/like/LikeDetail";
import { useLikeSelection } from "@/utils/hooks/useLikeSelection";
import { NewsPost } from "@/types/news/newsPost.types";
import { ResourceType } from "@/types/common/resource.types";
import { useMemo } from "react";

const DetailContent = ({ post }: { post: NewsPost }) => {
  const { selectedMap, isLoading } = useLikeSelection(
    ResourceType.NEWS_POST,
    useMemo(() => [post.id], [post.id])
  );

  return (
    <>
      <div className="max-w-none min-h-48 mb-6 ">
        <div className="whitespace-pre-wrap">{post.content}</div>
      </div>

      {!isLoading && (
        <LikeDetail
          resourceType={ResourceType.NEWS_POST}
          resourceId={post.id}
          likeCount={post.likeCount}
          dislikeCount={post.dislikeCount}
          selectedMap={selectedMap}
        />
      )}
    </>
  );
};

export default DetailContent;
