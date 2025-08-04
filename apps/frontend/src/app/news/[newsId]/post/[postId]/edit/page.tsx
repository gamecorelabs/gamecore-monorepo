import { FallbackPage } from "@/components/ui-library";
import NewsPostEdit from "@/components/ui-library/news/edit/NewsPostEdit";
import dataApi from "@/utils/common-axios/dataApi";

interface NewsPostDetailProps {
  params: Promise<{ newsId: string; postId: string }>;
}

const NewsPostEditPage = async ({ params }: NewsPostDetailProps) => {
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

  return <NewsPostEdit post={post} />;
};

export default NewsPostEditPage;
