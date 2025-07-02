import { ResourceType } from "@gamecoregg/types/common/resource.types";
import CommentList from "./CommentList";
import CommentWriteForm from "./CommentWriteForm";
import dataApi from "@/utils/common-axios/dataApi";

const CommentContainer = async ({
  resourceType,
  resourceId,
}: {
  resourceType: ResourceType;
  resourceId: number;
}) => {
  let comments = null;
  try {
    const response = await dataApi.get(
      `/${resourceType}/${resourceId}/comments`
    );
    comments = response?.data?.comments || null;
  } catch (error) {
    comments = null;
  }

  if (!comments) return;

  return (
    <div className="mt-3">
      <CommentList comments={comments} />
      <CommentWriteForm resourceId={resourceId} resourceType={resourceType} />
    </div>
  );
};

export default CommentContainer;
