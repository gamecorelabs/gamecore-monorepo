import {
  ChannelNavigationModule,
  ChannelInfoModule,
  BannerImageModule,
} from "@/components/ui-library/common/modules";
import { getSubdomainInfo } from "@/utils/hooks/useSubdomain";

export default async function Page() {
  const { config } = await getSubdomainInfo();

  return (
    <div className="container mx-auto p-4 space-y-8">
      <ChannelInfoModule config={config} />
      
      {/* 배너 이미지 예시 */}
      <BannerImageModule
        imageUrl={`${process.env.NEXT_PUBLIC_S3_URL}/channels/djmax/banner-main.jpg`}
        alt="DJMAX Respect V 메인 배너"
        href="/news/djmax-event"
        height={300}
        priority={true}
      />
      
      <ChannelNavigationModule />
    </div>
  );
}
