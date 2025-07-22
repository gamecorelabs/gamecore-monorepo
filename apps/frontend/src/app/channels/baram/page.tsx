import { ChannelNavigationModule } from "@/components/ui-library/common/modules";
import { getSubdomainInfo } from "@/utils/hooks/useSubdomain";

export default async function Page() {
  const { subdomain, config } = await getSubdomainInfo();

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        {subdomain ? (
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--text-color)" }}
          >
            {config?.title || "채널 페이지"}
          </h1>
        ) : (
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--text-color)" }}
          >
            게임코어
          </h1>
        )}
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          {config?.description || "다양한 게임의 소식과 정보를 만나보세요"}
        </p>
      </div>

      <ChannelNavigationModule />
    </div>
  );
}
