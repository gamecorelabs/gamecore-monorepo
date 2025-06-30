"use client";
import React from "react";
import authApi from "@/utils/common-axios/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { formDataToObject } from "@/utils/helpers/formDataToObject";
import { userRegisterSchema } from "@/utils/validation/user/userResigterSchema";
import { getZodErrorMessage } from "@/utils/helpers/getZodErrorMessage";

const RegisterPage = () => {
  const router = useRouter();
  const formRef = React.useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current === null) {
      window.alert("폼이 올바르게 로드되지 않았습니다. 다시 시도해주세요.");
      return false;
    }

    // FIXME: Helper 함수로 분리
    const formData = new FormData(formRef.current);
    const formObject = formDataToObject(formData);

    const schema = userRegisterSchema;
    const validation = schema.safeParse(formObject);

    if (!validation.success) {
      const firstIssue = validation.error.issues[0];
      getZodErrorMessage(formRef, firstIssue);
      return;
    }

    try {
      const result = await authApi.post("/auth/register", formData);
      if (result.status !== 201) {
        throw new Error("회원가입에 실패했습니다.");
      }
      router.push(redirectUrl);
      router.refresh();
    } catch (error) {
      window.alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            이메일
            <input
              type="email"
              name="email"
              required
              className="mt-2 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            닉네임
            <input
              type="text"
              name="nickname"
              required
              className="mt-2 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            비밀번호
            <input
              type="password"
              name="password"
              required
              className="mt-2 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">
            역할
            <span className="text-red-600">(*테스트용)</span>
            <select
              name="role"
              required
              className="mt-2 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">선택하세요</option>
              <option value="user">일반 사용자</option>
              <option value="admin">관리자</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
