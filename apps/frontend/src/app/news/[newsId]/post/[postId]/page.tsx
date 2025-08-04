import { FallbackPage } from "@/components/ui-library";
import NewsPostDetail from "@/components/ui-library/news/detail/NewsPostDetail";
import dataApi from "@/utils/common-axios/dataApi";

interface NewsPostDetailProps {
  params: Promise<{ newsId: string; postId: string }>;
}

const NewsPostDetailPage = async ({ params }: NewsPostDetailProps) => {
  const { newsId, postId } = await params;

  let post = null;
  try {
    const response = await dataApi.get(`/news-post/${postId}`);
    post = response?.data || null;
  } catch {
    post = null;
  }

  if (!post) {
    return (
      <FallbackPage
        message="게시글이 존재하지 않습니다. 게시글 리스트로 이동됩니다."
        redirectTo={`/news/${newsId}/post`}
      />
    );
  }

  return <NewsPostDetail post={post} />;
};

export default NewsPostDetailPage;
