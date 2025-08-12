"use client";
import { NewsPost } from "@/types/news/newsPost.types";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { formatDateSafe } from "@/utils/helpers/formatDate";
import { getUserName } from "@/utils/helpers/getUserName";
import ProviderIcon from "@/components/ui-library/common/icons/ProviderIcon";
import SafeHtmlContent from "@/components/ui-library/content/SafeHtmlContent";

export const ArticleContent = ({
  newsId,
  post,
}: {
  newsId: number;
  post: NewsPost;
}) => {
  return (
    <Link
      href={`/news/${newsId}/post/${post.id}`}
      className="block hover:opacity-80 transition-opacity"
    >
      {/* 모바일 레이아웃 */}
      <div className="md:hidden p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            {/* 카테고리 + 제목 */}
            <div className="mb-2 flex items-center">
              <span
                className="inline-block px-2 py-0.5 text-xs font-medium rounded mr-2"
                style={{
                  backgroundColor: "#6b7280",
                  color: "white",
                }}
              >
                {post.category.title}
              </span>
              <span
                className="text-base font-bold"
                style={{ color: "var(--text-color)" }}
              >
                {post.title}
              </span>
              {post.commentCount > 0 && (
                <span
                  className="ml-1 text-sm font-medium"
                  style={{ color: "var(--primary-color)" }}
                >
                  [{post.commentCount}]
                </span>
              )}
            </div>

            {/* 미리보기 텍스트 */}
            {post.content && (
              <div
                className="text-sm mb-2 line-clamp-2"
                style={{ color: "var(--text-secondary)" }}
              >
                <SafeHtmlContent
                  content={post.content}
                  ignore={true}
                  className="leading-relaxed text-base"
                />
              </div>
            )}

            {/* 메타 정보 */}
            <div
              className="flex items-center justify-between text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center gap-1">
                  {post.author && post.author.providerType && (
                    <ProviderIcon type={post.author.providerType} />
                  )}
                  {getUserName(post)}
                </span>
                <span>{formatDateSafe(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <HandThumbUpIcon
                    className="h-3 w-3"
                    style={{ color: "var(--primary-color)" }}
                  />
                  <span>{post.likeCount || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 데스크톱 레이아웃 - 뉴스 전용 스타일 */}
      <div
        className="hidden md:flex items-center px-4 py-4 gap-4 border-l-4 border-transparent hover:border-l-4"
        style={{
          borderLeftColor: "var(--primary-color)",
          borderLeftWidth: "0px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderLeftWidth = "4px";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderLeftWidth = "0px";
        }}
      >
        {/* 썸네일 영역 (뉴스 전용) */}
        <div className="w-20 h-14 flex-shrink-0 rounded overflow-hidden">
          {(post as any).thumbnailUrl ? (
            <img
              src={(post as any).thumbnailUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-xs border"
              style={{
                backgroundColor: "var(--card-bg, white)",
                borderColor: "var(--border-color)",
                color: "var(--text-muted)",
              }}
            >
              NEWS
            </div>
          )}
        </div>

        {/* 뉴스 타입 + 카테고리 */}
        <div className="w-20 flex-shrink-0 flex flex-col items-center gap-1">
          <span
            className="inline-block px-2 py-0.5 text-xs font-medium rounded "
            style={{
              backgroundColor: "#6b7280",
              color: "white",
            }}
          >
            {post.category.title}
          </span>
        </div>

        {/* 제목 + 미리보기 (가변폭) */}
        <div className="flex-1 min-w-0 py-1">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className="font-bold text-base truncate"
              style={{ color: "var(--text-color)" }}
            >
              {post.title}
            </h3>
            {post.commentCount > 0 && (
              <span
                className="flex-shrink-0 text-sm font-bold"
                style={{ color: "var(--primary-color)" }}
              >
                [{post.commentCount}]
              </span>
            )}
          </div>
          {/* 미리보기 */}
          {post.content && (
            <div
              className="text-sm line-clamp-1"
              style={{ color: "var(--text-secondary)" }}
            >
              <SafeHtmlContent
                content={post.content}
                ignore={true}
                className="leading-relaxed text-base"
              />
            </div>
          )}
        </div>

        {/* 작성자 */}
        <div className="w-24 flex-shrink-0 text-center">
          <span
            className="text-sm font-medium flex items-center justify-center gap-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {post.author && post.author.providerType && (
              <ProviderIcon type={post.author.providerType} />
            )}
            {getUserName(post)}
          </span>
        </div>

        {/* 작성일 */}
        <div className="w-20 flex-shrink-0 text-center">
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {formatDateSafe(post.createdAt)}
          </span>
        </div>

        {/* 추천 */}
        <div className="w-16 flex-shrink-0 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <HandThumbUpIcon
              className="h-3 w-3"
              style={{ color: "var(--primary-color)" }}
            />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {post.likeCount || 0}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
