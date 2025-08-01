"use client";
import { useRouter } from "next/navigation";
import { ArticleContent } from "./parts/ArticleContent";
import { BoardPost } from "@/types/board/boardPost.types";
import EmptyArticle from "./parts/EmptyArticle";
import PaginationContainer from "@ui-library/common/PaginationContainer";
import { PaginationInfo } from "@/types/common/pagination-types";
import SearchList from "./parts/SearchInput";
import TableHeader from "./parts/TableHeader";

const BoardPostList = ({
  boardId,
  posts,
  paginationInfo,
}: {
  boardId: string;
  posts: BoardPost[];
  paginationInfo: PaginationInfo;
}) => {
  const router = useRouter();
  const hasPost = posts && posts.length > 0;

  return (
    <div className="min-h-screen">
      {/* 게시글 헤더 */}
      <TableHeader />

      {/* 컨텐츠 영역 */}
      {hasPost ? (
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
      ) : (
        <EmptyArticle />
      )}

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

      {/* 페이지네이션 (게시글이 있을 때만) */}
      {hasPost && (
        <div className="mt-8 space-y-6">
          <PaginationContainer
            {...paginationInfo}
            onPageChange={(page) => {
              router.push(`/board/${boardId}/post?page=${page}`);
            }}
          />
        </div>
      )}

      {/* 검색 */}
      <div className="flex items-center gap-3">
        <SearchList />
      </div>
    </div>
  );
};

export default BoardPostList;
