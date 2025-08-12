import React from "react";

export const highlightKeyword = (text: string, keyword?: string) => {
  if (!keyword || !text) return text;

  // 특수 문자 이스케이프
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedKeyword})`, "gi");

  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <span
          key={index}
          className="text-lg font-bolder"
          style={{
            color: "#dc2626",
          }}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};
