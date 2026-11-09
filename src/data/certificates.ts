/**
 * Certificate register — demonstration records.
 * A production build reads from the `certificates` table with row-level
 * security; the verification endpoint returns only the minimum fields needed
 * to confirm a record (never personal data beyond the holder's name).
 */

export type CertificateRecord = {
  id: string;
  holder: string;
  programme: string;
  programmeSlug: string;
  issued: string;
  grade: "Pass" | "Merit" | "Distinction";
  cohort: string;
  status: "valid" | "revoked";
  revokedReason?: string;
  demo: true;
};

export const certificates: CertificateRecord[] = [
  {
    id: "CEA-CERT-2026-0041",
    holder: "Demonstration Record",
    programme: "Cybersecurity Fundamentals",
    programmeSlug: "cybersecurity-fundamentals",
    issued: "2026-03-14",
    grade: "Merit",
    cohort: "PH-CSF-2026-01",
    status: "valid",
    demo: true,
  },
  {
    id: "CEA-CERT-2026-0087",
    holder: "Demonstration Record",
    programme: "Full-Stack Web Development",
    programmeSlug: "full-stack-web-development",
    issued: "2026-04-02",
    grade: "Distinction",
    cohort: "PH-FSW-2026-01",
    status: "valid",
    demo: true,
  },
  {
    id: "CEA-CERT-2025-0212",
    holder: "Demonstration Record",
    programme: "Graphic Design",
    programmeSlug: "graphic-design",
    issued: "2025-11-20",
    grade: "Pass",
    cohort: "PH-GRD-2025-03",
    status: "revoked",
    revokedReason: "Issued in error during register migration — superseded by CEA-CERT-2025-0231.",
    demo: true,
  },
];

export const findCertificate = (id: string) =>
  certificates.find((c) => c.id.toUpperCase() === id.trim().toUpperCase());
