import BoardPostNew from "@/components/ui-library/board/new/BoardPostNew";
import { getBoardConfig } from "@/utils/board/getBoardConfig";

interface BoardPostNewProps {
  params: Promise<{ boardId: string }>;
}

const BoardPostNewPage = async ({ params }: BoardPostNewProps) => {
  const { boardId } = await params;
  const boardConfig = await getBoardConfig(boardId);

  return <BoardPostNew boardConfig={boardConfig} />;
};

export default BoardPostNewPage;
