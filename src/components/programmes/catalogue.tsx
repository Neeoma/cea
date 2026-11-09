"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { departments, learningModes, levels, type DepartmentId, type Level, type LearningMode } from "@/data/academy";
import { programmes } from "@/data/programmes";
import { ProgrammeCard } from "./programme-card";

const sortOptions = [
  { id: "recommended", label: "Recommended" },
  { id: "duration", label: "Shortest first" },
  { id: "level", label: "Beginner first" },
  { id: "title", label: "A – Z" },
] as const;

const levelOrder: Record<Level, number> = { Beginner: 0, Intermediate: 1, Advanced: 2 };

export function Catalogue() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState<DepartmentId | "all">("all");
  const [level, setLevel] = useState<Level | "all">("all");
  const [mode, setMode] = useState<LearningMode | "all">("all");
  const [maxWeeks, setMaxWeeks] = useState(16);
  const [sort, setSort] = useState<(typeof sortOptions)[number]["id"]>("recommended");
  const [showFilters, setShowFilters] = useState(false);

  // Deep-link support: /programmes?department=cybersecurity
  useEffect(() => {
    const d = params.get("department") as DepartmentId | null;
    if (d && departments.some((x) => x.id === d)) setDept(d);
    const l = params.get("level") as Level | null;
    if (l && levels.includes(l)) setLevel(l);
  }, [params]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = programmes.filter((p) => {
      if (dept !== "all" && p.department !== dept) return false;
      if (level !== "all" && p.level !== level) return false;
      if (mode !== "all" && !p.modes.includes(mode)) return false;
      if (p.durationWeeks > maxWeeks) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tools.some((t) => t.toLowerCase().includes(q)) ||
        p.modules.some((m) => m.title.toLowerCase().includes(q))
      );
    });

    switch (sort) {
      case "duration":
        list = [...list].sort((a, b) => a.durationWeeks - b.durationWeeks);
        break;
      case "level":
        list = [...list].sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
        break;
      case "title":
        list = [...list].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        list = [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return list;
  }, [query, dept, level, mode, maxWeeks, sort]);

  const activeFilters =
    (dept !== "all" ? 1 : 0) +
    (level !== "all" ? 1 : 0) +
    (mode !== "all" ? 1 : 0) +
    (maxWeeks !== 16 ? 1 : 0);

  const reset = () => {
    setDept("all");
    setLevel("all");
    setMode("all");
    setMaxWeeks(16);
    setQuery("");
  };

  const FilterGroup = ({
    label,
    options,
    value,
    onChange,
  }: {
    label: string;
    options: { id: string; label: string }[];
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div>
      <p className="mb-2.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={value === o.id}
            className={`rounded-lg border px-2.5 py-1.5 text-[0.75rem] transition-colors ${
              value === o.id
                ? "border-cyan/50 bg-cyan/[0.1] text-cyan"
                : "border-white/[0.08] text-muted hover:border-white/20 hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );

  const filters = (
    <div className="space-y-6">
      <FilterGroup
        label="Department"
        value={dept}
        onChange={(v) => setDept(v as DepartmentId | "all")}
        options={[
          { id: "all", label: "All" },
          ...departments.map((d) => ({ id: d.id, label: d.name })),
        ]}
      />
      <FilterGroup
        label="Level"
        value={level}
        onChange={(v) => setLevel(v as Level | "all")}
        options={[{ id: "all", label: "All" }, ...levels.map((l) => ({ id: l, label: l }))]}
      />
      <FilterGroup
        label="Learning mode"
        value={mode}
        onChange={(v) => setMode(v as LearningMode | "all")}
        options={[{ id: "all", label: "All" }, ...learningModes.map((m) => ({ id: m, label: m }))]}
      />
      <div>
        <div className="mb-2.5 flex items-baseline justify-between">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
            Max duration
          </p>
          <span className="font-mono text-[0.7rem] text-cyan">{maxWeeks} weeks</span>
        </div>
        <input
          type="range"
          min={6}
          max={16}
          step={1}
          value={maxWeeks}
          onChange={(e) => setMaxWeeks(Number(e.target.value))}
          aria-label="Maximum programme duration in weeks"
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan outline-offset-8 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan"
        />
      </div>
      {activeFilters > 0 && (
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 text-[0.75rem] text-muted transition-colors hover:text-cyan"
        >
          <X className="h-3 w-3" /> Clear {activeFilters} filter{activeFilters > 1 ? "s" : ""}
        </button>
      )}
    </div>
  );

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programmes, tools, modules…"
            aria-label="Search programmes"
            className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-ink placeholder:text-muted/70 focus:border-cyan/50 focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3.5 text-[0.8125rem] text-ink lg:hidden"
            aria-expanded={showFilters}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilters > 0 && (
              <span className="rounded-full bg-cyan px-1.5 py-0.5 font-mono text-[0.6rem] text-void">
                {activeFilters}
              </span>
            )}
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            aria-label="Sort programmes"
            className="rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3.5 text-[0.8125rem] text-ink focus:border-cyan/50 focus:outline-none"
          >
            {sortOptions.map((s) => (
              <option key={s.id} value={s.id} className="bg-deep">
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[15rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
            {filters}
          </div>
        </aside>

        {showFilters && (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 lg:hidden">
            {filters}
          </div>
        )}

        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              {results.length} programme{results.length !== 1 ? "s" : ""}
            </p>
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-[0.75rem] text-muted hover:text-cyan"
              >
                Clear search
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
              <p className="font-display text-lg font-bold text-ink">No matches</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
                Nothing fits that combination yet. Widen your filters, or ask admissions
                about a custom pathway.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-5 rounded-lg bg-cyan px-4 py-2 text-sm font-semibold text-void"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p, i) => (
                <ProgrammeCard key={p.slug} programme={p} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
