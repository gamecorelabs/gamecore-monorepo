import WriteForm from "./parts/WriteForm";
import { NewsConfig } from "@/types/news/newsConfig.types";

const NewsPostNew = ({ newsConfig }: { newsConfig: NewsConfig }) => {
  return <WriteForm newsConfig={newsConfig} />;
};

export default NewsPostNew;
