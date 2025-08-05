"use client";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@ui-library/auth/LoginForm";
import { useUserStore } from "@/store/userStore";
import FallbackPage from "@/components/ui-library/fallback/FallbackPage";

const LoginPage = () => {
  const currentUser = useUserStore((state) => state.user);

  if (currentUser) {
    return (
      <FallbackPage
        message="이미 로그인되어 있습니다. 다른 계정으로 로그인하시려면 로그아웃 후 다시 시도해주세요."
        redirectTo="/"
        delay={3000}
      />
    );
  }

  return (
    !currentUser && (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex items-center gap-2 self-center font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            GameCore.gg
          </div>
          <LoginForm />
        </div>
      </div>
    )
  );
};

export default LoginPage;
