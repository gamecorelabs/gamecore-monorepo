"use client";

import { useState } from "react";
import { getUserName } from "@/utils/helpers/getUsername";
import { Comment } from "@gamecoregg/types/comment/comment.types";
import ReplyForm from "@ui-library/comment/write/CommentReplyForm";

export const CommentItem = ({
  comment,
  type,
  parentId,
  activeReplyId,
  setActiveReplyId,
}: {
  comment: Comment;
  type: "parent" | "child";
  parentId?: number;
  activeReplyId: number | null;
  setActiveReplyId: (id: number | null) => void;
}) => {
  const isChildrenComment = type === "child";
  const isReplying = activeReplyId === comment.id;

  const getReplyContentPrefix = () => {
    if (isChildrenComment && parentId) {
      return `@${getUserName(comment)} // `;
    }
    return "";
  };

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
              onClick={() => setActiveReplyId(isReplying ? null : comment.id)}
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

      {isReplying && (
        <ReplyForm
          parentId={isChildrenComment ? parentId : comment.id}
          postId={comment.resource_info.resource_id}
          onCancel={() => setActiveReplyId(null)}
          placeholder={`${getUserName(comment)}님에게 답글을 작성하세요...`}
          defaultValue={getReplyContentPrefix()}
        />
      )}

      {comment.children && comment.children.length > 0 && (
        <div className="ml-8 space-y-3 border-l-2 border-gray-200 pl-4">
          {comment.children.map((childComment) => (
            <CommentItem
              key={childComment.id}
              comment={childComment}
              parentId={comment.id}
              type="child"
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
