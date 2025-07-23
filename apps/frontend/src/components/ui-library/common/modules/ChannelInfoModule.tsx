import { ChannelConfig } from "@/types/common/domain.types";

const ChannelInfoModule = ({ config }: { config: ChannelConfig | null }) => {
  if (!config) {
    return null;
  }

  return (
    <div
      className="p-6 rounded-lg border"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
      }}
    >
      <h1
        className="text-3xl font-bold mb-2"
        style={{ color: "var(--text-color)" }}
      >
        {config?.title || "채널 페이지"}
      </h1>
      <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
        {config?.description || "다양한 게임의 소식과 정보를 만나보세요"}
      </p>
    </div>
  );
};

export default ChannelInfoModule;
