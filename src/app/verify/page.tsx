import type { Metadata } from "next";
import { PageHero } from "@/components/shell/page-hero";
import { CertificateVerifier } from "@/components/portal/certificate-verifier";
import { Section } from "@/components/ui/primitives";
import { ShieldCheck, Fingerprint, ScanLine } from "lucide-react";

export const metadata: Metadata = {
  title: "Certificate verification",
  description:
    "Verify a Cyber Elias Academy certificate. Enter a certificate ID to confirm the holder, programme, issue date and status against the CEA register.",
  alternates: { canonical: "/verify" },
};

export default function VerifyPage() {
  return (
    <>
      <PageHero
        eyebrow="Verification"
        title={
          <>
            Confirm the record,
            <br />
            <span className="text-muted/60">not the paper.</span>
          </>
        }
        lede="Employers and graduates can verify any CEA certificate against the academy register. A certificate is only valid if it appears here."
        crumbs={[{ label: "Verify" }]}
        meta={[
          { label: "Input", value: "Certificate ID" },
          { label: "Response", value: "Instant" },
          { label: "Data shown", value: "Minimal" },
          { label: "Register", value: "Live" },
        ]}
      />

      <Section className="pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <div className="min-w-0">
            <CertificateVerifier />
          </div>

          <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
            {[
              {
                icon: ShieldCheck,
                title: "What a valid result means",
                body: "The holder completed the named programme, was assessed, and the certificate has not been revoked.",
              },
              {
                icon: ScanLine,
                title: "What we do not show",
                body: "No contact details, no grades below the awarded band, and no personal data beyond the holder's name.",
              },
              {
                icon: Fingerprint,
                title: "Privacy by design",
                body: "The verifier returns the minimum needed to confirm a record. Employer lookups are not used for marketing.",
              },
            ].map((x) => (
              <div key={x.title} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <x.icon className="h-4 w-4 text-cyan/80" />
                <p className="mt-2.5 font-display text-[0.875rem] font-bold text-ink">{x.title}</p>
                <p className="mt-1 text-[0.75rem] leading-relaxed text-muted">{x.body}</p>
              </div>
            ))}

            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                Try a sample
              </p>
              <div className="mt-2 space-y-1.5 font-mono text-[0.65rem] text-muted">
                <p className="text-green">CEA-CERT-2026-0041</p>
                <p className="text-muted/60">CEA-CERT-2025-0212 (revoked)</p>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
