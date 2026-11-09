import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/shell/page-hero";
import { ApplicationForm } from "@/components/forms/application-form";
import { Section } from "@/components/ui/primitives";
import { CheckCircle2, FileText, MessageSquare, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Apply to Cyber Elias Academy",
  description:
    "Apply for a Cyber Elias Academy programme in Port Harcourt. Four short steps, an application reference immediately, and a response from admissions.",
  alternates: { canonical: "/apply" },
};

const steps = [
  {
    icon: FileText,
    title: "Select a programme",
    body: "Choose the pathway — or pick “not sure yet” and admissions will advise.",
  },
  {
    icon: MessageSquare,
    title: "Tell us about you",
    body: "Name, contact details, and your preferred learning mode. Nothing compulsory beyond that.",
  },
  {
    icon: Send,
    title: "Submit",
    body: "You receive an application reference instantly, and admissions reviews your file.",
  },
  {
    icon: CheckCircle2,
    title: "Acceptance",
    body: "If accepted, you get written confirmation with the fee schedule and payment instructions.",
  },
];

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title={
          <>
            Start your
            <br />
            <span className="text-muted/60">application.</span>
          </>
        }
        lede="Four short steps. No essays, no documents at this stage, and no payment until admissions has confirmed your place in writing."
        crumbs={[{ label: "Apply" }]}
        meta={[
          { label: "Form length", value: "≈ 2 min" },
          { label: "Reference", value: "Instant" },
          { label: "Payment", value: "After review" },
          { label: "Cost to apply", value: "Free" },
        ]}
      />

      <Section className="pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_19rem] lg:gap-14">
          <div className="min-w-0">
            <Suspense fallback={<div className="h-[40rem] animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.02]" />}>
              <ApplicationForm />
            </Suspense>
          </div>

          <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 font-mono text-[0.55rem] text-cyan">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <s.icon className="h-3.5 w-3.5 text-muted" />
                </div>
                <p className="mt-2.5 font-display text-[0.875rem] font-bold text-ink">{s.title}</p>
                <p className="mt-1 text-[0.75rem] leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}

            <div className="rounded-xl border border-cyan/20 bg-cyan/[0.04] p-4">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-cyan">
                Need help?
              </p>
              <p className="mt-2 text-[0.75rem] leading-relaxed text-muted">
                Email admissions@cea.ng or visit the campus at 24 Ebony Road, off Rumuola Road,
                Port Harcourt. Mon–Fri, 9:00–17:00 WAT.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
