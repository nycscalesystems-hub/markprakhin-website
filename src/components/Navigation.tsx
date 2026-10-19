"use client";

import { useState, useEffect } from "react";
import { navLinks, identity } from "@/data/profile";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const ids = navLinks.map(l => l.href.slice(1));
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-35% 0px -55% 0px" }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const goto = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-400"
      style={{
        backgroundColor: scrolled ? "rgba(247,244,239,0.95)" : "transparent",
        backdropFilter:   scrolled ? "blur(16px)" : "none",
        borderBottom:     scrolled ? "1px solid var(--rule)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1160px] mx-auto px-6 md:px-10 lg:px-14 h-16 flex items-center justify-between">

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-serif text-xl tracking-[0.14em] transition-colors duration-300"
          style={{ color: "var(--fg)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--fg)")}
        >
          MP
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const id = href.slice(1);
            const on = active === id;
            return (
              <button
                key={href}
                onClick={() => goto(href)}
                className="relative font-sans text-[12px] tracking-[0.1em] uppercase transition-colors duration-300"
                style={{ color: on ? "var(--gold)" : "var(--fg2)" }}
              >
                {label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-300"
                  style={{ backgroundColor: "var(--gold)", transform: on ? "scaleX(1)" : "scaleX(0)" }}
                />
              </button>
            );
          })}
        </nav>

        <a
          href="#contact"
          onClick={e => { e.preventDefault(); goto("#contact"); }}
          className="hidden md:inline-flex items-center font-sans text-[12px] tracking-[0.1em] uppercase px-5 py-2 border transition-all duration-300"
          style={{ borderColor: "var(--fg)", color: "var(--fg)" }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.backgroundColor = "var(--fg)";
            el.style.color = "var(--ivory)";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.backgroundColor = "transparent";
            el.style.color = "var(--fg)";
          }}
        >
          Contact
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="block h-px w-6 bg-current transition-all duration-300 origin-center" style={{ color: "var(--fg)", transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span className="block h-px w-6 bg-current transition-opacity duration-300" style={{ color: "var(--fg)", opacity: open ? 0 : 1 }} />
          <span className="block h-px w-4 bg-current transition-all duration-300 origin-center" style={{ color: "var(--fg)", transform: open ? "translateX(-4px) translateY(-7px) rotate(-45deg)" : "none", width: open ? "24px" : "16px" }} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="md:hidden transition-all duration-400 overflow-hidden"
        style={{
          maxHeight: open ? "320px" : "0",
          backgroundColor: "rgba(247,244,239,0.97)",
          backdropFilter: "blur(16px)",
          borderBottom: open ? "1px solid var(--rule)" : "none",
        }}
      >
        <nav className="max-w-[1160px] mx-auto px-6 flex flex-col gap-5 py-7">
          {navLinks.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => goto(href)}
              className="font-sans text-sm tracking-[0.1em] uppercase text-left transition-colors duration-300"
              style={{ color: "var(--fg2)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--fg2)")}
            >
              {label}
            </button>
          ))}
          <a
            href={`mailto:${identity.contactEmail}`}
            className="font-sans text-sm"
            style={{ color: "var(--gold)" }}
          >
            {identity.contactEmail}
          </a>
        </nav>
      </div>
    </header>
  );
}
