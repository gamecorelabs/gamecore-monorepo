import { useRef } from "react";

interface SearchBarProps {
  isDesktop?: boolean;
}

const SearchBar = ({ isDesktop = true }: SearchBarProps) => {
  const searchInput = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const query = searchInput.current?.value.trim();
    if (query) {
      window.location.href = `/search/${encodeURIComponent(query)}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={
        isDesktop ? "relative hidden lg:block" : "px-4 pb-4 block lg:hidden"
      }
    >
      <div className="relative">
        <input
          type="text"
          placeholder="게임, 뉴스, 커뮤니티 검색..."
          className={`search-input px-6 py-3 rounded-lg border transition-all backdrop-blur-sm focus:outline-none ${
            isDesktop ? "w-[400px]" : "w-full px-4"
          }`}
          style={{
            backgroundColor: "var(--input-bg)",
            borderColor: "var(--border-color)",
            color: "var(--text-color)",
          }}
          ref={searchInput}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div
            className="p-2 rounded-md cursor-pointer"
            style={{ backgroundColor: "var(--primary-color)" }}
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              style={{ color: "var(--text-color)" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
