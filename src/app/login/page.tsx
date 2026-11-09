import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, KeyRound, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/shell/page-hero";
import { LoginForm } from "@/components/portal/login-form";
import { Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the Cyber Elias Academy student portal.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Account"
        title={
          <>
            Welcome
            <br />
            <span className="text-muted/60">back.</span>
          </>
        }
        lede="Sign in to reach your courses, assignments and certificates. New students receive credentials by email once enrolment is confirmed."
        crumbs={[{ label: "Sign in" }]}
      />

      <Section className="pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="max-w-md">
            <LoginForm />
            <p className="mt-5 text-[0.8125rem] text-muted">
              No account yet?{" "}
              <Link href="/apply" className="text-cyan underline decoration-cyan/30 underline-offset-2">
                Apply for a programme
              </Link>{" "}
              — accounts are created after enrolment.
            </p>
          </div>

          <aside className="space-y-3">
            {[
              {
                icon: ShieldCheck,
                title: "Security practices",
                body: "Multi-factor authentication is required for staff and admin roles. Passwords are never stored in plain text, and reset links are single-use.",
              },
              {
                icon: KeyRound,
                title: "Role-based access",
                body: "Students see their own records only. Instructors see their cohorts. Admissions, finance and administration each have scoped permissions.",
              },
            ].map((x) => (
              <div key={x.title} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                <x.icon className="h-4 w-4 text-cyan/80" />
                <p className="mt-2.5 font-display text-[0.9375rem] font-bold text-ink">{x.title}</p>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">{x.body}</p>
              </div>
            ))}

            <div className="rounded-xl border border-cyan/20 bg-cyan/[0.04] p-5">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-cyan">
                explore without an account
              </p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                The portal preview is open — no sign-in required to see what students receive.
              </p>
              <Link
                href="/portal"
                className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-cyan hover:underline"
              >
                Open portal preview <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
