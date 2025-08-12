import {
  ChannelNavigationModule,
  ChannelInfoModule,
  BannerImageModule,
} from "@/components/ui-library/common/modules";
import { getAllChannels } from "@/config/channel";
import { S3_URL } from "@/config/config";
import { getChannelInfo } from "@/utils/hooks/useChannel";

export default async function Page() {
  const { config } = await getChannelInfo();
  const channels = getAllChannels();

  return (
    <div className="container mx-auto p-4 space-y-8">
      <ChannelInfoModule config={config} />
      <BannerImageModule
        imageUrl={`${S3_URL}/channels/${config?.channel}/banner-image.png`}
        height={300}
      />
      <ChannelNavigationModule channels={channels} />
    </div>
  );
}
