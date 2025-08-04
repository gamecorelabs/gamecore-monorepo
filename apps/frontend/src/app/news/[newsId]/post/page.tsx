import { BoardPostList, FallbackPage, NewsPostList } from "@ui-library";
import React from "react";
import dataApi from "@/utils/common-axios/dataApi";
import qs from "qs";
import { getNewsConfig } from "@/utils/news/getNewsConfig";

interface NewsPostProps {
  params: Promise<{ newsId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
}

const NewsPostPage = async ({ params, searchParams }: NewsPostProps) => {
  let posts = null;
  let paginationInfo = null;
  const { newsId } = await params;
  const newsConfig = await getNewsConfig(newsId);

  const qstring = await searchParams;

  let queryString = qs.stringify(qstring, {
    arrayFormat: "brackets",
  });

  if (queryString) {
    queryString = `?${queryString}`;
  }

  try {
    const postResponse = await dataApi.get(
      `/news/${newsId}/post${queryString}`
    );
    posts = postResponse?.data.posts || [];
    paginationInfo = postResponse?.data.paginationInfo || null;
  } catch {
    posts = [];
  }

  return (
    <NewsPostList
      newsConfig={newsConfig}
      posts={posts}
      paginationInfo={paginationInfo}
    />
  );
};

export default NewsPostPage;
