import { categories, type ScheduleCategory } from "../types";

type Props = {
  category: "전체" | ScheduleCategory;
  search: string;
  onCategoryChange: (category: "전체" | ScheduleCategory) => void;
  onSearchChange: (search: string) => void;
};

export function Filters({ category, search, onCategoryChange, onSearchChange }: Props) {
  return (
    <section className="panel filters">
      <div className="section-heading">
        <h2>필터</h2>
      </div>
      <div className="category-filter">
        {["전체", ...categories].map((item) => (
          <button
            key={item}
            type="button"
            className={category === item ? "active" : ""}
            onClick={() => onCategoryChange(item as "전체" | ScheduleCategory)}
          >
            {item}
          </button>
        ))}
      </div>
      <label className="field">
        <span>멤버/키워드 검색</span>
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="제목, 메모, 멤버, URL 검색"
        />
      </label>
    </section>
  );
}
