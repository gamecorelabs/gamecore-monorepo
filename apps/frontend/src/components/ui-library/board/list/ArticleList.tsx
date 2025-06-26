import { NewPostButton } from "../../floating";
import { ArticleContent } from "./parts/ArticleContent";
import { ArticleInfo } from "./parts/ArticleInfo";
import { BoardPost } from "@gamecoregg/types/board/boardPost.types";
import EmptyArticle from "./parts/EmptyArticle";

const ArticleList = ({ posts }: { posts?: BoardPost[] }) => {
  if (!posts || posts.length === 0) {
    return <EmptyArticle />;
  }

  return (
    <>
      {posts.map((post) => (
        <article key={post.id} className="border-b py-4" data-id={post.id}>
          <ArticleContent post={post} />
          <ArticleInfo post={post} />
        </article>
      ))}
      <NewPostButton />
    </>
  );
};

export default ArticleList;
