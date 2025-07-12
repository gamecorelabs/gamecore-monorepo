"use client";
import WriteForm from "./parts/WriteForm";
import { useUserStore } from "@/store/userStore";

const BoardPostNew = ({ boardId }: { boardId: string }) => {
  const currentUser = useUserStore((state) => state.user);

  return <WriteForm boardId={boardId} guestMode={!currentUser} />;
};

export default BoardPostNew;
