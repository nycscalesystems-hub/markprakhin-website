"use client";

import { useRef } from "react";
import { identity, interests } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import { useInView } from "@/lib/useInView";

const W   = "max-w-[1160px] mx-auto px-6 md:px-10 lg:px-14";
const SEC = "py-20 md:py-28 lg:py-32";

const schoolItems = [
  "Competitive technical and academic curriculum",
  "Varsity Tennis Team",
  "Varsity Swim Team",
  "Jewish Student Union",
  "DECA — business & entrepreneurship (past participation)",
];

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const vis = useInView(ref, { threshold: 0.1 });

  return (
    <section
      id="education"
      ref={ref}
      className={SEC}
      aria-label="Education and Direction"
      style={{
        opacity:    vis ? 1 : 0,
        transform:  vis ? "none" : "translateY(30px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <div className={W}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

          {/* Education */}
          <div>
            <SectionHeading num="06" eyebrow="Education" heading="Where I study." />
            <div className="p-8" style={{ border: "1px solid var(--rule)", backgroundColor: "rgba(255,255,255,0.6)" }}>
              <div className="w-8 h-px mb-6" style={{ backgroundColor: "var(--gold)" }} aria-hidden />
              <h3
                className="font-serif font-medium leading-tight mb-1"
                style={{ fontSize: "1.25rem", letterSpacing: "-0.01em", color: "var(--fg)" }}
              >
                {identity.school}
              </h3>
              <p className="font-sans text-sm mb-7" style={{ color: "var(--gold)" }}>
                {identity.classYear}
              </p>
              <ul className="space-y-2.5">
                {schoolItems.map(item => (
                  <li key={item} className="flex items-start gap-3 font-sans text-sm" style={{ color: "var(--fg2)" }}>
                    <span className="mt-[9px] w-[4px] h-[4px] rounded-full flex-shrink-0" style={{ backgroundColor: "var(--gold)", opacity: 0.55 }} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interests */}
          <div>
            <SectionHeading num="07" eyebrow="Interests & Direction" heading={interests.headline} />
            <p className="font-sans text-[15px] leading-relaxed mb-8" style={{ color: "var(--fg2)" }}>
              {interests.body}
            </p>
            <div className="flex flex-wrap gap-2">
              {interests.areas.map(area => (
                <span
                  key={area}
                  className="font-sans text-sm px-4 py-2 cursor-default transition-all duration-300"
                  style={{ border: "1px solid var(--rule)", color: "var(--fg2)" }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLSpanElement;
                    el.style.borderColor = "var(--gold)";
                    el.style.color = "var(--gold)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLSpanElement;
                    el.style.borderColor = "var(--rule)";
                    el.style.color = "var(--fg2)";
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
