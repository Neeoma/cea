export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "cyan" | "green" | "violet" | "amber";
}) {
  const tones = {
    neutral: "border-white/10 bg-white/[0.03] text-muted",
    cyan: "border-cyan/30 bg-cyan/[0.07] text-cyan",
    green: "border-green/30 bg-green/[0.07] text-green",
    violet: "border-violet/30 bg-violet/[0.09] text-violet-300",
    amber: "border-amber-400/30 bg-amber-400/[0.08] text-amber-300",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function KeyValue({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.06] py-2 last:border-0">
      <span className="text-[0.75rem] text-muted">{k}</span>
      <span className="text-right font-mono text-[0.7rem] text-ink/85">{v}</span>
    </div>
  );
}
