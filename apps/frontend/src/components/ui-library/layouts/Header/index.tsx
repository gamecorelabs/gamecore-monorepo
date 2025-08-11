"use client";
import Image from "next/image";
import Link from "next/link";
import Nav from "./parts/Nav";
import ProfileBlock from "./parts/ProfileBlock";
import SearchBar from "./parts/SearchBar";
import ThemeToggle from "../../common/ThemeToggle";
import { ChannelConfig } from "@/types/channel/channel.types";
import { getChannelUrl } from "@/config/channel";
import { getMainUrl } from "@/config/channel";
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
                <Link href={getChannelUrl(config.channel)} className="block">
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
                  <Link href={getChannelUrl(config.channel)}>
                    <h1
                      className="logo-title text-xl font-bold transition-colors"
                      style={{ color: "var(--text-color)" }}
                    >
                      {config.shortTitle || config.title}
                    </h1>
                  </Link>
                  <Link href={getMainUrl()}>
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
            <SearchBar isDesktop={true} />

            {/* Theme Toggle & Profile Section */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <ProfileBlock />
            </div>
          </div>

          {/* Mobile Search */}
          <SearchBar isDesktop={false} />
        </div>

        {/* Navigation Bar */}
        <Nav menuItems={config.menuItems} />
      </div>
    </header>
  );
};

export default Header;
