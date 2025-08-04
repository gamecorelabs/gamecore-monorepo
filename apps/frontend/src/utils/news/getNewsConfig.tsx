import { FallbackPage } from "@/components/ui-library";
import dataApi from "../common-axios/dataApi";

export const getNewsConfig = async (newsId: string) => {
  let config = null;
  try {
    const response = await dataApi.get(`/news/${newsId}`);
    config = response?.data || null;
  } catch (error) {
    console.error("Error fetching news config:", error);
  }
  if (!config) {
    return (
      <FallbackPage message="뉴스 설정을 불러올 수 없습니다." redirectTo="/" />
    );
  }
  return config;
};
