"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  Terminal,
  X,
} from "lucide-react";
import { labScenario } from "@/data/lab";
import { LiveDot } from "@/components/ui/primitives";

export function LabSimulation({ compact = false }: { compact?: boolean }) {
  const reduced = useReducedMotion();
  const stages = labScenario.stages;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  const stage = stages[step];

  const score = useMemo(() => {
    return stages.reduce((sum, s) => {
      const id = answers[s.id];
      const opt = s.options.find((o) => o.id === id);
      return sum + (opt?.correct ? opt.points : 0);
    }, 0);
  }, [answers, stages]);

  const maxScore = stages.reduce((s, st) => s + Math.max(...st.options.map((o) => o.points)), 0);

  const choose = (id: string) => {
    if (revealed) return;
    setSelected(id);
    setRevealed(true);
    setAnswers((prev) => ({ ...prev, [stage.id]: id }));
  };

  const next = () => {
    if (step === stages.length - 1) {
      setFinished(true);
      return;
    }
    setStep((s) => s + 1);
    setSelected(null);
    setRevealed(false);
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setSelected(null);
    setRevealed(false);
    setFinished(false);
  };

  const chosen = revealed ? stage.options.find((o) => o.id === selected) : null;
  const progress = finished ? 100 : (step / stages.length) * 100;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#070c14]">
      {/* Console chrome */}
      <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
          <span className="ml-3 flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
            <Terminal className="h-3 w-3" />
            {labScenario.id}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-amber-300">
            {labScenario.classification}
          </span>
          <LiveDot tone="green" />
        </div>
      </div>

      {/* Progress rail */}
      <div className="relative h-0.5 bg-white/[0.06]">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan to-green"
          animate={{ width: `${progress}%` }}
          transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <AnimatePresence mode="wait">
        {finished ? (
          <motion.div
            key="done"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 sm:p-10"
          >
            <div className="mx-auto max-w-lg text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-green/30 bg-green/10">
                <ShieldCheck className="h-7 w-7 text-green" />
              </div>
              <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-green">
                Investigation complete
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                {score >= maxScore * 0.85
                  ? "Analyst instinct confirmed."
                  : score >= maxScore * 0.55
                    ? "Sound method — a few gaps."
                    : "Good exposure — worth a second pass."}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                You scored{" "}
                <span className="font-mono text-cyan">
                  {score}/{maxScore}
                </span>{" "}
                across {stages.length} decision points. In the real programme, every choice
                is discussed in a debrief with your instructor.
              </p>

              <div className="mt-7 grid gap-2 text-left">
                {stages.map((s) => {
                  const opt = s.options.find((o) => o.id === answers[s.id]);
                  const ok = opt?.correct;
                  return (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2.5"
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          ok ? "bg-green/15 text-green" : "bg-amber-500/15 text-amber-400"
                        }`}
                      >
                        {ok ? <Check className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                      </span>
                      <span className="flex-1 text-[0.8125rem] text-ink/85">{s.phase}</span>
                      <span className="font-mono text-[0.65rem] text-muted">
                        {opt?.points ?? 0}/{Math.max(...s.options.map((o) => o.points))}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-2.5">
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/12 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-cyan/40"
                >
                  <RotateCcw className="h-4 w-4" /> Run it again
                </button>
                <Link
                  href="/cyber-lab"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan px-5 py-3 text-sm font-semibold text-void"
                >
                  Enter the full Cyber Lab <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={stage.id}
            initial={reduced ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-5 sm:p-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-cyan">
                {stage.phase}
              </span>
              <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                <span className="rounded bg-white/[0.06] px-1.5 py-0.5">{stage.code}</span>
                score {score}
              </span>
            </div>

            <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
              {stage.title}
            </h3>
            <p className="mt-2 max-w-2xl text-[0.8125rem] leading-relaxed text-muted sm:text-sm">
              {stage.brief}
            </p>

            {/* Artefact console */}
            <div className="mt-5 overflow-hidden rounded-xl border border-cyan/[0.14] bg-[#050a11]">
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-1.5">
                <span className="h-1 w-1 rounded-full bg-cyan" />
                <span className="font-mono text-[0.6rem] text-cyan/80">
                  {stage.artefact.label}
                </span>
              </div>
              <pre className="overflow-x-auto px-3 py-3 font-mono text-[0.65rem] leading-relaxed text-ink/75 sm:text-[0.7rem]">
                {stage.artefact.lines.join("\n")}
              </pre>
            </div>

            <p className="mt-5 text-[0.8125rem] font-medium text-ink">{stage.question}</p>

            <div className="mt-3 grid gap-2">
              {stage.options.map((opt) => {
                const isSelected = selected === opt.id;
                const state = !revealed
                  ? "idle"
                  : opt.correct
                    ? "correct"
                    : isSelected
                      ? "wrong"
                      : "dim";

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => choose(opt.id)}
                    disabled={revealed}
                    className={`group flex items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-all duration-300 ${
                      state === "idle"
                        ? "border-white/[0.08] bg-white/[0.02] hover:border-cyan/40 hover:bg-cyan/[0.04]"
                        : state === "correct"
                          ? "border-green/40 bg-green/[0.07]"
                          : state === "wrong"
                            ? "border-red-500/40 bg-red-500/[0.06]"
                            : "border-white/[0.05] bg-white/[0.01] opacity-50"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border font-mono text-[0.6rem] ${
                        state === "correct"
                          ? "border-green/50 bg-green/20 text-green"
                          : state === "wrong"
                            ? "border-red-500/50 bg-red-500/20 text-red-400"
                            : "border-white/15 text-muted group-hover:border-cyan/40 group-hover:text-cyan"
                      }`}
                    >
                      {state === "correct" ? (
                        <Check className="h-3 w-3" />
                      ) : state === "wrong" ? (
                        <X className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.8125rem] font-medium leading-snug text-ink">
                        {opt.label}
                      </span>
                      <span className="mt-0.5 block text-[0.75rem] leading-relaxed text-muted">
                        {opt.detail}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {revealed && chosen && (
                <motion.div
                  initial={reduced ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <div
                    className={`mt-4 rounded-xl border-l-2 p-3.5 ${
                      chosen.correct
                        ? "border-l-green bg-green/[0.05]"
                        : "border-l-amber-400 bg-amber-400/[0.05]"
                    }`}
                  >
                    <p className="flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                      {chosen.correct ? "Correct" : "Not quite"} · +{chosen.points} pts
                    </p>
                    <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink/85">
                      {chosen.verdict}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="max-w-md font-mono text-[0.6rem] leading-relaxed text-muted/70">
                      ⌁ {stage.teachBack}
                    </p>
                    <button
                      type="button"
                      onClick={next}
                      className="inline-flex items-center gap-2 rounded-lg bg-cyan px-4 py-2.5 text-[0.8125rem] font-semibold text-void transition-transform hover:scale-[1.02]"
                    >
                      {step === stages.length - 1 ? "See debrief" : "Next decision"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!compact && (
              <div className="mt-5 flex items-center gap-1.5">
                {stages.map((s, i) => (
                  <span
                    key={s.id}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i < step
                        ? "bg-cyan/60"
                        : i === step
                          ? "bg-cyan"
                          : "bg-white/[0.08]"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
