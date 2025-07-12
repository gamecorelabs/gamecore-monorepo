import { FallbackPage } from "@/components/ui-library";
import BoardPostEdit from "@/components/ui-library/board/edit/BoardPostEdit";
import dataApi from "@/utils/common-axios/dataApi";

interface BoardPostDetailProps {
  params: Promise<{ boardId: string; postId: string }>;
}

const BoardPostEditPage = async ({ params }: BoardPostDetailProps) => {
  const { boardId, postId } = await params;

  let post = null;
  try {
    const response = await dataApi.get(`/board-post/${postId}`);
    post = response?.data || null;
  } catch {
    post = null;
  }

  if (!post) {
    return (
      <FallbackPage
        message="게시글이 존재하지 않습니다. 게시글 리스트로 이동됩니다."
        redirectTo={`/board/${boardId}/post`}
      />
    );
  }

  return <BoardPostEdit boardId={boardId} post={post} />;
};

export default BoardPostEditPage;
