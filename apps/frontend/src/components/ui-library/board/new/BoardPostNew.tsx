"use client";
import { useState } from "react";
import WriteForm from "./parts/WriteForm";
import { useUserStore } from "@/store/userStore";

const BoardPostNew = ({ boardId }: { boardId: string }) => {
  const currentUser = useUserStore((state) => state.user);
  const [guestMode, setGuestMode] = useState<boolean>(!currentUser);

  return <WriteForm boardId={boardId} guestMode={guestMode} />;
};

export default BoardPostNew;
