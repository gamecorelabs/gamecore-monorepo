"use client";
import { useUserStore } from "@/store/userStore";
import dataApi from "@/utils/common-axios/dataApi";
import { encodeBase64Unicode } from "@/utils/helpers/base64Unicode";
import { useFingerprint } from "@/utils/hooks/useFingerprint";
import { ResourceType } from "@gamecoregg/types/common/resource.types";
import { LikeType } from "@gamecoregg/types/like/like.types";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { AxiosError, HttpStatusCode } from "axios";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const LikeDetail = ({
  resourceType,
  resourceId,
  likeCount,
  dislikeCount,
}: {
  resourceType: ResourceType;
  resourceId: number;
  likeCount: number;
  dislikeCount: number;
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
    if (!currentUser && !headers["Authorization"]) return;

    const fetchCheckLike = async () => {
      const result = await dataApi.get(
        `/${resourceType}/${resourceId}/like/check`,
        {
          headers,
          withCredentials: true,
        }
      );

      if (result.status === StatusCodes.OK && result.data.selected) {
        setSelected(result.data.selected);
      }
    };

    fetchCheckLike();
  }, [headers]);

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

  return (
    <div className="flex justify-center items-center gap-8 py-8">
      <button
        className={`flex flex-row items-center gap-2 px-6 py-4 rounded-lg border-2  hover:bg-gray-50 transition-colors duration-200
            ${selected === LikeType.LIKE ? "border-red-600 border-2" : "border-gray-200"}`}
        onClick={() => handleLike(LikeType.LIKE)}
      >
        <HandThumbUpIcon className="h-8 w-8 text-green-500" />
        <span className="text-lg font-medium">{likeCount}</span>
      </button>
      <button
        className={`flex flex-row items-center gap-2 px-6 py-4 rounded-lg border-2 hover:bg-gray-50 transition-colors duration-200
          ${selected === LikeType.DISLIKE ? "border-red-600 border-2" : "border-gray-200"}`}
        onClick={() => handleLike(LikeType.DISLIKE)}
      >
        <HandThumbDownIcon className="h-8 w-8 text-red-500" />
        <span className="text-lg font-medium">{dislikeCount}</span>
      </button>
    </div>
  );
};

export default LikeDetail;
