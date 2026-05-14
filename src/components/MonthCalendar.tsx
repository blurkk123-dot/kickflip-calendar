import type { CalendarDay } from "../lib/calendar";

type Props = {
  days: CalendarDay[];
  selectedDate: string;
  today: string;
  onSelectDate: (date: string) => void;
};

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function MonthCalendar({ days, selectedDate, today, onSelectDate }: Props) {
  return (
    <section className="panel calendar-panel">
      <div className="section-heading">
        <h2>2026년 5월</h2>
        <span>May</span>
      </div>
      <div className="calendar-grid weekdays">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="calendar-grid">
        {days.map((day) => (
          <button
            key={day.date}
            type="button"
            className={[
              "day-cell",
              !day.isCurrentMonth ? "muted" : "",
              day.date === selectedDate ? "selected" : "",
              day.date === today ? "today" : "",
              day.count > 0 ? "has-schedule" : "",
            ].join(" ")}
            onClick={() => onSelectDate(day.date)}
          >
            <span className="day-number">{day.dayNumber}</span>
            {day.count > 0 && <span className="count-badge">{day.count}</span>}
          </button>
        ))}
      </div>
    </section>
  );
}
