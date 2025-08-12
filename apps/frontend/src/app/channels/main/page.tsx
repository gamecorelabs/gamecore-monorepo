import {
  ChannelNavigationModule,
  ChannelInfoModule,
} from "@/components/ui-library/common/modules";
import { getAllChannels } from "@/config/channel";
import { getChannelInfo } from "@/utils/hooks/useChannel";

export default async function Page() {
  const { config } = await getChannelInfo();
  const channels = getAllChannels();

  return (
    <div className="container mx-auto p-4 space-y-8">
      <ChannelInfoModule config={config} />
      <ChannelNavigationModule channels={channels} />
    </div>
  );
}
