import NewBoardPost from "@/components/ui-library/board/new/NewBoardPost";

interface NewBoardPostProps {
  params: { boardId: string };
}

const NewBoardPostPage = async ({ params }: { params: NewBoardPostProps }) => {
  const { boardId } = await params;

  return <NewBoardPost boardId={boardId} />;
};

export default NewBoardPostPage;
