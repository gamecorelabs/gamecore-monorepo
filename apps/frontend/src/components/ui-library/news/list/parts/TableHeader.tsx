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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--text-color)" }}
          >
            {newsConfig.title || "뉴스 페이지 이름을 설정해주세요."}
          </h2>
        </div>
      </div>
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
      <div
        className="hidden md:grid md:grid-cols-12 gap-4 py-3 px-4 text-sm font-medium border-b-2"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--input-bg)",
          color: "var(--text-secondary)",
        }}
      >
        <div className="col-span-1 text-center">분류</div>
        <div className="col-span-5">제목</div>
        <div className="col-span-2 text-center">작성자</div>
        <div className="col-span-2 text-center">작성일</div>
        <div className="col-span-1 text-center">조회</div>
        <div className="col-span-1 text-center">추천</div>
      </div>
    </div>
  );
};

export default TableHeader;
