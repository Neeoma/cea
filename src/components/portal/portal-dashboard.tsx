"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessagesSquare,
  PlayCircle,
  Users,
  Wallet,
} from "lucide-react";
import {
  announcements,
  assignments,
  discussionThreads,
  enrolledCourses,
  learningResources,
  myCertificates,
  payments,
} from "@/data/portal";
import { Section } from "@/components/ui/primitives";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "courses", label: "My courses", icon: BookOpen },
  { id: "assignments", label: "Assignments", icon: ClipboardList },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "community", label: "Community", icon: MessagesSquare },
];

const openAssignments = assignments.filter((a) => a.status === "open").length;
const avgProgress = Math.round(
  enrolledCourses.reduce((s, c) => s + c.progress, 0) / enrolledCourses.length,
);

export function PortalDashboard() {
  const [tab, setTab] = useState("overview");

  return (
    <Section className="pb-24">
      {/* Demo banner */}
      <div className="mb-6 flex flex-col gap-2 rounded-xl border border-violet/25 bg-violet/[0.06] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.75rem] leading-relaxed text-violet-200/90">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-violet-300">
            preview mode ·{" "}
          </span>
          Demonstration student account. Real accounts are created on enrolment after payment is
          verified.
        </p>
        <Link
          href="/login"
          className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-violet-300 hover:underline"
        >
          Sign in →
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[13.5rem_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-2">
            <div className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] px-3 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan/25 bg-cyan/[0.08] font-display text-[0.7rem] font-bold text-cyan">
                DS
              </div>
              <div className="min-w-0">
                <p className="truncate text-[0.75rem] font-medium text-ink">Demonstration Student</p>
                <p className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-muted">
                  PH-CSF-2026-01
                </p>
              </div>
            </div>
            <nav className="mt-1.5" aria-label="Portal sections">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  aria-current={tab === t.id ? "page" : undefined}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[0.8125rem] transition-colors ${
                    tab === t.id
                      ? "bg-cyan/[0.1] text-cyan"
                      : "text-muted hover:bg-white/[0.03] hover:text-ink"
                  }`}
                >
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                  {t.id === "assignments" && openAssignments > 0 && (
                    <span className="ml-auto rounded-full bg-cyan px-1.5 font-mono text-[0.55rem] text-void">
                      {openAssignments}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {tab === "overview" && (
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Active courses", value: String(enrolledCourses.filter((c) => c.progress < 100).length), icon: BookOpen, tone: "text-cyan" },
                      { label: "Average progress", value: `${avgProgress}%`, icon: PlayCircle, tone: "text-green" },
                      { label: "Open assignments", value: String(openAssignments), icon: ClipboardList, tone: "text-amber-300" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                        <div className="flex items-center gap-1.5">
                          <s.icon className={`h-3 w-3 ${s.tone}`} />
                          <span className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-muted">
                            {s.label}
                          </span>
                        </div>
                        <p className={`mt-2 font-display text-2xl font-bold ${s.tone}`}>{s.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                      <div className="flex items-center justify-between">
                        <h2 className="font-display text-[0.9375rem] font-bold text-ink">
                          Continue learning
                        </h2>
                        <button
                          type="button"
                          onClick={() => setTab("courses")}
                          className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-cyan hover:underline"
                        >
                          all courses
                        </button>
                      </div>
                      <div className="mt-4 space-y-3">
                        {enrolledCourses.slice(0, 2).map((c) => (
                          <div key={c.slug} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-[0.8125rem] font-medium text-ink">
                                  {c.title}
                                </p>
                                <p className="mt-0.5 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-muted">
                                  {c.nextModule} · {c.nextLesson}
                                </p>
                              </div>
                              <span className="shrink-0 font-mono text-[0.6rem] text-cyan">
                                {c.progress}%
                              </span>
                            </div>
                            <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-cyan to-green transition-all duration-700"
                                style={{ width: `${c.progress}%` }}
                              />
                            </div>
                            <div className="mt-2.5 flex items-center justify-between">
                              <span className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-muted/70">
                                next live · {c.nextSession}
                              </span>
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 rounded bg-cyan/[0.12] px-2 py-1 font-mono text-[0.52rem] uppercase tracking-[0.1em] text-cyan"
                              >
                                <PlayCircle className="h-3 w-3" /> resume
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                      <div className="flex items-center gap-2">
                        <Bell className="h-3.5 w-3.5 text-amber-300" />
                        <h2 className="font-display text-[0.9375rem] font-bold text-ink">
                          Announcements
                        </h2>
                      </div>
                      <div className="mt-3 space-y-2.5">
                        {announcements.map((a) => (
                          <div key={a.id} className="border-b border-white/[0.05] pb-2.5 last:border-0">
                            <div className="flex items-center gap-2">
                              <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.48rem] uppercase tracking-[0.1em] text-muted">
                                {a.tag}
                              </span>
                              <span className="font-mono text-[0.5rem] text-muted/60">{a.date}</span>
                            </div>
                            <p className="mt-1.5 text-[0.75rem] font-medium text-ink">{a.title}</p>
                            <p className="mt-0.5 text-[0.7rem] leading-relaxed text-muted">{a.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                      <div className="flex items-center gap-2">
                        <FileText className="h-3.5 w-3.5 text-cyan" />
                        <h2 className="font-display text-[0.9375rem] font-bold text-ink">
                          Learning hub
                        </h2>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {learningResources.map((r) => (
                          <li key={r.title} className="flex items-center justify-between gap-3">
                            <span className="min-w-0">
                              <span className="block truncate text-[0.75rem] text-ink/85">{r.title}</span>
                              <span className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-muted">
                                {r.type}
                              </span>
                            </span>
                            <span className="shrink-0 font-mono text-[0.5rem] text-muted/60">{r.size}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-3.5 w-3.5 text-green" />
                        <h2 className="font-display text-[0.9375rem] font-bold text-ink">
                          This week
                        </h2>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {[
                          { d: "Tue 18:00", t: "Identity & Access — live session", tone: "cyan" },
                          { d: "Thu 17:30", t: "Python: files & data", tone: "green" },
                          { d: "Fri 18:00", t: "Checkpoint quiz closes", tone: "amber" },
                        ].map((e) => (
                          <li key={e.t} className="flex items-start gap-2.5">
                            <span
                              className={`mt-1 h-1 w-1 shrink-0 rounded-full ${
                                e.tone === "cyan" ? "bg-cyan" : e.tone === "green" ? "bg-green" : "bg-amber-300"
                              }`}
                            />
                            <span>
                              <span className="block font-mono text-[0.52rem] uppercase tracking-[0.12em] text-muted">
                                {e.d}
                              </span>
                              <span className="text-[0.75rem] text-ink/85">{e.t}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {tab === "courses" && (
                <div className="space-y-3">
                  {enrolledCourses.map((c) => (
                    <div key={c.slug} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <Link
                            href={`/programmes/${c.slug}`}
                            className="font-display text-[0.9375rem] font-bold text-ink hover:text-cyan"
                          >
                            {c.title}
                          </Link>
                          <p className="mt-1 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-muted">
                            {c.cohort} · {c.instructor}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] ${
                            c.progress === 100
                              ? "bg-green/10 text-green"
                              : "bg-cyan/10 text-cyan"
                          }`}
                        >
                          {c.progress === 100 ? "completed" : "in progress"}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan to-green"
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>
                        <span className="font-mono text-[0.6rem] text-muted">
                          {c.completedLessons}/{c.totalLessons}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-[0.75rem] text-muted">
                          {c.progress === 100 ? "Certificate issued" : `Next: ${c.nextLesson}`}
                        </p>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-cyan hover:underline"
                        >
                          {c.progress === 100 ? "view certificate" : "continue"}{" "}
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === "assignments" && (
                <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]">
                  <div className="grid grid-cols-[1fr_5rem_5.5rem] gap-3 border-b border-white/[0.07] px-4 py-2.5 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-muted sm:grid-cols-[1fr_6rem_5rem_5.5rem]">
                    <span>assignment</span>
                    <span className="hidden sm:block">due</span>
                    <span>weight</span>
                    <span>status</span>
                  </div>
                  {assignments.map((a) => (
                    <div
                      key={a.id}
                      className="grid grid-cols-[1fr_5rem_5.5rem] items-center gap-3 border-b border-white/[0.05] px-4 py-3 last:border-0 sm:grid-cols-[1fr_6rem_5rem_5.5rem]"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[0.8125rem] text-ink">{a.title}</p>
                        <p className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-muted">
                          {a.course}
                        </p>
                      </div>
                      <span className="hidden font-mono text-[0.6rem] text-muted sm:block">{a.due}</span>
                      <span className="font-mono text-[0.6rem] text-muted">{a.weight}</span>
                      {a.status === "open" ? (
                        <button
                          type="button"
                          className="rounded bg-cyan/[0.12] px-2 py-1 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-cyan"
                        >
                          submit
                        </button>
                      ) : (
                        <span className="rounded bg-green/10 px-2 py-1 text-center font-mono text-[0.5rem] uppercase tracking-[0.1em] text-green">
                          {a.grade}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {tab === "certificates" && (
                <div className="space-y-3">
                  {myCertificates.map((c) => (
                    <div
                      key={c.id}
                      className="flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                        <div>
                          <p className="font-display text-[0.9375rem] font-bold text-ink">
                            {c.programme}
                          </p>
                          <p className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted">
                            {c.id} · {c.grade} · issued {c.issued}
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/verify"
                        className="shrink-0 rounded-lg border border-cyan/25 bg-cyan/[0.08] px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-cyan"
                      >
                        verify
                      </Link>
                    </div>
                  ))}
                  <p className="text-[0.7rem] leading-relaxed text-muted/60">
                    Certificates appear here once the programme assessment is completed and the
                    register entry is issued — typically within five working days.
                  </p>
                </div>
              )}

              {tab === "payments" && (
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                      <div className="flex items-center gap-1.5">
                        <Wallet className="h-3 w-3 text-green" />
                        <span className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-muted">
                          balance
                        </span>
                      </div>
                      <p className="mt-2 font-display text-xl font-bold text-ink">Settled</p>
                      <p className="mt-0.5 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-muted">
                        no outstanding fees
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="h-3 w-3 text-cyan" />
                        <span className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-muted">
                          method
                        </span>
                      </div>
                      <p className="mt-2 font-display text-xl font-bold text-ink">Transfer / Card</p>
                      <p className="mt-0.5 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-muted">
                        verified server-side
                      </p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]">
                    <div className="grid grid-cols-[1fr_5rem_4.5rem] gap-3 border-b border-white/[0.07] px-4 py-2.5 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-muted">
                      <span>description</span>
                      <span>date</span>
                      <span>status</span>
                    </div>
                    {payments.map((p) => (
                      <div
                        key={p.id}
                        className="grid grid-cols-[1fr_5rem_4.5rem] items-center gap-3 border-b border-white/[0.05] px-4 py-3 last:border-0"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-[0.8125rem] text-ink">{p.description}</p>
                          <p className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-muted">
                            {p.id}
                          </p>
                        </div>
                        <span className="font-mono text-[0.6rem] text-muted">{p.date}</span>
                        <span className="rounded bg-green/10 px-2 py-1 text-center font-mono text-[0.48rem] uppercase tracking-[0.1em] text-green">
                          {p.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[0.7rem] leading-relaxed text-muted/60">
                    Amounts are withheld in preview mode — fee figures are issued privately by
                    admissions per cohort.
                  </p>
                </div>
              )}

              {tab === "community" && (
                <div className="space-y-3">
                  {discussionThreads.map((t) => (
                    <div
                      key={t.title}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.14]"
                    >
                      <Users className="h-4 w-4 shrink-0 text-cyan/70" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.8125rem] text-ink">{t.title}</p>
                        <p className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-muted">
                          {t.course} · {t.author}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-mono text-[0.6rem] text-ink/80">{t.replies}</p>
                        <p className="font-mono text-[0.48rem] uppercase tracking-[0.1em] text-muted">
                          {t.last}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-xl border border-dashed border-white/[0.12] p-5 text-center">
                    <p className="text-[0.75rem] leading-relaxed text-muted">
                      Cohort discussion is moderated by an instructor. Off-topic and unsafe content is
                      removed under the community code of conduct.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
