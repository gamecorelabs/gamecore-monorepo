"use client";
import { NewsConfig } from "@/types/news/newsConfig.types";
import { useSearchParams } from "next/navigation";

const TableHeader = ({ newsConfig }: { newsConfig: NewsConfig }) => {
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("where__categoryId");

  const handleCategoryClick = (categoryId?: string) => {
    const url = new URL(window.location.href);
    if (!categoryId) {
      url.searchParams.delete("where__categoryId");
    } else {
      url.searchParams.set("where__categoryId", categoryId);
    }
    window.location.href = url.toString();
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: "var(--text-color)" }}
          >
            {newsConfig.title || "뉴스"}
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            최신 게임 소식을 확인하세요
          </p>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            className="px-3 py-1 text-sm rounded-full transition-colors border"
            style={{
              backgroundColor: !currentCategoryId
                ? "var(--primary-color)"
                : "transparent",
              color: !currentCategoryId ? "white" : "var(--text-secondary)",
              borderColor: !currentCategoryId
                ? "var(--primary-color)"
                : "var(--border-color)",
            }}
            onClick={() => handleCategoryClick()}
          >
            전체
          </button>

          {newsConfig.categories.map((category) => {
            const isActive = currentCategoryId === category.id.toString();
            return (
              <button
                key={category.id}
                className="px-3 py-1 text-sm rounded-full transition-colors border"
                style={{
                  borderColor: isActive
                    ? "var(--primary-color)"
                    : "var(--border-color)",
                  color: isActive ? "white" : "var(--text-secondary)",
                  backgroundColor: isActive
                    ? "var(--primary-color)"
                    : "transparent",
                }}
                onClick={() => handleCategoryClick(category.id + "")}
              >
                {category.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* 테이블 헤더 (데스크톱) - 뉴스 전용 */}
      <div
        className="hidden md:flex items-center px-4 py-3 text-sm font-medium border-b"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--input-bg)",
          color: "var(--text-secondary)",
        }}
      >
        <div className="w-24 flex-shrink-0 text-center">썸네일</div>
        <div className="w-24 flex-shrink-0 text-center">분류</div>
        <div className="flex-1">제목</div>
        <div className="w-28 flex-shrink-0 text-center">작성자</div>
        <div className="w-24 flex-shrink-0 text-center">작성일</div>
        <div className="w-16 flex-shrink-0 text-center">추천</div>
      </div>
    </div>
  );
};

export default TableHeader;
