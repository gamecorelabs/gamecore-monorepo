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
