"use client";
import { useRouter } from "next/navigation";
import NewPostButton from "../buttons/NewPostButton";
import { ArticleContent } from "./parts/ArticleContent";
import { BoardPost } from "@/types/board/boardPost.types";
import EmptyArticle from "./parts/EmptyArticle";
import PaginationContainer from "@ui-library/common/PaginationContainer";
import { PaginationInfo } from "@/types/common/pagination-types";
import SearchList from "./parts/SearchInput";

const ArticleList = ({
  boardId,
  posts,
  paginationInfo,
}: {
  boardId: string;
  posts: BoardPost[];
  paginationInfo: PaginationInfo;
}) => {
  const router = useRouter();

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen">
        {/* 게시글 헤더 */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h2
                className="text-2xl font-bold"
                style={{ color: "var(--text-color)" }}
              >
                게시글 목록
              </h2>
            </div>
          </div>

          {/* 게시글 테이블 헤더 (데스크톱만) */}
          <div
            className="hidden md:grid md:grid-cols-12 gap-4 py-3 px-4 text-sm font-medium border-b-2"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--input-bg)",
              color: "var(--text-secondary)",
            }}
          >
            <div className="col-span-6">제목</div>
            <div className="col-span-2 text-center">작성자</div>
            <div className="col-span-2 text-center">작성일</div>
            <div className="col-span-1 text-center">조회</div>
            <div className="col-span-1 text-center">추천</div>
          </div>
        </div>

        {/* 빈 게시글 표시 */}
        <EmptyArticle />

        {/* 하단 컨트롤 */}
        <div className="flex mt-6 justify-end">
          <button
            onClick={() => router.push(`/board/${boardId}/post/new`)}
            className="px-4 py-1 rounded-sm font-medium transition-all whitespace-nowrap"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "white",
            }}
          >
            글쓰기
          </button>
        </div>
        <div className="flex items-center gap-3">
          <SearchList />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* 게시글 헤더 */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "var()" }}>
              테스트 게시판
            </h2>
          </div>
        </div>

        {/* 게시글 테이블 헤더 (데스크톱만) */}
        <div
          className="hidden md:grid md:grid-cols-12 gap-4 py-3 px-4 text-sm font-medium border-b-2"
          style={{
            borderColor: "var(--border-color)",
            backgroundColor: "var(--input-bg)",
            color: "var(--text-secondary)",
          }}
        >
          <div className="col-span-6">제목</div>
          <div className="col-span-2 text-center">작성자</div>
          <div className="col-span-2 text-center">작성일</div>
          <div className="col-span-1 text-center">조회</div>
          <div className="col-span-1 text-center">추천</div>
        </div>
      </div>

      {/* 게시글 리스트 */}
      <div className="space-y-0">
        {posts.map((post) => (
          <article
            key={post.id}
            className="article-row transition-colors border-b last:border-b-0"
            style={{ borderColor: "var(--border-color)" }}
            data-id={post.id}
          >
            <ArticleContent boardId={boardId} post={post} />
          </article>
        ))}
      </div>

      {/* 하단 컨트롤 */}
      <div className="flex mt-6 justify-end">
        <button
          onClick={() => router.push(`/board/${boardId}/post/new`)}
          className="px-4 py-1 rounded-sm font-medium transition-all whitespace-nowrap"
          style={{
            backgroundColor: "var(--primary-color)",
            color: "white",
          }}
        >
          글쓰기
        </button>
      </div>
      <div className="mt-8 space-y-6">
        <PaginationContainer
          {...paginationInfo}
          onPageChange={(page) => {
            router.push(`/board/${boardId}/post?page=${page}`);
          }}
        />
      </div>
      <div className="flex items-center gap-3">
        <SearchList />
      </div>
    </div>
  );
};

export default ArticleList;
