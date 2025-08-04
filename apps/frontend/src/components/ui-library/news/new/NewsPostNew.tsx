"use client";
import { BoardConfig } from "@/types/board/boardConfig.types";
import WriteForm from "./parts/WriteForm";
import { useUserStore } from "@/store/userStore";

const NewsPostNew = ({ boardConfig }: { boardConfig: BoardConfig }) => {
  const currentUser = useUserStore((state) => state.user);

  return <WriteForm boardConfig={boardConfig} guestMode={!currentUser} />;
};

export default NewsPostNew;
