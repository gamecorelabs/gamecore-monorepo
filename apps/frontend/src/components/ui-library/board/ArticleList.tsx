import { NewPostButton } from "../floating";
import { ArticleContent } from "./ArticleContent";
import { ArticleInfo } from "./ArticleInfo";

// FIXME: 타입 맞추기
type Post = {
  id: number;
  title: string;
  content: string;
  category: string;
  author: {
    name: string;
  };
};

const ArticleList = async ({ posts }: { posts: Post[] }) => {
  if (!posts || posts.length === 0) {
    return <div className="text-center py-4">게시글이 없습니다.</div>;
  }

  return (
    <>
      {posts.map((post: Post) => (
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
