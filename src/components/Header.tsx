import { QuickLinks } from "./QuickLinks";

export function Header() {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">KickFlip schedule notebook</p>
        <h1>KickFlip 2026 May Calendar</h1>
      </div>
      <QuickLinks />
    </header>
  );
}
