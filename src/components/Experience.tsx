"use client";

import { useRef } from "react";
import { experience } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import { useInView } from "@/lib/useInView";

const W   = "max-w-[1160px] mx-auto px-6 md:px-10 lg:px-14";
const SEC = "py-20 md:py-28 lg:py-32";

function Card({ exp, delay }: { exp: (typeof experience)[number]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const vis = useInView(ref, { threshold: 0.08 });

  // Filter out comment-only placeholder bullets (start with "// ")
  const bullets = exp.bullets.filter(b => !b.startsWith("//") && !b.startsWith("TODO"));

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12 py-12 md:py-14"
      style={{
        borderTop:  "1px solid var(--dark-rule)",
        opacity:    vis ? 1 : 0,
        transform:  vis ? "none" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {/* Meta column */}
      <div>
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "var(--gold)" }}>
          {exp.period}
        </p>
        <p className="font-sans text-xs mb-5" style={{ color: "var(--dark-fg2)" }}>
          {exp.location}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map(tag => (
            <span
              key={tag}
              className="font-sans text-[10px] px-2.5 py-1 tracking-wide"
              style={{
                backgroundColor: "rgba(184,150,90,0.09)",
                color: "var(--gold)",
                border: "1px solid rgba(184,150,90,0.2)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Body column */}
      <div>
        <h3
          className="font-serif font-medium leading-tight mb-1"
          style={{
            fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
            letterSpacing: "-0.015em",
            color: "var(--dark-fg)",
          }}
        >
          {exp.title}
        </h3>

        {exp.organizationApproved && (
          <div className="flex items-center gap-3 mb-6">
            <p className="font-sans text-sm" style={{ color: "rgba(184,150,90,0.65)" }}>
              {exp.organization}
            </p>
            {exp.websiteUrl && (
              <>
                <span style={{ color: "var(--dark-rule)" }}>·</span>
                <a
                  href={exp.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[11px] tracking-wide transition-colors duration-300"
                  style={{ color: "rgba(184,150,90,0.5)" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(184,150,90,0.5)")}
                >
                  {exp.websiteUrl.replace("https://", "")} ↗
                </a>
              </>
            )}
          </div>
        )}

        <ul className="space-y-3 mb-0">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-[8px] flex-shrink-0 w-[5px] h-[5px] rounded-full"
                style={{ backgroundColor: "var(--gold)", opacity: 0.6 }}
                aria-hidden
              />
              <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--dark-fg2)" }}>
                {b}
              </p>
            </li>
          ))}
        </ul>

        {/* Metrics row — only rendered when verified figures exist */}
        {exp.metrics && exp.metrics.length > 0 && (
          <div
            className="mt-8 grid grid-cols-3 gap-px"
            style={{ backgroundColor: "rgba(184,150,90,0.12)" }}
            aria-label="Business metrics"
          >
            {exp.metrics.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center py-5 px-4 text-center"
                style={{ backgroundColor: "var(--dark)" }}
              >
                <span
                  className="font-serif font-light leading-none mb-1"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2rem)", color: "var(--gold)", letterSpacing: "-0.02em" }}
                >
                  {value}
                </span>
                <span
                  className="font-sans text-[10px] tracking-[0.14em] uppercase"
                  style={{ color: "var(--dark-fg2)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const vis = useInView(ref, { threshold: 0.05 });
  const verified = experience.filter(e => e.status === "verified");

  return (
    <section
      id="experience"
      ref={ref}
      style={{ backgroundColor: "var(--dark)", color: "var(--dark-fg)" }}
      aria-label="Professional Experience"
    >
      <div
        className={`${W} ${SEC}`}
        style={{
          opacity:    vis ? 1 : 0,
          transform:  vis ? "none" : "translateY(30px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <SectionHeading
          num="03"
          eyebrow="Professional Experience"
          heading="Where I've worked."
          sub="Hands-on work in legal office operations, digital marketing, and entrepreneurship."
          light
        />

        {verified.map((exp, i) => (
          <Card key={exp.id} exp={exp} delay={i * 120} />
        ))}

        {/* Medical office pending */}
        <div className="py-8" style={{ borderTop: "1px solid var(--dark-rule)" }}>
          <p className="font-sans text-xs italic" style={{ color: "rgba(237,233,227,0.2)" }}>
            Additional professional experience — details to be confirmed and added.
          </p>
        </div>
      </div>
    </section>
  );
}
