"use client";

import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn relative p-2 rounded-lg border transition-all duration-200 hover:scale-105"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
      }}
      title={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {/* 다크 모드 아이콘 (달) */}
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transition-all duration-200"
          style={{ color: "var(--text-secondary)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        /* 라이트 모드 아이콘 (태양) */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transition-all duration-200"
          style={{ color: "var(--text-secondary)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}

      {/* 호버 시 나타나는 배경 효과 */}
      <div
        className="theme-toggle-bg absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200 pointer-events-none"
        style={{ backgroundColor: "rgba(var(--primary-color-rgb), 0.1)" }}
      ></div>
    </button>
  );
};

export default ThemeToggle;
