import { FallbackPage } from "@_web-ui/components/ui-library";

export default function BoardFallbackPage() {
  return (
    <FallbackPage
      message="게시판 정보가 없습니다. 메인 페이지로 이동합니다."
      redirectTo="/"
      delay={2000}
    />
  );
}
