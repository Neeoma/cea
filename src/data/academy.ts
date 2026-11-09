/**
 * CEA — ACADEMY SOURCE OF TRUTH
 * ----------------------------------------------------------------------------
 * The brief is explicit: one authoritative record for courses, fees, durations,
 * delivery modes, campus information and admission requirements, with every
 * page pulling from it. This module is that record.
 *
 * Anything CEA has not yet confirmed is represented as `null` and rendered as
 * "On request" rather than being invented in the UI.
 */

export const academy = {
  name: "Cyber Elias Academy",
  shortName: "CEA",
  acronym: "CEA",
  domain: "cea.ng",
  url: "https://www.cea.ng",
  tagline: "The Future Is Built. Not Given.",
  promise: "Master the digital world. Build what comes next.",
  description:
    "Cyber Elias Academy is a technology and cybersecurity training institution in Port Harcourt, Rivers State, Nigeria. We turn curiosity into practical digital skill through hands-on labs, project work and career-focused learning pathways.",
  foundingYear: null, // to be confirmed by CEA
  address: {
    // The brief flags 24 vs 26 Ebony Road as conflicting. This is the single
    // canonical line; it must be confirmed by CEA before launch.
    line1: "24 Ebony Road, off Rumuola Road",
    city: "Port Harcourt",
    state: "Rivers State",
    country: "Nigeria",
    postal: null,
    confirmed: false,
  },
  geo: { lat: 4.8156, lng: 7.0498 },
  contact: {
    // Placeholder contact channels — replace with verified lines before launch.
    phone: null,
    whatsapp: null,
    admissionsEmail: "admissions@cea.ng",
    supportEmail: "hello@cea.ng",
    hours: "Mon – Fri · 9:00 – 17:00 WAT",
  },
  socials: {
    x: null,
    linkedin: null,
    instagram: null,
    youtube: null,
  },
} as const;

export type DepartmentId =
  | "cybersecurity"
  | "software"
  | "ai-data"
  | "cloud-network"
  | "design"
  | "productivity";

export type Department = {
  id: DepartmentId;
  name: string;
  short: string;
  description: string;
  icon: string;
  accent: "cyan" | "green" | "violet";
  image: string;
  bullets: string[];
};

export const departments: Department[] = [
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    short: "Digital defence, security operations and ethical security.",
    description:
      "Defensive security for the real world: how systems fail, how analysts detect it, and how organisations respond. Every pathway is taught inside a controlled, authorised lab environment.",
    icon: "shield",
    accent: "cyan",
    image: "/images/dept-cybersecurity.jpg",
    bullets: ["Security operations", "Ethical hacking concepts", "Forensics & response"],
  },
  {
    id: "software",
    name: "Software Development",
    short: "Websites, applications and software engineering.",
    description:
      "From your first line of HTML to a deployed full-stack application. You learn by shipping — version control, APIs, databases and the habits professional teams rely on.",
    icon: "code",
    accent: "green",
    image: "/images/dept-software.jpg",
    bullets: ["Frontend engineering", "Full-stack delivery", "Python & automation"],
  },
  {
    id: "ai-data",
    name: "AI & Data",
    short: "Artificial intelligence, analytics and data science.",
    description:
      "Work with real datasets, build models that answer questions, and learn where AI genuinely helps — and where human judgement must stay in charge.",
    icon: "brain",
    accent: "violet",
    image: "/images/dept-ai-data.jpg",
    bullets: ["Data analytics", "Applied machine learning", "Responsible AI"],
  },
  {
    id: "cloud-network",
    name: "Cloud & Networking",
    short: "Infrastructure, cloud and network technologies.",
    description:
      "The systems everything else runs on. Design networks, deploy to the cloud, and learn the operational discipline that keeps services online.",
    icon: "cloud",
    accent: "cyan",
    image: "/images/dept-cloud.jpg",
    bullets: ["Network administration", "Cloud foundations", "DevOps practice"],
  },
  {
    id: "design",
    name: "Design & Creativity",
    short: "Graphic design, UI/UX and creative tools.",
    description:
      "Build a visual craft that holds up commercially: typography, layout, brand systems and product interfaces designed for real users and real briefs.",
    icon: "pen",
    accent: "violet",
    image: "/images/dept-design.jpg",
    bullets: ["Brand identity", "UI/UX product design", "Portfolio craft"],
  },
  {
    id: "productivity",
    name: "Digital Productivity",
    short: "Office skills, computer basics and digital literacy.",
    description:
      "The foundation layer. Confident computer use, office applications, data entry and hardware maintenance — the skills every workplace assumes you already have.",
    icon: "monitor",
    accent: "green",
    image: "/images/dept-productivity.jpg",
    bullets: ["Computer fundamentals", "Office applications", "Hardware & repairs"],
  },
];

export const departmentById = (id: DepartmentId): Department =>
  departments.find((d) => d.id === id) ?? departments[0];

export const learningModes = ["Physical", "Hybrid", "Online"] as const;
export type LearningMode = (typeof learningModes)[number];

export const levels = ["Beginner", "Intermediate", "Advanced"] as const;
export type Level = (typeof levels)[number];

/** Honest, data-derived numbers. Nothing here is an unverifiable marketing claim. */
export const quickFacts = {
  departments: departments.length,
  modes: learningModes.length,
  levels: levels.length,
  campusCity: academy.address.city,
} as const;

export const integrityNotes = [
  {
    id: "fees",
    title: "Tuition & schedules",
    body: "Fees, cohort dates and timetable details are confirmed by admissions on application. This site does not publish unverified pricing.",
  },
  {
    id: "campus",
    title: "Campus address",
    body: "24 Ebony Road, off Rumuola Road, Port Harcourt is the canonical campus line used across every page. Please confirm before travelling.",
  },
  {
    id: "certificates",
    title: "Certification",
    body: "CEA issues a certificate of completion on successful assessment. Certificate records on this site are demonstration records.",
  },
];
