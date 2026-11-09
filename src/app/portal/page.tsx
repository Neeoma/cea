import type { Metadata } from "next";
import { PortalDashboard } from "@/components/portal/portal-dashboard";
import { PageHero } from "@/components/shell/page-hero";
import { Button } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Student portal",
  description:
    "The CEA student portal: enrolled courses, progress tracking, assignments, assessments, certificates, announcements, payments and cohort discussion.",
  alternates: { canonical: "/portal" },
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  return (
    <>
      <PageHero
        eyebrow="Student portal"
        title={
          <>
            Your learning,
            <br />
            <span className="text-muted/60">in one place.</span>
          </>
        }
        lede="Courses, progress, assignments, certificates and cohort discussion. This is a working preview populated with demonstration data."
        crumbs={[{ label: "Portal" }]}
        actions={
          <>
            <Button href="/login" variant="secondary">
              Sign in
            </Button>
            <Button href="/apply">New applicant?</Button>
          </>
        }
      />
      <PortalDashboard />
    </>
  );
}
