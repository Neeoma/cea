import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Code2,
  Cpu,
  Layers,
  MapPin,
  Network,
  PenTool,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import { academy, departments, integrityNotes } from "@/data/academy";
import { featuredProgrammes, programmes } from "@/data/programmes";
import { events, studentProjects, testimonials, values, communityPillars } from "@/data/content";
import { Button, Card, GlowOrb, Pill, Section, SectionHeading } from "@/components/ui/primitives";
import { ProgrammeCard } from "@/components/programmes/programme-card";
import { LearningJourney } from "./learning-journey";
import { CommandCentre } from "@/components/immersive/command-centre";
import { LabSimulation } from "@/components/immersive/lab-simulation";

const deptIcons: Record<string, React.ElementType> = {
  shield: ShieldCheck,
  code: Code2,
  brain: Sparkles,
  cloud: Network,
  pen: PenTool,
  monitor: Cpu,
};

/* ------------------------------------------------------------------ */
/* Pillars                                                             */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    icon: Wrench,
    title: "Practical learning",
    body: "Learn by doing, not by watching. Every module ends with something built, configured, tested or repaired.",
    metric: "Lab-led",
  },
  {
    icon: Target,
    title: "Industry-relevant skills",
    body: "Curriculum written against the work itself — the tools, documentation standards and constraints you will meet.",
    metric: "Applied",
  },
  {
    icon: Users,
    title: "Expert instruction",
    body: "Taught by practitioners who work in the field they teach, in cohorts small enough to be accountable.",
    metric: "Small cohorts",
  },
  {
    icon: Briefcase,
    title: "Career development",
    body: "Portfolio review, CV and interview preparation, and Demo Day exposure — evidence over promises.",
    metric: "Evidence-first",
  },
];

export function Pillars() {
  return (
    <Section className="py-20 sm:py-28">
      <SectionHeading
        eyebrow="Why CEA"
        title={
          <>
            Training built for
            <br />
            <span className="text-muted/60">what comes after it.</span>
          </>
        }
        lede="A technology academy is only as good as what its graduates can do. Everything here is organised around demonstrable capability."
        aside={
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-cyan"
          >
            Our approach
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Card key={p.title} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan/20 bg-cyan/[0.07]">
                <p.icon className="h-5 w-5 text-cyan" />
              </div>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted/60">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-5 font-display text-base font-bold text-ink">{p.title}</h3>
            <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted">{p.body}</p>
            <p className="mt-5 border-t border-white/[0.06] pt-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cyan/70">
              {p.metric}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Departments                                                         */
/* ------------------------------------------------------------------ */

export function Departments() {
  return (
    <Section className="relative py-20 sm:py-28">
      <GlowOrb className="-left-40 top-20 h-96 w-96" />
      <SectionHeading
        eyebrow="Explore programmes"
        title={
          <>
            Six departments.
            <br />
            One standard.
          </>
        }
        lede="Start broad or go specialist. Every department has a defined pathway from first principles to portfolio work."
        aside={
          <Button href="/programmes" variant="secondary" size="sm" icon>
            All {programmes.length} programmes
          </Button>
        }
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((d, i) => {
          const Icon = deptIcons[d.icon] ?? ShieldCheck;
          const count = programmes.filter((p) => p.department === d.id).length;
          return (
            <Link
              key={d.id}
              href={`/programmes?department=${d.id}`}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-deep/30 transition-all duration-500 hover:-translate-y-1 hover:border-cyan/30 hover:bg-deep/60"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={d.image}
                  alt={`${d.name} department at Cyber Elias Academy`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-70 transition-all duration-[900ms] group-hover:scale-105 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-transparent" />
                <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-void/70 backdrop-blur-md">
                  <Icon className="h-4 w-4 text-cyan" />
                </div>
                <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-void/60 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.15em] text-ink/70 backdrop-blur-md">
                  {count} {count === 1 ? "programme" : "programmes"}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                  {d.name}
                </h3>
                <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-muted">
                  {d.short}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {d.bullets.map((b) => (
                    <span
                      key={b}
                      className="rounded border border-white/[0.08] px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-muted/80"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3.5">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                    View department
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-cyan transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Featured programmes                                                 */
/* ------------------------------------------------------------------ */

export function FeaturedProgrammes() {
  return (
    <div className="relative border-y border-white/[0.06] bg-deep/25 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 dot-bg opacity-[0.25]" />
      <Section className="relative">
        <SectionHeading
          eyebrow="Flagship pathways"
          title="Where most people start"
          lede="Four programmes that cover the widest range of entry points — from total beginner to specialist security work."
          aside={
            <Button href="/programmes" variant="secondary" size="sm" icon>
              Compare all
            </Button>
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProgrammes.map((p, i) => (
            <ProgrammeCard key={p.slug} programme={p} priority={i < 2} />
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Learning experience                                                 */
/* ------------------------------------------------------------------ */

export function LearningExperience() {
  return (
    <Section className="py-20 sm:py-28">
      <SectionHeading
        eyebrow="The learning experience"
        title={
          <>
            From curious to
            <br />
            <span className="text-cyan">capable.</span>
          </>
        }
        lede="Six stages, deliberately sequenced. Progress is measured by what you can produce, not how much material you have seen."
      />
      <div className="mt-12">
        <LearningJourney />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Cyber lab                                                           */
/* ------------------------------------------------------------------ */

export function CyberLabShowcase() {
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-[#05090f] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <GlowOrb className="-right-32 top-0 h-[30rem] w-[30rem]" color="cyan" />
      <GlowOrb className="-left-24 bottom-0 h-80 w-80" color="green" />

      <Section className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan" />
              <span className="label-mono text-cyan/90">Enter the cyber lab</span>
            </div>
            <h2 className="display-lg text-ink">
              Don&apos;t read about
              <br />
              security.
              <br />
              <span className="text-cyan">Work it.</span>
            </h2>
            <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-muted">
              A real analyst&apos;s morning is an alert queue, a timeline and a decision you
              have to defend. Try a compressed version of that here — four decisions, no
              prior experience required.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Fictional scenarios — no real systems involved",
                "Every answer explained, including the wrong ones",
                "Scores feed into guided debriefs in the programme",
              ].map((line) => (
                <div key={line} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green" />
                  <p className="text-[0.8125rem] leading-relaxed text-muted">{line}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/cyber-lab" icon>
                Full lab overview
              </Button>
              <Button href="/programmes?department=cybersecurity" variant="secondary">
                Security pathways
              </Button>
            </div>

            <div className="mt-8">
              <CommandCentre />
            </div>
          </div>

          <div>
            <LabSimulation />
            <p className="mt-4 flex items-start gap-2 text-[0.7rem] leading-relaxed text-muted/70">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green" />
              This is an educational simulation using entirely fictional data. CEA does not
              scan, probe or attack real systems, and neither should you.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Student projects                                                    */
/* ------------------------------------------------------------------ */

const accentText: Record<string, string> = {
  cyan: "text-cyan border-cyan/30 bg-cyan/[0.06]",
  green: "text-green border-green/30 bg-green/[0.06]",
  violet: "text-violet-300 border-violet/30 bg-violet/[0.08]",
};

export function StudentProjects() {
  return (
    <Section className="py-20 sm:py-28">
      <SectionHeading
        eyebrow="Student work"
        title="The portfolio is the qualification"
        lede="Capstones, case files and studio briefs from the programme. Every project below is listed as a template for the kind of work CEA students produce."
        aside={
          <Button href="/projects" variant="secondary" size="sm" icon>
            Project gallery
          </Button>
        }
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {studentProjects.map((p, i) => (
          <Card
            key={p.title}
            as="article"
            data-reveal
            className="flex flex-col"
            style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
          >
            <div className="flex items-center justify-between">
              <span
                className={`rounded-full border px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] ${accentText[p.accent]}`}
              >
                {p.discipline}
              </span>
              <Pill className="!text-[0.5rem]">Template</Pill>
            </div>
            <h3 className="mt-4 font-display text-base font-bold leading-snug text-ink">
              {p.title}
            </h3>
            <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-muted">
              {p.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
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
      <p className="mt-6 text-[0.7rem] leading-relaxed text-muted/60">
        Placeholder project records — student names, photographs and outcomes are published only
        with written consent. These entries demonstrate assessment categories.
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* About strip                                                         */
/* ------------------------------------------------------------------ */

export function AboutStrip() {
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06]">
      <div className="container-cea relative py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08]">
              <Image
                src="/images/campus.jpg"
                alt="Cyber Elias Academy training environment in Port Harcourt"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
            </div>
            <div className="glass absolute -bottom-6 -right-2 w-56 rounded-xl p-4 sm:-right-6 sm:w-64">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-cyan" />
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                  campus
                </span>
              </div>
              <p className="mt-2 text-[0.8125rem] leading-snug text-ink">
                {academy.address.line1}
              </p>
              <p className="text-[0.75rem] text-muted">
                {academy.address.city}, {academy.address.state}
              </p>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan" />
              <span className="label-mono text-cyan/90">About CEA</span>
            </div>
            <h2 className="display-lg text-ink">
              Built in Port Harcourt,
              <br />
              <span className="text-muted/60">built for what&apos;s next.</span>
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
              {academy.shortName} exists because technical education in the region too often
              stops at theory. Our campus at {academy.address.line1} is a working lab: real
              machines, isolated test environments, and instructors who are still practitioners.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
              {[
                { v: String(programmes.length), l: "Programmes" },
                { v: String(departments.length), l: "Departments" },
                { v: "3", l: "Learning modes" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-2xl font-bold text-ink">{s.v}</p>
                  <p className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-2.5">
              {values.slice(0, 3).map((v) => (
                <div key={v.title} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                  <p className="text-[0.8125rem] leading-relaxed text-muted">
                    <span className="text-ink">{v.title}.</span> {v.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about" variant="secondary" icon>
                Read our story
              </Button>
              <Button href="/contact" variant="ghost">
                Visit the campus
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export function Testimonials() {
  return (
    <Section className="py-20 sm:py-28">
      <SectionHeading
        eyebrow="Student voices"
        align="center"
        title="What learners say"
        lede="These are layout placeholders. CEA publishes testimonials only with written consent and never invents quotes or employment claims."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Card key={i} className="relative" data-reveal>
            <span className="absolute right-5 top-3 font-display text-5xl leading-none text-white/[0.06]">
              &rdquo;
            </span>
            <p className="relative text-[0.9375rem] leading-relaxed text-ink/85">
              {t.quote}
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-white/15 bg-white/[0.03] font-mono text-[0.6rem] text-muted">
                ?
              </div>
              <div>
                <p className="text-[0.8125rem] text-ink/80">{t.name}</p>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-muted">
                  {t.role}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Community & events                                                  */
/* ------------------------------------------------------------------ */

export function CommunityStrip() {
  return (
    <div className="relative border-y border-white/[0.06] bg-deep/25 py-20 sm:py-28">
      <Section>
        <SectionHeading
          eyebrow="Community & events"
          title="Learning continues outside the classroom"
          lede="Open labs, career clinics, CTFs and Demo Day. The academy is a room full of people doing the work."
          aside={
            <Button href="/community" variant="secondary" size="sm" icon>
              Community
            </Button>
          }
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            {events.map((e, i) => (
              <div
                key={e.id}
                data-reveal
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-cyan/25 hover:bg-white/[0.04]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Pill tone={e.kind === "Competition" ? "violet" : e.kind === "Webinar" ? "cyan" : "green"}>
                      {e.kind}
                    </Pill>
                    <h3 className="font-display text-[0.9375rem] font-bold text-ink">
                      {e.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-muted">
                    {e.cadence}
                  </span>
                </div>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                  {e.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted/70">
                  <span>{e.time}</span>
                  <span>{e.location}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {communityPillars.map((p, i) => {
              const icons: Record<string, React.ElementType> = {
                messages: Users,
                users: Users,
                flag: Award,
                trophy: Award,
                network: Network,
                briefcase: Briefcase,
              };
              const Icon = icons[p.icon] ?? Users;
              return (
                <div
                  key={p.title}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 50}ms` } as React.CSSProperties}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
                >
                  <Icon className="h-4 w-4 text-cyan/80" />
                  <h3 className="mt-3 font-display text-[0.875rem] font-bold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[0.75rem] leading-relaxed text-muted">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-6 text-[0.7rem] text-muted/60">
          Event schedule shown as an indicative template pending confirmed CEA calendar.
        </p>
      </Section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Integrity note                                                      */
/* ------------------------------------------------------------------ */

export function IntegrityNote() {
  return (
    <Section className="py-16">
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-green" />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-green">
                About these pages
              </span>
            </div>
            <h2 className="mt-3 font-display text-lg font-bold text-ink">
              One source of truth, no invented facts
            </h2>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
              Every programme on this site reads from a single curriculum record. Where CEA has
              not confirmed a detail, the page says so rather than guessing.
            </p>
          </div>
          <div className="grid flex-1 gap-4 sm:grid-cols-3">
            {integrityNotes.map((n) => (
              <div key={n.id}>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-cyan/80">
                  {n.title}
                </p>
                <p className="mt-1.5 text-[0.75rem] leading-relaxed text-muted">{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

export function FinalCTA() {
  return (
    <Section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(0,217,255,0.16),transparent_60%)]" />
        <div className="grid-bg absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_bottom,black,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-green/25 bg-green/[0.07] px-3.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-green">
            Applications open
          </span>
        </div>

        <h2 className="display-lg mt-6 text-ink">
          Your future in technology
          <br />
          <span className="text-cyan">starts here.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
          Take the first step towards building skills that matter in the digital world. Talk to
          admissions, choose a pathway, and start producing work you can show.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="/apply" size="lg" icon>
            Start your application
          </Button>
          <Button href="/programmes" variant="secondary" size="lg">
            Explore programmes
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Contact admissions
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted/70">
          <span>{academy.address.line1}</span>
          <span className="hidden h-1 w-1 rounded-full bg-muted/40 sm:block" />
          <span>{academy.address.city}</span>
          <span className="hidden h-1 w-1 rounded-full bg-muted/40 sm:block" />
          <span>{academy.contact.admissionsEmail}</span>
        </div>
      </div>
    </Section>
  );
}
