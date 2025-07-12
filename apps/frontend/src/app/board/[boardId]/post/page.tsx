import { ArticleList } from "@ui-library";
import React from "react";
import dataApi from "@/utils/common-axios/dataApi";
import qs from "qs";

interface BoardPostProps {
  params: Promise<{ boardId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
}

const BoardPostPage = async ({ params, searchParams }: BoardPostProps) => {
  let posts = null;
  let paginationInfo = null;

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
    paginationInfo = response?.data.paginationInfo || null;
  } catch {
    posts = [];
  }

  return (
    <ArticleList
      boardId={boardId}
      posts={posts}
      paginationInfo={paginationInfo}
    />
  );
};

export default BoardPostPage;
