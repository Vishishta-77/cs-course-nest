export function minutesToHoursMinutes(totalMinutes: number): {
  hours: number;
  minutes: number;
} {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

export function formatDuration(totalMinutes: number): string {
  const { hours, minutes } = minutesToHoursMinutes(totalMinutes);
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export function computeDurationMinutes(
  bedtime: Date,
  wakeTime: Date,
): number {
  let ms = wakeTime.getTime() - bedtime.getTime();
  if (ms < 0) ms += 24 * 60 * 60 * 1000;
  return Math.round(ms / 60000);
}

export function qualityLabel(quality: number): string {
  switch (quality) {
    case 1:
      return "Very poor";
    case 2:
      return "Poor";
    case 3:
      return "Okay";
    case 4:
      return "Good";
    case 5:
      return "Excellent";
    default:
      return "—";
  }
}

export function formatShortDate(dateString: string): string {
  const d = new Date(dateString + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function formatTimeInput(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function localDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseTimeOnDate(timeValue: string, dateValue: string, isWakeTime = false): Date {
  const [hoursStr, minutesStr] = timeValue.split(":");
  const base = new Date(dateValue + "T00:00:00");
  let hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (isWakeTime && hours < 12) {
    hours += 24;
  }

  base.setHours(hours, minutes, 0, 0);
  return base;
}
