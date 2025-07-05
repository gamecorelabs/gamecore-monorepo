import BoardPostNew from "@/components/ui-library/board/new/BoardPostNew";

interface BoardPostNewProps {
  params: { boardId: string };
}

const BoardPostNewPage = async ({ params }: { params: BoardPostNewProps }) => {
  const { boardId } = await params;

  return <BoardPostNew boardId={boardId} />;
};

export default BoardPostNewPage;
