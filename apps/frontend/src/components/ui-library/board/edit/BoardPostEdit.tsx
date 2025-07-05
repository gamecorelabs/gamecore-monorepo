import { BoardPost } from "@gamecoregg/types/board/boardPost.types";
import NewBoardPost from "../new/NewBoardPost";

const BoardPostEdit = ({
  boardId,
  post,
}: {
  boardId: string;
  post: BoardPost;
}) => {
  return <NewBoardPost boardId={boardId} post={post} />;
};

export default BoardPostEdit;
