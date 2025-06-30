import { getUserName } from "@/utils/helpers/getUsername";
import { Comment } from "@gamecoregg/types/comment/comment.types";

export const commentItem = ({ comment }: { comment: Comment }) => {
  return (
    <div className="mb-3 space-y-4">
      <div className="border-b border-gray-100 pb-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">
              {getUserName(comment)}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(comment.created_at).toLocaleString("ko-KR")}
            </span>
          </div>
          <button className="text-sm text-gray-500 hover:text-gray-700">
            삭제
          </button>
        </div>
        <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
      </div>
    </div>
  );
};

export default commentItem;
