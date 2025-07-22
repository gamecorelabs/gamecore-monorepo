"use client";
import { useUserStore } from "@/store/userStore";
import dataApi from "@/utils/common-axios/dataApi";
import { encodeBase64Unicode } from "@/utils/helpers/base64Unicode";
import { useFingerprint } from "@/utils/hooks/useFingerprint";
import { ResourceType } from "@/types/common/resource.types";
import { LikeType } from "@/types/like/like.types";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const LikeDetail = ({
  resourceType,
  resourceId,
  likeCount,
  dislikeCount,
  selectedMap,
  size = "default",
}: {
  resourceType: ResourceType;
  resourceId: number;
  likeCount: number;
  dislikeCount: number;
  selectedMap: Record<number, { type: LikeType | null }>;
  size?: "default" | "comment";
}) => {
  const router = useRouter();
  const currentUser = useUserStore((state) => state.user);
  const fp = useFingerprint();
  const fingerprint = useMemo(() => {
    if (currentUser) return "";
    return fp;
  }, [currentUser, fp]);
  const [selected, setSelected] = useState<LikeType | null>(null);
  const headers = useMemo(() => {
    const h: Record<string, string> = {};

    if (!currentUser && fingerprint) {
      const encoded = encodeBase64Unicode(`${fingerprint}`);
      h["Authorization"] = `Basic ${encoded}`;
    }

    return h;
  }, [currentUser, fingerprint]);

  useEffect(() => {
    if (selectedMap && resourceId in selectedMap) {
      setSelected(selectedMap[resourceId]?.type || null);
    } else {
      setSelected(null);
    }
  }, []);

  const handleLike = async (type: string) => {
    try {
      const result = await dataApi.post(
        `/${resourceType}/${resourceId}/like`,
        { type },
        { headers, withCredentials: true }
      );

      if (result.status === StatusCodes.CREATED) {
        if (result.data.canceled) {
          setSelected(null);
        }

        if (result.data.selected) {
          setSelected(result.data.selected);
        }

        router.refresh();
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      window.alert(
        axiosError.response?.data?.message ||
          "좋아요 처리 중 오류가 발생했습니다."
      );
      return;
    }
  };

  const sizeClasses = {
    default: {
      container: "flex justify-center items-center gap-8 py-8",
      button:
        "flex flex-row items-center gap-2 px-6 py-4 rounded-lg border-2 transition-colors duration-200",
      icon: "h-8 w-8",
      text: "text-lg font-medium",
    },
    comment: {
      container: "flex justify-center items-center gap-3",
      button:
        "flex flex-row items-center gap-1 px-3 py-2 rounded-md border transition-colors duration-200",
      icon: "h-4 w-4",
      text: "text-sm font-medium",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={classes.container}>
      <button
        className={`${classes.button}
            ${
              selected === LikeType.LIKE
                ? "border-red-600 border-2"
                : "border-gray-200"
            }`}
        onClick={() => handleLike(LikeType.LIKE)}
      >
        <HandThumbUpIcon className={`${classes.icon} text-green-500`} />
        <span className={classes.text}>{likeCount}</span>
      </button>
      <button
        className={`${classes.button}
          ${
            selected === LikeType.DISLIKE
              ? "border-red-600 border-2"
              : "border-gray-200"
          }`}
        onClick={() => handleLike(LikeType.DISLIKE)}
      >
        <HandThumbDownIcon className={`${classes.icon} text-red-500`} />
        <span className={classes.text}>{dislikeCount}</span>
      </button>
    </div>
  );
};

export default LikeDetail;
