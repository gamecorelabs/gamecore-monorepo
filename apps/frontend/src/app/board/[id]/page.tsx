import { ArticleList } from "@ui-library";
import React from "react";
import dataApi from "@/utils/common-axios/dataApi";

const BoardPage = async () => {
  let posts = [];
  try {
    const response = await dataApi.get("/board/1/post", {
      withCredentials: true,
    });

    posts = response?.data ?? [];
  } catch (error) {
    posts = [];
  }

  return <ArticleList posts={posts} />;
};

export default BoardPage;
