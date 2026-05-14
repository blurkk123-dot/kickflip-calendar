import { downloadCsv, downloadJson } from "../lib/importExport";
import type { ScheduleItem } from "../types";

type Props = {
  items: ScheduleItem[];
};

export function ExportButtons({ items }: Props) {
  return (
    <section className="panel export-panel">
      <div className="section-heading">
        <h2>내보내기</h2>
      </div>
      <div className="inline-actions">
        <button type="button" onClick={() => downloadJson(items)}>
          JSON 다운로드
        </button>
        <button type="button" onClick={() => downloadCsv(items)}>
          CSV 다운로드
        </button>
      </div>
    </section>
  );
}
