import { BoardPost } from "@gamecoregg/types/board/boardPost.types";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const ArticleContent = ({ post }: { post: BoardPost }) => {
  return (
    <Link
      href={`/post/${post.id}`}
      className="block hover:bg-gray-50 transition rounded"
    >
      <div className="flex items-center">
        <div
        // className={`mt-1 ${post.thumbnail ? "w-3/5 sm:w-4/5 pr-4" : "w-full pr-0"}`}
        >
          <span className="inline-block mb-1 px-2 py-0.5 text-[0.6rem] bg-gray-200 text-gray-600 rounded">
            {/* {post.category} */}
          </span>
          <div className="flex items-center gap-1">
            <h3 className="text-base font-semibold line-clamp-2">
              {post.title}
            </h3>
            <span className="flex items-center gap-1">
              <ChatBubbleOvalLeftIcon className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-500">
                {post.comment_count ?? 0}
              </span>
            </span>
          </div>
          <p className="text-sm text-gray-700 line-clamp-3">{post.content}</p>
        </div>
        {/* {post.thumbnail && (
          <div className="w-2/5 sm:w-1/5 flex justify-end items-center">
            <img
              src="https://picsum.photos/seed/picsum/200/200"
              className="rounded-md w-24 h-24 object-cover"
              alt="Article Thumbnail"
            />
          </div>
        )} */}
      </div>
    </Link>
  );
};
