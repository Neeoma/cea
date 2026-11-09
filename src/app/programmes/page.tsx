import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalogue } from "@/components/programmes/catalogue";
import { PageHero } from "@/components/shell/page-hero";
import { Button, Section } from "@/components/ui/primitives";
import { departments } from "@/data/academy";
import { programmes } from "@/data/programmes";

export const metadata: Metadata = {
  title: "Programmes & courses",
  description:
    "Browse every Cyber Elias Academy programme: cybersecurity, software development, AI and data, cloud and networking, design and digital productivity. Filter by department, level, learning mode and duration.",
  alternates: { canonical: "/programmes" },
};

export default function ProgrammesPage() {
  const totalLabs = programmes.reduce(
    (sum, p) =>
      sum +
      p.modules.reduce(
        (s, m) => s + m.lessons.filter((l) => l.type === "Lab" || l.type === "Project").length,
        0,
      ),
    0,
  );

  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title={
          <>
            Every pathway,
            <br />
            <span className="text-muted/60">one record.</span>
          </>
        }
        lede="Fourteen programmes across six departments. Filter by what you want to do, how much time you have, and how you prefer to learn. Fees and cohort dates are confirmed by admissions."
        crumbs={[{ label: "Programmes" }]}
        meta={[
          { label: "Programmes", value: String(programmes.length) },
          { label: "Departments", value: String(departments.length) },
          { label: "Lab sessions", value: `${totalLabs}+` },
          { label: "Modes", value: "3" },
        ]}
        actions={
          <>
            <Button href="/apply" icon>
              Apply for a programme
            </Button>
            <Button href="/admissions" variant="secondary">
              How admissions works
            </Button>
          </>
        }
      />

      <Section className="pb-24">
        <Suspense
          fallback={
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                />
              ))}
            </div>
          }
        >
          <Catalogue />
        </Suspense>
      </Section>
    </>
  );
}
