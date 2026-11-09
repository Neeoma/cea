"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, GraduationCap, MapPin } from "lucide-react";
import { departmentById } from "@/data/academy";
import type { Programme } from "@/data/programmes";

const accentMap = {
  cyan: { text: "text-cyan", border: "group-hover:border-cyan/40", bg: "bg-cyan/[0.08]", ring: "bg-cyan" },
  green: { text: "text-green", border: "group-hover:border-green/40", bg: "bg-green/[0.08]", ring: "bg-green" },
  violet: { text: "text-violet-300", border: "group-hover:border-violet/40", bg: "bg-violet/[0.1]", ring: "bg-violet" },
} as const;

export function ProgrammeCard({ programme, priority = false }: { programme: Programme; priority?: boolean }) {
  const dept = departmentById(programme.department);
  const accent = accentMap[dept.accent];

  return (
    <Link
      href={`/programmes/${programme.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-deep/40 transition-all duration-500 ${accent.border} hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={programme.heroImage}
          alt={`${programme.title} programme at Cyber Elias Academy`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-transparent" />
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <span
            className={`rounded-full border border-white/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] backdrop-blur-md ${accent.bg} ${accent.text}`}
          >
            {dept.name}
          </span>
          <span className="rounded-full border border-white/10 bg-void/60 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink/80 backdrop-blur-md">
            {programme.level}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-ink transition-colors group-hover:text-white">
          {programme.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-relaxed text-muted">
          {programme.tagline}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.06] pt-4 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" /> {programme.durationWeeks}w
          </span>
          <span className="flex items-center gap-1.5">
            <GraduationCap className="h-3 w-3" /> {programme.modules.length} modules
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" /> {programme.modes.length} mode{programme.modes.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-[0.7rem] text-ink/70">
            {programme.fee ? `₦${programme.fee.toLocaleString()}` : "Fee on request"}
          </span>
          <span className={`flex items-center gap-1 text-[0.75rem] font-medium ${accent.text}`}>
            View
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
