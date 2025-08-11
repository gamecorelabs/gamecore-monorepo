const SearchResultEmpty = () => {
  return (
    /* 검색 결과 없음 */
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-6xl mb-4" style={{ color: "var(--text-muted)" }}>
        🔍
      </div>
      <h2
        className="text-xl font-medium mb-2"
        style={{ color: "var(--text-color)" }}
      >
        검색 결과가 없습니다
      </h2>
      <p
        className="text-sm text-center max-w-md"
        style={{ color: "var(--text-muted)" }}
      >
        다른 검색어로 시도해보시거나, 검색어의 철자가 올바른지 확인해주세요.
      </p>
    </div>
  );
};

export default SearchResultEmpty;
