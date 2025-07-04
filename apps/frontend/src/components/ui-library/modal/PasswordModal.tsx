"use client";

import { useState } from "react";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  title: string;
  description?: string;
}

const PasswordModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  description = "비밀번호를 입력해주세요.",
}: PasswordModalProps) => {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(password.trim());
      setPassword("");
      onClose();
    } catch (error) {
      console.error("비밀번호 확인 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setPassword("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            autoFocus
            disabled={isSubmitting}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!password.trim() || isSubmitting}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "확인 중..." : "확인"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
