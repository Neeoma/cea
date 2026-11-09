import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import {
  Pillars,
  Departments,
  FeaturedProgrammes,
  LearningExperience,
  CyberLabShowcase,
  StudentProjects,
  AboutStrip,
  Testimonials,
  CommunityStrip,
  IntegrityNote,
  FinalCTA,
} from "@/components/home/sections";
import { Ticker } from "@/components/ui/primitives";
import { programmes } from "@/data/programmes";

export const metadata: Metadata = {
  title: "Cyber Elias Academy — Master the digital world. Build what comes next.",
  description:
    "Cybersecurity, software development, AI and design training in Port Harcourt, Rivers State. Practical, lab-led programmes with real project work at Cyber Elias Academy.",
  alternates: { canonical: "/" },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Cyber Elias Academy programmes",
  itemListElement: programmes.slice(0, 8).map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Course",
      name: p.title,
      description: p.summary,
      url: `https://www.cea.ng/programmes/${p.slug}`,
      provider: {
        "@type": "EducationalOrganization",
        name: "Cyber Elias Academy",
        sameAs: "https://www.cea.ng",
      },
      timeRequired: `P${p.durationWeeks}W`,
      educationalLevel: p.level,
      teaches: p.outcomes.slice(0, 4),
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <Hero />
      <Ticker
        items={[
          "Cybersecurity",
          "Software development",
          "AI & data",
          "Cloud & networking",
          "Design",
          "Digital productivity",
          "Port Harcourt",
          "Hands-on labs",
          "Project-based",
        ]}
      />
      <Pillars />
      <Departments />
      <FeaturedProgrammes />
      <LearningExperience />
      <CyberLabShowcase />
      <StudentProjects />
      <AboutStrip />
      <Testimonials />
      <CommunityStrip />
      <IntegrityNote />
      <FinalCTA />
    </>
  );
}
