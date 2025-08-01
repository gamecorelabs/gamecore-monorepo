import { BoardPostList, FallbackPage } from "@ui-library";
import React from "react";
import dataApi from "@/utils/common-axios/dataApi";
import qs from "qs";
import { getBoardConfig } from "@/utils/board/getBoardConfig";

interface BoardPostProps {
  params: Promise<{ boardId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
}

const BoardPostPage = async ({ params, searchParams }: BoardPostProps) => {
  let posts = null;
  let paginationInfo = null;
  const { boardId } = await params;
  const boardConfig = await getBoardConfig(boardId);

  const qstring = await searchParams;

  let queryString = qs.stringify(qstring, {
    arrayFormat: "brackets",
  });

  if (queryString) {
    queryString = `?${queryString}`;
  }

  try {
    const postResponse = await dataApi.get(
      `/board/${boardId}/post${queryString}`
    );
    posts = postResponse?.data.posts || [];
    paginationInfo = postResponse?.data.paginationInfo || null;
  } catch {
    posts = [];
  }

  return (
    <BoardPostList
      boardConfig={boardConfig}
      posts={posts}
      paginationInfo={paginationInfo}
    />
  );
};

export default BoardPostPage;
