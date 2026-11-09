import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  Check,
  ClipboardCheck,
  Clock,
  FlaskConical,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import { PageHero } from "@/components/shell/page-hero";
import { Curriculum } from "@/components/programmes/curriculum";
import { ProgrammeCard } from "@/components/programmes/programme-card";
import { Button, Card, Pill, Section, SectionHeading } from "@/components/ui/primitives";
import { academy, departmentById } from "@/data/academy";
import {
  programmeBySlug,
  programmes,
  totalLabs,
  totalLessons,
  totalMinutes,
} from "@/data/programmes";
import { faqs } from "@/data/content";

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = programmeBySlug(slug);
  if (!p) return { title: "Programme not found" };
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/programmes/${p.slug}` },
    openGraph: {
      title: `${p.title} · Cyber Elias Academy`,
      description: p.tagline,
      images: [{ url: p.heroImage }],
    },
  };
}

export default async function ProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const programme = programmeBySlug(slug);
  if (!programme) notFound();

  const dept = departmentById(programme.department);
  const related = programmes
    .filter((p) => p.department === programme.department && p.slug !== programme.slug)
    .concat(programmes.filter((p) => p.department !== programme.department))
    .slice(0, 3);

  const hours = Math.round(totalMinutes(programme) / 60);
  const relevantFaqs = faqs.filter(
    (f) => f.category === "Admissions" || f.category === "Fees" || f.category === "Certification",
  );

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: programme.title,
    description: programme.summary,
    url: `${academy.url}/programmes/${programme.slug}`,
    provider: {
      "@type": "EducationalOrganization",
      name: academy.name,
      sameAs: academy.url,
    },
    educationalLevel: programme.level,
    timeRequired: `P${programme.durationWeeks}W`,
    teaches: programme.outcomes,
    hasCourseInstance: programme.modes.map((mode) => ({
      "@type": "CourseInstance",
      courseMode: mode.toLowerCase(),
      courseWorkload: `PT${programme.hoursPerWeek}H`,
      location: {
        "@type": "Place",
        name: academy.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: academy.address.line1,
          addressLocality: academy.address.city,
          addressRegion: academy.address.state,
          addressCountry: "NG",
        },
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: relevantFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const facts = [
    { label: "Level", value: programme.level, icon: GraduationCap },
    { label: "Duration", value: `${programme.durationWeeks} weeks`, icon: Clock },
    { label: "Study load", value: `${programme.hoursPerWeek} hrs / week`, icon: Target },
    { label: "Modes", value: programme.modes.join(" · "), icon: MapPin },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow={`${dept.name} · ${programme.level}`}
        title={programme.title}
        lede={programme.summary}
        crumbs={[
          { label: "Programmes", href: "/programmes" },
          { label: dept.name, href: `/programmes?department=${dept.id}` },
          { label: programme.title },
        ]}
        actions={
          <>
            <Button href={`/apply?programme=${programme.slug}`} icon>
              Apply for this programme
            </Button>
            <Button href="/contact" variant="secondary">
              Ask admissions
            </Button>
          </>
        }
        visual={
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.09]">
              <Image
                src={programme.heroImage}
                alt={`${programme.title} at Cyber Elias Academy`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-white/10 bg-void/70 px-3.5 py-2.5 backdrop-blur-md">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">
                  tuition
                </span>
                <span className="font-mono text-[0.7rem] text-cyan">
                  {programme.fee ? `₦${programme.fee.toLocaleString()}` : "On request"}
                </span>
              </div>
            </div>
          </div>
        }
      />

      {/* Fact bar */}
      <div className="border-y border-white/[0.07] bg-deep/30">
        <div className="container-cea grid grid-cols-2 divide-x divide-white/[0.06] sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="px-4 py-5 first:pl-0 sm:px-6">
              <div className="flex items-center gap-1.5">
                <f.icon className="h-3 w-3 text-cyan/70" />
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">
                  {f.label}
                </span>
              </div>
              <p className="mt-1.5 text-[0.8125rem] font-medium text-ink">{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      <Section className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="min-w-0 space-y-16">
            {/* Who it's for + outcomes */}
            <div id="overview" className="grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                  <Users className="h-4 w-4 text-cyan" /> Who it&apos;s for
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {programme.audience.map((a) => (
                    <li key={a} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                      <span className="text-[0.8125rem] leading-relaxed text-muted">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                  <Target className="h-4 w-4 text-green" /> What you&apos;ll be able to do
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {programme.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green" />
                      <span className="text-[0.8125rem] leading-relaxed text-muted">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Curriculum */}
            <div id="curriculum">
              <SectionHeading
                eyebrow="Curriculum"
                title={`${programme.modules.length} modules · ${totalLessons(programme)} learning items`}
                lede={`Roughly ${hours} hours of guided work, including ${totalLabs(programme)} lab and project sessions.`}
                className="!gap-4"
              />
              <div className="mt-8">
                <Curriculum modules={programme.modules} />
              </div>
            </div>

            {/* Prerequisites & tools */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink">
                  <ClipboardCheck className="h-4 w-4 text-cyan" /> Prerequisites
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {(programme.prerequisites.length > 0
                    ? programme.prerequisites
                    : ["No prior experience required — this is an entry-level programme."]
                  ).map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
                      <span className="text-[0.8125rem] leading-relaxed text-muted">{p}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink">
                  <Wrench className="h-4 w-4 text-violet-300" /> Tools you&apos;ll use
                </h2>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {programme.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-white/[0.09] bg-white/[0.03] px-2.5 py-1.5 font-mono text-[0.65rem] text-ink/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            {/* Projects */}
            <div>
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                <FlaskConical className="h-4 w-4 text-green" /> Practical projects
              </h2>
              <p className="mt-2 text-[0.8125rem] text-muted">
                The portfolio pieces this programme produces — the work you show afterwards.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {programme.projects.map((p, i) => (
                  <div
                    key={p.title}
                    className="relative rounded-xl border border-white/[0.07] bg-white/[0.02] p-5"
                  >
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-green/70">
                      Project {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-[0.9375rem] font-bold text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">{p.brief}</p>
                    <p className="mt-3 border-t border-white/[0.06] pt-2.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted/80">
                      Deliverable: {p.deliverable}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment & certificate */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4 text-cyan" />
                  <h2 className="font-display text-[0.9375rem] font-bold text-ink">Assessment</h2>
                </div>
                <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted">
                  {programme.assessment}
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-violet-300" />
                  <h2 className="font-display text-[0.9375rem] font-bold text-ink">
                    Certification
                  </h2>
                </div>
                <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted">
                  {programme.certificate}
                </p>
                <Link
                  href="/verify"
                  className="mt-3 inline-flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-cyan hover:underline"
                >
                  Verification portal <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Instructor */}
            <div id="instructor">
              <h2 className="font-display text-lg font-bold text-ink">Instructor</h2>
              {programme.instructor ? (
                <div className="mt-4 flex items-start gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyan/25 bg-cyan/[0.08] font-display text-sm font-bold text-cyan">
                    {programme.instructor.initials}
                  </div>
                  <div>
                    <p className="font-display text-[0.9375rem] font-bold text-ink">
                      {programme.instructor.name}
                    </p>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-cyan/80">
                      {programme.instructor.role}
                    </p>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                      {programme.instructor.bio}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-white/[0.12] p-5">
                  <p className="text-[0.8125rem] leading-relaxed text-muted">
                    Instructor assignment is confirmed for each cohort. CEA publishes instructor
                    profiles only once verified — ask admissions which practitioner leads this
                    intake.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ */}
            <div id="faq">
              <h2 className="font-display text-lg font-bold text-ink">Common questions</h2>
              <div className="mt-4 divide-y divide-white/[0.06] rounded-xl border border-white/[0.07] bg-white/[0.02]">
                {relevantFaqs.map((f) => (
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
          </div>

          {/* Sticky apply rail */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="glass glow-edge rounded-2xl p-5">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                next intake
              </p>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink">
                {programme.cohort}
              </p>

              <div className="mt-5 space-y-2.5 border-y border-white/[0.08] py-4">
                {[
                  ["Tuition", programme.fee ? `₦${programme.fee.toLocaleString()}` : "On request"],
                  ["Duration", `${programme.durationWeeks} weeks`],
                  ["Study load", `${programme.hoursPerWeek} hrs / week`],
                  ["Level", programme.level],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-3">
                    <span className="text-[0.75rem] text-muted">{k}</span>
                    <span className="font-mono text-[0.7rem] text-ink/85">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {programme.modes.map((m) => (
                  <Pill key={m} tone="cyan">
                    {m}
                  </Pill>
                ))}
              </div>

              <Button href={`/apply?programme=${programme.slug}`} className="mt-5 w-full" icon>
                Apply now
              </Button>
              <Button href="/contact" variant="secondary" className="mt-2 w-full">
                Talk to admissions
              </Button>

              <div className="mt-4 flex items-start gap-2 rounded-lg bg-green/[0.05] p-2.5">
                <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0 text-green" />
                <p className="text-[0.65rem] leading-relaxed text-green/85">
                  Fees, schedule and instructor confirmed in writing by admissions before you pay
                  anything.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                campus
              </p>
              <p className="mt-2 text-[0.75rem] leading-relaxed text-ink/85">
                {academy.address.line1}
                <br />
                {academy.address.city}, {academy.address.state}
              </p>
            </div>
          </aside>
        </div>
      </Section>

      {/* Related */}
      <div className="border-t border-white/[0.07] bg-deep/25 py-16">
        <Section>
          <SectionHeading
            eyebrow="Continue"
            title="Related programmes"
            aside={
              <Button href="/programmes" variant="secondary" size="sm" icon>
                All programmes
              </Button>
            }
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProgrammeCard key={p.slug} programme={p} />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
