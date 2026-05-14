import { formatKoreanDate } from "../lib/calendar";
import type { ScheduleItem } from "../types";
import { ScheduleCard } from "./ScheduleCard";

type Props = {
  title: string;
  date?: string;
  items: ScheduleItem[];
  onDeleteLocal: (id: string) => void;
};

export function ScheduleList({ title, date, items, onDeleteLocal }: Props) {
  const isSelectedDateList = Boolean(date);

  return (
    <section className={`panel schedule-list ${isSelectedDateList ? "selected-date-list" : ""}`}>
      <div className="section-heading">
        <h2>{title}</h2>
        {date && <span>{formatKoreanDate(date)}</span>}
      </div>
      {items.length === 0 ? (
        <div className="empty-state">등록된 일정이 없어요</div>
      ) : (
        <div className="cards schedule-list-scroll" tabIndex={isSelectedDateList ? 0 : undefined}>
          {items.map((item) => (
            <ScheduleCard key={item.id} item={item} onDeleteLocal={onDeleteLocal} />
          ))}
        </div>
      )}
    </section>
  );
}
