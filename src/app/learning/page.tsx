import type { Metadata } from "next";
import { BookOpen, Monitor, Users, Video } from "lucide-react";
import { PageHero } from "@/components/shell/page-hero";
import { LearningJourney } from "@/components/home/learning-journey";
import { Button, Card, Pill, Section, SectionHeading } from "@/components/ui/primitives";
import { academy, learningModes } from "@/data/academy";
import { programmes } from "@/data/programmes";

export const metadata: Metadata = {
  title: "The learning experience",
  description:
    "How learning works at CEA: six stages from discover to advance, three delivery modes, lab-led assessment and verified certification.",
  alternates: { canonical: "/learning" },
};

export default function LearningPage() {
  return (
    <>
      <PageHero
        eyebrow="Learning"
        title={
          <>
            Six stages from
            <br />
            <span className="text-cyan">curious to capable.</span>
          </>
        }
        lede="Progress here is measured by what you can produce. The sequence is deliberate: concept, practice, build, defend, certify."
        crumbs={[{ label: "Learning" }]}
        meta={[
          { label: "Stages", value: "6" },
          { label: "Modes", value: "3" },
          { label: "Weekly load", value: "5–8 hrs" },
          { label: "Assessment", value: "Practical" },
        ]}
        actions={
          <>
            <Button href="/programmes" icon>
              Browse programmes
            </Button>
            <Button href="/portal" variant="secondary">
              See the student portal
            </Button>
          </>
        }
      />

      <Section className="pb-16">
        <LearningJourney />
      </Section>

      <div className="border-y border-white/[0.06] bg-deep/25 py-16">
        <Section>
          <SectionHeading
            eyebrow="Delivery"
            title="Three ways to study"
            lede="Availability varies by programme — each programme page lists the modes for its next cohort."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                mode: "Physical",
                icon: Users,
                body: `Full lab access at ${academy.address.line1}, instructor beside you. The fastest route for beginners.`,
                detail: "Recommended for zero prior experience",
                tone: "cyan",
              },
              {
                mode: "Hybrid",
                icon: Monitor,
                body: "Theory and review online, practical work on campus. Designed for people balancing a job in the city.",
                detail: "Evening and weekend cohorts",
                tone: "green",
              },
              {
                mode: "Online",
                icon: Video,
                body: "Remote delivery with a browser-based lab environment. Suits learners outside Rivers State.",
                detail: "Requires stable connection for labs",
                tone: "violet",
              },
            ].map((m) => (
              <Card key={m.mode} className="flex flex-col">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    m.tone === "cyan"
                      ? "border-cyan/25 bg-cyan/[0.08]"
                      : m.tone === "green"
                        ? "border-green/25 bg-green/[0.08]"
                        : "border-violet/25 bg-violet/[0.1]"
                  }`}
                >
                  <m.icon className="h-4 w-4 text-ink/80" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-ink">{m.mode}</h3>
                <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-muted">{m.body}</p>
                <p className="mt-4 border-t border-white/[0.06] pt-3 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted/80">
                  {m.detail}
                </p>
              </Card>
            ))}
          </div>
        </Section>
      </div>

      <Section className="py-16">
        <SectionHeading
          eyebrow="Assessment"
          title="What earns the certificate"
          lede="Three components. All three must be passed — there is no route to a CEA certificate by attendance alone."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Lab checkpoints",
              b: "Practical tasks at the end of each module, marked against defined criteria. You either completed the task or you did not.",
              pct: "40%",
            },
            {
              n: "02",
              t: "Capstone project",
              b: "A substantial build, investigation or design delivered to a brief, with documentation a colleague could follow.",
              pct: "40%",
            },
            {
              n: "03",
              t: "Oral defence",
              b: "A short viva in front of an instructor: explain your decisions, your trade-offs and what you would do differently.",
              pct: "20%",
            },
          ].map((x) => (
            <div key={x.n} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[0.6rem] tracking-[0.2em] text-cyan/70">{x.n}</span>
                <span className="font-display text-lg font-bold text-ink">{x.pct}</span>
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-ink">{x.t}</h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{x.b}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-green" />
              <div>
                <p className="text-[0.875rem] font-medium text-ink">
                  Every certificate is verifiable
                </p>
                <p className="mt-1 max-w-xl text-[0.8125rem] leading-relaxed text-muted">
                  Each certificate carries a unique ID that an employer can check on this site. If it
                  is not in the register, it is not a CEA certificate.
                </p>
              </div>
            </div>
            <Button href="/verify" variant="secondary" size="sm" className="shrink-0">
              Verification portal
            </Button>
          </div>
        </div>
      </Section>

      <Section className="pb-24">
        <div className="flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-cyan/[0.06] to-transparent p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="display-md max-w-md text-ink">Pick a pathway and start.</h2>
            <p className="mt-2 max-w-md text-[0.875rem] leading-relaxed text-muted">
              {programmes.length} programmes from {Math.min(...programmes.map((p) => p.durationWeeks))}{" "}
              to {Math.max(...programmes.map((p) => p.durationWeeks))} weeks, across{" "}
              {learningModes.length} delivery modes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/programmes" icon>
              Browse programmes
            </Button>
            <Button href="/apply" variant="secondary">
              Apply now
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
