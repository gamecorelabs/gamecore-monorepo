import { ResourceType } from "@/types/common/resource.types";
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
    comments = response?.data || null;
  } catch {
    comments = null;
  }

  return (
    <div className="mt-3">
      {comments && <CommentList comments={comments} />}
      <CommentWriteForm resourceId={resourceId} resourceType={resourceType} />
    </div>
  );
};

export default CommentContainer;
