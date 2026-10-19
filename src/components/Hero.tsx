"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>("[data-fade]");
    els.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(22px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.85s ease, transform 0.85s ease";
        el.style.opacity = "1";
        el.style.transform = "none";
      }, 100 + i * 160);
    });
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative min-h-screen flex flex-col"
      aria-label="Introduction"
    >
      {/* Warm glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute"
          style={{
            top: "-15%", right: "-5%",
            width: "55%", height: "65%",
            background: "radial-gradient(ellipse at center, rgba(184,150,90,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 flex items-center w-full">
        <div className="w-full max-w-[1160px] mx-auto px-6 md:px-10 lg:px-14 pt-28 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-16 items-end">

            {/* Text */}
            <div>
              {/* Name — prominent */}
              <p
                data-fade
                className="font-sans text-[11px] tracking-[0.28em] uppercase mb-5"
                style={{ color: "var(--gold)" }}
              >
                New York · Law &amp; Business
              </p>

              <h1
                data-fade
                className="font-serif font-light mb-3"
                style={{
                  fontSize: "clamp(3.2rem, 7.5vw, 6.8rem)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.025em",
                  color: "var(--fg)",
                }}
              >
                Mark Prakhin.
              </h1>

              <div
                data-fade
                className="flex items-center gap-3 mb-10"
              >
                <div className="h-px w-12" style={{ backgroundColor: "var(--gold)", opacity: 0.5 }} aria-hidden />
                <p
                  className="font-sans text-[13px] md:text-sm tracking-wide"
                  style={{ color: "var(--fg2)" }}
                >
                  Legal &amp; Marketing Operations · Law Office of Yuriy Prakhin, P.C.
                </p>
              </div>

              <p
                data-fade
                className="font-sans text-[15px] md:text-base leading-relaxed mb-10 max-w-[500px]"
                style={{ color: "var(--fg2)" }}
              >
                Student at Staten Island Technical High School working in a litigation law firm since 2024 — shadowing attorneys, supporting case work, and building real legal experience. Co-founder of NYC Scale Services.
              </p>

              <div data-fade className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo("experience")}
                  className="group inline-flex items-center gap-3 px-7 py-3 font-sans text-[13px] tracking-wide transition-all duration-300"
                  style={{ backgroundColor: "var(--fg)", color: "var(--ivory)" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--gold)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--fg)")}
                >
                  View Experience
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center gap-3 px-7 py-3 font-sans text-[13px] tracking-wide border transition-all duration-300"
                  style={{ borderColor: "var(--rule)", color: "var(--fg2)" }}
                  onMouseEnter={e => {
                    const b = e.currentTarget as HTMLButtonElement;
                    b.style.borderColor = "var(--gold)"; b.style.color = "var(--gold)";
                  }}
                  onMouseLeave={e => {
                    const b = e.currentTarget as HTMLButtonElement;
                    b.style.borderColor = "var(--rule)"; b.style.color = "var(--fg2)";
                  }}
                >
                  Get in Touch
                </button>
              </div>
            </div>

            {/* Portrait */}
            <div data-fade className="hidden lg:block self-end">
              <div
                className="relative overflow-hidden"
                style={{
                  width: "100%", aspectRatio: "3/4",
                  border: "1px solid rgba(184,150,90,0.2)",
                }}
              >
                <span className="absolute top-3 left-3 w-6 h-6 border-t border-l z-10" style={{ borderColor: "rgba(184,150,90,0.4)" }} />
                <span className="absolute bottom-3 right-3 w-6 h-6 border-b border-r z-10" style={{ borderColor: "rgba(184,150,90,0.4)" }} />
                <Image
                  src="/mark-portrait.png"
                  alt="Mark Prakhin"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="w-full" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="max-w-[1160px] mx-auto px-6 md:px-10 lg:px-14 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6 md:gap-8">
            {["Law & Business", "New York City", "Class of 2028"].map(tag => (
              <span key={tag} className="font-sans text-[10px] tracking-[0.14em] uppercase hidden sm:block" style={{ color: "var(--fg3)" }}>
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => scrollTo("about")}
            className="group flex flex-col items-center gap-1.5"
            aria-label="Scroll down"
          >
            <span className="font-sans text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--fg3)" }}>Scroll</span>
            <span className="block w-px h-7 transition-all duration-500 group-hover:h-10" style={{ backgroundColor: "var(--gold)", opacity: 0.4 }} />
          </button>
        </div>
      </div>
    </section>
  );
}
