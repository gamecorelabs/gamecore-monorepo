"use client";
import { useRouter } from "next/navigation";
import NewPostButton from "../buttons/NewPostButton";
import { ArticleContent } from "./parts/ArticleContent";
import { ArticleInfo } from "./parts/ArticleInfo";
import { BoardPost } from "@/types/board/boardPost.types";
import EmptyArticle from "./parts/EmptyArticle";
import PaginationContainer from "@ui-library/common/PaginationContainer";

const ArticleList = ({
  boardId,
  posts,
  pagination,
}: {
  boardId: string;
  posts: BoardPost[];
  pagination: {
    currentPage: number;
    visiblePageCount: number;
    totalCount: number;
    totalPages: number;
    hasPrevPage: number;
    hasNextPage: number;
    prevPage: number;
    nextPage: number;
  };
}) => {
  const router = useRouter();
  const originalUrl = `/board/${boardId}/post`;

  if (!posts || posts.length === 0) {
    return <EmptyArticle />;
  }

  return (
    <>
      {posts.map((post) => (
        <article key={post.id} className="border-b py-4" data-id={post.id}>
          <ArticleContent boardId={boardId} post={post} />
          <ArticleInfo post={post} />
        </article>
      ))}

      <PaginationContainer
        {...pagination}
        onPageChange={(page) => {
          router.push(`/board/${boardId}/post?page=${page}`);
        }}
      />

      <NewPostButton link={`/board/${boardId}/post/new`} />
    </>
  );
};

export default ArticleList;
