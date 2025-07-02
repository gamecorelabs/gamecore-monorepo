import { ArticleContent } from "./parts/ArticleContent";
import { ArticleInfo } from "./parts/ArticleInfo";
import { BoardPost } from "@gamecoregg/types/board/boardPost.types";
import EmptyArticle from "./parts/EmptyArticle";
import NewPostButton from "../buttons/NewPostButton";

const ArticleList = ({
  boardId,
  posts,
  likeCounts,
  commentCounts,
}: {
  boardId: string;
  posts?: BoardPost[];
  likeCounts: Record<number, { likeCount: number; dislikeCount: number }>;
  commentCounts: Record<number, number>;
}) => {
  if (!posts || posts.length === 0) {
    return <EmptyArticle />;
  }

  return (
    <>
      {posts.map((post) => (
        <article key={post.id} className="border-b py-4" data-id={post.id}>
          <ArticleContent
            boardId={boardId}
            post={post}
            likeCounts={likeCounts}
            commentCounts={commentCounts}
          />
          <ArticleInfo post={post} />
        </article>
      ))}
      <NewPostButton link={`/board/${boardId}/post/new`} />
    </>
  );
};

export default ArticleList;
