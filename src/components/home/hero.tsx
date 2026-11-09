"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, ShieldCheck, Terminal } from "lucide-react";
import { NetworkGlobe } from "@/components/immersive/network-globe";
import { LiveDot, Pill } from "@/components/ui/primitives";
import { academy } from "@/data/academy";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease },
  });

  return (
    <section className="noise relative isolate min-h-[100svh] overflow-hidden pt-28 pb-16 sm:pt-32">
      {/* Layered background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(0,217,255,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_75%,rgba(136,92,255,0.10),transparent_50%)]" />
        <div className="grid-bg animate-grid-drift absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
        <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/[0.05] blur-[130px]" />
      </div>

      {/* Globe — sits behind content, larger than the viewport column */}
      <div className="pointer-events-auto absolute left-1/2 top-1/2 -z-10 h-[min(120vw,68rem)] w-[min(120vw,68rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.85] sm:opacity-100 lg:left-auto lg:right-[-16%] lg:translate-x-0">
        <NetworkGlobe />
      </div>

      <div className="container-cea relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl">
            <motion.div {...fade(0.05)}>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-sm">
                <LiveDot />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-ink/80">
                  The next generation starts here
                </span>
                <span className="hidden h-3 w-px bg-white/15 sm:block" />
                <span className="hidden font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted sm:block">
                  Port Harcourt
                </span>
              </div>
            </motion.div>

            <motion.h1
              {...fade(0.14)}
              className="display-xl mt-7 text-ink"
            >
              Master the
              <br />
              digital world.
              <br />
              <span className="relative inline-block text-cyan text-glow">
                Build what
                <span className="absolute -right-3 bottom-2 h-2 w-2 rounded-full bg-green sm:h-2.5 sm:w-2.5" />
              </span>{" "}
              comes next.
            </motion.h1>

            <motion.p
              {...fade(0.24)}
              className="mt-7 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base"
            >
              At {academy.name}, we turn curiosity into practical digital skill —
              technical expertise, real project work, and the evidence employers
              actually look for.
            </motion.p>

            <motion.div {...fade(0.32)} className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/programmes"
                className="group inline-flex items-center gap-2 rounded-xl bg-cyan px-6 py-3.5 text-sm font-semibold text-void transition-all duration-300 hover:shadow-[0_10px_44px_-10px_rgba(0,217,255,0.75)] hover:brightness-110"
              >
                Explore programmes
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-ink backdrop-blur-sm transition-colors hover:border-cyan/40 hover:bg-white/[0.06]"
              >
                Discover CEA
              </Link>
              <Link
                href="/cyber-lab"
                className="group ml-1 inline-flex items-center gap-2 px-1 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-cyan"
              >
                <Terminal className="h-3.5 w-3.5" />
                Try the cyber lab
              </Link>
            </motion.div>

            <motion.div
              {...fade(0.42)}
              className="mt-12 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.06]"
            >
              {[
                { k: "LEARN", v: "Build your skills" },
                { k: "CREATE", v: "Build real projects" },
                { k: "GROW", v: "Advance your career" },
              ].map((item) => (
                <div key={item.k} className="bg-void/80 px-4 py-4 backdrop-blur-sm">
                  <p className="font-display text-sm font-bold tracking-[0.02em] text-cyan">
                    {item.k}
                  </p>
                  <p className="mt-1 text-[0.7rem] leading-snug text-muted">{item.v}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Floating status card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
            className="relative hidden lg:block"
          >
            <div className="glass glow-edge relative overflow-hidden rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted">
                  campus status
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-green">
                  <LiveDot /> open
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { label: "Programmes", value: "14", tone: "cyan" },
                  { label: "Departments", value: "6", tone: "green" },
                  { label: "Learning modes", value: "3", tone: "violet" },
                ].map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between border-b border-white/[0.06] pb-2.5">
                    <span className="text-[0.8125rem] text-muted">{row.label}</span>
                    <span
                      className={`font-mono text-sm ${
                        row.tone === "cyan"
                          ? "text-cyan"
                          : row.tone === "green"
                            ? "text-green"
                            : "text-violet-300"
                      }`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-start gap-2.5 rounded-lg bg-green/[0.06] p-3">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green" />
                <p className="text-[0.7rem] leading-relaxed text-green/90">
                  All offensive technique taught in isolated, authorised labs only.
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted/60">
                <span>24 Ebony Road, PH</span>
                <span>4.8156°N 7.0498°E</span>
              </div>
            </div>

            <div className="animate-float absolute -left-10 top-1/3 hidden xl:block">
              <Pill tone="cyan" className="shadow-lg backdrop-blur-md">
                <span className="h-1 w-1 rounded-full bg-cyan" /> hands-on labs
              </Pill>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-16 flex items-center gap-3 text-muted/60"
        >
          <ChevronDown className="h-4 w-4 animate-bounce" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em]">
            Scroll to explore
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
