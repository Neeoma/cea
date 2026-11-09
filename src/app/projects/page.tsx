import type { Metadata } from "next";
import { LayoutGrid, Sparkles } from "lucide-react";
import { PageHero } from "@/components/shell/page-hero";
import { Button, Card, Pill, Section, SectionHeading } from "@/components/ui/primitives";
import { studentProjects } from "@/data/content";

export const metadata: Metadata = {
  title: "Student projects & capstones",
  description:
    "Capstone projects, lab reports and studio briefs produced by Cyber Elias Academy students across cybersecurity, software, data and design.",
  alternates: { canonical: "/projects" },
};

const accentText: Record<string, string> = {
  cyan: "text-cyan border-cyan/30 bg-cyan/[0.06]",
  green: "text-green border-green/30 bg-green/[0.06]",
  violet: "text-violet-300 border-violet/30 bg-violet/[0.08]",
};

export default function ProjectsPage() {
  const disciplines = Array.from(new Set(studentProjects.map((p) => p.discipline)));

  return (
    <>
      <PageHero
        eyebrow="Student work"
        title={
          <>
            The portfolio is
            <br />
            <span className="text-muted/60">the qualification.</span>
          </>
        }
        lede="What a graduate can show is worth more than what a graduate can recall. These are the categories of work produced at CEA — published with student consent."
        crumbs={[{ label: "Projects" }]}
        meta={[
          { label: "Disciplines", value: String(disciplines.length) },
          { label: "Formats", value: "6" },
          { label: "Consent", value: "Required" },
          { label: "Showcase", value: "Demo Day" },
        ]}
        actions={
          <>
            <Button href="/apply" icon>
              Build your own
            </Button>
            <Button href="/programmes" variant="secondary">
              See programmes
            </Button>
          </>
        }
      />

      <Section className="pb-20">
        <div className="mb-8 flex flex-wrap gap-1.5">
          {disciplines.map((d) => (
            <Pill key={d} tone="neutral">
              {d}
            </Pill>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {studentProjects.map((p, i) => (
            <Card
              key={p.title}
              as="article"
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
              className="flex flex-col"
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[0.52rem] uppercase tracking-[0.12em] ${accentText[p.accent]}`}
                >
                  {p.discipline}
                </span>
                <Pill className="!text-[0.48rem]">Template</Pill>
              </div>
              <h2 className="mt-4 font-display text-base font-bold leading-snug text-ink">
                {p.title}
              </h2>
              <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-muted">{p.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded bg-white/[0.04] px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-3 border-t border-white/[0.06] pt-3 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-muted/70">
                {p.student}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <div className="border-y border-white/[0.06] bg-deep/25 py-16">
        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-green" />
                <p className="label-mono text-green">How projects are assessed</p>
              </div>
              <h2 className="display-md mt-4 text-ink">Reviewed, not just submitted</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                Every capstone is defended in front of an instructor. The questions are the ones a
                colleague would ask: why this approach, what breaks it, what would you change with
                another week.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Pill tone="cyan">Working demo</Pill>
                <Pill tone="green">Written report</Pill>
                <Pill tone="violet">Oral defence</Pill>
              </div>
            </div>
            <div className="space-y-3">
              {[
                {
                  t: "Consent first",
                  b: "No student name, photograph or project is published without written permission. Most entries here are anonymised categories until consent is collected.",
                },
                {
                  t: "Real briefs where possible",
                  b: "Several studio and capstone briefs come from actual local businesses and organisations, with their agreement.",
                },
                {
                  t: "Demonstrated at Demo Day",
                  b: "Graduating cohorts present to peers, instructors and invited employers at the end of each cycle.",
                },
              ].map((x) => (
                <div
                  key={x.t}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
                >
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyan/70" />
                  <div>
                    <p className="text-[0.875rem] font-medium text-ink">{x.t}</p>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">{x.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      <Section className="py-16">
        <SectionHeading
          eyebrow="Note on this page"
          title="Placeholder records"
          lede="The entries above demonstrate the categories of work CEA assesses. They are labelled as templates: the academy will replace them with real student work once consent and final projects are confirmed."
        />
      </Section>
    </>
  );
}
