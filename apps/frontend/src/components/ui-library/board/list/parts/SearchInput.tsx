import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formDataToObject } from "@/utils/helpers/formDataToObject";
import { getZodErrorMessage } from "@/utils/helpers/getZodErrorMessage";
import { boardListSearchSchema } from "@/utils/validation/board/boardListSearchSchema";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const SearchList = ({ defaultValue = "title" }: { defaultValue?: string }) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = new URL(window.location.href);
    url.search = "";
    if (formRef.current === null) {
      window.alert("폼이 올바르게 로드되지 않았습니다. 다시 시도해주세요.");
      return false;
    }

    const formData = new FormData(formRef.current);
    const formObject = formDataToObject(formData);
    formObject.searchValue = formObject.searchValue?.trim() ?? "";

    if (!formObject.searchValue) {
      router.push(url.toString());
      return;
    }

    const validation = boardListSearchSchema.safeParse(formObject);
    if (!validation.success) {
      const firstIssue = validation.error.issues[0];
      getZodErrorMessage(formRef, firstIssue);
      return;
    }

    let searchType = formObject.searchType as string;
    let searchValue = formObject.searchValue as string;
    let searchQueryKey = "";

    switch (searchType) {
      case "title":
      case "content":
        searchQueryKey = `where__${searchType}__like`;
        break;
      default:
        window.alert("유효하지 않은 검색 옵션입니다.");
        return;
    }

    url.searchParams.set(searchQueryKey, searchValue);
    router.push(url.toString());
  };

  return (
    <div className="flex w-full justify-center items-center my-4">
      <form
        ref={formRef}
        className="flex w-full items-center gap-2"
        onSubmit={handleSearchSubmit}
      >
        <Select name="searchType" defaultValue={defaultValue}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="검색 옵션" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="title">제목</SelectItem>
              <SelectItem value="content">내용</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="text"
          name="searchValue"
          placeholder="검색어를 입력해주세요.."
        />
        <Button type="submit" variant="outline">
          검색
        </Button>
      </form>
    </div>
  );
};

export default SearchList;
