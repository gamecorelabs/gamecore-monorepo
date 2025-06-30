import { FallbackPage } from "@/components/ui-library";
import BoardPostDetail from "@/components/ui-library/board/detail/BoardPostDetail";
import dataApi from "@/utils/common-axios/dataApi";

interface BoardPostDetailProps {
  params: { boardId: string; postId: string };
}

const BoardPostDetailPage = async ({ params }: BoardPostDetailProps) => {
  const { boardId, postId } = await params;

  let data = null;
  try {
    const response = await dataApi.get(`/board-post/${postId}`);
    data = response?.data ?? null;
  } catch (error) {
    data = null;
  }

  if (!data) {
    return (
      <FallbackPage
        message="게시글이 존재하지 않습니다. 게시글 리스트로 이동됩니다."
        redirectTo={`/board/${boardId}/post`}
      />
    );
  }

  const postDetail = data?.post?.entities?.[0];
  const comments = data?.comments?.entities ?? [];

  return <BoardPostDetail post={postDetail} comments={comments} />;
};

export default BoardPostDetailPage;
