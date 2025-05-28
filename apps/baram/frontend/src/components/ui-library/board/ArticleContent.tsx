export const ArticleContent = ({ post }: any) => (
  <div className="flex items-center">
    <div className="mt-1 w-3/5 sm:w-4/5 pr-4">
      <span className="inline-block mb-1 px-2 py-0.5 text-[0.6rem] bg-gray-200 text-gray-600 rounded">
        {post.category}
      </span>
      <h3 className="text-base font-semibold line-clamp-2">{post.title}</h3>
      <p className="text-sm text-gray-700 line-clamp-3">{post.content}</p>
    </div>
    <div className="w-2/5 sm:w-1/5 flex justify-end items-center">
      {/* {post.thumbnail && <img src={post.thumbnail} className="mt-2 rounded-md w-32 h-32 object-cover" />} */}
      <img
        src="https://picsum.photos/seed/picsum/200/200"
        className="rounded-md w-24 h-24 object-cover"
        alt="Article Thumbnail"
      />
    </div>
  </div>
);
