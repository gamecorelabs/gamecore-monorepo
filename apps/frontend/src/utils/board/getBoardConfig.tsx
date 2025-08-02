import { FallbackPage } from "@/components/ui-library";
import dataApi from "../common-axios/dataApi";

export const getBoardConfig = async (boardId: string) => {
  let config = null;
  try {
    const response = await dataApi.get(`/board/${boardId}`);
    config = response?.data || null;
  } catch (error) {
    console.error("Error fetching board config:", error);
  }
  if (!config) {
    return (
      <FallbackPage
        message="게시판 설정을 불러올 수 없습니다."
        redirectTo="/"
      />
    );
  }
  return config;
};
