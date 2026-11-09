import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  Eye,
  Flag,
  Hammer,
  Handshake,
  MapPin,
  Quote,
  Scale,
  Target,
} from "lucide-react";
import { PageHero } from "@/components/shell/page-hero";
import { Button, Card, Pill, Section, SectionHeading } from "@/components/ui/primitives";
import { academy, departments, integrityNotes } from "@/data/academy";
import { programmes } from "@/data/programmes";
import { faqs, values } from "@/data/content";

export const metadata: Metadata = {
  title: "About Cyber Elias Academy",
  description:
    "Cyber Elias Academy is a technology and cybersecurity training institution at 24 Ebony Road, Port Harcourt. Our story, mission, values, teaching philosophy and campus.",
  alternates: { canonical: "/about" },
};

const valueIcons: Record<string, React.ElementType> = {
  hammer: Hammer,
  scale: Scale,
  lock: Target,
  door: Compass,
  map: MapPin,
  folder: Flag,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AboutPage() {
  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="About CEA"
        title={
          <>
            A working lab,
            <br />
            <span className="text-muted/60">not a lecture hall.</span>
          </>
        }
        lede={`${academy.name} exists because technical education in the region too often stops at theory. We built a campus where the tools run, the labs are live, and the output is work you can show.`}
        crumbs={[{ label: "About" }]}
        actions={
          <>
            <Button href="/programmes" icon>
              Explore programmes
            </Button>
            <Button href="/contact" variant="secondary">
              Visit the campus
            </Button>
          </>
        }
        visual={
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.09]">
            <Image
              src="/images/campus.jpg"
              alt="Cyber Elias Academy training environment"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/75 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-void/70 px-4 py-3 backdrop-blur-md">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-cyan">
                campus
              </p>
              <p className="mt-1 text-[0.8125rem] text-ink">{academy.address.line1}</p>
              <p className="text-[0.75rem] text-muted">
                {academy.address.city}, {academy.address.state}
              </p>
            </div>
          </div>
        }
      />

      {/* Story */}
      <Section className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="label-mono text-cyan/90">Our story</p>
            <h2 className="display-md mt-4 text-ink">
              Built in the city,
              <br />
              for the city.
            </h2>
          </div>
          <div className="space-y-5 text-[0.9375rem] leading-relaxed text-muted">
            <p>
              Port Harcourt has no shortage of ambitious young people. What it has had less of is a
              place to become technically dangerous — somewhere with working machines, real test
              environments, and instructors who still do the work they teach.
            </p>
            <p>
              {academy.shortName} was established to close that gap. Not by importing an imported
              curriculum, but by building a lab that reflects local realities: unreliable power,
              constrained bandwidth, procurement that never quite matches the vendor demo. We teach
              the standard, and we teach it under the conditions you will actually meet.
            </p>
            <p>
              The academy is deliberately small. Cohorts stay tight enough for an instructor to know
              what each student has built. Assessment is practical because capability is practical —
              nobody was ever hired for watching a video.
            </p>
            <div className="rounded-xl border-l-2 border-l-cyan bg-cyan/[0.04] p-4">
              <p className="text-[0.875rem] leading-relaxed text-ink/85">
                Our founding principle is simple and slightly uncomfortable:{" "}
                <span className="text-ink">
                  if a claim cannot be evidenced, it does not go on the website.
                </span>{" "}
                That is why you will not find salary promises or invented placement rates here.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission / vision / philosophy */}
      <div className="border-y border-white/[0.06] bg-deep/25 py-16 sm:py-20">
        <Section>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Target,
                label: "Mission",
                title: "Turn curiosity into capability",
                body: "To deliver practical, affordable technology education that produces demonstrable skill — and to hold ourselves to that standard publicly.",
                tone: "cyan",
              },
              {
                icon: Eye,
                label: "Vision",
                title: "A regional standard for technical education",
                body: "A Rivers State where world-class technical careers are built locally, and where CEA graduates are known for the quality of their work rather than the size of their promises.",
                tone: "green",
              },
              {
                icon: Compass,
                label: "Philosophy",
                title: "Build, then defend it",
                body: "Learning is verified by production. Every module ends in something running, something fixed, or something documented — and you explain it out loud.",
                tone: "violet",
              },
            ].map((item) => (
              <Card key={item.label} glow className="flex flex-col">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    item.tone === "cyan"
                      ? "border-cyan/25 bg-cyan/[0.08]"
                      : item.tone === "green"
                        ? "border-green/25 bg-green/[0.08]"
                        : "border-violet/25 bg-violet/[0.1]"
                  }`}
                >
                  <item.icon
                    className={`h-4.5 w-4.5 ${
                      item.tone === "cyan"
                        ? "text-cyan"
                        : item.tone === "green"
                          ? "text-green"
                          : "text-violet-300"
                    }`}
                  />
                </div>
                <p className="mt-4 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                  {item.label}
                </p>
                <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted">{item.body}</p>
              </Card>
            ))}
          </div>
        </Section>
      </div>

      {/* Values */}
      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Core values"
          title="What we hold ourselves to"
          lede="Six commitments that shape the curriculum, the assessment and what we are willing to publish."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => {
            const Icon = valueIcons[v.icon] ?? Target;
            return (
              <div
                key={v.title}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
                className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors hover:border-white/[0.14]"
              >
                <Icon className="h-4 w-4 text-cyan/80" />
                <h3 className="mt-3 font-display text-[0.9375rem] font-bold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{v.body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Founder */}
      <div className="border-y border-white/[0.06] bg-deep/25 py-16 sm:py-20">
        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
            <div>
              <p className="label-mono text-cyan/90">Founder&apos;s message</p>
              <div className="mt-5 flex aspect-square max-w-[16rem] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] p-6 text-center">
                <Quote className="h-6 w-6 text-cyan/40" />
                <p className="mt-3 text-[0.75rem] leading-relaxed text-muted">
                  Founder portrait and biography pending verified CEA content.
                </p>
              </div>
            </div>
            <div className="max-w-2xl">
              <Quote className="h-8 w-8 text-cyan/30" />
              <blockquote className="mt-4 font-display text-xl font-medium leading-[1.45] tracking-[-0.02em] text-ink sm:text-2xl">
                We are not selling certificates. We are trying to produce people who can be handed
                a problem at 11pm and be trusted with it.
              </blockquote>
              <p className="mt-6 text-[0.875rem] leading-relaxed text-muted">
                The academy was built on a simple observation: the gap between what employers need
                and what training provides is usually a gap in practice, not in knowledge. So we
                inverted the model — practice first, explanation second, assessment that looks like
                the job.
              </p>
              <p className="mt-4 text-[0.875rem] leading-relaxed text-muted">
                If you are here to learn something you can use, you are in the right place. If you
                are here for a credential to hang on a wall, we will still teach you — but the work
                will be the point.
              </p>
              <div className="mt-7 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-dashed border-white/15 bg-white/[0.03]" />
                <div>
                  <p className="text-[0.8125rem] text-ink/80">Founder, Cyber Elias Academy</p>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-muted">
                    name & portrait to be supplied
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Campus & facilities */}
      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Facilities"
          title="The room where it happens"
          lede="A training floor with working workstations, an isolated network bench, and a repair workshop. Modest, functional, and used every day."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Training floor",
              body: "Individual workstations with current software, a projector wall for live demonstration, and power redundancy for sessions that cannot pause.",
              image: "/images/dept-productivity.jpg",
            },
            {
              title: "Isolated lab bench",
              body: "A physically separate network segment for offensive and defensive exercises. Nothing on the bench can reach the internet or production systems.",
              image: "/images/dept-cybersecurity.jpg",
            },
            {
              title: "Repair workshop",
              body: "Bench tools, diagnostic equipment and donor hardware for the repairs programme — real machines with real faults.",
              image: "/images/dept-cloud.jpg",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-deep/30"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:grid-cols-3">
          {integrityNotes.map((n) => (
            <div key={n.id}>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-cyan/80">
                {n.title}
              </p>
              <p className="mt-2 text-[0.75rem] leading-relaxed text-muted">{n.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Partnerships */}
      <div className="border-y border-white/[0.06] bg-deep/25 py-16">
        <Section>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-lg">
              <div className="flex items-center gap-2">
                <Handshake className="h-4 w-4 text-green" />
                <p className="label-mono text-green">Partnerships & impact</p>
              </div>
              <h2 className="mt-3 display-md text-ink">No logos we haven&apos;t earned</h2>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">
                This section stays empty until CEA has documented relationships to show. We would
                rather display nothing than imply an affiliation that does not exist.
              </p>
            </div>
            <div className="grid flex-1 gap-3 sm:grid-cols-3">
              {["Employer relationships", "School outreach", "Community training"].map((x) => (
                <div
                  key={x}
                  className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.12] px-4 py-8 text-center"
                >
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted/60">
                    reserved
                  </span>
                  <p className="mt-2 text-[0.75rem] text-muted">{x}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* FAQ */}
      <Section id="faq" className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Frequently asked"
          title="Straight answers"
          lede="The questions applicants ask most, answered the way we would answer them in person."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_16rem]">
          <div className="space-y-8">
            {categories.map((cat) => (
              <div key={cat}>
                <h3 className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cyan/80">
                  {cat}
                </h3>
                <div className="mt-3 divide-y divide-white/[0.06] rounded-xl border border-white/[0.07] bg-white/[0.02]">
                  {faqs
                    .filter((f) => f.category === cat)
                    .map((f) => (
                      <details key={f.q} className="group px-5 py-4">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[0.875rem] font-medium text-ink">
                          {f.q}
                          <span className="text-muted transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">{f.a}</p>
                      </details>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                Still unsure?
              </p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                Admissions will tell you honestly whether a pathway fits — including when it does
                not.
              </p>
              <Button href="/contact" size="sm" className="mt-4 w-full">
                Contact admissions
              </Button>
              <Button href="/programmes" variant="secondary" size="sm" className="mt-2 w-full">
                Browse programmes
              </Button>
            </div>
            <div className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                At a glance
              </p>
              <dl className="mt-3 space-y-2.5">
                {[
                  ["Programmes", String(programmes.length)],
                  ["Departments", String(departments.length)],
                  ["Campus", academy.address.city],
                  ["Email", academy.contact.admissionsEmail],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-2">
                    <dt className="text-[0.75rem] text-muted">{k}</dt>
                    <dd className="text-right font-mono text-[0.65rem] text-ink/85">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      {/* CTA */}
      <Section className="pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-cyan/[0.07] via-transparent to-violet/[0.07] p-8 sm:p-12">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-25" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="display-md max-w-lg text-ink">
                Come and see the lab before you commit.
              </h2>
              <p className="mt-3 max-w-md text-[0.875rem] leading-relaxed text-muted">
                Open Lab Night runs monthly. Bring a laptop, work a scenario, and decide whether
                this is the place for you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/community" icon>
                See events
              </Button>
              <Button href="/apply" variant="secondary">
                Apply now
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
