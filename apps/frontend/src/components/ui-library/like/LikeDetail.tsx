"use client";
import { useUserStore } from "@/store/userStore";
import dataApi from "@/utils/common-axios/dataApi";
import { ResourceType } from "@gamecoregg/types/common/resource.types";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/navigation";

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
  const handleLike = async (type: string) => {
    try {
      const result = await dataApi.post(
        `/${resourceType}/${resourceId}/like`,
        { type },
        { withCredentials: true }
      );

      if (result.status === StatusCodes.CREATED) {
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
        className="flex flex-row items-center gap-2 px-6 py-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        onClick={() => handleLike("1")}
      >
        <HandThumbUpIcon className="h-8 w-8 text-green-500" />
        <span className="text-lg font-medium text-gray-700">{likeCount}</span>
      </button>
      <button
        className="flex flex-row items-center gap-2 px-6 py-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        onClick={() => handleLike("0")}
      >
        <HandThumbDownIcon className="h-8 w-8 text-red-500" />
        <span className="text-lg font-medium text-gray-700">
          {dislikeCount}
        </span>
      </button>
    </div>
  );
};

export default LikeDetail;
