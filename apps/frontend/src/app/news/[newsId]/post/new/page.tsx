import NewsPostNew from "@/components/ui-library/news/new/NewsPostNew";
import { getNewsConfig } from "@/utils/news/getNewsConfig";

interface NewsPostNewProps {
  params: Promise<{ newsId: string }>;
}

const NewsPostNewPage = async ({ params }: NewsPostNewProps) => {
  const { newsId } = await params;
  const newsConfig = await getNewsConfig(newsId);

  return <NewsPostNew newsConfig={newsConfig} />;
};

export default NewsPostNewPage;
