"use client";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@ui-library/auth/LoginForm";
import { useUserStore } from "@/store/userStore";
import { userLogin } from "@/utils/auth/login";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
  return (
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
  );
};

export default LoginPage;
