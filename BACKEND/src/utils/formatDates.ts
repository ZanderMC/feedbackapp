const minute = 60 * 1000;
const hour = 60 * minute;
const day = 24 * hour;
const month = 30 * day;
const year = 365 * day;

const relativeTime = new Intl.RelativeTimeFormat("es", { numeric: "always" });
const exactDate = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(value: Date | string, now = new Date()): string {
  const date = value instanceof Date ? value : new Date(value);
  const difference = date.getTime() - now.getTime();

  if (!Number.isFinite(difference)) {
    return String(value);
  }

  const elapsed = Math.abs(difference);
  if (elapsed >= year) {
    return exactDate.format(date);
  }

  const units: Array<[number, Intl.RelativeTimeFormatUnit]> = [
    [month, "month"],
    [day, "day"],
    [hour, "hour"],
    [minute, "minute"],
  ];
  const [unitSize, unit] = units.find(([size]) => elapsed >= size) ?? [1000, "second"];
  const amount = Math.max(1, Math.floor(elapsed / unitSize));

  return relativeTime.format(Math.sign(difference) * amount, unit);
}