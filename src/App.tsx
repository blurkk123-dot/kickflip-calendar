import { useEffect, useMemo, useState } from "react";
import { AddScheduleForm } from "./components/AddScheduleForm";
import { ExportButtons } from "./components/ExportButtons";
import { Filters } from "./components/Filters";
import { Header } from "./components/Header";
import { ImportTextPanel } from "./components/ImportTextPanel";
import { MonthCalendar } from "./components/MonthCalendar";
import { ScheduleList } from "./components/ScheduleList";
import { schedules as baseSchedules } from "./data/schedules";
import { makeMonthDays, toDateKey } from "./lib/calendar";
import { loadLocalSchedules, saveLocalSchedules } from "./lib/storage";
import type { ScheduleCategory, ScheduleItem } from "./types";

function App() {
  const [selectedDate, setSelectedDate] = useState("2026-05-01");
  const [view, setView] = useState<"day" | "all">("day");
  const [category, setCategory] = useState<"전체" | ScheduleCategory>("전체");
  const [search, setSearch] = useState("");
  const [localSchedules, setLocalSchedules] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    setLocalSchedules(loadLocalSchedules());
  }, []);

  const allSchedules = useMemo(
    () => [...baseSchedules, ...localSchedules].sort((a, b) => a.date.localeCompare(b.date)),
    [localSchedules],
  );

  const filteredSchedules = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return allSchedules.filter((item) => {
      const categoryMatch = category === "전체" || item.category === category;
      const haystack = [item.title, item.memo, item.category, item.url, item.members?.join(" ")]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return categoryMatch && (!keyword || haystack.includes(keyword));
    });
  }, [allSchedules, category, search]);

  const visibleSchedules =
    view === "day" ? filteredSchedules.filter((item) => item.date === selectedDate) : filteredSchedules;

  const monthDays = useMemo(() => makeMonthDays(2026, 5, allSchedules), [allSchedules]);
  const today = toDateKey(new Date());

  const updateLocalSchedules = (items: ScheduleItem[]) => {
    setLocalSchedules(items);
    saveLocalSchedules(items);
  };

  const addLocalSchedule = (item: ScheduleItem) => {
    updateLocalSchedules([...localSchedules, item]);
    setSelectedDate(item.date);
    setView("day");
  };

  const importLocalSchedules = (items: ScheduleItem[]) => {
    updateLocalSchedules([...localSchedules, ...items]);
  };

  const deleteLocalSchedule = (id: string) => {
    updateLocalSchedules(localSchedules.filter((item) => item.id !== id));
  };

  return (
    <main className="app-shell">
      <Header />
      <div className="toolbar">
        <div className="month-switcher" aria-label="Month selector">
          <button type="button" disabled>
            2026.05
          </button>
        </div>
        <div className="view-tabs">
          <button type="button" className={view === "day" ? "active" : ""} onClick={() => setView("day")}>
            선택 날짜
          </button>
          <button type="button" className={view === "all" ? "active" : ""} onClick={() => setView("all")}>
            전체 일정
          </button>
        </div>
      </div>
      <div className="main-layout">
        <div className="left-stack">
          <MonthCalendar days={monthDays} selectedDate={selectedDate} today={today} onSelectDate={setSelectedDate} />
          <Filters category={category} search={search} onCategoryChange={setCategory} onSearchChange={setSearch} />
          <ExportButtons items={allSchedules} />
        </div>
        <div className="right-stack">
          <ScheduleList
            title={view === "day" ? "선택 날짜 일정" : "전체 일정 리스트"}
            date={view === "day" ? selectedDate : undefined}
            items={visibleSchedules}
            onDeleteLocal={deleteLocalSchedule}
          />
          <AddScheduleForm selectedDate={selectedDate} onAdd={addLocalSchedule} />
          <ImportTextPanel onImport={importLocalSchedules} />
        </div>
      </div>
    </main>
  );
}

export default App;
