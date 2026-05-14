import type { ScheduleItem } from "../types";

type Props = {
  item: ScheduleItem;
  onDeleteLocal?: (id: string) => void;
};

export function ScheduleCard({ item, onDeleteLocal }: Props) {
  const copyUrl = async () => {
    if (!item.url) return;
    await navigator.clipboard.writeText(item.url);
  };

  return (
    <article className="schedule-card">
      <div className="card-topline">
        <span className={`badge category-${item.category}`}>{item.category}</span>
        {item.isLocal && <span className="local-badge">local</span>}
      </div>
      <h3>{item.title}</h3>
      {item.members && item.members.length > 0 && (
        <div className="member-tags">
          {item.members.map((member) => (
            <span key={member}>{member}</span>
          ))}
        </div>
      )}
      {item.memo && <p className="memo">{item.memo}</p>}
      <div className="card-actions">
        {item.url && (
          <>
            <a className="open-link" href={item.url} target="_blank" rel="noreferrer">
              열기
            </a>
            <button type="button" onClick={copyUrl}>
              URL 복사
            </button>
          </>
        )}
        {item.isLocal && onDeleteLocal && (
          <button type="button" className="danger" onClick={() => onDeleteLocal(item.id)}>
            삭제
          </button>
        )}
      </div>
    </article>
  );
}
