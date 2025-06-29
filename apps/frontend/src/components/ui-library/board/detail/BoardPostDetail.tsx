import { BoardPost } from "@gamecoregg/types/board/boardPost.types";

const BoardPostDetail = async ({ post }: { post: BoardPost }) => {
  console.log("BoardPostDetail post", post);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <div className="flex items-center text-sm text-gray-600 space-x-3">
          <span>
            {post.guest_account?.guest_author_id || post.author?.nickname}
          </span>
          <span className="inline-block w-[1px] h-4 bg-gray-300"></span>
          <span>{new Date(post.created_at).toLocaleString("ko-KR")}</span>
          <span>조회수 {post.view_count || 0}</span>
          <span>좋아요 {post.view_count || 0}</span>
        </div>
      </header>

      <div className="prose max-w-none mb-6">
        <div className="text-gray-800 whitespace-pre-wrap">{post.content}</div>
      </div>

      {/* {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )} */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
            <span>💬</span>
            <span>{post.comment_count || 0}</span>
          </button>
        </div>
        <button className="text-sm text-gray-600 hover:text-gray-800">
          공유하기
        </button>
      </div>
    </div>
  );
};

export default BoardPostDetail;
