import BoardPostNew from "@/components/ui-library/board/new/BoardPostNew";

interface BoardPostNewProps {
  params: Promise<{ boardId: string }>;
}

const BoardPostNewPage = async ({ params }: BoardPostNewProps) => {
  const { boardId } = await params;

  return <BoardPostNew boardId={boardId} />;
};

export default BoardPostNewPage;
