"use client";

import { useRef } from "react";
import { skills } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import { useInView } from "@/lib/useInView";

const W   = "max-w-[1160px] mx-auto px-6 md:px-10 lg:px-14";
const SEC = "py-20 md:py-28 lg:py-32";

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const vis = useInView(ref, { threshold: 0.1 });

  return (
    <section
      id="skills"
      ref={ref}
      className={SEC}
      aria-label="Skills"
      style={{
        opacity:    vis ? 1 : 0,
        transform:  vis ? "none" : "translateY(30px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <div className={W}>
        <SectionHeading
          num="04"
          eyebrow="Skills & Areas of Work"
          heading="What I bring."
          sub="Capabilities developed through real professional work in legal and business environments."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {skills.map((cat, i) => (
            <div
              key={cat.category}
              style={{
                opacity:    vis ? 1 : 0,
                transform:  vis ? "none" : "translateY(16px)",
                transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`,
              }}
            >
              <div className="flex items-center gap-2.5 pb-3 mb-4" style={{ borderBottom: "1px solid var(--rule)" }}>
                <span className="w-0.5 h-[14px] rounded-sm flex-shrink-0" style={{ backgroundColor: "var(--gold)" }} aria-hidden />
                <h3 className="font-sans text-[11px] tracking-[0.16em] uppercase font-medium" style={{ color: "var(--fg)" }}>
                  {cat.category}
                </h3>
              </div>
              <ul className="space-y-2">
                {cat.skills.map(s => (
                  <li key={s} className="font-sans text-sm flex items-center gap-2.5" style={{ color: "var(--fg2)" }}>
                    <span className="w-[4px] h-[4px] rounded-full flex-shrink-0" style={{ backgroundColor: "var(--gold)", opacity: 0.55 }} aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
