import SearchResults from "@/components/ui-library/search/SearchResults";
import SearchErrorFallback from "@/components/ui-library/fallback/SearchErrorFallback";
import {
  validateSearchKeyword,
  isSafeKeyword,
} from "@/utils/validation/search/searchKeywordSchema";
import dataApi from "@/utils/common-axios/dataApi";
import { AxiosError } from "axios";

const SearchPage = async ({
  params,
}: {
  params: Promise<{ keyword: string }>;
}) => {
  const { keyword } = await params;
  const decodedKeyword = decodeURIComponent(keyword);

  // 1. 기본 안전성 검증
  if (!isSafeKeyword(decodedKeyword)) {
    return (
      <SearchErrorFallback
        error="안전하지 않은 검색어입니다."
        keyword={decodedKeyword}
      />
    );
  }

  // 2. Zod 스키마 검증
  const validation = validateSearchKeyword(decodedKeyword);
  if (!validation.success && validation.error) {
    return (
      <SearchErrorFallback error={validation.error} keyword={decodedKeyword} />
    );
  }

  const safeKeyword = validation.data ?? "";

  // 3. 결과 keyword가 비어있는지 확인
  if (!safeKeyword) {
    return (
      <SearchErrorFallback
        error="검색어가 비어있습니다."
        keyword={decodedKeyword}
      />
    );
  }

  // 4. 최종 api 호출
  let result = null;
  try {
    result = await dataApi.get(`/search/${safeKeyword}`);
  } catch (error) {
    let errorMessage = "검색 중 오류가 발생했습니다.";
    const axiosError = error as AxiosError<any>;
    if (axiosError?.response?.data?.message) {
      errorMessage = axiosError.response.data.message;
    } else if (axiosError?.message) {
      errorMessage = axiosError.message;
    }
    return (
      <SearchErrorFallback error={errorMessage} keyword={decodedKeyword} />
    );
  }

  const newsResults = result.data.newsResults ?? [];
  const boardResults = result.data.boardResults ?? [];

  return (
    <SearchResults
      keyword={safeKeyword}
      newsResults={newsResults}
      boardResults={boardResults}
    />
  );
};

export default SearchPage;
