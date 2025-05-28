import { ArticleContent } from "./ArticleContent";
import { ArticleInfo } from "./ArticleInfo";
import defaultPostJson from "@/mocks/default-article.mock.json";

// FIXME: 타입 분리
type Post = {
  id: number;
  title: string;
  content: string;
  category: string;
  author: {
    name: string;
  };
  community: number;
};

const defaultPosts: Post[] = defaultPostJson;

const ArticleList = ({ posts }: { posts: Post[] }) => {
  // FIXME: 추후 DB 조회를 이용하여 게시글 불러오기
  posts = posts && posts.length > 0 ? posts : defaultPosts;

  console.log("게시글 목록:", posts);

  if (!posts || posts.length === 0) {
    return <div className="text-center py-4">게시글이 없습니다.</div>;
  }

  return (
    <>
      {posts.map(
        (post: Post) => (
          console.log("Rendering post:", post),
          (
            <article key={post.id} className="border-b py-4" data-id={post.id}>
              <ArticleContent post={post} />
              <ArticleInfo post={post} />
            </article>
          )
        )
      )}
    </>
  );
};

export default ArticleList;
