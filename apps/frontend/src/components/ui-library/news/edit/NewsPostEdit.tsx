"use client";
import { BoardPost } from "@/types/board/boardPost.types";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { decodeBase64Unicode } from "@/utils/helpers/base64Unicode";
import { FallbackPage } from "../../fallback";
import WriteForm from "../new/parts/WriteForm";
import useHydrated from "@/utils/hooks/useHydrated";

const NewsPostEdit = ({ post }: { post: BoardPost }) => {
  const boardId = post.boardConfig.id;
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
      setCanAccessPage(post.author.id === currentUser.userAccount.id);
    } else if (post.guestAccount?.guestAuthorId) {
      const guestInfo = sessionStorage.getItem(
        `post_edit_guest_auth_${post?.id}`
      );

      if (guestInfo) {
        const decoded = decodeBase64Unicode(guestInfo);
        const [guestAuthorId, guestAuthorPassword] = decoded.split(":");

        if (guestAuthorId === post.guestAccount.guestAuthorId) {
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
      boardConfig={post.boardConfig}
      post={post}
      guestMode={guestMode}
      guestInfo={guestInfo}
    />
  );
};

export default NewsPostEdit;
