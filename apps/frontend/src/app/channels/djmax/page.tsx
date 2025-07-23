import {
  ChannelNavigationModule,
  ChannelInfoModule,
  BannerImageModule,
} from "@/components/ui-library/common/modules";
import { S3_URL } from "@/config/config";
import { getSubdomainInfo } from "@/utils/hooks/useSubdomain";

export default async function Page() {
  const { config } = await getSubdomainInfo();

  return (
    <div className="container mx-auto p-4 space-y-8">
      <ChannelInfoModule config={config} />
      <BannerImageModule
        imageUrl={`${S3_URL}/channels/${config?.domain}/banner-image.png`}
        height={300}
      />
      <ChannelNavigationModule />
    </div>
  );
}
