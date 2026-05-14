export type ScheduleCategory =
  | "팬싸"
  | "숏폼"
  | "유튜브"
  | "X"
  | "팬즈"
  | "인스타"
  | "공식"
  | "기타";

export type ScheduleItem = {
  id: string;
  date: string;
  category: ScheduleCategory;
  title: string;
  members?: string[];
  url?: string;
  source?: string;
  memo?: string;
  isLocal?: boolean;
};

export type QuickLink = {
  label: string;
  url: string;
};

export const categories: ScheduleCategory[] = [
  "팬싸",
  "숏폼",
  "유튜브",
  "X",
  "팬즈",
  "인스타",
  "공식",
  "기타",
];
