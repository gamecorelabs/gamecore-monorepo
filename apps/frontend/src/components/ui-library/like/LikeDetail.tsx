"use client";
import { ResourceType } from "@gamecoregg/types/common/resource.types";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";

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
  const handleLike = () => {
    console.log("like");
  };

  const handleDislike = () => {
    console.log("dislike");
  };

  return (
    <div className="flex justify-center items-center gap-8 py-8">
      <button
        className="flex flex-row items-center gap-2 px-6 py-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        onClick={handleLike}
      >
        <HandThumbUpIcon className="h-8 w-8 text-green-500" />
        <span className="text-lg font-medium text-gray-700">{likeCount}</span>
      </button>
      <button
        className="flex flex-row items-center gap-2 px-6 py-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        onClick={handleDislike}
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
