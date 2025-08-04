"use client";
import { BoardPost } from "@/types/board/boardPost.types";
import {
  ChatBubbleOvalLeftIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { formatDateSafe } from "@/utils/helpers/formatDate";
import { getUserName } from "@/utils/helpers/getUserName";
export const ArticleContent = ({
  boardId,
  post,
}: {
  boardId: number;
  post: BoardPost;
}) => {
  return (
    <Link
      href={`/board/${boardId}/post/${post.id}`}
      className="block transition-colors board-article-link"
    >
      {/* 모바일 레이아웃 */}
      <div className="md:hidden p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
              >
                {post.category.title}
              </span>
            </div>

            <h3
              className="text-base font-semibold mb-2 line-clamp-2"
              style={{ color: "var(--text-color)" }}
            >
              {post.title}
            </h3>

            {post.content && (
              <p
                className="text-sm mb-3 line-clamp-2"
                style={{ color: "var(--text-secondary)" }}
              >
                {post.content}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-4 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                <span>작성자: {getUserName(post)}</span>
                <span>조회 {post.viewCount || 0}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <HandThumbUpIcon
                    className="h-4 w-4"
                    style={{ color: "var(--primary-color)" }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {post.likeCount || 0}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <ChatBubbleOvalLeftIcon
                    className="h-4 w-4"
                    style={{ color: "var(--text-muted)" }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {post.commentCount || 0}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 데스크톱 레이아웃 */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 py-4 px-4 items-center">
        {/* 카테고리 */}
        <div className="col-span-1 text-center">
          <span
            className="px-2 py-0.5 text-xs rounded-full"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "white",
            }}
          >
            {post.category.title}
          </span>
        </div>

        {/* 제목 영역 */}
        <div className="col-span-5">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className="font-medium line-clamp-1"
                  style={{ color: "var(--text-color)" }}
                >
                  {post.title}
                </h3>
                {post.commentCount > 0 && (
                  <span
                    className="text-sm"
                    style={{ color: "var(--primary-color)" }}
                  >
                    [{post.commentCount}]
                  </span>
                )}
              </div>
              {post.content && (
                <p
                  className="text-sm line-clamp-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {post.content}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 작성자 */}
        <div className="col-span-2 text-center">
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {getUserName(post)}
          </span>
        </div>

        {/* 작성일 */}
        <div className="col-span-2 text-center">
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {formatDateSafe(post.createdAt)}
          </span>
        </div>

        {/* 조회수 */}
        <div className="col-span-1 text-center">
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {post.viewCount || 0}
          </span>
        </div>

        {/* 추천수 */}
        <div className="col-span-1 text-center">
          <div className="flex items-center justify-center gap-1">
            <HandThumbUpIcon
              className="h-4 w-4"
              style={{ color: "var(--primary-color)" }}
            />
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              {post.likeCount || 0}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
