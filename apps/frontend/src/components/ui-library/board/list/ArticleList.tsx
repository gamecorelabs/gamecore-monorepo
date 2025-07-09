"use client";
import { useRouter } from "next/navigation";
import NewPostButton from "../buttons/NewPostButton";
import { ArticleContent } from "./parts/ArticleContent";
import { ArticleInfo } from "./parts/ArticleInfo";
import { BoardPost } from "@/types/board/boardPost.types";
import EmptyArticle from "./parts/EmptyArticle";
import PaginationContainer from "@ui-library/common/PaginationContainer";
import { PaginationInfo } from "@/types/common/pagination-types";

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
        {...paginationInfo}
        onPageChange={(page) => {
          router.push(`/board/${boardId}/post?page=${page}`);
        }}
      />

      <NewPostButton link={`/board/${boardId}/post/new`} />
    </>
  );
};

export default ArticleList;
