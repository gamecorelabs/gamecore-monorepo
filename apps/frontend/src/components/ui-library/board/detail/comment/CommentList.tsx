const CommentList = () => {
  return (
    <div className="mb-6">
      <div className="space-y-4">
        <div className="border-b border-gray-100 pb-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">닉네임</span>
              <span className="text-sm text-gray-500">
                {new Date().toLocaleString("ko-KR")}
              </span>
            </div>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              삭제
            </button>
          </div>
          <p className="text-gray-800 whitespace-pre-wrap">댓글 내용입니다.</p>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
