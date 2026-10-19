"use client";

import { useRef } from "react";
import { leadership } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import { useInView } from "@/lib/useInView";

const W   = "max-w-[1160px] mx-auto px-6 md:px-10 lg:px-14";
const SEC = "py-20 md:py-28 lg:py-32";

export default function Leadership() {
  const ref = useRef<HTMLElement>(null);
  const vis = useInView(ref, { threshold: 0.08 });
  const verified = leadership.filter(l => l.status === "verified");

  return (
    <section
      id="leadership"
      ref={ref}
      className={SEC}
      style={{
        backgroundColor: "rgba(184,150,90,0.04)",
        borderTop:    "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
        opacity:    vis ? 1 : 0,
        transform:  vis ? "none" : "translateY(30px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
      aria-label="Leadership and Service"
    >
      <div className={W}>
        <SectionHeading
          num="05"
          eyebrow="Leadership & Service"
          heading="Beyond the office."
          sub="Civic programs, competitive athletics, and school involvement."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {verified.map((item, i) => (
            <div
              key={item.id}
              className="p-7 transition-colors duration-300"
              style={{
                backgroundColor: "var(--ivory)",
                border: "1px solid var(--rule)",
                opacity:    vis ? 1 : 0,
                transform:  vis ? "none" : "translateY(16px)",
                transition: `opacity 0.6s ease ${i * 70}ms, transform 0.6s ease ${i * 70}ms`,
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(184,150,90,0.5)")}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--rule)")}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="font-serif font-medium leading-snug mb-0.5" style={{ fontSize: "1.05rem", color: "var(--fg)" }}>
                    {item.title}
                  </h3>
                  <p className="font-sans text-[11px] tracking-[0.08em]" style={{ color: "var(--gold)" }}>
                    {item.organization}
                  </p>
                </div>
                <span className="font-sans text-[11px] flex-shrink-0 mt-0.5" style={{ color: "var(--fg3)" }}>
                  {item.period}
                </span>
              </div>
              <p className="font-sans text-sm leading-relaxed mt-3" style={{ color: "var(--fg2)" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
