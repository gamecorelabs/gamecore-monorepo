"use client";
import { useUserStore } from "@/store/userStore";
import { NewsPost } from "@/types/news/newsPost.types";
import { useRouter } from "next/navigation";
import dataApi from "@/utils/common-axios/dataApi";
import { StatusCodes } from "http-status-codes";
import axios from "axios";

const BottomSection = ({ post }: { post: NewsPost }) => {
  const router = useRouter();
  const currentUser = useUserStore((state) => state.user);
  const newsId = post.newsConfig.id;

  const isPostOwner =
    currentUser &&
    currentUser.type === "user" &&
    currentUser.userAccount.id === post.author?.id;

  const handlePostEdit = () => {
    if (isPostOwner) {
      postEdit();
    }
  };

  const handlePostDelete = async () => {
    if (isPostOwner && window.confirm("뉴스를 정말 삭제하시겠습니까?")) {
      postDelete();
    }
  };

  const postEdit = async () => {
    router.push(`/news/${newsId}/post/${post.id}/edit`);
  };

  const postDelete = async () => {
    try {
      let result = null;
      result = await dataApi.delete(`/news-post/${post.id}`, {
        withCredentials: true,
      });

      if (result.status === StatusCodes.OK && result.data) {
        window.alert("뉴스 삭제가 완료 되었습니다.");
        router.replace(`/news/${newsId}/post`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data?.message || "서버 오류";
        window.alert(msg);
      }
    }
  };

  return (
    <div className="flex justify-between items-center pb-4 border-b border-gray-200 space-x-4">
      <div>
        <button className=" hover:text-blue-600">
          <span className="text-lg font-semibold mb-4">
            댓글 {post.commentCount || 0}개
          </span>
        </button>
      </div>
      <div className="flex gap-3">
        {isPostOwner ? (
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
          onClick={() => router.push(`/news/${newsId}/post`)}
        >
          목록
        </button>
        <button
          className="text-sm"
          onClick={() => router.push(`/news/${newsId}/post/new`)}
        >
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default BottomSection;
