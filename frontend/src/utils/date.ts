export const dateFormatter = Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
});

export function formatDate(dateString: string) {
  return dateFormatter.format(new Date(dateString));
}
