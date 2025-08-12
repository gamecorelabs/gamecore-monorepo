"use client";
import LikeDetail from "@/components/ui-library/like/LikeDetail";
import { useLikeSelection } from "@/utils/hooks/useLikeSelection";
import { NewsPost } from "@/types/news/newsPost.types";
import { ResourceType } from "@/types/common/resource.types";
import SafeHtmlContent from "@/components/ui-library/content/SafeHtmlContent";
import { useMemo } from "react";

const DetailContent = ({ post }: { post: NewsPost }) => {
  const { selectedMap, isLoading } = useLikeSelection(
    ResourceType.NEWS_POST,
    useMemo(() => [post.id], [post.id])
  );

  return (
    <div className="px-8 py-6">
      {/* 뉴스 본문 */}
      <article
        className="prose prose-lg max-w-none min-h-48 mb-8"
        style={{ color: "var(--text-color)" }}
      >
        <SafeHtmlContent
          content={post.content}
          className="leading-relaxed text-base"
        />
      </article>

      {/* 좋아요/싫어요 섹션 */}
      {!isLoading && (
        <div
          className="flex justify-center py-6 border-t border-b"
          style={{ borderColor: "var(--border-color)" }}
        >
          <LikeDetail
            resourceType={ResourceType.NEWS_POST}
            resourceId={post.id}
            likeCount={post.likeCount}
            dislikeCount={post.dislikeCount}
            selectedMap={selectedMap}
          />
        </div>
      )}
    </div>
  );
};

export default DetailContent;
