import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, FileText, GraduationCap, Handshake, Presentation, UserCheck } from "lucide-react";
import { PageHero } from "@/components/shell/page-hero";
import { Button, Card, Pill, Section, SectionHeading } from "@/components/ui/primitives";
import { careerPaths, careerSupport } from "@/data/content";

export const metadata: Metadata = {
  title: "Careers & graduate pathways",
  description:
    "Where Cyber Elias Academy programmes lead: security operations, development, data, design and IT support roles — plus portfolio review, CV preparation and Demo Day.",
  alternates: { canonical: "/careers" },
};

const supportIcons = [FileText, Presentation, UserCheck, GraduationCap, Handshake, Briefcase];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            What you do
            <br />
            <span className="text-muted/60">afterwards.</span>
          </>
        }
        lede="We describe the work honestly and prepare you to evidence it. We do not publish salary figures or placement rates we cannot substantiate — no honest academy should."
        crumbs={[{ label: "Careers" }]}
        meta={[
          { label: "Pathways", value: String(careerPaths.length) },
          { label: "Portfolio", value: "Reviewed" },
          { label: "Demo Day", value: "Per cohort" },
          { label: "Referrals", value: "Where genuine" },
        ]}
        actions={
          <>
            <Button href="/programmes" icon>
              Choose a pathway
            </Button>
            <Button href="/projects" variant="secondary">
              See student work
            </Button>
          </>
        }
      />

      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Role profiles"
          title="Six roles, described plainly"
          lede="The day-to-day reality of each role, the programme route in, and the skills that carry the work."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {careerPaths.map((c, i) => (
            <Card
              key={c.role}
              data-reveal
              style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as React.CSSProperties}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Pill tone="cyan">{c.track}</Pill>
                  <h3 className="mt-3 font-display text-lg font-bold text-ink">{c.role}</h3>
                </div>
                <Briefcase className="h-4 w-4 shrink-0 text-muted/40" />
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-muted">
                    route in
                  </p>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink/85">{c.entry}</p>
                </div>
                <div>
                  <p className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-muted">
                    day to day
                  </p>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">{c.dayToDay}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-3">
                {c.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded bg-white/[0.04] px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <div className="border-y border-white/[0.06] bg-deep/25 py-16">
        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className="label-mono text-cyan/90">Career support</p>
              <h2 className="display-md mt-4 text-ink">Support, not promises</h2>
              <p className="mt-4 text-[0.875rem] leading-relaxed text-muted">
                What CEA actually provides to graduates. Everything listed below is delivered inside
                the programme fee — there is no separate career-services product.
              </p>
              <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <p className="text-[0.75rem] leading-relaxed text-muted">
                  <span className="text-ink">What we will not do:</span> guarantee a salary, claim a
                  placement percentage, or invent an employer relationship to make this page look
                  stronger.
                </p>
              </div>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">
              {careerSupport.map((s, i) => {
                const Icon = supportIcons[i % supportIcons.length];
                return (
                  <div
                    key={s}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-green/80" />
                    <p className="text-[0.8125rem] leading-relaxed text-muted">{s}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>
      </div>

      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="The evidence"
          title="What employers actually ask for"
          lede="Three things recur in entry-level technical hiring. Every CEA programme is structured to produce all three."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Something you built",
              b: "A working application, a configured network, a design system. Portfolio work answers the question a certificate cannot.",
            },
            {
              n: "02",
              t: "Something you wrote",
              b: "A case file, an incident report, a decision memo. Technical writing is how your work becomes visible to a team.",
            },
            {
              n: "03",
              t: "Something you can defend",
              b: "You can explain the trade-off you made. Interviews test reasoning, not recall — and so does our assessment.",
            },
          ].map((x) => (
            <div key={x.n} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
              <span className="font-mono text-[0.6rem] tracking-[0.2em] text-cyan/70">{x.n}</span>
              <h3 className="mt-3 font-display text-base font-bold text-ink">{x.t}</h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{x.b}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-cyan/[0.06] via-transparent to-violet/[0.06] p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="display-md max-w-lg text-ink">Start with a pathway, not a promise.</h2>
              <p className="mt-2 max-w-md text-[0.875rem] leading-relaxed text-muted">
                Choose the programme that maps to the work you want. Admissions will tell you if it
                does not fit.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/programmes" icon>
                Browse programmes
              </Button>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/12 px-5 py-3 text-sm text-ink transition-colors hover:border-cyan/40"
              >
                Ask admissions <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
