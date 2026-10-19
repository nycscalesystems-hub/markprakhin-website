"use client";

import { useRef } from "react";
import { identity } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import { useInView } from "@/lib/useInView";

const W = "max-w-[1160px] mx-auto px-6 md:px-10 lg:px-14";
const SEC = "py-20 md:py-28 lg:py-32";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const vis = useInView(ref, { threshold: 0.1 });

  const facts = [
    { k: "Location",  v: "New York City" },
    { k: "School",    v: "Staten Island Technical High School" },
    { k: "Year",      v: identity.classYear },
    { k: "Athletics", v: "Varsity Tennis · Varsity Swimming" },
    { k: "Languages", v: "English · Russian" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className={SEC}
      aria-label="About"
      style={{
        opacity:    vis ? 1 : 0,
        transform:  vis ? "none" : "translateY(30px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <div className={W}>
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div>
            <SectionHeading num="02" eyebrow="About" heading="Who I am." />
            <ul className="space-y-5">
              {facts.map(({ k, v }) => (
                <li key={k}>
                  <span className="block font-sans text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--gold)" }}>{k}</span>
                  <span className="block font-sans text-sm leading-snug" style={{ color: "var(--fg2)" }}>{v}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div>
            <div className="space-y-5">
              {identity.aboutParagraphs.map((para, i) => (
                <p
                  key={i}
                  className="font-sans leading-relaxed"
                  style={{ fontSize: i === 0 ? "1.05rem" : "0.95rem", color: i === 0 ? "var(--fg)" : "var(--fg2)" }}
                >
                  {para}
                </p>
              ))}
            </div>

            <blockquote
              className="mt-10 pl-5 py-1"
              style={{ borderLeft: "2px solid var(--gold)" }}
            >
              <p
                className="font-serif italic leading-snug"
                style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", color: "var(--fg)", letterSpacing: "-0.01em" }}
              >
                "Learning the business of law — and building experience beyond the classroom."
              </p>
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  );
}
