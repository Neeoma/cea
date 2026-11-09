import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/shell/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Button, Section } from "@/components/ui/primitives";
import { academy } from "@/data/academy";

export const metadata: Metadata = {
  title: "Contact Cyber Elias Academy",
  description:
    "Contact CEA admissions and support: 24 Ebony Road, off Rumuola Road, Port Harcourt, Rivers State. Email admissions@cea.ng or send an enquiry.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Talk to a human.
            <br />
            <span className="text-muted/60">Not a chatbot.</span>
          </>
        }
        lede="Admissions answers questions about programmes, fees and schedules. If you are not sure what to ask, come in person — the lab is usually open."
        crumbs={[{ label: "Contact" }]}
      />

      <Section className="pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
          <div className="min-w-0">
            <ContactForm />
          </div>

          <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-cyan">
                campus
              </p>
              <div className="mt-3 flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                <address className="not-italic text-[0.8125rem] leading-relaxed text-ink/85">
                  {academy.address.line1}
                  <br />
                  {academy.address.city}, {academy.address.state}
                  <br />
                  {academy.address.country}
                </address>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=24+Ebony+Road+Rumuola+Port+Harcourt"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-cyan transition-opacity hover:opacity-80"
              >
                Open in maps →
              </a>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-cyan">
                channels
              </p>
              <div className="mt-3 space-y-3">
                <a
                  href={`mailto:${academy.contact.admissionsEmail}`}
                  className="flex items-start gap-2.5 text-[0.8125rem] text-ink/85 transition-colors hover:text-cyan"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                  <span>
                    {academy.contact.admissionsEmail}
                    <span className="mt-0.5 block font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted">
                      admissions
                    </span>
                  </span>
                </a>
                <div className="flex items-start gap-2.5 text-[0.8125rem] text-ink/85">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                  <span>
                    Phone line pending verification
                    <span className="mt-0.5 block font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted">
                      we will not publish a number we cannot confirm
                    </span>
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-[0.8125rem] text-ink/85">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                  <span>
                    WhatsApp — on request
                    <span className="mt-0.5 block font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted">
                      issued with your application reference
                    </span>
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-[0.8125rem] text-ink/85">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                  <span>{academy.contact.hours}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-cyan/20 bg-cyan/[0.04] p-5">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-cyan">
                already applied?
              </p>
              <p className="mt-2 text-[0.75rem] leading-relaxed text-muted">
                Quote your application reference (CEA-YYYY-XXXXX) in any message and we can find your
                file immediately.
              </p>
              <Button href="/portal" variant="secondary" size="sm" className="mt-3 w-full">
                Student portal
              </Button>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
