"use client";
import Image from "next/image";
import Link from "next/link";
import Nav from "./parts/Nav";
import ProfileBlock from "./parts/ProfileBlock";
import ThemeToggle from "../../common/ThemeToggle";
import { SubdomainConfig } from "@/types/common/domain.types";

const Header = ({ config }: { config: SubdomainConfig }) => {
  return (
    <header
      className="relative"
      style={{
        backgroundColor: "var(--header-bg)",
        borderBottomColor: "var(--border-color)",
      }}
    >
      <div
        className="relative z-10 border-b"
        style={{ borderColor: "var(--border-color)" }}
      >
        {/* Top Bar */}
        <div
          className="backdrop-blur-sm"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          <div className="flex justify-between h-20 items-center px-4">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex gap-3 items-center justify-center group"
              >
                <div
                  className="logo-container p-2 rounded-lg border transition-colors"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_S3_URL}/${config.metadata?.icon}`}
                    alt={`게임코어 로고 - ${config.title}`}
                    className="h-8 w-8"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex flex-col">
                  <h1
                    className="logo-title text-2xl font-bold transition-colors"
                    style={{ color: "var(--text-color)" }}
                  >
                    GameCore
                  </h1>
                  <span
                    className="text-xs font-medium tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {config.shortTitle || config.title}
                  </span>
                </div>
              </Link>
            </div>

            {/* Search Section */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="게임, 뉴스, 커뮤니티 검색..."
                  className="search-input w-[400px] px-6 py-3 rounded-lg border transition-all backdrop-blur-sm focus:outline-none"
                  style={{
                    backgroundColor: "var(--input-bg)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-color)",
                  }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div
                    className="p-2 rounded-md"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      style={{ color: "var(--text-color)" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Toggle & Profile Section */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <ProfileBlock />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="px-4 pb-4 block lg:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="게임, 뉴스, 커뮤니티 검색..."
                className="search-input w-full px-4 py-3 rounded-lg border transition-all backdrop-blur-sm focus:outline-none"
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-color)",
                }}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div
                  className="p-2 rounded-md"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    style={{ color: "var(--text-color)" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <Nav />
      </div>
    </header>
  );
};

export default Header;
