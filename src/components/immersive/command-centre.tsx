"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, Radar, ShieldAlert } from "lucide-react";

type Event = {
  id: number;
  time: string;
  rule: string;
  severity: "low" | "medium" | "high";
  source: string;
  status: "triage" | "investigating" | "closed";
};

const RULES = [
  "impossible_travel",
  "mailbox_rule_created",
  "brute_force_burst",
  "privilege_escalation",
  "dns_tunnelling",
  "lateral_smb",
  "off_hours_admin",
  "mfa_push_fatigue",
  "data_staging",
  "new_service_account",
];

const SOURCES = ["idp", "edr-01", "fw-edge", "dns-resolver", "mail-gw", "vpn-north", "db-prod"];

const SEVERITIES: Event["severity"][] = ["low", "low", "medium", "medium", "high"];

const sevStyles: Record<Event["severity"], { dot: string; text: string; bg: string }> = {
  low: { dot: "bg-cyan", text: "text-cyan", bg: "bg-cyan/10" },
  medium: { dot: "bg-amber-400", text: "text-amber-300", bg: "bg-amber-400/10" },
  high: { dot: "bg-red-400", text: "text-red-300", bg: "bg-red-400/10" },
};

/**
 * A fictional security-operations display. Nothing here reflects real traffic —
 * every value is generated locally for demonstration. Used to show visitors the
 * rhythm of monitoring work, which is what the Cyber Lab teaches properly.
 */
export function CommandCentre() {
  const [events, setEvents] = useState<Event[]>([]);
  const [tick, setTick] = useState(0);
  const [series, setSeries] = useState<number[]>(() => Array.from({ length: 44 }, () => 25 + Math.random() * 45));
  const counter = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const makeEvent = (): Event => {
      counter.current += 1;
      const d = new Date();
      return {
        id: counter.current,
        time: d.toTimeString().slice(0, 8),
        rule: RULES[Math.floor(Math.random() * RULES.length)],
        severity: SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)],
        source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
        status: Math.random() > 0.75 ? "investigating" : Math.random() > 0.5 ? "triage" : "closed",
      };
    };

    // Prime the feed so it never appears empty.
    setEvents(Array.from({ length: 5 }, makeEvent));

    if (reduced) return;

    const feed = setInterval(() => {
      setEvents((prev) => [makeEvent(), ...prev].slice(0, 5));
      setTick((t) => t + 1);
    }, 3400);

    const chart = setInterval(() => {
      setSeries((prev) => {
        const next = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        const drift = (Math.random() - 0.48) * 26;
        next.push(Math.max(8, Math.min(96, last + drift)));
        return next;
      });
    }, 1200);

    return () => {
      clearInterval(feed);
      clearInterval(chart);
    };
  }, []);

  const path = series
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (series.length - 1)) * 100} ${100 - v}`)
    .join(" ");
  const area = `${path} L 100 100 L 0 100 Z`;

  const openCount = events.filter((e) => e.status !== "closed").length;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#060b12]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <Radar className="h-3.5 w-3.5 text-cyan" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink/80">
            CEA · simulated operations
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[0.55rem] uppercase tracking-[0.16em]">
          <span className="rounded border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 text-amber-300">
            demonstration data
          </span>
          <span className="flex items-center gap-1.5 text-green">
            <span className="h-1 w-1 animate-blink rounded-full bg-green" />
            streaming
          </span>
        </div>
      </div>

      <div className="grid gap-px bg-white/[0.05] sm:grid-cols-3">
        {[
          { label: "events / min", value: `${18 + (tick % 7)}`, icon: Activity, tone: "text-cyan" },
          { label: "open alerts", value: String(openCount).padStart(2, "0"), icon: ShieldAlert, tone: "text-amber-300" },
          { label: "mean triage", value: `${2 + (tick % 3)}m 4${tick % 9}s`, icon: Radar, tone: "text-green" },
        ].map((s) => (
          <div key={s.label} className="bg-[#060b12] px-4 py-3">
            <div className="flex items-center gap-1.5">
              <s.icon className={`h-3 w-3 ${s.tone}`} />
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                {s.label}
              </span>
            </div>
            <p className={`mt-1.5 font-display text-xl font-bold tabular-nums ${s.tone}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Sparkline */}
      <div className="relative h-24 border-y border-white/[0.05] bg-[#050a10]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="cc-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[25, 50, 75].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="rgba(146,158,174,0.08)"
              strokeWidth="0.4"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path d={area} fill="url(#cc-fill)" />
          <path
            d={path}
            fill="none"
            stroke="#00D9FF"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute left-3 top-2 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-muted/60">
          inbound auth anomalies · 45m
        </span>
      </div>

      {/* Event feed */}
      <div className="divide-y divide-white/[0.05]">
        <div className="grid grid-cols-[3.5rem_1fr_5.5rem_5rem] items-center gap-2 px-4 py-2 font-mono text-[0.5rem] uppercase tracking-[0.16em] text-muted/60 sm:grid-cols-[4rem_1fr_6rem_5.5rem_5rem]">
          <span>time</span>
          <span>rule</span>
          <span className="hidden sm:block">source</span>
          <span>severity</span>
          <span>status</span>
        </div>
        <div className="min-h-[15rem]">
          {events.map((e, i) => {
            const s = sevStyles[e.severity];
            return (
              <div
                key={e.id}
                className="grid grid-cols-[3.5rem_1fr_5.5rem_5rem] items-center gap-2 border-b border-white/[0.04] px-4 py-2.5 font-mono text-[0.6rem] transition-opacity sm:grid-cols-[4rem_1fr_6rem_5.5rem_5rem]"
                style={{ opacity: 1 - i * 0.13 }}
              >
                <span className="text-muted/70">{e.time}</span>
                <span className="truncate text-ink/80">{e.rule}</span>
                <span className="hidden truncate text-muted sm:block">{e.source}</span>
                <span className={`flex items-center gap-1.5 ${s.text}`}>
                  <span className={`h-1 w-1 rounded-full ${s.dot}`} />
                  {e.severity}
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 text-center text-[0.5rem] uppercase tracking-wider ${
                    e.status === "investigating"
                      ? "bg-violet/15 text-violet-300"
                      : e.status === "triage"
                        ? "bg-white/[0.06] text-muted"
                        : "bg-green/10 text-green/80"
                  }`}
                >
                  {e.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
