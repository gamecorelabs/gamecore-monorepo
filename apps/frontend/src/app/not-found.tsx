import { FallbackPage } from "@ui-library";

export default function NotFound() {
  return (
    <FallbackPage
      message="잘못된 경로입니다. 메인 페이지로 이동합니다."
      redirectTo="/"
      delay={3000}
    />
  );
}
