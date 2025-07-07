import { BoardPost } from "@gamecoregg/types/board/boardPost.types";
import {
  ChatBubbleOvalLeftIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export const ArticleContent = ({
  boardId,
  post,
}: {
  boardId: string;
  post: BoardPost;
}) => {
  return (
    <Link
      href={`/board/${boardId}/post/${post.id}`}
      className="block hover:bg-gray-50 transition rounded"
    >
      <div className="flex items-center">
        <div>
          <span className="inline-block mb-1 px-2 py-0.5 text-[0.6rem] bg-gray-200 text-gray-600 rounded">
            {/* {post.category} */}
          </span>
          <div className="flex items-center gap-1">
            <h3 className="text-base font-semibold line-clamp-2">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 ml-auto">
              <span className="flex items-center gap-1">
                <HandThumbUpIcon className="h-4 w-4 text-green-500" />
                <span className="text-xs text-gray-500">{post.like_count}</span>
              </span>
              <span className="flex items-center gap-1">
                <HandThumbDownIcon className="h-4 w-4 text-red-500" />
                <span className="text-xs text-gray-500">
                  {post.dislike_count}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <ChatBubbleOvalLeftIcon className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {post.comment_count}
                </span>
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-700 line-clamp-3">{post.content}</p>
        </div>
      </div>
    </Link>
  );
};
