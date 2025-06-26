import { ArticleList } from "@ui-library";
import React from "react";
import dataApi from "@/utils/common-axios/dataApi";
interface BoardPostProps {
  params: { id: string };
}

const BoardPostPage = async ({ params }: BoardPostProps) => {
  let posts = [];
  const { id } = await params;
  try {
    const response = await dataApi.get(`/board/${id}/post`);
    posts = response?.data ?? [];
  } catch (error) {
    posts = [];
  }

  return <ArticleList posts={posts} />;
};

export default BoardPostPage;
