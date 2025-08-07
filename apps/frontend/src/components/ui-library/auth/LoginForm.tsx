"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { userLogin } from "@/utils/auth/login";
import React, { useRef } from "react";
import { getZodErrorMessage } from "@/utils/helpers/getZodErrorMessage";
import { formDataToObject } from "@/utils/helpers/formDataToObject";
import { userLoginSchema } from "@/utils/validation/user/userLoginSchema";
import { readyAlert } from "@/utils/helpers/alertReady";
import DiscordLoginButton from "./DiscordLoginButton";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/";

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current === null) {
      window.alert("폼이 올바르게 로드되지 않았습니다. 다시 시도해주세요.");
      return false;
    }

    // FIXME: Helper 함수로 분리
    const formData = new FormData(formRef.current);
    const formObject = formDataToObject(formData);

    const schema = userLoginSchema;
    const validation = schema.safeParse(formObject);

    if (!validation.success) {
      const firstIssue = validation.error.issues[0];
      getZodErrorMessage(formRef, firstIssue);
      return;
    }

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const basicToken = btoa(`${email}:${password}`);
    const result = await userLogin(basicToken);

    if (!result) {
      return false;
    }
    router.push(redirectUrl);
    router.refresh();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <DiscordLoginButton redirectUrl={redirectUrl} />
          </div>
          <form ref={formRef} onSubmit={handleLogin}>
            <div className="grid gap-6">
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">비밀번호</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                계정이 없으신가요?&nbsp;
                <a
                  href="/user/auth/register"
                  className="underline underline-offset-4"
                >
                  회원가입
                </a>
              </div>
              <div className="text-center text-sm">
                <a
                  href="#"
                  className="underline underline-offset-4"
                  onClick={(e) => readyAlert(e)}
                >
                  비밀번호를 잊으셨나요?
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
