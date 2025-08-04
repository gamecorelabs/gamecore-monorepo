"use client";
import { useRouter } from "next/navigation";
import { ArticleContent } from "./parts/ArticleContent";
import { NewsPost } from "@/types/news/newsPost.types";
import EmptyArticle from "./parts/EmptyArticle";
import PaginationContainer from "@ui-library/common/PaginationContainer";
import { PaginationInfo } from "@/types/common/pagination-types";
import SearchList from "./parts/SearchInput";
import TableHeader from "./parts/TableHeader";
import { NewsConfig } from "@/types/news/newsConfig.types";

const NewsPostList = ({
  newsConfig,
  posts,
  paginationInfo,
}: {
  newsConfig: NewsConfig;
  posts: NewsPost[];
  paginationInfo: PaginationInfo;
}) => {
  const router = useRouter();
  const newsId = newsConfig.id;
  const hasPost = posts && posts.length > 0;

  return (
    <div className="min-h-screen">
      {/* 뉴스 페이지 헤더 */}
      <TableHeader newsConfig={newsConfig} />

      {/* 뉴스 컨텐츠 영역 */}
      {hasPost ? (
        <div className="space-y-0">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className={`news-article-row transition-colors hover:bg-opacity-50 ${
                index % 2 === 0 ? "bg-opacity-30" : "bg-opacity-0"
              }`}
            >
              <ArticleContent newsId={newsId} post={post} />
            </article>
          ))}
        </div>
      ) : (
        <EmptyArticle />
      )}

      {/* 하단 컨트롤 */}
      <div className="flex mt-6 justify-end">
        <button
          onClick={() => router.push(`/news/${newsId}/post/new`)}
          className="px-4 py-1 rounded-sm font-medium transition-all whitespace-nowrap"
          style={{
            backgroundColor: "var(--primary-color)",
            color: "white",
          }}
        >
          글쓰기
        </button>
      </div>

      {/* 페이지네이션 */}
      {hasPost && (
        <div className="mt-8 space-y-6">
          <PaginationContainer
            {...paginationInfo}
            onPageChange={(page) => {
              router.push(`/news/${newsId}/post?page=${page}`);
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

export default NewsPostList;
