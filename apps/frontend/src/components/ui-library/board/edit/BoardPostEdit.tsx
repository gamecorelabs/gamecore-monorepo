"use client";
import { BoardPost } from "@/types/board/boardPost.types";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { decodeBase64Unicode } from "@/utils/helpers/base64Unicode";
import { FallbackPage } from "../../fallback";
import WriteForm from "../new/parts/WriteForm";
import useHydrated from "@/utils/hooks/useHydrated";

const BoardPostEdit = ({
  boardId,
  post,
}: {
  boardId: string;
  post: BoardPost;
}) => {
  const currentUser = useUserStore((state) => state.user);
  const [guestMode, setGuestMode] = useState<boolean>(!currentUser);
  const [canAccessPage, setCanAccessPage] = useState<boolean>(false);
  const [guestInfo, setGuestInfo] = useState<{
    guestAuthorId: string;
    guestAuthorPassword: string;
  }>();
  const hydrated = useHydrated();

  useEffect(() => {
    if (post?.author?.id && currentUser?.type === "user") {
      setCanAccessPage(post.author.id === currentUser.user_account.id);
    } else if (post.guest_account?.guest_author_id) {
      const guestInfo = sessionStorage.getItem(
        `post_edit_guest_auth_${post?.id}`
      );

      if (guestInfo) {
        const decoded = decodeBase64Unicode(guestInfo);
        const [guestAuthorId, guestAuthorPassword] = decoded.split(":");

        if (guestAuthorId === post.guest_account.guest_author_id) {
          setCanAccessPage(true);
          setGuestMode(true);
          setGuestInfo({
            guestAuthorId,
            guestAuthorPassword,
          });
        } else {
          setCanAccessPage(false);
        }
      } else {
        setCanAccessPage(false);
      }
    } else {
      setCanAccessPage(false);
    }
  }, []);

  if (!hydrated) return null;

  if (!canAccessPage) {
    return (
      <FallbackPage
        message="게시글 수정 권한이 없습니다."
        redirectTo={`/board/${boardId}/post/${post.id}`}
      />
    );
  }

  return (
    <WriteForm
      boardId={boardId}
      post={post}
      guestMode={guestMode}
      guestInfo={guestInfo}
    />
  );
};

export default BoardPostEdit;
