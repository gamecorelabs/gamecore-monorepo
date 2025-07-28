"use client";
import Link from "next/link";
import { getAllChannels, getChannelUrl } from "@/config/channel";

const ChannelNavigationModule = () => {
  const channels = getAllChannels();
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <img
                      src={`${process.env.NEXT_PUBLIC_S3_URL}/${channel.metadata?.icon}`}
                      alt={`${channel.title} 아이콘`}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-bold text-lg group-hover:transition-colors"
                      style={{ color: "var(--text-color)" }}
                    >
                      {channel.shortTitle}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {channel.title}
                    </p>
                  </div>
                </div>

                <p
                  className="text-sm mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {channel.description}
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
