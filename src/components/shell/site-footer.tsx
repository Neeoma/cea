import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { CeaMark } from "@/components/brand/logo";
import { academy, departments } from "@/data/academy";

const columns = [
  {
    title: "Learn",
    links: [
      { label: "All programmes", href: "/programmes" },
      { label: "Cybersecurity pathways", href: "/cybersecurity" },
      { label: "Cyber Lab", href: "/cyber-lab" },
      { label: "Learning experience", href: "/learning" },
      { label: "Student projects", href: "/projects" },
    ],
  },
  {
    title: "Academy",
    links: [
      { label: "About CEA", href: "/about" },
      { label: "Admissions", href: "/admissions" },
      { label: "Careers", href: "/careers" },
      { label: "Community", href: "/community" },
      { label: "Enterprise training", href: "/enterprise" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Articles & guides", href: "/resources" },
      { label: "Certificate verification", href: "/verify" },
      { label: "Student portal", href: "/portal" },
      { label: "FAQ", href: "/about#faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-void">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.35]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-cyan/[0.07] blur-[120px]" />

      <div className="container-cea relative">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.15fr_2fr] lg:gap-20 lg:py-20">
          <div>
            <div className="flex items-center gap-3">
              <CeaMark className="h-10 w-10" />
              <div>
                <p className="font-display text-base font-bold tracking-tight">
                  CYBER ELIAS<span className="text-cyan">.</span>
                </p>
                <p className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.3em] text-muted">
                  Academy · cea.ng
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              A technology and cybersecurity training academy in {academy.address.city},{" "}
              {academy.address.state}. Practical skill, honest claims, and work you can
              demonstrate.
            </p>

            <div className="mt-7 flex items-start gap-2.5 text-sm text-muted">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
              <address className="not-italic leading-relaxed">
                {academy.address.line1}
                <br />
                {academy.address.city}, {academy.address.state}
                <br />
                {academy.address.country}
              </address>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={`mailto:${academy.contact.admissionsEmail}`}
                className="rounded-lg border border-white/10 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted transition-colors hover:border-cyan/40 hover:text-cyan"
              >
                {academy.contact.admissionsEmail}
              </a>
              <span className="rounded-lg border border-white/10 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                {academy.contact.hours}
              </span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1 text-[0.8125rem] text-ink/70 transition-colors hover:text-ink"
                      >
                        {l.label}
                        <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-60" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <h2 className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted">
                Departments
              </h2>
              <ul className="mt-4 space-y-2.5">
                {departments.map((d) => (
                  <li key={d.id}>
                    <Link
                      href={`/programmes?department=${d.id}`}
                      className="text-[0.8125rem] text-ink/70 transition-colors hover:text-ink"
                    >
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/[0.07] py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {academy.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
            <Link href="/admissions" className="transition-colors hover:text-ink">
              Admissions
            </Link>
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted/60">
              Built in Port Harcourt
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
