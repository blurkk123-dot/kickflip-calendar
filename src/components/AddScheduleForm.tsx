import { FormEvent, useState } from "react";
import { categories, type ScheduleCategory, type ScheduleItem } from "../types";
import { inferMembers } from "../lib/importExport";

type Props = {
  selectedDate: string;
  onAdd: (item: ScheduleItem) => void;
};

export function AddScheduleForm({ selectedDate, onAdd }: Props) {
  const [date, setDate] = useState(selectedDate);
  const [category, setCategory] = useState<ScheduleCategory>("기타");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [memo, setMemo] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!date || !title.trim()) return;
    onAdd({
      id: `local-${Date.now()}`,
      date,
      category,
      title: title.trim(),
      members: inferMembers(title),
      url: url.trim() || undefined,
      memo: memo.trim() || undefined,
      isLocal: true,
    });
    setTitle("");
    setUrl("");
    setMemo("");
  };

  return (
    <section className="panel form-panel">
      <div className="section-heading">
        <h2>일정 추가</h2>
      </div>
      <form onSubmit={submit} className="form-grid">
        <label className="field">
          <span>날짜</span>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </label>
        <label className="field">
          <span>카테고리</span>
          <select value={category} onChange={(event) => setCategory(event.target.value as ScheduleCategory)}>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="field wide">
          <span>제목</span>
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="[멤버] 일정 제목" />
        </label>
        <label className="field wide">
          <span>URL</span>
          <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://" />
        </label>
        <label className="field wide">
          <span>메모</span>
          <textarea value={memo} onChange={(event) => setMemo(event.target.value)} rows={3} />
        </label>
        <button className="primary wide" type="submit">
          일정 추가
        </button>
      </form>
    </section>
  );
}
