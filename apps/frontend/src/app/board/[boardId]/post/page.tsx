import { ArticleList } from "@ui-library";
import React from "react";
import dataApi from "@/utils/common-axios/dataApi";
import qs from "qs";

interface BoardPostProps {
  params: { boardId: string };
  searchParams: { [key: string]: string | string[] };
}

const BoardPostPage = async ({ params, searchParams }: BoardPostProps) => {
  let posts = null;
  let totalPost = 0;

  const { boardId } = await params;
  const qstring = await searchParams;

  let queryString = qs.stringify(qstring, {
    arrayFormat: "brackets",
  });

  if (queryString) {
    queryString = `?${queryString}`;
  }

  try {
    const response = await dataApi.get(`/board/${boardId}/post${queryString}`);
    posts = response?.data.posts || [];
    totalPost = response?.data.totalPost || 0;
  } catch (error) {
    posts = [];
  }

  return <ArticleList boardId={boardId} posts={posts} />;
};

export default BoardPostPage;
