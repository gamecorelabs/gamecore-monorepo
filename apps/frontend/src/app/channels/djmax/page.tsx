import { getSubdomainInfo } from "@/utils/hooks/useSubdomain";

export default async function Page() {
  const { subdomain, config } = await getSubdomainInfo();

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 rounded-lg shadow">
        {subdomain ? (
          <h1 className="text-2xl font-bold">
            {config?.title || "채널 페이지"}
          </h1>
        ) : (
          <h1 className="text-2xl font-bold">메인 페이지</h1>
        )}
        <p>{config?.description || "서브도메인에 대한 설명이 없습니다."}</p>
      </div>
    </div>
  );
}
