import { ArticleList } from "@ui-library";
import React from "react";
import dataApi from "@/utils/common-axios/dataApi";
interface BoardPostProps {
  params: { boardId: string };
}

const BoardPostPage = async ({ params }: BoardPostProps) => {
  let posts = null;
  let likeCounts = null;
  let commentCounts = null;

  const { boardId } = await params;
  try {
    const response = await dataApi.get(`/board/${boardId}/post`);
    const result = response?.data ?? [];
    posts = result.posts ?? [];
    likeCounts = result.likeCounts ?? {};
    commentCounts = result.commentCounts ?? {};
  } catch (error) {
    posts = [];
  }

  return (
    <ArticleList
      boardId={boardId}
      posts={posts}
      likeCounts={likeCounts}
      commentCounts={commentCounts}
    />
  );
};

export default BoardPostPage;
