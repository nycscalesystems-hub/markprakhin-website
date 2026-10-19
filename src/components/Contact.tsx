"use client";

import { useRef, useActionState } from "react";
import { submitContact, ContactState } from "@/app/actions/contact";
import { identity } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import { useInView } from "@/lib/useInView";

const W   = "max-w-[1160px] mx-auto px-6 md:px-10 lg:px-14";
const SEC = "py-20 md:py-28 lg:py-32";

const initial: ContactState = { success: false, error: null };

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const vis = useInView(ref, { threshold: 0.08 });
  const [state, act, pending] = useActionState(submitContact, initial);

  return (
    <section
      id="contact"
      ref={ref}
      style={{ backgroundColor: "var(--dark2)", color: "var(--dark-fg)" }}
      aria-label="Contact"
    >
      <div
        className={`${W} ${SEC}`}
        style={{
          opacity:    vis ? 1 : 0,
          transform:  vis ? "none" : "translateY(30px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">

          {/* Left */}
          <div>
            <SectionHeading
              num="08"
              eyebrow="Contact"
              heading="Let's connect."
              sub="Open to conversations about law, business, internships, and professional opportunities."
              light
            />

            <div className="space-y-6">
              <div>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "var(--gold)" }}>Email</p>
                <a
                  href={`mailto:${identity.contactEmail}`}
                  className="font-sans text-sm transition-colors duration-300"
                  style={{ color: "var(--dark-fg2)" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--dark-fg2)")}
                >
                  {identity.contactEmail}
                </a>
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "var(--gold)" }}>Location</p>
                <p className="font-sans text-sm" style={{ color: "var(--dark-fg2)" }}>{identity.location}</p>
              </div>
            </div>

            <div
              className="mt-10 p-6"
              style={{ border: "1px solid var(--dark-rule)", backgroundColor: "rgba(255,255,255,0.025)" }}
            >
              <p
                className="font-serif italic leading-snug"
                style={{ fontSize: "1.1rem", color: "rgba(237,233,227,0.4)" }}
              >
                "The best way to learn law and business is to be around the people who practise both."
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {state.success ? (
              <div className="flex flex-col gap-5 py-10" role="alert" aria-live="polite">
                <div className="w-10 h-px" style={{ backgroundColor: "var(--gold)" }} aria-hidden />
                <h3 className="font-serif font-light" style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", color: "var(--dark-fg)" }}>
                  Message sent.
                </h3>
                <p className="font-sans text-sm" style={{ color: "var(--dark-fg2)" }}>
                  Thank you for reaching out — I'll be in touch shortly.
                </p>
              </div>
            ) : (
              <form action={act} noValidate className="space-y-5">
                {/* Honeypot */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute opacity-0 pointer-events-none w-0 h-0" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Name"  name="name"  type="text"  required placeholder="Your name" />
                  <Field label="Email" name="email" type="email" required placeholder="you@email.com" />
                </div>
                <Field label="Subject" name="subject" type="text" placeholder="Internship inquiry, mentorship, etc." />
                <Textarea label="Message" name="message" required placeholder="What would you like to discuss?" />

                {state.error && (
                  <p className="font-sans text-sm" style={{ color: "#f87171" }} role="alert">{state.error}</p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="group inline-flex items-center gap-3 px-8 py-3 font-sans text-sm tracking-wide transition-all duration-300 disabled:opacity-50"
                  style={{ backgroundColor: "var(--gold)", color: "var(--dark)" }}
                  onMouseEnter={e => { if (!pending) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--gold-hi)"; }}
                  onMouseLeave={e => { if (!pending) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--gold)"; }}
                >
                  {pending ? "Sending…" : <>Send Message <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></>}
                </button>

                <p className="font-sans text-[11px]" style={{ color: "rgba(237,233,227,0.22)" }}>
                  Your message goes directly to Mark. No third-party data sharing.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Field helpers ─────────────────────────────────────────── */
function Field({ label, name, type, required, placeholder }: { label: string; name: string; type: string; required?: boolean; placeholder?: string }) {
  const bd = "rgba(237,233,227,0.10)";
  const bdf = "var(--gold)";
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="font-sans text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--gold)" }}>
        {label}{required && <span style={{ color: "rgba(184,150,90,0.5)", marginLeft: 2 }}>*</span>}
      </label>
      <input
        id={name} name={name} type={type} required={required} placeholder={placeholder}
        className="font-sans text-sm px-4 py-3 outline-none transition-colors duration-300"
        style={{ backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${bd}`, color: "var(--dark-fg)" }}
        onFocus={e => ((e.currentTarget as HTMLInputElement).style.borderColor = bdf)}
        onBlur={e  => ((e.currentTarget as HTMLInputElement).style.borderColor = bd)}
      />
    </div>
  );
}

function Textarea({ label, name, required, placeholder }: { label: string; name: string; required?: boolean; placeholder?: string }) {
  const bd = "rgba(237,233,227,0.10)";
  const bdf = "var(--gold)";
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="font-sans text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--gold)" }}>
        {label}{required && <span style={{ color: "rgba(184,150,90,0.5)", marginLeft: 2 }}>*</span>}
      </label>
      <textarea
        id={name} name={name} required={required} placeholder={placeholder} rows={5}
        className="font-sans text-sm px-4 py-3 outline-none transition-colors duration-300 resize-none"
        style={{ backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${bd}`, color: "var(--dark-fg)" }}
        onFocus={e => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = bdf)}
        onBlur={e  => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = bd)}
      />
    </div>
  );
}
