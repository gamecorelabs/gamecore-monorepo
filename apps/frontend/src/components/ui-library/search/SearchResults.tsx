"use client";
import { BoardPost } from "@/types/board/boardPost.types";
import { NewsPost } from "@/types/news/newsPost.types";
import SearchNewsItem from "./parts/SearchNewsItem";
import SearchBoardItem from "./parts/SearchBoardItem";
import SearchHeader from "./parts/SearchHeader";
import SearchResultEmpty from "./parts/SearchResultEmpty";
import { ChannelConfig } from "@/types/channel/channel.types";
import { ChannelNavigationModule } from "../common/modules";

interface SearchResultsProps {
  keyword: string;
  channels: ChannelConfig[];
  newsResults: NewsPost[];
  boardResults: BoardPost[];
}

const SearchResults = ({
  keyword,
  channels,
  newsResults,
  boardResults,
}: SearchResultsProps) => {
  const hasResults =
    channels.length > 0 || newsResults.length > 0 || boardResults.length > 0;

  return (
    <div className="min-h-screen">
      <SearchHeader keyword={keyword} />
      {!hasResults ? (
        <SearchResultEmpty />
      ) : (
        <div className="space-y-8 p-6">
          {/* 채널 검색 결과 */}
          {channels.length > 0 && (
            <ChannelNavigationModule channels={channels} keyword={keyword} />
          )}
          {/* 뉴스 검색 결과 */}
          {newsResults.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-1 h-6"
                  style={{ backgroundColor: "var(--primary-color)" }}
                />
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-color)" }}
                >
                  뉴스 ({newsResults.length})
                </h2>
              </div>
              <div
                className="border rounded-lg overflow-hidden"
                style={{ borderColor: "var(--border-color)" }}
              >
                {newsResults.map((post, index) => (
                  <SearchNewsItem
                    key={post.id}
                    post={post}
                    keyword={keyword}
                    isLast={index === newsResults.length - 1}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 게시판 검색 결과 */}
          {boardResults.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-1 h-6"
                  style={{ backgroundColor: "var(--primary-color)" }}
                />
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-color)" }}
                >
                  게시판 ({boardResults.length})
                </h2>
              </div>
              <div
                className="border rounded-lg overflow-hidden"
                style={{ borderColor: "var(--border-color)" }}
              >
                {boardResults.map((post, index) => (
                  <SearchBoardItem
                    key={post.id}
                    post={post}
                    keyword={keyword}
                    isLast={index === boardResults.length - 1}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
