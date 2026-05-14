import { quickLinks } from "../data/links";

export function QuickLinks() {
  return (
    <nav className="quick-links" aria-label="Quick Links">
      {quickLinks.map((link) => (
        <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
          {link.label}
        </a>
      ))}
    </nav>
  );
}
