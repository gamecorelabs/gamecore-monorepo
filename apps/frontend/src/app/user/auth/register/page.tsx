"use client";
import React, { useState } from "react";
import authApi from "@gamecoregg/utils/common-axios/src/authApi";
import { useRouter, useSearchParams } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    email: "",
    password: "",
    nickname: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email) {
      window.alert("이메일을 입력해주세요.");
      return;
    }

    if (!form.password) {
      window.alert("비밀번호를 입력해주세요.");
      return;
    }

    if (!form.nickname) {
      window.alert("닉네임을 입력해주세요.");
      return;
    }

    if (!form.role) {
      window.alert("역할을 선택해주세요.");
      return;
    }

    try {
      const redirectUrl = searchParams.get("redirect_url") || "/";
      const result = await authApi.post("/auth/register", form, {
        withCredentials: true,
      });
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
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            이메일
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
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
              value={form.nickname}
              onChange={handleChange}
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
              value={form.password}
              onChange={handleChange}
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
              value={form.role}
              onChange={handleChange}
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
