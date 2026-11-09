import Link from "next/link";

/**
 * CEA mark — a hexagonal shield whose interior carries a rising signal trace.
 * Drawn in SVG so it stays crisp at every size and inherits currentColor.
 */
export function CeaMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="cea-mark-g" x1="6" y1="4" x2="44" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00D9FF" />
          <stop offset="0.55" stopColor="#39FF88" />
          <stop offset="1" stopColor="#885CFF" />
        </linearGradient>
      </defs>
      <path
        d="M24 3.2 41.6 13v20.4L24 43.2 6.4 33.4V13L24 3.2Z"
        stroke="url(#cea-mark-g)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M24 9.6 35.8 16v14.4L24 36.8 12.2 30.4V16L24 9.6Z"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M15 27.5 19 23l3.6 3.2L24.5 20l3.4 6.2 2.6-3.1 2.5 4.4"
        stroke="url(#cea-mark-g)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="12.6" stroke="#00D9FF" strokeOpacity="0.12" strokeWidth="0.8" />
    </svg>
  );
}

export function CeaLogo({
  href = "/",
  compact = false,
}: {
  href?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label="Cyber Elias Academy — home"
      className="group flex items-center gap-3 focus-visible:outline-offset-8"
    >
      <span className="relative">
        <CeaMark className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[8deg]" />
        <span className="pointer-events-none absolute inset-0 rounded-full bg-cyan/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.95rem] font-bold tracking-[-0.02em] text-ink">
            CYBER ELIAS
            <span className="text-cyan">.</span>
          </span>
          <span className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-muted">
            Academy · cea.ng
          </span>
        </span>
      )}
    </Link>
  );
}
