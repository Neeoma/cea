/**
 * Portal demo data. A production build reads these from PostgreSQL with
 * row-level security keyed on the authenticated user. The shapes here mirror
 * the intended schema so swapping the data source is a one-file change.
 */

export type EnrolledCourse = {
  slug: string;
  title: string;
  progress: number;
  nextLesson: string;
  nextModule: string;
  completedLessons: number;
  totalLessons: number;
  cohort: string;
  instructor: string;
  nextSession: string;
};

export const enrolledCourses: EnrolledCourse[] = [
  {
    slug: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    progress: 62,
    nextLesson: "Lab: chasing a suspicious login",
    nextModule: "Identity & Access",
    completedLessons: 8,
    totalLessons: 13,
    cohort: "PH-CSF-2026-01",
    instructor: "Assigned per cohort",
    nextSession: "Tue · 18:00 WAT",
  },
  {
    slug: "python-and-automation",
    title: "Python & Automation",
    progress: 24,
    nextLesson: "Lab: reporting automation",
    nextModule: "Files & Data",
    completedLessons: 3,
    totalLessons: 12,
    cohort: "PH-PYA-2026-02",
    instructor: "Assigned per cohort",
    nextSession: "Thu · 17:30 WAT",
  },
  {
    slug: "computer-fundamentals",
    title: "Computer Fundamentals & Office Skills",
    progress: 100,
    nextLesson: "Completed",
    nextModule: "Complete",
    completedLessons: 10,
    totalLessons: 10,
    cohort: "PH-CMF-2025-04",
    instructor: "Assigned per cohort",
    nextSession: "—",
  },
];

export const assignments = [
  {
    id: "ASG-1042",
    course: "Cybersecurity Fundamentals",
    title: "Incident timeline reconstruction",
    due: "2026-11-14",
    status: "open" as const,
    weight: "15%",
  },
  {
    id: "ASG-1038",
    course: "Python & Automation",
    title: "Workflow automation script",
    due: "2026-11-18",
    status: "open" as const,
    weight: "20%",
  },
  {
    id: "ASG-1021",
    course: "Cybersecurity Fundamentals",
    title: "Home lab hardening review",
    due: "2026-10-30",
    status: "graded" as const,
    weight: "15%",
    grade: "78%",
  },
  {
    id: "ASG-1009",
    course: "Computer Fundamentals",
    title: "Employment toolkit portfolio",
    due: "2025-12-12",
    status: "graded" as const,
    weight: "25%",
    grade: "84%",
  },
];

export const announcements = [
  {
    id: "ANN-31",
    title: "Open Lab Night — last Friday",
    body: "Lab doors open 17:00–20:00. Bring a laptop if you have one; benches are limited to 18.",
    date: "2026-11-06",
    tag: "Event",
  },
  {
    id: "ANN-30",
    title: "CYB cohort: assessment window opens",
    body: "Module 03 checkpoint is available from Monday 09:00 and closes Friday 23:59 WAT.",
    date: "2026-11-04",
    tag: "Assessment",
  },
  {
    id: "ANN-29",
    title: "Lab maintenance — Sunday",
    body: "The isolated network segment is offline 06:00–10:00 for switch replacement. Nothing is lost.",
    date: "2026-11-01",
    tag: "Facility",
  },
];

export const myCertificates = [
  {
    id: "CEA-CERT-2026-0104",
    programme: "Computer Fundamentals & Office Skills",
    issued: "2026-01-16",
    grade: "Merit",
    status: "valid" as const,
  },
];

export const payments = [
  { id: "PAY-2291", date: "2026-09-02", amount: "₦ —", description: "Cybersecurity Fundamentals · deposit", status: "Confirmed" },
  { id: "PAY-2284", date: "2026-08-19", amount: "₦ —", description: "Enrolment fee", status: "Confirmed" },
];

export const learningResources = [
  { title: "Module 03 — Networks Without Fear", type: "PDF · slides", size: "4.2 MB" },
  { title: "Lab guide: packet capture", type: "PDF · worksheet", size: "1.1 MB" },
  { title: "Session recording — triage walkthrough", type: "Video · 54 min", size: "Stream" },
  { title: "Reading list — incident response", type: "Links", size: "—" },
];

export const discussionThreads = [
  {
    title: "Wireshark filter for DNS only?",
    author: "Cohort member",
    replies: 6,
    last: "2h ago",
    course: "Cybersecurity Fundamentals",
  },
  {
    title: "Splitting a CSV by column in pandas",
    author: "Cohort member",
    replies: 3,
    last: "5h ago",
    course: "Python & Automation",
  },
  {
    title: "Study group — Thursday evenings",
    author: "Cohort member",
    replies: 11,
    last: "1d ago",
    course: "General",
  },
];
