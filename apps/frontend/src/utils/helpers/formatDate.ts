export const formatDate = (
  date: string,
  options?: Intl.DateTimeFormatOptions
) => {
  return new Date(date).toLocaleString("ko-KR", {
    // year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    ...options,
  });
};

export const formatDateSafe = (dateString: string): string => {
  try {
    // ISO 문자열 직접 파싱
    // 예: "2024-07-21T12:34:56.789Z" 또는 "2024-07-21"
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (!match) {
      return "-";
    }

    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);

    return `${month}월 ${day}일`;
  } catch (error) {
    return "-";
  }
};
