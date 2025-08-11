import { getUserName } from "@/utils/helpers/getUserName";
import { NewsPost } from "@/types/news/newsPost.types";
import { formatDate } from "@/utils/helpers/formatDate";
import { EyeIcon, UserIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import CurrentProfile from "@/components/ui-library/common/CurrentProfile";
import ProviderIcon from "@/components/ui-library/common/icons/ProviderIcon";

const DetailHeader = ({ post }: { post: NewsPost }) => {
  return (
    <div className="relative">
      {/* 그라데이션 헤더 배경 */}
      <div
        className="absolute inset-0 rounded-t-lg opacity-5"
        style={{
          background:
            "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark, #1e40af) 100%)",
        }}
      />

      <div className="relative p-8 pb-6">
        {/* 카테고리 및 메타 정보 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "white",
              }}
            >
              {post.category?.title || "일반"}
            </span>
          </div>
        </div>

        {/* 제목 */}
        <h1
          className="text-3xl font-bold leading-tight mb-6"
          style={{ color: "var(--text-color)" }}
        >
          {post.title}
        </h1>

        {/* 작성자 정보 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {post.author && (
              <CurrentProfile user={post.author} width={48} height={48} />
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <UserIcon
                  className="h-4 w-4"
                  style={{ color: "var(--text-muted)" }}
                />
                <span
                  className="font-medium flex items-center justify-center gap-2"
                  style={{ color: "var(--text-color)" }}
                >
                  {post.author && post.author.providerType && (
                    <ProviderIcon type={post.author.providerType} />
                  )}
                  {getUserName(post)}
                </span>
              </div>
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <CalendarIcon className="h-4 w-4" />
                <span>
                  {formatDate(post.createdAt, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-4 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            <div className="flex items-center gap-1">
              <EyeIcon className="h-4 w-4" />
              <span>{post.viewCount || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <HandThumbUpIcon className="h-4 w-4" />
              <span>{post.likeCount || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div
        className="h-px mx-8"
        style={{ backgroundColor: "var(--border-color)" }}
      />
    </div>
  );
};

export default DetailHeader;
