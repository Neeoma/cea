import type { Metadata } from "next";
import { Award, Briefcase, CalendarDays, Flag, MapPin, Network, Trophy, Users } from "lucide-react";
import { PageHero } from "@/components/shell/page-hero";
import { Button, Card, Pill, Section, SectionHeading } from "@/components/ui/primitives";
import { communityPillars, events } from "@/data/content";

export const metadata: Metadata = {
  title: "Community, events & alumni",
  description:
    "CEA community: Open Lab Nights, career clinics, capture-the-flag competitions, student clubs, mentorship and an opt-in alumni network in Port Harcourt.",
  alternates: { canonical: "/community" },
};

const icons: Record<string, React.ElementType> = {
  messages: Users,
  users: Users,
  flag: Flag,
  trophy: Trophy,
  network: Network,
  briefcase: Briefcase,
};

export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="Community"
        title={
          <>
            The academy doesn&apos;t
            <br />
            <span className="text-muted/60">close when class does.</span>
          </>
        }
        lede="Open labs, career clinics, competitions and clubs. Learning accelerates when you are surrounded by people doing the same work — including the ones slightly ahead of you."
        crumbs={[{ label: "Community" }]}
        meta={[
          { label: "Recurring events", value: "3" },
          { label: "Clubs", value: "Open" },
          { label: "Alumni", value: "Opt-in" },
          { label: "Location", value: "Port Harcourt" },
        ]}
        actions={
          <>
            <Button href="/contact" icon>
              Ask about events
            </Button>
            <Button href="/apply" variant="secondary">
              Join a cohort
            </Button>
          </>
        }
      />

      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="What happens"
          title="The recurring programme"
          lede="Scheduling below is the intended cadence — confirm each date with admissions, as the calendar is set per cohort."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {events.map((e, i) => (
            <Card
              key={e.id}
              data-reveal
              style={{ "--reveal-delay": `${(i % 2) * 70}ms` } as React.CSSProperties}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Pill
                  tone={e.kind === "Competition" ? "violet" : e.kind === "Webinar" ? "cyan" : "green"}
                >
                  {e.kind}
                </Pill>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-muted">
                  {e.status}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{e.title}</h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{e.description}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-3">
                <div>
                  <dt className="font-mono text-[0.5rem] uppercase tracking-[0.15em] text-muted">
                    cadence
                  </dt>
                  <dd className="mt-0.5 text-[0.75rem] text-ink/85">{e.cadence}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.5rem] uppercase tracking-[0.15em] text-muted">
                    time
                  </dt>
                  <dd className="mt-0.5 text-[0.75rem] text-ink/85">{e.time}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="font-mono text-[0.5rem] uppercase tracking-[0.15em] text-muted">
                    location
                  </dt>
                  <dd className="mt-0.5 flex items-center gap-1.5 text-[0.75rem] text-ink/85">
                    <MapPin className="h-3 w-3 text-cyan/70" /> {e.location}
                  </dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
      </Section>

      <div className="border-y border-white/[0.06] bg-deep/25 py-16">
        <Section>
          <SectionHeading eyebrow="Pillars" title="Where the community lives" />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {communityPillars.map((p, i) => {
              const Icon = icons[p.icon] ?? Users;
              return (
                <div
                  key={p.title}
                  data-reveal
                  style={{ "--reveal-delay": `${(i % 3) * 60}ms` } as React.CSSProperties}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5"
                >
                  <Icon className="h-4 w-4 text-cyan/80" />
                  <h3 className="mt-3 font-display text-[0.9375rem] font-bold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">{p.body}</p>
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      <Section className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="label-mono text-cyan/90">Code of conduct</p>
            <h2 className="display-md mt-4 text-ink">One rule, enforced</h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
              Everything the community does sits inside the same boundary the lab does:
              authorisation. Testing systems you do not own — inside or outside the campus — ends
              your participation immediately and permanently.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "Challenge infrastructure is provided and supervised",
                "Findings are shared responsibly, never published to expose a target",
                "Members support beginners rather than gatekeeping knowledge",
                "Harassment of any kind is not tolerated in any CEA space",
              ].map((r) => (
                <li key={r} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green" />
                  <span className="text-[0.8125rem] leading-relaxed text-muted">{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-mono text-violet-300">Alumni</p>
            <h2 className="display-md mt-4 text-ink">The directory is opt-in</h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
              Graduates choose whether to be listed. If they are, it is to be contacted for
              collaboration, mentorship or hiring — not for a mailing list.
            </p>
            <div className="mt-6 rounded-xl border border-dashed border-white/[0.12] p-6 text-center">
              <Network className="mx-auto h-5 w-5 text-muted/50" />
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
                Alumni profiles appear here once graduates have given written consent. Nothing is
                listed by default.
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {[
                { icon: CalendarDays, label: "Event calendar", detail: "Confirmed per cohort" },
                { icon: Award, label: "Certificates", detail: "Verifiable online" },
              ].map((x) => (
                <div
                  key={x.label}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
                >
                  <x.icon className="h-4 w-4 text-cyan/70" />
                  <p className="mt-2.5 text-[0.8125rem] font-medium text-ink">{x.label}</p>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted">
                    {x.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
