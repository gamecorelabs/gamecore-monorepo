"use client";
import { getUserName } from "@/utils/helpers/getUserName";
import { Comment, CommentStatus } from "@/types/comment/comment.types";
import ReplyForm from "@ui-library/comment/CommentReplyForm";
import PasswordModal from "../modal/PasswordModal";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { encodeBase64Unicode } from "@/utils/helpers/base64Unicode";
import dataApi from "@/utils/common-axios/dataApi";
import { StatusCodes } from "http-status-codes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LikeType } from "@/types/like/like.types";
import HideCommentItem from "./HideCommentItem";
import { formatDate } from "@/utils/helpers/formatDate";
import LikeDetail from "../like/LikeDetail";
import { ResourceType } from "@/types/common/resource.types";

export const CommentItem = ({
  comment,
  type,
  parentId,
  activeReplyId,
  setActiveReplyId,
  selectedMap,
}: {
  comment: Comment;
  type: "parent" | "child";
  parentId?: number;
  activeReplyId: number | null;
  setActiveReplyId: (id: number | null) => void;
  selectedMap: Record<number, { type: LikeType | null }>;
}) => {
  const isChildrenComment = type === "child";
  const isParentComment =
    type === "parent" && comment.children && comment.children.length > 0;
  const isHideComponent =
    (isParentComment && comment.status !== CommentStatus.USE) ||
    (isChildrenComment && comment.status !== CommentStatus.USE);
  const router = useRouter();
  const currentUser = useUserStore((state) => state.user);
  const isReplying = activeReplyId === comment.id;
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<"delete" | null>(null);
  const isGuestAuthorComment = !!comment.guest_account?.guest_author_id;
  const isCommentOwner =
    currentUser && currentUser.type === "user"
      ? currentUser.user_account.id === comment.author?.id
      : false;

  const getReplyContentPrefix = () => {
    if (isChildrenComment && parentId) {
      return `@${getUserName(comment)} // `;
    }
    return "";
  };

  const handleDelete = () => {
    if (isGuestAuthorComment) {
      setPendingAction("delete");
      setShowPasswordModal(true);
    } else {
      if (isCommentOwner && window.confirm("댓글을 정말 삭제하시겠습니까?")) {
        commentDelete();
      }
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    if (pendingAction === "delete") {
      commentDelete(password);
    } else {
      throw new Error("정의되지 않은 액션입니다.");
    }
  };

  const commentDelete = async (password?: string) => {
    try {
      let result = null;
      const headers: Record<string, string> = {};
      if (password) {
        const encoded = encodeBase64Unicode(
          `${comment.guest_account?.guest_author_id}:${password}`
        );
        headers["Authorization"] = `Basic ${encoded}`;
      }
      result = await dataApi.delete(`/comment/${comment.id}`, {
        headers,
        withCredentials: true,
      });

      if (result.status === StatusCodes.OK && result.data) {
        window.alert("댓글 삭제가 완료 되었습니다.");
        router.refresh();
      } else {
        handleModalClose();
        throw new Error("잘못된 비밀번호 입니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data?.message || "서버 오류";
        window.alert(msg);
      }
    }
  };

  const handleModalClose = () => {
    setShowPasswordModal(false);
    setPendingAction(null);
  };

  return (
    <div className="mb-3 space-y-4">
      <div className="border-b border-gray-100 pb-4">
        {isHideComponent ? (
          <HideCommentItem
            status={
              comment.status as
                | CommentStatus.DELETED
                | CommentStatus.ADMIN_DELETED
            }
          />
        ) : (
          <>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{getUserName(comment)}</span>
                <span className="text-sm">
                  {formatDate(comment.created_at)}
                </span>
                {isGuestAuthorComment || isCommentOwner ? (
                  <button className="text-sm" onClick={handleDelete}>
                    삭제
                  </button>
                ) : null}
              </div>
              <div className="flex gap-2">
                <LikeDetail
                  resourceType={ResourceType.COMMENT}
                  resourceId={comment.id}
                  likeCount={comment.like_count}
                  dislikeCount={comment.dislike_count}
                  selectedMap={selectedMap}
                  size="comment"
                />
              </div>
            </div>
            <div className="whitespace-pre-wrap">
              <div className="flex justify-between items-end">
                <p className="pr-4">{comment.content}</p>

                <div className="shrink-0">
                  <button
                    onClick={() =>
                      setActiveReplyId(isReplying ? null : comment.id)
                    }
                    className="text-sm"
                  >
                    답글
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={handleModalClose}
        onSubmit={handlePasswordSubmit}
        title={pendingAction === "delete" ? "댓글 삭제" : ""}
        description={`댓글을 ${
          pendingAction === "delete" ? "삭제" : ""
        }하려면 비밀번호를 입력해주세요.`}
      />

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
        <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
          {comment.children.map((childComment) => (
            <CommentItem
              key={childComment.id}
              comment={childComment}
              parentId={comment.id}
              type="child"
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}
              selectedMap={selectedMap}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
