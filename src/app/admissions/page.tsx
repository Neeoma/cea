import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck, CircleDollarSign, FileCheck2, GraduationCap, MessageSquare, Wallet } from "lucide-react";
import { PageHero } from "@/components/shell/page-hero";
import { Button, Card, Pill, Section, SectionHeading } from "@/components/ui/primitives";
import { academy, learningModes } from "@/data/academy";
import { programmes } from "@/data/programmes";
import { faqs } from "@/data/content";

export const metadata: Metadata = {
  title: "Admissions — how to apply to CEA",
  description:
    "CEA admissions: entry requirements, application process, fees and payment, learning modes and what happens after you apply. Port Harcourt, Rivers State.",
  alternates: { canonical: "/admissions" },
};

const steps = [
  {
    icon: FileCheck2,
    title: "Choose a programme",
    body: "Browse the catalogue and pick a pathway. If you are unsure, apply with the “advise me” option and admissions will recommend based on your goals.",
    meta: "5 minutes",
  },
  {
    icon: MessageSquare,
    title: "Submit the application",
    body: "A short form: your details, chosen programme and preferred learning mode. No documents or payment are required at this stage.",
    meta: "≈ 2 minutes",
  },
  {
    icon: CalendarCheck,
    title: "Admissions review",
    body: "Your application is reviewed and you receive a response within three working days. Complex cases get a call rather than a form letter.",
    meta: "1–3 days",
  },
  {
    icon: Wallet,
    title: "Acceptance & fees",
    body: "If accepted, you receive written confirmation with the current fee schedule, payment options and your cohort start date.",
    meta: "1–2 days",
  },
  {
    icon: GraduationCap,
    title: "Enrol & begin",
    body: "Once payment is verified, you are enrolled, added to your cohort group and given portal access before the first session.",
    meta: "Before start",
  },
];

const requirements = [
  {
    title: "Entry requirements",
    body: "Programme-specific. Most begin at zero prior experience; intermediate and advanced pathways list their prerequisites on the programme page.",
    icon: GraduationCap,
  },
  {
    title: "What to bring first day",
    body: "A laptop if you have one (lab machines are available), a notebook, and a form of identification. No other documents are needed at intake.",
    icon: FileCheck2,
  },
  {
    title: "Fees",
    body: "Confirmed by admissions per cohort and learning mode. We do not publish figures we cannot verify. Instalments are discussed after acceptance, not guaranteed.",
    icon: CircleDollarSign,
  },
];

export default function AdmissionsPage() {
  const admissionsFaqs = faqs.filter(
    (f) => f.category === "Admissions" || f.category === "Fees" || f.category === "Study",
  );

  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title={
          <>
            A clear route
            <br />
            <span className="text-muted/60">from here to enrolled.</span>
          </>
        }
        lede="Five steps, no hidden gatekeeping. The initial application is short because we would rather talk to you than filter you out on paperwork."
        crumbs={[{ label: "Admissions" }]}
        meta={[
          { label: "Steps", value: "5" },
          { label: "Response", value: "≤ 3 days" },
          { label: "Application", value: "Free" },
          { label: "Intakes", value: "Rolling" },
        ]}
        actions={
          <>
            <Button href="/apply" icon>
              Start application
            </Button>
            <Button href="/contact" variant="secondary">
              Ask a question
            </Button>
          </>
        }
      />

      {/* Process */}
      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="The process"
          title="What actually happens"
          lede="Each step below is what occurs, in order, with a realistic timeframe attached."
        />

        <div className="mt-10 space-y-2.5">
          {steps.map((s, i) => (
            <div
              key={s.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              className="group relative flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors hover:border-white/[0.14] sm:flex-row sm:items-center sm:gap-6"
            >
              <div className="flex items-center gap-4 sm:w-52 sm:shrink-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan/25 bg-cyan/[0.07] font-mono text-[0.7rem] text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex items-center gap-2">
                  <s.icon className="h-4 w-4 text-muted" />
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">
                    {s.meta}
                  </span>
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-[0.9375rem] font-bold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">{s.body}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden h-4 w-4 text-muted/30 sm:block" />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Requirements */}
      <div className="border-y border-white/[0.06] bg-deep/25 py-16">
        <Section>
          <div className="grid gap-4 md:grid-cols-3">
            {requirements.map((r) => (
              <div key={r.title} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                <r.icon className="h-4 w-4 text-cyan" />
                <h3 className="mt-3 font-display text-[0.9375rem] font-bold text-ink">{r.title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{r.body}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Modes & programmes */}
      <Section className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="label-mono text-cyan/90">Learning modes</p>
            <h2 className="display-md mt-4 text-ink">Study the way that fits</h2>
            <p className="mt-4 text-[0.875rem] leading-relaxed text-muted">
              Not every programme runs in every mode — the programme page lists exactly what is
              available for that cohort.
            </p>
            <div className="mt-6 space-y-2.5">
              {[
                {
                  mode: "Physical",
                  detail: `${academy.address.line1}, ${academy.address.city}. Full lab access, instructor beside you, the fastest route for beginners.`,
                },
                {
                  mode: "Hybrid",
                  detail: "Theory and review online, practical work on campus. Suits people balancing a job in the city.",
                },
                {
                  mode: "Online",
                  detail: "Remote delivery with a browser-based lab environment. Suits learners outside Rivers State.",
                },
              ].map((m) => (
                <div
                  key={m.mode}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
                >
                  <div className="flex items-center gap-2">
                    <p className="font-display text-[0.875rem] font-bold text-ink">{m.mode}</p>
                    <Pill tone="cyan">{m.mode}</Pill>
                  </div>
                  <p className="mt-1.5 text-[0.75rem] leading-relaxed text-muted">{m.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="label-mono text-cyan/90">Programmes accepting applications</p>
            <div className="mt-4 divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]">
              {programmes.slice(0, 8).map((p) => (
                <Link
                  key={p.slug}
                  href={`/apply?programme=${p.slug}`}
                  className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.8125rem] font-medium text-ink">{p.title}</span>
                    <span className="mt-0.5 block font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted">
                      {p.level} · {p.durationWeeks} weeks · {p.modes.join(" / ")}
                    </span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-cyan" />
                </Link>
              ))}
            </div>
            <Button href="/programmes" variant="secondary" size="sm" className="mt-4" icon>
              All {programmes.length} programmes
            </Button>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <div className="border-t border-white/[0.06] bg-deep/25 py-16">
        <Section>
          <SectionHeading eyebrow="Questions" title="Admissions FAQ" />
          <div className="mt-8 max-w-3xl divide-y divide-white/[0.06] rounded-xl border border-white/[0.07] bg-white/[0.02]">
            {admissionsFaqs.map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[0.875rem] font-medium text-ink">
                  {f.q}
                  <span className="text-muted transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/apply" icon>
              Apply now
            </Button>
            <Button href="/contact" variant="secondary">
              Contact admissions
            </Button>
          </div>
        </Section>
      </div>
    </>
  );
}
