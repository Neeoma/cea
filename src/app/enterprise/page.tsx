import type { Metadata } from "next";
import { Building2, CheckCircle2, Download, Mail } from "lucide-react";
import { PageHero } from "@/components/shell/page-hero";
import { EnterpriseForm } from "@/components/forms/enterprise-form";
import { Button, Card, Section, SectionHeading } from "@/components/ui/primitives";
import { enterpriseOfferings } from "@/data/content";
import { academy } from "@/data/academy";

export const metadata: Metadata = {
  title: "Enterprise & corporate training",
  description:
    "Corporate cybersecurity awareness, employee digital skills, IT support upskilling and custom technical training delivered by Cyber Elias Academy in Rivers State and across Nigeria.",
  alternates: { canonical: "/enterprise" },
};

const icons: Record<string, React.ElementType> = {
  shield: CheckCircle2,
  monitor: Building2,
  wrench: CheckCircle2,
  sliders: CheckCircle2,
  presentation: Building2,
  users: Building2,
};

export default function EnterprisePage() {
  return (
    <>
      <PageHero
        eyebrow="Enterprise"
        title={
          <>
            Train the team
            <br />
            <span className="text-muted/60">that runs the systems.</span>
          </>
        }
        lede="Corporate training built around your actual stack, your actual risk surface and your actual staff — not a generic catalogue rebadged with your logo."
        crumbs={[{ label: "Enterprise" }]}
        meta={[
          { label: "Formats", value: "6" },
          { label: "Delivery", value: "On-site / remote" },
          { label: "Group size", value: "5–40" },
          { label: "Scoping", value: "Free" },
        ]}
        actions={
          <>
            <Button href="#enquiry" icon>
              Request a proposal
            </Button>
            <Button href="/contact" variant="secondary">
              Talk to us
            </Button>
          </>
        }
      />

      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="What we deliver"
          title="Six corporate formats"
          lede="Each engagement starts with a scoping conversation: what your team needs to be able to do afterwards, and what evidence would prove it."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {enterpriseOfferings.map((o, i) => {
            const Icon = icons[o.icon] ?? CheckCircle2;
            return (
              <Card
                key={o.title}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
                className="flex flex-col"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan/20 bg-cyan/[0.06]">
                    <Icon className="h-4 w-4 text-cyan" />
                  </div>
                  <span className="font-mono text-[0.5rem] uppercase tracking-[0.15em] text-muted">
                    {o.duration}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[0.9375rem] font-bold text-ink">{o.title}</h3>
                <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-muted">{o.body}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <div className="border-y border-white/[0.06] bg-deep/25 py-16">
        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="label-mono text-cyan/90">How engagements work</p>
              <h2 className="display-md mt-4 text-ink">Scoped, then delivered</h2>
              <div className="mt-6 space-y-3">
                {[
                  {
                    t: "Scoping call",
                    b: "Thirty minutes with your team lead. We establish the capability gap and the constraints — budget, shift patterns, existing systems.",
                  },
                  {
                    t: "Written proposal",
                    b: "A short document: outcomes, syllabus, schedule, assessment method and fixed price. No open-ended scope.",
                  },
                  {
                    t: "Delivery",
                    b: "On-site at your premises or ours, or remote with a browser-based lab. All materials stay with your organisation.",
                  },
                  {
                    t: "Evidence of capability",
                    b: "You receive assessment results and, where relevant, a practical demonstration of what participants can now do.",
                  },
                ].map((s, i) => (
                  <div key={s.t} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 font-mono text-[0.55rem] text-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[0.875rem] font-medium text-ink">{s.t}</p>
                      <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">{s.b}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="enquiry">
              <EnterpriseForm />
            </div>
          </div>
        </Section>
      </div>

      <Section className="py-16">
        <div className="flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
              <Download className="h-4 w-4 text-muted" />
            </div>
            <div>
              <p className="font-display text-[0.9375rem] font-bold text-ink">
                Company training profile
              </p>
              <p className="mt-1 max-w-md text-[0.8125rem] leading-relaxed text-muted">
                A one-page PDF summary of formats, delivery options and what a scoping conversation
                covers. Available on request while the final document is prepared.
              </p>
            </div>
          </div>
          <a
            href={`mailto:${academy.contact.admissionsEmail}?subject=CEA%20company%20training%20profile`}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/12 px-5 py-3 text-sm text-ink transition-colors hover:border-cyan/40"
          >
            <Mail className="h-4 w-4" /> Request by email
          </a>
        </div>
      </Section>
    </>
  );
}
