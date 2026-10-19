"use client";

import { useState, useEffect } from "react";
import { identity, navLinks } from "@/data/profile";

const W = "max-w-[1160px] mx-auto px-6 md:px-10 lg:px-14";

export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const goto = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ borderTop: "1px solid var(--rule)" }} aria-label="Footer">
      <div className={`${W} py-9`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-serif text-xl tracking-[0.14em] transition-colors duration-300 block mb-1"
              style={{ color: "var(--fg)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--fg)")}
            >
              MP
            </button>
            <p className="font-sans text-xs" style={{ color: "var(--fg3)" }}>
              {identity.name} · {identity.location}
            </p>
          </div>

          <nav className="hidden md:flex items-center gap-6" aria-label="Footer navigation">
            {navLinks.map(({ href, label }) => (
              <button
                key={href}
                onClick={() => goto(href)}
                className="font-sans text-[11px] tracking-[0.1em] uppercase transition-colors duration-300"
                style={{ color: "var(--fg3)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--fg3)")}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col items-start sm:items-end gap-1">
            <a
              href={`mailto:${identity.contactEmail}`}
              className="font-sans text-xs transition-colors duration-300"
              style={{ color: "var(--fg3)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--fg3)")}
            >
              {identity.contactEmail}
            </a>
            <p className="font-sans text-[11px]" style={{ color: "var(--fg3)", opacity: 0.45 }}>
              © {year} Mark Prakhin
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
