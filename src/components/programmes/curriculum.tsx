"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronDown, Clock, FlaskConical, Video } from "lucide-react";
import type { Module } from "@/data/programmes";

const typeIcon: Record<string, React.ElementType> = {
  Reading: BookOpen,
  Lab: FlaskConical,
  Video: Video,
  Project: FlaskConical,
  Assessment: Clock,
};

export function Curriculum({ modules }: { modules: Module[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
      {modules.map((m, i) => {
        const isOpen = open === i;
        const minutes = m.lessons.reduce((s, l) => s + l.minutes, 0);
        return (
          <div key={m.title}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-white/[0.03] sm:px-5"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-mono text-[0.65rem] transition-colors ${
                  isOpen
                    ? "border-cyan/40 bg-cyan/[0.1] text-cyan"
                    : "border-white/10 text-muted"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[0.9375rem] font-bold text-ink">
                  {m.title}
                </span>
                <span className="mt-0.5 block text-[0.75rem] leading-relaxed text-muted">
                  {m.summary}
                </span>
              </span>
              <span className="hidden shrink-0 items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted sm:flex">
                <span>{m.lessons.length} items</span>
                <span className="text-muted/40">·</span>
                <span>{Math.round(minutes / 60)}h</span>
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-1 px-4 pb-4 sm:pl-16 sm:pr-5">
                    {m.lessons.map((l) => {
                      const Icon = typeIcon[l.type] ?? BookOpen;
                      return (
                        <li
                          key={l.title}
                          className="flex items-center gap-3 rounded-lg bg-white/[0.02] px-3 py-2.5"
                        >
                          <Icon
                            className={`h-3.5 w-3.5 shrink-0 ${
                              l.type === "Lab" || l.type === "Project"
                                ? "text-green"
                                : l.type === "Assessment"
                                  ? "text-amber-400"
                                  : "text-cyan/70"
                            }`}
                          />
                          <span className="min-w-0 flex-1 text-[0.8125rem] text-ink/85">
                            {l.title}
                          </span>
                          <span className="shrink-0 rounded bg-white/[0.05] px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-muted">
                            {l.type}
                          </span>
                          <span className="w-10 shrink-0 text-right font-mono text-[0.6rem] text-muted">
                            {l.minutes}m
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
