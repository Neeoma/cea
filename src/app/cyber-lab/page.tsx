import type { Metadata } from "next";
import {
  Award,
  BookOpen,
  FileSearch,
  Fingerprint,
  Network,
  Search,
  ShieldCheck,
  Terminal,
  TriangleAlert,
} from "lucide-react";
import { PageHero } from "@/components/shell/page-hero";
import { LabSimulation } from "@/components/immersive/lab-simulation";
import { Button, Card, Pill, Section, SectionHeading } from "@/components/ui/primitives";
import { labModules, labRules, labScenario } from "@/data/lab";

export const metadata: Metadata = {
  title: "Cyber Lab — practical cybersecurity simulations",
  description:
    "CEA's Cyber Lab: guided investigations, Linux fundamentals, log analysis drills, network demonstrations and forensic exercises — all inside isolated, authorised training environments.",
  alternates: { canonical: "/cyber-lab" },
};

const icons: Record<string, React.ElementType> = {
  search: Search,
  terminal: Terminal,
  file: FileSearch,
  network: Network,
  fingerprint: Fingerprint,
  award: Award,
};

export default function CyberLabPage() {
  return (
    <>
      <PageHero
        eyebrow="Cyber Lab"
        title={
          <>
            The lab is the
            <br />
            <span className="text-cyan">curriculum.</span>
          </>
        }
        lede="A controlled, isolated environment where security decisions are practised rather than described. Everything here is fictional, disposable and supervised."
        crumbs={[{ label: "Cyber Lab" }]}
        meta={[
          { label: "Scenario", value: labScenario.name },
          { label: "Difficulty", value: "Foundational" },
          { label: "Duration", value: "12–18 min" },
          { label: "Data", value: "Fictional" },
        ]}
        actions={
          <>
            <Button href="#scenario" icon>
              Play the scenario
            </Button>
            <Button href="/programmes?department=cybersecurity" variant="secondary">
              Security programmes
            </Button>
          </>
        }
      />

      {/* Warning strip */}
      <div className="border-y border-amber-400/20 bg-amber-400/[0.05]">
        <div className="container-cea flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-2">
            <TriangleAlert className="h-4 w-4 shrink-0 text-amber-400" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-amber-300">
              educational simulation
            </span>
          </div>
          <p className="text-[0.75rem] leading-relaxed text-amber-200/80">
            No real systems are scanned, probed or attacked. Every host, account and log line on this
            page is invented for teaching purposes.
          </p>
        </div>
      </div>

      {/* Scenario */}
      <Section id="scenario" className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Live scenario"
          title={labScenario.name}
          lede={labScenario.subtitle}
          aside={
            <div className="flex flex-col gap-1.5">
              <Pill tone="cyan">{labScenario.difficulty}</Pill>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">
                {labScenario.duration}
              </span>
            </div>
          }
        />
        <p className="mt-6 max-w-2xl rounded-xl border-l-2 border-l-cyan bg-cyan/[0.04] px-4 py-3 text-[0.875rem] leading-relaxed text-ink/85">
          {labScenario.objective}
        </p>
        <div className="mt-8">
          <LabSimulation />
        </div>
      </Section>

      {/* Modules */}
      <div className="border-y border-white/[0.06] bg-deep/25 py-16 sm:py-20">
        <Section>
          <SectionHeading
            eyebrow="Inside the lab"
            title="Six kinds of practice"
            lede="Each runs in a disposable container or an isolated virtual network. State is destroyed when your session ends."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {labModules.map((m, i) => {
              const Icon = icons[m.icon] ?? Search;
              return (
                <Card
                  key={m.title}
                  data-reveal
                  style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
                  className="flex flex-col"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-green/20 bg-green/[0.06]">
                      <Icon className="h-4 w-4 text-green" />
                    </div>
                    <span className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-muted">
                      {m.stat}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[0.9375rem] font-bold text-ink">
                    {m.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-muted">{m.body}</p>
                </Card>
              );
            })}
          </div>
        </Section>
      </div>

      {/* Rules */}
      <Section className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green" />
              <p className="label-mono text-green">Lab charter</p>
            </div>
            <h2 className="display-md mt-4 text-ink">
              Authorisation is
              <br />
              not a formality.
            </h2>
            <p className="mt-4 text-[0.875rem] leading-relaxed text-muted">
              The line between a security professional and a criminal is written permission. We
              teach that boundary before we teach the first technique, and we enforce it without
              exception.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill tone="green">Isolated</Pill>
              <Pill tone="cyan">Supervised</Pill>
              <Pill tone="violet">Disposable</Pill>
            </div>
          </div>

          <div className="space-y-2.5">
            {labRules.map((r, i) => (
              <div
                key={r}
                className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/12 font-mono text-[0.55rem] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.8125rem] leading-relaxed text-muted">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* How it sits in the programme */}
      <div className="border-y border-white/[0.06] bg-deep/25 py-16">
        <Section>
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Taught alongside theory",
                body: "Every lab session is preceded by the concept it exercises, and debriefed afterwards. You should be able to explain what you did, not just that it worked.",
              },
              {
                icon: Terminal,
                title: "Assessed, not optional",
                body: "Lab checkpoints count toward your assessment. The practical defence of your project is the final examination.",
              },
              {
                icon: Award,
                title: "Evidenced in your portfolio",
                body: "Lab write-ups and case files are portfolio artefacts. They are what you show an employer when a certificate is not enough.",
              },
            ].map((x) => (
              <div key={x.title}>
                <x.icon className="h-4 w-4 text-cyan" />
                <h3 className="mt-3 font-display text-base font-bold text-ink">{x.title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{x.body}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="display-md text-ink">Ready to work a real queue?</h2>
          <p className="mx-auto mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-muted">
            The scenario above is a compressed taste. The programme version includes the logs, the
            tools, the instructor and the debrief.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/programmes/security-operations" size="lg" icon>
              Security Operations
            </Button>
            <Button href="/programmes/cybersecurity-fundamentals" variant="secondary" size="lg">
              Start at fundamentals
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
