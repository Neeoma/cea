"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { CeaLogo } from "@/components/brand/logo";
import { departments } from "@/data/academy";
import { programmes } from "@/data/programmes";

type NavItem = { label: string; href: string; children?: { label: string; href: string; meta?: string }[] };

const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Programmes",
    href: "/programmes",
    children: [
      ...departments.map((d) => ({
        label: d.name,
        href: `/programmes?department=${d.id}`,
        meta: `${programmes.filter((p) => p.department === d.id).length} programmes`,
      })),
    ],
  },
  { label: "Cyber Lab", href: "/cyber-lab" },
  { label: "Careers", href: "/careers" },
  { label: "Community", href: "/community" },
  { label: "Resources", href: "/resources" },
];

const utilityNav: NavItem[] = [
  { label: "Enterprise", href: "/enterprise" },
  { label: "Verify", href: "/verify" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  const hoverIn = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdown(label);
  }, []);

  const hoverOut = useCallback(() => {
    closeTimer.current = setTimeout(() => setDropdown(null), 140);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,backdrop-filter,border-color,height] duration-500 ${
          scrolled
            ? "border-b border-white/[0.07] bg-void/75 backdrop-blur-xl supports-[backdrop-filter]:bg-void/60"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`container-cea flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <CeaLogo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && hoverIn(item.label)}
                onMouseLeave={() => item.children && hoverOut()}
              >
                <Link
                  href={item.href}
                  aria-expanded={item.children ? dropdown === item.label : undefined}
                  className={`relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.8125rem] font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-ink"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-300 ${
                        dropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  {isActive(item.href) && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
                  )}
                </Link>

                <AnimatePresence>
                  {item.children && dropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.99 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-full w-[30rem] -translate-x-1/2 pt-3"
                    >
                      <div className="glass overflow-hidden rounded-2xl p-2 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.9)]">
                        <div className="grid grid-cols-2 gap-1">
                          {item.children.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              className="group rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.05]"
                            >
                              <span className="block text-[0.8125rem] font-medium text-ink">
                                {c.label}
                              </span>
                              <span className="mt-0.5 block font-mono text-[0.6rem] uppercase tracking-widest text-muted">
                                {c.meta}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href="/programmes"
                          className="mt-1 flex items-center justify-between rounded-xl bg-cyan/[0.07] px-3 py-2.5 text-[0.8125rem] font-medium text-cyan transition-colors hover:bg-cyan/[0.12]"
                        >
                          Browse all programmes
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-[0.8125rem] font-medium text-muted transition-colors hover:text-ink"
            >
              Login
            </Link>
            <Link
              href="/apply"
              className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg bg-cyan px-4 py-2.5 text-[0.8125rem] font-semibold text-void transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan via-green to-cyan opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative">Apply now</span>
              <ArrowUpRight className="relative h-3.5 w-3.5" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99] bg-void lg:hidden"
          >
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
            <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-cyan/10 blur-[100px]" />
            <div className="relative flex h-full flex-col overflow-y-auto px-5 pb-10 pt-24">
              <nav aria-label="Mobile" className="flex flex-col">
                {[...nav, ...utilityNav].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.035, duration: 0.4 }}
                    className="border-b border-white/[0.06]"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className={`flex-1 py-4 font-display text-2xl font-bold tracking-tight ${
                          isActive(item.href) ? "text-cyan" : "text-ink"
                        }`}
                      >
                        {item.label}
                      </Link>
                      {"children" in item && item.children && (
                        <button
                          type="button"
                          aria-label={`${expanded === item.label ? "Collapse" : "Expand"} ${item.label}`}
                          onClick={() =>
                            setExpanded((v) => (v === item.label ? null : item.label))
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              expanded === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    {item.children && expanded === item.label && (
                      <div className="grid gap-1 pb-4">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-ink"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-8 flex flex-col gap-2.5"
              >
                <Link
                  href="/apply"
                  className="flex items-center justify-center gap-2 rounded-xl bg-cyan px-5 py-4 font-semibold text-void"
                >
                  Apply now <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="flex items-center justify-center rounded-xl border border-white/12 px-5 py-4 font-medium text-ink"
                >
                  Student login
                </Link>
              </motion.div>

              <p className="mt-auto pt-10 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
                Cyber Elias Academy · Port Harcourt · cea.ng
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
