import { FallbackPage } from "@/components/ui-library";
import BoardPostNew from "@/components/ui-library/board/new/BoardPostNew";
import dataApi from "@/utils/common-axios/dataApi";

interface BoardPostNewProps {
  params: Promise<{ boardId: string }>;
}

const BoardPostNewPage = async ({ params }: BoardPostNewProps) => {
  const { boardId } = await params;

  const response = await dataApi.get(`/board/${boardId}`);
  const boardConfig = response?.data || null;

  if (!boardConfig) {
    return (
      <FallbackPage
        message="게시판 설정을 불러올 수 없습니다."
        redirectTo={`/board/${boardId}/post`}
      />
    );
  }

  return <BoardPostNew boardConfig={boardConfig} />;
};

export default BoardPostNewPage;
