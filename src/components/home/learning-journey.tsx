"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { learningJourney } from "@/data/content";

export function LearningJourney() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      {/* Rail */}
      <div className="relative">
        <div className="absolute left-[1.1rem] top-3 bottom-3 w-px bg-white/[0.08] sm:left-[1.35rem]" />
        <motion.div
          className="absolute left-[1.1rem] top-3 w-px bg-gradient-to-b from-cyan to-green sm:left-[1.35rem]"
          animate={{ height: `${((active + 1) / learningJourney.length) * 92}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <ol className="space-y-1.5">
          {learningJourney.map((step, i) => {
            const isActive = i === active;
            const isPast = i < active;
            return (
              <li key={step.step}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-current={isActive ? "step" : undefined}
                  className={`group relative flex w-full items-start gap-4 rounded-xl px-1 py-3.5 text-left transition-colors sm:gap-5 sm:px-2 ${
                    isActive ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <span
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-[0.65rem] transition-all duration-300 sm:h-11 sm:w-11 sm:text-[0.7rem] ${
                      isActive
                        ? "border-cyan bg-cyan text-void shadow-[0_0_28px_-4px_rgba(0,217,255,0.8)]"
                        : isPast
                          ? "border-green/40 bg-green/10 text-green"
                          : "border-white/12 bg-void text-muted group-hover:border-white/25"
                    }`}
                  >
                    {step.step}
                  </span>
                  <span className="min-w-0 pt-1">
                    <span
                      className={`block font-display text-lg font-bold tracking-tight transition-colors sm:text-xl ${
                        isActive ? "text-ink" : "text-ink/55"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span
                      className={`mt-1 block text-[0.8125rem] leading-relaxed transition-colors sm:text-sm ${
                        isActive ? "text-muted" : "text-muted/50"
                      }`}
                    >
                      {step.body}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Visual panel */}
      <div className="relative">
        <div className="sticky top-24">
          <div className="glass glow-edge relative aspect-square overflow-hidden rounded-2xl">
            <div className="dot-bg absolute inset-0 opacity-40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,217,255,0.13),transparent_62%)]" />

            {/* Concentric rings */}
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
              {[70, 110, 150, 185].map((r, i) => (
                <circle
                  key={r}
                  cx="200"
                  cy="200"
                  r={r}
                  fill="none"
                  stroke="rgba(146,158,174,0.1)"
                  strokeWidth="1"
                  strokeDasharray={i % 2 ? "3 6" : undefined}
                />
              ))}
              <circle cx="200" cy="200" r="185" fill="none" stroke="rgba(0,217,255,0.18)" strokeWidth="1" />
            </svg>

            {/* Step markers around the arc */}
            {learningJourney.map((s, i) => {
              const angle = (i / learningJourney.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 148;
              const x = 50 + (Math.cos(angle) * radius) / 4;
              const y = 50 + (Math.sin(angle) * radius) / 4;
              const isActive = i === active;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`${s.title}: ${s.body}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[0.55rem] transition-all duration-300 sm:h-8 sm:w-8 ${
                      isActive
                        ? "scale-125 border-cyan bg-cyan text-void shadow-[0_0_22px_rgba(0,217,255,0.9)]"
                        : "border-white/15 bg-void/90 text-muted hover:border-cyan/50"
                    }`}
                  >
                    {s.step}
                  </span>
                </button>
              );
            })}

            {/* Centre readout */}
            <div className="absolute inset-0 flex items-center justify-center p-14">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[13rem] rounded-xl border border-white/[0.09] bg-void/70 p-4 text-center backdrop-blur-md"
              >
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-cyan">
                  stage {learningJourney[active].step}
                </p>
                <p className="mt-2 font-display text-xl font-bold text-ink">
                  {learningJourney[active].title}
                </p>
                <div className="mx-auto mt-3 h-px w-12 bg-gradient-to-r from-transparent via-cyan to-transparent" />
                <p className="mt-3 text-[0.7rem] leading-relaxed text-muted">
                  {learningJourney[active].body}
                </p>
              </motion.div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
              beginner → practitioner
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-green">
              <span className="h-1 w-1 rounded-full bg-green" /> 6 stages
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
