interface Props {
  num: string;
  eyebrow: string;
  heading: string;
  sub?: string;
  light?: boolean;
}

export default function SectionHeading({ num, eyebrow, heading, sub, light = false }: Props) {
  const headFg = light ? "var(--dark-fg)"  : "var(--fg)";
  const subFg  = light ? "var(--dark-fg2)" : "var(--fg2)";

  return (
    <div className="mb-12 md:mb-16">
      {/* Eyebrow row */}
      <div className="flex items-center gap-4 mb-5">
        <span
          className="font-serif text-sm"
          style={{ color: "var(--gold)", opacity: 0.6 }}
        >
          {num}
        </span>
        <div className="h-px flex-1" style={{ backgroundColor: light ? "var(--dark-rule)" : "var(--rule)" }} />
        <span
          className="font-sans text-[10px] tracking-[0.22em] uppercase"
          style={{ color: "var(--gold)" }}
        >
          {eyebrow}
        </span>
      </div>

      {/* Heading */}
      <h2
        className="font-serif font-light"
        style={{
          fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          color: headFg,
        }}
      >
        {heading}
      </h2>

      {sub && (
        <p
          className="mt-4 font-sans text-base leading-relaxed max-w-xl"
          style={{ color: subFg }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
