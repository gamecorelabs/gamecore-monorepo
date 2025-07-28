import {
  ChannelNavigationModule,
  ChannelInfoModule,
  BannerImageModule,
} from "@/components/ui-library/common/modules";
import { getChannelInfo } from "@/utils/hooks/useChannel";

export default async function Page() {
  const { config } = await getChannelInfo();

  return (
    <div className="container mx-auto p-4 space-y-8">
      <ChannelInfoModule config={config} />
      <ChannelNavigationModule />
    </div>
  );
}
