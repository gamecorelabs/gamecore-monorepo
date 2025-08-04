"use client";
import { NewsPost } from "@/types/news/newsPost.types";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { FallbackPage } from "../../fallback";
import WriteForm from "../new/parts/WriteForm";
import useHydrated from "@/utils/hooks/useHydrated";

const NewsPostEdit = ({ post }: { post: NewsPost }) => {
  const newsId = post.newsConfig.id;
  const currentUser = useUserStore((state) => state.user);
  const [canAccessPage, setCanAccessPage] = useState<boolean>(false);
  const hydrated = useHydrated();

  useEffect(() => {
    if (post?.author?.id && currentUser?.type === "user") {
      setCanAccessPage(post.author.id === currentUser.userAccount.id);
    } else {
      setCanAccessPage(false);
    }
  }, []);

  if (!hydrated) return null;

  if (!canAccessPage) {
    return (
      <FallbackPage
        message="게시글 수정 권한이 없습니다."
        redirectTo={`/news/${newsId}/post/${post.id}`}
      />
    );
  }

  return <WriteForm newsConfig={post.newsConfig} post={post} />;
};

export default NewsPostEdit;
