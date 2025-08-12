"use client";
import Link from "next/link";
import { getChannelUrl } from "@/config/channel";
import Image from "next/image";
import { ChannelConfig } from "@/types/channel/channel.types";
import { highlightKeyword } from "@/utils/helpers/highlightKeyword";

const ChannelNavigationModule = ({
  channels,
  keyword,
}: {
  channels: ChannelConfig[];
  keyword?: string;
}) => {
  return (
    <div className="w-full">
      <div
        className="rounded-lg p-6 border"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "var(--text-color)" }}
        >
          게임코어 채널 리스트
        </h2>

        <div
          className={`grid gap-4 ${
            channels.length < 3
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {channels.map((channel) => (
            <Link
              key={channel.channel}
              href={getChannelUrl(channel.channel)}
              className="group block"
            >
              <div
                className="p-4 rounded-lg border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_URL}/${channel.metadata?.icon}`}
                      alt={`${channel.title} 아이콘`}
                      className="object-contain"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-bold text-lg group-hover:transition-colors"
                      style={{ color: "var(--text-color)" }}
                    >
                      {highlightKeyword(channel.shortTitle, keyword)}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {highlightKeyword(channel.title, keyword)}
                    </p>
                  </div>
                </div>

                <p
                  className="text-sm mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {highlightKeyword(channel.description, keyword)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelNavigationModule;
