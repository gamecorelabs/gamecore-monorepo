import { BoardConfig } from "@/types/board/boardConfig.types";

const TableHeader = ({ boardConfig }: { boardConfig: BoardConfig }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--text-color)" }}
          >
            {boardConfig.title || "게시판 이름을 설정해주세요."}
          </h2>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            className="px-3 py-1 text-sm rounded-full transition-colors"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "white",
            }}
          >
            전체
          </button>
          {boardConfig.categories.map((category) => (
            <button
              key={category.id}
              className="px-3 py-1 text-sm rounded-full transition-colors border"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-secondary)",
                backgroundColor: "transparent",
              }}
            >
              {category.title}
            </button>
          ))}
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
