"use client";
import { useUserStore } from "@/store/userStore";
import WriteForm from "./parts/WriteForm";
import { NewsConfig } from "@/types/news/newsConfig.types";
import { FallbackPage } from "../../fallback";
import { buildAuthUrl } from "@/utils/helpers/buildAuthUrl";

const NewsPostNew = ({ newsConfig }: { newsConfig: NewsConfig }) => {
  const currentUser = useUserStore((state) => state.user);

  if (!currentUser) {
    return (
      <FallbackPage
        message="로그인이 필요합니다"
        redirectTo={buildAuthUrl(
          "/user/auth/login/",
          `/news/${newsConfig.id}/post/`
        )}
        delay={2000}
      />
    );
  }
  return <WriteForm newsConfig={newsConfig} />;
};

export default NewsPostNew;
