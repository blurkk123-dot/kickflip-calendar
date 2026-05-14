import { useState } from "react";
import { parseImportText } from "../lib/importExport";
import type { ScheduleItem } from "../types";

type Props = {
  onImport: (items: ScheduleItem[]) => void;
};

export function ImportTextPanel({ onImport }: Props) {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const runImport = () => {
    const result = parseImportText(text);
    if (result.imported.length > 0) {
      onImport(result.imported);
      setText("");
    }
    setMessage(`${result.imported.length}개 성공, ${result.failed}개 실패`);
  };

  return (
    <section className="panel import-panel">
      <div className="section-heading">
        <h2>텍스트로 일정 가져오기</h2>
      </div>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={5}
        placeholder="2026-05-01 | 유튜브 | [계훈] MC 컷 모음 | https://youtu.be/M9xPQ8DX-C8"
      />
      <div className="inline-actions">
        <button type="button" className="primary" onClick={runImport}>
          가져오기
        </button>
        {message && <span className="result-message">{message}</span>}
      </div>
    </section>
  );
}
