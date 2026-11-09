import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";
import { PageHero } from "@/components/shell/page-hero";
import { Button, Pill, Section, SectionHeading } from "@/components/ui/primitives";
import { articles } from "@/data/content";

export const metadata: Metadata = {
  title: "Learning resources & articles",
  description:
    "Free guides from Cyber Elias Academy: starting a cybersecurity career in Nigeria, digital skills every student needs, ethical hacking explained, and protecting your online accounts.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={
          <>
            Free guides,
            <br />
            <span className="text-muted/60">written to be useful.</span>
          </>
        }
        lede="Practical articles on getting into technology, staying safe online and building skills that hold up. No lead magnets, no gated PDFs."
        crumbs={[{ label: "Resources" }]}
        meta={[
          { label: "Articles", value: String(articles.length) },
          { label: "Categories", value: String(categories.length) },
          { label: "Access", value: "Free" },
          { label: "Updated", value: "Ongoing" },
        ]}
      />

      <Section className="pb-24">
        <div className="mb-8 flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <Pill key={c} tone={c === "Security" ? "green" : c === "Careers" ? "violet" : "cyan"}>
              {c}
            </Pill>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <Link
              key={a.slug}
              href={`/resources/${a.slug}`}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
              className="group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/30 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between">
                <Pill tone={a.category === "Security" ? "green" : a.category === "Careers" ? "violet" : "cyan"}>
                  {a.category}
                </Pill>
                <span className="flex items-center gap-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted">
                  <Clock className="h-3 w-3" /> {a.readMinutes} min
                </span>
              </div>
              <h2 className="mt-4 font-display text-base font-bold leading-snug text-ink transition-colors group-hover:text-white">
                {a.title}
              </h2>
              <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-muted">{a.excerpt}</p>
              <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted">
                  {a.level} · {new Date(a.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                </span>
                <ArrowUpRight className="h-4 w-4 text-cyan/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-violet/[0.06] via-transparent to-cyan/[0.06] p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />
              <div>
                <h2 className="font-display text-lg font-bold text-ink">
                  Prefer to learn with instructor feedback?
                </h2>
                <p className="mt-1.5 max-w-lg text-[0.875rem] leading-relaxed text-muted">
                  Reading gets you oriented. The lab, the cohort and the debrief are what actually
                  build capability.
                </p>
              </div>
            </div>
            <Button href="/programmes" icon>
              Browse programmes
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
