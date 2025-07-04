"use client";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { BoardPost } from "@gamecoregg/types/board/boardPost.types";
import { useRouter } from "next/navigation";
import PasswordModal from "@ui-library/modal/PasswordModal";
import dataApi from "@/utils/common-axios/dataApi";
import { StatusCodes } from "http-status-codes";
import { encodeBase64Unicode } from "@/utils/helpers/encodeBase64Unicode";
import axios from "axios";

const BottomSection = ({
  boardId,
  post,
}: {
  boardId: string;
  post: BoardPost;
}) => {
  const router = useRouter();
  const currentUser = useUserStore((state) => state.user);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<"edit" | "delete" | null>(
    null
  );

  const isGuestAuthorPost = !!post.guest_account?.guest_author_id;
  const isPostOwner =
    currentUser && currentUser.type === "user"
      ? currentUser.user_account.id === post.author?.id
      : false;

  const handlePostEdit = () => {
    if (isGuestAuthorPost) {
      setPendingAction("edit");
      setShowPasswordModal(true);
    } else {
      if (isPostOwner) {
        postEdit();
      }
    }
  };

  const handlePostDelete = async () => {
    if (isGuestAuthorPost) {
      setPendingAction("delete");
      setShowPasswordModal(true);
    } else {
      if (isPostOwner && window.confirm("게시글을 정말 삭제하시겠습니까?")) {
        postDelete();
      }
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    if (pendingAction === "edit") {
      postEdit(password);
    } else if (pendingAction === "delete") {
      postDelete(password);
    } else {
      throw new Error("정의되지 않은 액션입니다.");
    }
  };

  const postEdit = async (password?: string) => {
    if (password) {
      const headers: Record<string, string> = {};
      const encoded = encodeBase64Unicode(
        `${post.guest_account?.guest_author_id}:${password}`
      );
      headers["Authorization"] = `Basic ${encoded}`;
      try {
        const result = await dataApi.get(`/board-post/${post.id}/owner-check`, {
          headers,
        });

        if (result.status !== StatusCodes.OK || !result.data) {
          window.alert("게시글 수정 권한이 없습니다.");
          handleModalClose();
          return false;
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const msg = error.response.data?.message || "서버 오류";
          window.alert(msg);
          return false;
        }
      }
    }

    router.push(`/board/${boardId}/post/${post.id}/edit`);
  };

  const postDelete = async (password?: string) => {
    try {
      let result = null;
      const headers: Record<string, string> = {};
      if (password) {
        const encoded = encodeBase64Unicode(
          `${post.guest_account?.guest_author_id}:${password}`
        );
        headers["Authorization"] = `Basic ${encoded}`;
      }
      result = await dataApi.delete(`/board-post/${post.id}`, {
        headers,
        withCredentials: true,
      });

      if (result.status === StatusCodes.OK && result.data) {
        window.alert("게시글 삭제가 완료 되었습니다.");
        router.replace(`/board/${boardId}/post`);
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
    <div className="flex justify-between items-center pb-4 border-b border-gray-200 space-x-4">
      <div>
        <button className=" hover:text-blue-600">
          <span className="text-lg font-semibold text-gray-900 mb-4">
            댓글 {post.commentCount || 0}개
          </span>
        </button>
      </div>
      <div className="flex gap-3">
        {isGuestAuthorPost || isPostOwner ? (
          <>
            <button className="text-sm" onClick={handlePostEdit}>
              수정
            </button>
            <button className="text-sm" onClick={handlePostDelete}>
              삭제
            </button>
          </>
        ) : null}
        <button
          className="text-sm"
          onClick={() => router.push(`/board/${boardId}/post`)}
        >
          목록
        </button>
        <button
          className="text-sm"
          onClick={() => router.push(`/board/${boardId}/post/new`)}
        >
          글쓰기
        </button>
      </div>

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={handleModalClose}
        onSubmit={handlePasswordSubmit}
        title={pendingAction === "edit" ? "게시글 수정" : "게시글 삭제"}
        description={`게시글을 ${pendingAction === "edit" ? "수정" : "삭제"}하려면 비밀번호를 입력해주세요.`}
      />
    </div>
  );
};

export default BottomSection;
