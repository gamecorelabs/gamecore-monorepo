"use client";

import { useState } from "react";
import { getUserName } from "@/utils/helpers/getUsername";
import { Comment } from "@gamecoregg/types/comment/comment.types";
import ReplyForm from "@ui-library/comment/write/CommentReplyForm";

export const CommentItem = ({ comment }: { comment: Comment }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
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
          <div className="flex gap-2">
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              답글
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              삭제
            </button>
          </div>
        </div>
        <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
      </div>

      {showReplyForm && (
        <ReplyForm
          parentId={comment.id}
          postId={comment.resource_info.resource_id}
          onCancel={() => setShowReplyForm(false)}
          placeholder={`${getUserName(comment)}님에게 답글을 작성하세요...`}
        />
      )}
    </div>
  );
};

export default CommentItem;
