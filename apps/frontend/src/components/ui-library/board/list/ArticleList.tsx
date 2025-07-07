import { ArticleContent } from "./parts/ArticleContent";
import { ArticleInfo } from "./parts/ArticleInfo";
import { BoardPost } from "@/types/board/boardPost.types";
import EmptyArticle from "./parts/EmptyArticle";
import NewPostButton from "../buttons/NewPostButton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ArticleList = ({
  boardId,
  posts,
}: {
  boardId: string;
  posts?: BoardPost[];
}) => {
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <NewPostButton link={`/board/${boardId}/post/new`} />
    </>
  );
};

export default ArticleList;
