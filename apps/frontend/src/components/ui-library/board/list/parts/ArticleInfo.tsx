import { getUserName } from "@/utils/helpers/getUserName";
import { BoardPost } from "@/types/board/boardPost.types";

export const ArticleInfo = ({ post }: { post: BoardPost }) => (
  <div className="flex justify-between text-sm mt-2">
    <div className="font-medium flex items-center">
      {/* TODO: Profile Image 노출 */}
      <span className="mr-1 inline-block align-middle">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-label="Discord"
          className="inline"
        >
          <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.07.07 0 0 0-.073.035c-.211.375-.444.864-.608 1.249a18.524 18.524 0 0 0-5.487 0 12.51 12.51 0 0 0-.617-1.249.07.07 0 0 0-.073-.035A19.736 19.736 0 0 0 3.677 4.369a.064.064 0 0 0-.03.027C.533 8.083-.32 11.58.099 15.032a.08.08 0 0 0 .028.056 19.911 19.911 0 0 0 5.993 3.036.07.07 0 0 0 .076-.027c.461-.63.874-1.295 1.226-1.994a.07.07 0 0 0-.038-.098 13.138 13.138 0 0 1-1.885-.9.07.07 0 0 1-.007-.117c.127-.094.254-.192.375-.291a.07.07 0 0 1 .073-.01c3.927 1.793 8.18 1.793 12.061 0a.07.07 0 0 1 .074.009c.122.099.248.197.376.291a.07.07 0 0 1-.006.117 12.298 12.298 0 0 1-1.886.899.07.07 0 0 0-.037.099c.36.698.773 1.362 1.225 1.993a.07.07 0 0 0 .076.028 19.888 19.888 0 0 0 6.002-3.035.07.07 0 0 0 .028-.056c.5-4.09-.838-7.563-3.548-10.637a.061.061 0 0 0-.03-.028ZM8.02 14.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.174 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.174 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419Z" />
        </svg>
      </span>
      {getUserName(post)}
    </div>
  </div>
);
