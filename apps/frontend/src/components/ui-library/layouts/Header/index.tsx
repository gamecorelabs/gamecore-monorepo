"use client";
import Image from "next/image";
import Link from "next/link";
import Nav from "./parts/Nav";
import ProfileBlock from "./parts/ProfileBlock";
import ThemeToggle from "../../common/ThemeToggle";
import { ChannelConfig } from "@/types/common/domain.types";
import { getChannelUrl } from "@/config/channel";
import { getMainDomainUrl } from "@/config/channel";
import { S3_URL } from "@/config/config";

const Header = ({ config }: { config: ChannelConfig }) => {
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
              <div className="group flex gap-3 items-center justify-center">
                <Link href={getChannelUrl(config.domain)} className="block">
                  <div
                    className="logo-container rounded-lg border transition-colors"
                    style={{
                      backgroundColor: "var(--card-bg)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <Image
                      src={`${S3_URL}/${config.metadata?.icon}`}
                      alt={`게임코어 로고 - ${config.title}`}
                      className="h-12 w-12"
                      priority={true}
                      width={48}
                      height={48}
                    />
                  </div>
                </Link>
                <div className="flex flex-col justify-center">
                  <Link href={getChannelUrl(config.domain)}>
                    <h1
                      className="logo-title text-xl font-bold transition-colors"
                      style={{ color: "var(--text-color)" }}
                    >
                      {config.shortTitle || config.title}
                    </h1>
                  </Link>
                  <Link href={getMainDomainUrl()}>
                    <span
                      className="text-xs font-medium tracking-wider transition-colors hover:opacity-80"
                      style={{ color: "var(--text-muted)" }}
                    >
                      GameCore
                    </span>
                  </Link>
                </div>
              </div>
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      window.alert("통합 검색기능은 현재 개발중입니다.");
                    }
                  }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div
                    className="p-2 rounded-md"
                    style={{ backgroundColor: "var(--primary-color)" }}
                    onClick={() => {
                      window.alert("통합 검색기능은 현재 개발중입니다.");
                    }}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    window.alert("통합 검색기능은 현재 개발중입니다.");
                  }
                }}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div
                  className="p-2 rounded-md"
                  style={{ backgroundColor: "var(--primary-color)" }}
                  onClick={() => {
                    window.alert("통합 검색기능은 현재 개발중입니다.");
                  }}
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
