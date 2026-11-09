import type { Metadata } from "next";
import { PageHero } from "@/components/shell/page-hero";
import { Section } from "@/components/ui/primitives";
import { academy } from "@/data/academy";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Cyber Elias Academy collects, uses and protects personal data, in line with the Nigeria Data Protection Act.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    h: "What we collect",
    p: "Application data you submit (name, contact details, programme interest, optional background information); account and enrolment records if you become a student; payment references from our licensed payment provider; and aggregated analytics about how this website is used.",
  },
  {
    h: "Why we collect it",
    p: "To assess applications, deliver training, administer assessments and certificates, take payment, provide support, and meet our legal and regulatory obligations. We do not sell personal data, and we do not use applicant data for third-party marketing.",
  },
  {
    h: "Lawful basis",
    p: "We rely on your consent for marketing communications, on the performance of a contract for enrolment and training delivery, and on legitimate interest and legal obligation for record-keeping and security. Consent can be withdrawn at any time without affecting previous processing.",
  },
  {
    h: "Who can see it",
    p: "Access is role-based. Admissions staff see applications; finance sees payment records; instructors see the cohorts they teach. Administrative access is logged. Service providers who process data on our behalf are bound by contract to use it only for the purpose we specify.",
  },
  {
    h: "How long we keep it",
    p: "Application records are retained for two years after the last contact unless you request deletion. Student academic records are retained to support certificate verification and reissue. Financial records are retained as required by Nigerian law.",
  },
  {
    h: "Your rights",
    p: "Under the Nigeria Data Protection Act you can request access to your data, correction of inaccuracies, deletion where lawful, restriction of processing, and portability. Write to us and we will respond within the statutory period. If you are dissatisfied you may complain to the Nigeria Data Protection Commission.",
  },
  {
    h: "Cookies and analytics",
    p: "This site uses only what is necessary to function and, where enabled, privacy-respecting analytics. We do not use tracking cookies for advertising networks, and we do not run third-party pixels that build cross-site profiles.",
  },
  {
    h: "Security",
    p: "Traffic is served over HTTPS. Administrative accounts require multi-factor authentication. We apply least-privilege access, row-level database security, encrypted backups, and audit logging for administrative actions. Payment secrets never reach the browser.",
  },
  {
    h: "Children",
    p: "Applicants under 18 require the consent of a parent or guardian. We do not knowingly collect data from children outside a supervised enrolment process.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        lede={`How ${academy.name} handles personal data, written to be read rather than skimmed.`}
        crumbs={[{ label: "Privacy" }]}
      />
      <Section className="pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_14rem] lg:gap-16">
          <div className="max-w-2xl">
            <p className="rounded-xl border-l-2 border-l-amber-400 bg-amber-400/[0.05] px-4 py-3 text-[0.8125rem] leading-relaxed text-amber-100/85">
              Review note: this policy describes the intended production practices of the platform.
              It must be reviewed by CEA&apos;s data protection officer and its legal adviser before
              launch.
            </p>

            <div className="mt-8 space-y-8">
              {sections.map((s, i) => (
                <div key={s.h}>
                  <h2 className="flex items-baseline gap-3 font-display text-lg font-bold text-ink">
                    <span className="font-mono text-[0.65rem] text-cyan/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.h}
                  </h2>
                  <p className="mt-2 text-[0.875rem] leading-[1.75] text-muted">{s.p}</p>
                </div>
              ))}

              <div>
                <h2 className="font-display text-lg font-bold text-ink">Contact</h2>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                  Data protection enquiries:{" "}
                  <a
                    href={`mailto:${academy.contact.supportEmail}`}
                    className="text-cyan underline decoration-cyan/30 underline-offset-2"
                  >
                    {academy.contact.supportEmail}
                  </a>
                  <br />
                  {academy.address.line1}, {academy.address.city}, {academy.address.state},{" "}
                  {academy.address.country}
                </p>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                In short
              </p>
              <ul className="mt-3 space-y-2.5">
                {[
                  "We never sell your data",
                  "Access is role-based and logged",
                  "You can request deletion",
                  "No advertising trackers",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green" />
                    <span className="text-[0.75rem] leading-relaxed text-muted">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
