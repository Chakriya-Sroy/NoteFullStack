export const formatDate = (data?: string) => {
  if (!data) return "-";
  return new Date(data).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Phnom_Penh",
  });
};
