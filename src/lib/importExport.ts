import type { ScheduleCategory, ScheduleItem } from "../types";
import { categories } from "../types";

export const inferMembers = (title: string): string[] | undefined => {
  const match = title.match(/^\[([^\]]+)\]/);
  if (!match) return undefined;
  return match[1].split("/").map((member) => member.trim()).filter(Boolean);
};

export const parseImportText = (text: string) => {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const imported: ScheduleItem[] = [];
  let failed = 0;

  lines.forEach((line, index) => {
    const parts = line.split("|").map((part) => part.trim());
    if (parts.length < 4) {
      failed += 1;
      return;
    }

    const [date, category, title, ...urlParts] = parts;
    const url = urlParts.join("|").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !categories.includes(category as ScheduleCategory) || !title) {
      failed += 1;
      return;
    }

    imported.push({
      id: `local-import-${Date.now()}-${index}`,
      date,
      category: category as ScheduleCategory,
      title,
      members: inferMembers(title),
      url,
      isLocal: true,
    });
  });

  return { imported, failed };
};

export const downloadJson = (items: ScheduleItem[]) => {
  downloadFile("kickflip-schedules.json", JSON.stringify(items, null, 2), "application/json");
};

export const downloadCsv = (items: ScheduleItem[]) => {
  const headers = ["date", "category", "title", "members", "url", "memo"];
  const rows = items.map((item) =>
    [item.date, item.category, item.title, item.members?.join("/") ?? "", item.url ?? "", item.memo ?? ""]
      .map(escapeCsv)
      .join(","),
  );
  downloadFile("kickflip-schedules.csv", [headers.join(","), ...rows].join("\n"), "text/csv;charset=utf-8");
};

const escapeCsv = (value: string) => `"${value.replaceAll('"', '""')}"`;

const downloadFile = (filename: string, content: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
