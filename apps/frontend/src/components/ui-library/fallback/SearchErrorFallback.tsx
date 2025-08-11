"use client";

interface SearchErrorFallbackProps {
  error: string;
  keyword: string;
}

const SearchErrorFallback = ({ error, keyword }: SearchErrorFallbackProps) => {
  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleGoHome = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        {/* 에러 아이콘 */}
        <div className="text-6xl mb-6" style={{ color: "var(--text-muted)" }}>
          ⚠️
        </div>

        {/* 에러 제목 */}
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: "var(--text-color)" }}
        >
          검색어 오류
        </h1>

        {/* 에러 메시지 */}
        <p className="text-base mb-2" style={{ color: "var(--text-muted)" }}>
          {error}
        </p>

        {/* 입력된 키워드 표시 (안전하게) */}
        {keyword && (
          <p
            className="text-sm mb-6 p-3 rounded-lg font-mono break-all"
            style={{
              backgroundColor: "var(--card-bg)",
              color: "var(--text-muted)",
              border: "1px solid var(--border-color)",
            }}
          >
            입력된 검색어: &ldquo;{keyword.substring(0, 50)}
            {keyword.length > 50 ? "..." : ""}&rdquo;
          </p>
        )}

        {/* 안내 메시지 */}
        <div
          className="text-sm mb-8 p-4 rounded-lg"
          style={{
            backgroundColor: "var(--secondary-bg)",
            color: "var(--text-secondary)",
          }}
        >
          <p className="mb-2">올바른 검색어 조건:</p>
          <ul className="text-left space-y-1">
            <li>• 1자 이상 100자 이하</li>
            <li>• HTML 태그 사용 금지</li>
            <li>• 스크립트 코드 사용 금지</li>
            <li>• 과도한 특수문자 사용 금지</li>
          </ul>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleGoBack}
            className="px-6 py-3 rounded-lg border font-medium transition-colors"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-color)",
              backgroundColor: "var(--card-bg)",
            }}
          >
            이전 페이지
          </button>
          <button
            onClick={handleGoHome}
            className="px-6 py-3 rounded-lg font-medium text-white transition-colors"
            style={{
              backgroundColor: "var(--primary-color)",
            }}
          >
            홈으로 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchErrorFallback;
