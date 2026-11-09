import type { Metadata } from "next";
import { PageHero } from "@/components/shell/page-hero";
import { Section } from "@/components/ui/primitives";
import { academy } from "@/data/academy";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "Terms governing the use of the Cyber Elias Academy website, programmes and Cyber Lab, including acceptable use and authorisation requirements.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    h: "Using this website",
    p: "The content on this site is provided for information about Cyber Elias Academy and its programmes. Programme details, schedules and fees are confirmed in writing by admissions and those written confirmations take precedence over anything published here.",
  },
  {
    h: "Applications and enrolment",
    p: "Submitting an application is not an offer of a place, and no contract exists until admissions issues a written acceptance and payment is verified. We may decline an application without giving reasons, and any payment received for a declined application is refunded in full.",
  },
  {
    h: "Fees and refunds",
    p: "Fees are quoted per cohort and learning mode and are payable as set out in your acceptance letter. Refund terms are stated in that letter. Where a programme is cancelled by CEA, paid fees are refunded in full or transferred to another intake at your election.",
  },
  {
    h: "Acceptable use of the Cyber Lab",
    p: "All lab exercises must be conducted only against the systems provided for that exercise. Using techniques learned at CEA against any system you do not own or have written permission to test is a criminal offence under Nigerian law and will result in immediate, permanent removal from all programmes without refund.",
  },
  {
    h: "Prohibited conduct",
    p: "You may not attempt to access unauthorised areas of this platform, interfere with its operation, upload malicious code, scrape personal data, impersonate another person, or use CEA facilities to harass anyone. Administrative access attempts are logged and reported.",
  },
  {
    h: "Intellectual property",
    p: "Course materials, assessments and this website are the property of Cyber Elias Academy and are licensed to enrolled students for personal study. You retain ownership of work you create, and grant CEA permission to showcase it only where you give written consent.",
  },
  {
    h: "Certificates",
    p: "A CEA certificate records completion and assessment against a defined programme. It is not a university degree, a professional licence, or a vendor certification, and it does not guarantee employment. Certificates may be revoked where issued in error or obtained through misconduct.",
  },
  {
    h: "Availability and changes",
    p: "We aim to keep this platform available but do not guarantee uninterrupted access. Programme content may be revised to keep pace with the field; material changes are communicated to enrolled students.",
  },
  {
    h: "Limitation of liability",
    p: "To the extent permitted by law, CEA is not liable for indirect or consequential loss arising from use of this website. Nothing in these terms limits liability for fraud, death or personal injury caused by negligence, or any liability that cannot lawfully be excluded.",
  },
  {
    h: "Governing law",
    p: "These terms are governed by the laws of the Federal Republic of Nigeria, and the courts of Rivers State have jurisdiction over any dispute.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of service"
        lede={`The rules that govern use of this website, ${academy.shortName} programmes and the Cyber Lab.`}
        crumbs={[{ label: "Terms" }]}
      />
      <Section className="pb-24">
        <div className="max-w-2xl">
          <p className="rounded-xl border-l-2 border-l-amber-400 bg-amber-400/[0.05] px-4 py-3 text-[0.8125rem] leading-relaxed text-amber-100/85">
            Review note: these terms describe intended production practice and require review by
            CEA&apos;s legal adviser before launch. Fees, refund terms and cohort dates are issued in
            the acceptance letter and override this page.
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
          </div>

          <div className="mt-10 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
              questions about these terms
            </p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
              Write to{" "}
              <a
                href={`mailto:${academy.contact.supportEmail}`}
                className="text-cyan underline decoration-cyan/30 underline-offset-2"
              >
                {academy.contact.supportEmail}
              </a>{" "}
              or visit the campus during admissions hours ({academy.contact.hours}).
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
