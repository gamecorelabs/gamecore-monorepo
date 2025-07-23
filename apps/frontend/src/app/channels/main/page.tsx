import {
  ChannelNavigationModule,
  ChannelInfoModule,
} from "@/components/ui-library/common/modules";
import { getSubdomainInfo } from "@/utils/hooks/useSubdomain";

export default async function Page() {
  const { config } = await getSubdomainInfo();

  return (
    <div className="container mx-auto p-4 space-y-8">
      <ChannelInfoModule config={config} />
      <ChannelNavigationModule />
    </div>
  );
}
