const CommentWriteForm = () => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <form className="gap-3">
        <div className="w-full md:flex md:items-center md:justify-between">
          <h4 className="font-medium text-gray-900 mb-3 w-full md:w-1/2">
            댓글 작성
          </h4>
          <div className="flex gap-3 mb-3 w-full md:w-1/2">
            <input
              type="text"
              placeholder="아이디"
              className="w-1/2 flex-1 p-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />
            <input
              type="password"
              placeholder="비밀번호"
              className="w-1/2 flex-1 p-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />
          </div>
        </div>
        <div>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            rows={3}
            placeholder="댓글을 입력하세요..."
          />
        </div>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            댓글 등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentWriteForm;
