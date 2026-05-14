import type { ScheduleItem } from "../types";

export type CalendarDay = {
  date: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  count: number;
};

const pad = (value: number) => String(value).padStart(2, "0");

export const toDateKey = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const makeMonthDays = (year: number, month: number, schedules: ScheduleItem[]): CalendarDay[] => {
  const scheduleCounts = schedules.reduce<Record<string, number>>((acc, item) => {
    acc[item.date] = (acc[item.date] ?? 0) + 1;
    return acc;
  }, {});
  const first = new Date(year, month - 1, 1);
  const last = new Date(year, month, 0);
  const startOffset = first.getDay();
  const totalCells = Math.ceil((startOffset + last.getDate()) / 7) * 7;
  const start = new Date(year, month - 1, 1 - startOffset);

  return Array.from({ length: totalCells }, (_, index) => {
    const current = new Date(start);
    current.setDate(start.getDate() + index);
    const date = toDateKey(current);
    return {
      date,
      dayNumber: current.getDate(),
      isCurrentMonth: current.getMonth() === month - 1,
      count: scheduleCounts[date] ?? 0,
    };
  });
};

export const formatKoreanDate = (date: string) => {
  const parsed = new Date(`${date}T00:00:00`);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(parsed);
};
