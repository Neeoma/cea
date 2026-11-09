import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bug,
  Fingerprint,
  Lock,
  Network,
  Radar,
  Scale,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { PageHero } from "@/components/shell/page-hero";
import { ProgrammeCard } from "@/components/programmes/programme-card";
import { Button, Card, Pill, Section, SectionHeading } from "@/components/ui/primitives";
import { LabSimulation } from "@/components/immersive/lab-simulation";
import { programmes } from "@/data/programmes";
import { labRules } from "@/data/lab";
import { careerPaths } from "@/data/content";

export const metadata: Metadata = {
  title: "Cybersecurity training in Nigeria",
  description:
    "Practical cybersecurity training in Port Harcourt, Rivers State. Ethical hacking, security operations, network security, digital forensics and governance — taught in isolated authorised labs at Cyber Elias Academy.",
  alternates: { canonical: "/cybersecurity" },
  keywords: [
    "cybersecurity training in Nigeria",
    "ethical hacking training Nigeria",
    "cybersecurity courses for beginners",
    "SOC analyst training Port Harcourt",
  ],
};

const cyberProgrammes = programmes.filter((p) => p.department === "cybersecurity");

const tracks = [
  {
    icon: ShieldCheck,
    title: "Fundamentals",
    href: "/programmes/cybersecurity-fundamentals",
    body: "Security principles, identity, networks and the analyst's detect-triage-respond loop.",
    level: "Beginner start",
  },
  {
    icon: Radar,
    title: "Security Operations",
    href: "/programmes/security-operations",
    body: "Alert queues, log pipelines, detection engineering and full SOC shift simulation.",
    level: "Intermediate",
  },
  {
    icon: Bug,
    title: "Ethical Hacking",
    href: "/programmes/ethical-hacking",
    body: "Scoped, authorised testing: recon, web application security, evidence and reporting.",
    level: "Intermediate",
  },
  {
    icon: Network,
    title: "Network Security",
    href: "/programmes/network-security",
    body: "Segmentation, firewall rule sets, secure remote access and lateral movement detection.",
    level: "Intermediate",
  },
  {
    icon: Fingerprint,
    title: "Digital Forensics",
    href: "/programmes/digital-forensics",
    body: "Disk and memory acquisition, artefact recovery, timelines and chain of custody.",
    level: "Advanced",
  },
  {
    icon: Scale,
    title: "Governance & Legal",
    href: "/programmes/cybersecurity-fundamentals",
    body: "Cybercrimes Act, authorisation, policy and risk language built into every programme.",
    level: "Embedded",
  },
];

export default function CybersecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Cybersecurity"
        title={
          <>
            Learn to defend
            <br />
            <span className="text-cyan">by defending.</span>
          </>
        }
        lede="Digital defence, security operations and ethical security — taught in isolated, authorised labs against fictional targets. The discipline comes first; the tools follow."
        crumbs={[{ label: "Cybersecurity" }]}
        meta={[
          { label: "Programmes", value: String(cyberProgrammes.length) },
          { label: "Entry point", value: "Beginner" },
          { label: "Top level", value: "Advanced" },
          { label: "Lab format", value: "Isolated" },
        ]}
        actions={
          <>
            <Button href="/programmes/cybersecurity-fundamentals" icon>
              Start with fundamentals
            </Button>
            <Button href="/cyber-lab" variant="secondary">
              Try the Cyber Lab
            </Button>
          </>
        }
        visual={
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.09]">
              <Image
                src="/images/dept-cybersecurity.jpg"
                alt="Cybersecurity analyst working at a security operations workstation"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/20 to-transparent" />
            </div>
            <div className="glass absolute -bottom-6 left-4 right-4 rounded-xl p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">
                  coursework split
                </span>
                <span className="font-mono text-[0.6rem] text-green">~60% lab</span>
              </div>
              <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                <div className="h-full w-[60%] bg-gradient-to-r from-cyan to-green" />
                <div className="h-full w-[25%] bg-violet/60" />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[0.5rem] uppercase tracking-[0.12em] text-muted/70">
                <span>hands-on</span>
                <span>theory</span>
                <span>assessment</span>
              </div>
            </div>
          </div>
        }
      />

      {/* Why defensive-first */}
      <Section className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="label-mono text-cyan/90">The CEA approach</p>
            <h2 className="display-md mt-4 text-ink">
              Offence is taught,
              <br />
              defence is the point.
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
              Most beginner security programmes open with a tool. We open with the question a
              defender asks: what are we protecting, from whom, and what would tell us we are
              losing? Every offensive technique sits inside that frame — and inside a lab we own.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <Pill tone="cyan">Authorised only</Pill>
              <Pill tone="green">Documented findings</Pill>
              <Pill tone="violet">Nigerian legal context</Pill>
            </div>
          </div>

          <div className="space-y-2.5">
            {labRules.map((rule, i) => (
              <div
                key={rule}
                className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-green/25 bg-green/[0.08] font-mono text-[0.55rem] text-green">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.8125rem] leading-relaxed text-muted">{rule}</p>
              </div>
            ))}
            <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-4">
              <p className="text-[0.75rem] leading-relaxed text-amber-200/90">
                Attempting to test, scan or attack systems you do not own is a criminal offence under
                Nigerian law and grounds for immediate removal from any CEA programme.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Pathways */}
      <div className="border-y border-white/[0.06] bg-deep/25 py-16 sm:py-20">
        <Section>
          <SectionHeading
            eyebrow="Learning pathways"
            title="Six ways into security"
            lede="Begin at fundamentals, then specialise. Pathways share a common foundation so you can move between them without repeating work."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((t, i) => (
              <Link
                key={t.title}
                href={t.href}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
                className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/30 hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan/20 bg-cyan/[0.06]">
                    <t.icon className="h-4 w-4 text-cyan" />
                  </div>
                  <span className="font-mono text-[0.5rem] uppercase tracking-[0.15em] text-muted">
                    {t.level}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[0.9375rem] font-bold text-ink">
                  {t.title}
                </h3>
                <p className="mt-1.5 text-[0.75rem] leading-relaxed text-muted">{t.body}</p>
                <span className="mt-3 flex items-center gap-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-cyan/70">
                  Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      {/* Programmes */}
      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Programmes"
          title="Security programmes at CEA"
          aside={
            <Button href="/programmes?department=cybersecurity" variant="secondary" size="sm" icon>
              Filter catalogue
            </Button>
          }
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cyberProgrammes.map((p) => (
            <ProgrammeCard key={p.slug} programme={p} />
          ))}
        </div>
      </Section>

      {/* Lab */}
      <div className="border-y border-white/[0.06] bg-[#05090f] py-16 sm:py-20">
        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div>
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-green" />
                <p className="label-mono text-green">Cyber Lab</p>
              </div>
              <h2 className="display-md mt-4 text-ink">
                Practise on a
                <br />
                simulated queue.
              </h2>
              <p className="mt-4 text-[0.875rem] leading-relaxed text-muted">
                The lab is where the programme actually lives. Work the scenario here to see the
                shape of it — then imagine doing it with logs, tools and an instructor beside you.
              </p>
              <div className="mt-6 space-y-2.5">
                {[
                  "Fictional incidents, real analyst decisions",
                  "Single-player investigations at your own pace",
                  "Debriefed in class — the reasoning matters more than the answer",
                ].map((l) => (
                  <div key={l} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green" />
                    <p className="text-[0.8125rem] leading-relaxed text-muted">{l}</p>
                  </div>
                ))}
              </div>
              <Button href="/cyber-lab" className="mt-6" icon>
                Full Cyber Lab
              </Button>
            </div>
            <div>
              <LabSimulation />
            </div>
          </div>
        </Section>
      </div>

      {/* Careers */}
      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Where it leads"
          title="Security roles this prepares you for"
          lede="Entry-level expectations in the Nigerian market. We describe the work honestly — no salary figures we cannot verify."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {careerPaths
            .filter((c) => c.track === "Cybersecurity")
            .map((c) => (
              <Card key={c.role}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">{c.role}</h3>
                    <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.15em] text-cyan/70">
                      {c.entry}
                    </p>
                  </div>
                  <Lock className="h-4 w-4 shrink-0 text-muted/50" />
                </div>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">{c.dayToDay}</p>
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
        <div className="mt-6">
          <Button href="/careers" variant="secondary" icon>
            All career pathways
          </Button>
        </div>
      </Section>

      {/* CTA */}
      <Section className="pb-24">
        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-cyan/[0.08] via-transparent to-green/[0.05] p-8 sm:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="display-md max-w-lg text-ink">
                Start with Fundamentals. Decide after.
              </h2>
              <p className="mt-3 max-w-md text-[0.875rem] leading-relaxed text-muted">
                Eight weeks, no prior experience, and a real investigation report at the end of it.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/programmes/cybersecurity-fundamentals" icon>
                View programme
              </Button>
              <Button href="/apply?programme=cybersecurity-fundamentals" variant="secondary">
                Apply now
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
