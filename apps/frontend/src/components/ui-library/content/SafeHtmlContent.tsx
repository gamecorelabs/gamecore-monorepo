"use client";
import { useEffect, useState } from "react";
import "@/styles/rich-content.css";
import useHydrated from "@/utils/hooks/useHydrated";

interface SafeHtmlContentProps {
  content: string;
  ignore?: boolean;
  className?: string;
}

const SafeHtmlContent = ({
  content,
  ignore = false,
  className = "",
}: SafeHtmlContentProps) => {
  const [sanitizedContent, setSanitizedContent] = useState("");
  const hydrated = useHydrated();

  useEffect(() => {
    if (!hydrated) return;

    // DOMPurify를 동적으로 import (클라이언트 사이드에서만 실행)
    const sanitizeContent = async () => {
      const DOMPurify = (await import("dompurify")).default;

      // 허용할 태그와 속성 설정 (보안 강화)
      const cleanContent = DOMPurify.sanitize(content, {
        // 허용할 태그
        ALLOWED_TAGS: [
          "p",
          "br",
          "strong",
          "em",
          "u",
          "b",
          "i",
          "img",
          "div",
          "span",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "ul",
          "ol",
          "li",
          "blockquote",
          "a",
        ],
        // 허용할 속성
        ALLOWED_ATTR: [
          "src",
          "alt",
          "title",
          "width",
          "height",
          "style",
          "href",
          "target",
          "rel",
          "class",
        ],
        // 스타일 속성 허용 (이미지 크기 조절 등을 위해)
        ALLOW_DATA_ATTR: false,
        // 외부 리소스 로딩 방지
        FORBID_CONTENTS: ["script", "style"],
        // URL 프로토콜 제한
        ALLOWED_URI_REGEXP:
          /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
      });

      setSanitizedContent(cleanContent);
    };

    sanitizeContent();
  }, [content, hydrated]);

  // 마운트되기 전까지는 플레인 텍스트로 표시 (hydration 오류 방지)
  if (!hydrated || ignore) {
    return <div className={className}>{content.replace(/<[^>]*>/g, "")}</div>;
  }

  return (
    <div
      className={`rich-content ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default SafeHtmlContent;
