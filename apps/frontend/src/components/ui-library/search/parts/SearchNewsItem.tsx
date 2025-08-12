"use client";
import { NewsPost } from "@/types/news/newsPost.types";
import { formatDateSafe } from "@/utils/helpers/formatDate";
import { getUserName } from "@/utils/helpers/getUserName";
import { highlightKeyword } from "@/utils/helpers/highlightKeyword";
import {
  ChatBubbleOvalLeftIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

interface SearchNewsItemProps {
  post: NewsPost;
  keyword: string;
  isLast: boolean;
}

const SearchNewsItem = ({ post, keyword, isLast }: SearchNewsItemProps) => {
  return (
    <Link
      href={`/news/${post.newsConfig.id}/post/${post.id}`}
      className="block transition-colors hover:bg-opacity-50"
      style={{ backgroundColor: "var(--hover-bg)" }}
    >
      <div
        className={`p-4 ${!isLast ? "border-b" : ""}`}
        style={{ borderColor: "var(--border-color)" }}
      >
        {/* 모바일 레이아웃 */}
        <div className="md:hidden">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-2 py-1 text-xs rounded-full font-medium"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                  }}
                >
                  뉴스
                </span>
                {post.category && (
                  <span
                    className="px-2 py-1 text-xs rounded"
                    style={{
                      backgroundColor: "var(--card-bg)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {post.category.title}
                  </span>
                )}
              </div>
              <h3
                className="font-medium text-sm mb-2 line-clamp-2"
                style={{ color: "var(--text-color)" }}
              >
                {highlightKeyword(post.title, keyword)}
              </h3>
              {post.content && (
                <p
                  className="text-xs text-opacity-80 line-clamp-1 mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  {highlightKeyword(post.content, keyword)}
                </p>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs">
                  <span style={{ color: "var(--text-muted)" }}>
                    {getUserName(post)}
                  </span>
                  <span style={{ color: "var(--text-muted)" }}>
                    {formatDateSafe(post.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {post.likeCount > 0 && (
                    <div className="flex items-center gap-1">
                      <HandThumbUpIcon
                        className="w-3 h-3"
                        style={{ color: "var(--primary-color)" }}
                      />
                      <span style={{ color: "var(--text-muted)" }}>
                        {post.likeCount}
                      </span>
                    </div>
                  )}
                  {post.commentCount > 0 && (
                    <div className="flex items-center gap-1">
                      <ChatBubbleOvalLeftIcon
                        className="w-3 h-3"
                        style={{ color: "var(--primary-color)" }}
                      />
                      <span style={{ color: "var(--text-muted)" }}>
                        {post.commentCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 데스크톱 레이아웃 */}
        <div className="hidden md:flex md:items-center md:gap-4 md:py-2">
          <div className="flex-shrink-0">
            <span
              className="px-3 py-1 text-xs rounded-full font-medium"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "white",
              }}
            >
              뉴스
            </span>
          </div>
          {post.category && (
            <div className="flex-shrink-0">
              <span
                className="px-2 py-1 text-xs rounded"
                style={{
                  backgroundColor: "var(--card-bg)",
                  color: "var(--text-muted)",
                }}
              >
                {post.category.title}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="space-y-1">
              <h3
                className="font-medium text-sm truncate"
                style={{ color: "var(--text-color)" }}
              >
                {highlightKeyword(post.title, keyword)}
              </h3>
              {post.content && (
                <p
                  className="text-xs text-opacity-80 line-clamp-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {highlightKeyword(post.content, keyword)}
                </p>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center gap-3">
            {post.likeCount > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <HandThumbUpIcon
                  className="w-3 h-3"
                  style={{ color: "var(--primary-color)" }}
                />
                <span style={{ color: "var(--text-muted)" }}>
                  {post.likeCount}
                </span>
              </div>
            )}
            {post.commentCount > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <ChatBubbleOvalLeftIcon
                  className="w-3 h-3"
                  style={{ color: "var(--primary-color)" }}
                />
                <span style={{ color: "var(--text-muted)" }}>
                  {post.commentCount}
                </span>
              </div>
            )}
          </div>
          <div
            className="flex-shrink-0 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {getUserName(post)}
          </div>
          <div
            className="flex-shrink-0 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {formatDateSafe(post.createdAt)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchNewsItem;
