import type { ScheduleItem } from "../types";

const STORAGE_KEY = "kickflip-calendar-local-schedules";

export const loadLocalSchedules = (): ScheduleItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ScheduleItem[];
    return Array.isArray(parsed) ? parsed.map((item) => ({ ...item, isLocal: true })) : [];
  } catch {
    return [];
  }
};

export const saveLocalSchedules = (items: ScheduleItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map((item) => ({ ...item, isLocal: true }))));
};
