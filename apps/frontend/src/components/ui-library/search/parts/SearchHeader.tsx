const SearchHeader = ({ keyword }: { keyword: string }) => {
  return (
    <div
      className="border-b p-6"
      style={{ borderColor: "var(--border-color)" }}
    >
      <h1
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--text-color)" }}
      >
        통합 검색
      </h1>
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        <span className="font-lg text-red-600">&lsquo;{keyword}&rsquo;</span>
        &nbsp;검색 결과
      </p>
    </div>
  );
};

export default SearchHeader;
