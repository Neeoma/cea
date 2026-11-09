import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { GlowOrb } from "@/components/ui/primitives";

export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs = [],
  actions,
  meta,
  visual,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
  meta?: { label: string; value: string }[];
  visual?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_-10%,rgba(0,217,255,0.11),transparent_55%)]" />
        <div className="grid-bg absolute inset-0 opacity-[0.45] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <GlowOrb className="-right-32 -top-24 h-96 w-96" />
      </div>

      <div className="container-cea">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-cyan">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-muted/40" />
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-cyan">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-ink/70">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className={visual ? "grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]" : ""}>
          <div>
            <div className="mb-5 flex items-center gap-2.5">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan" />
              <span className="label-mono text-cyan/90">{eyebrow}</span>
            </div>
            <h1 className="display-lg max-w-3xl text-ink">{title}</h1>
            {lede && (
              <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                {lede}
              </p>
            )}

            {actions && <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}

            {meta && meta.length > 0 && (
              <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                      {m.label}
                    </dt>
                    <dd className="mt-1 font-display text-lg font-bold text-ink">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {visual && <div className="relative">{visual}</div>}
        </div>
      </div>
    </section>
  );
}
