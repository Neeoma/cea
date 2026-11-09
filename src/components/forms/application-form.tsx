"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, Check, Copy, PartyPopper } from "lucide-react";
import { programmes } from "@/data/programmes";
import { departments, learningModes } from "@/data/academy";

type Fields = {
  name: string;
  email: string;
  phone: string;
  state: string;
  country: string;
  programme: string;
  mode: string;
  background: string;
  experience: string;
  heardFrom: string;
  notes: string;
};

const initial: Fields = {
  name: "",
  email: "",
  phone: "",
  state: "",
  country: "Nigeria",
  programme: "",
  mode: "",
  background: "",
  experience: "",
  heardFrom: "",
  notes: "",
};

/** Server-side-shaped validation, run client-side for instant feedback. */
export function validate(values: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (values.phone.trim() && !/^[+0-9\s()-]{7,20}$/.test(values.phone.trim()))
    errors.phone = "Enter a valid phone number, or leave it blank.";
  if (!values.programme) errors.programme = "Choose a programme or select “not sure yet”.";
  return errors;
}

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT — Abuja", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
  "Taraba", "Yobe", "Zamfara", "Outside Nigeria",
];

function makeReference() {
  const y = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `CEA-${y}-${rand}`;
}

export function ApplicationForm() {
  const params = useSearchParams();
  const preselected = params.get("programme") ?? "";

  const [values, setValues] = useState<Fields>({
    ...initial,
    programme: programmes.some((p) => p.slug === preselected) ? preselected : "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const chosen = useMemo(
    () => programmes.find((p) => p.slug === values.programme),
    [values.programme],
  );

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (touched[key]) setErrors(validate(next));
  };

  const blur = (key: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, programme: true });
    if (Object.keys(errs).length > 0) {
      document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setSubmitting(true);
    // In production this POSTs to a server action / edge function with rate
    // limiting and encrypted at-rest storage. No credentials live in the client.
    await new Promise((r) => setTimeout(r, 900));
    const ref = makeReference();
    try {
      const existing = JSON.parse(localStorage.getItem("cea:applications") ?? "[]");
      localStorage.setItem(
        "cea:applications",
        JSON.stringify([{ ...values, reference: ref, submittedAt: new Date().toISOString() }, ...existing].slice(0, 20)),
      );
    } catch {
      /* storage unavailable — non-blocking */
    }
    setReference(ref);
    setSubmitting(false);
  };

  const copyRef = async () => {
    if (!reference) return;
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  if (reference) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-2xl border border-green/25 bg-green/[0.04] p-7 sm:p-10"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-green/30 bg-green/10">
          <PartyPopper className="h-6 w-6 text-green" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-bold text-ink sm:text-3xl">
          Application received.
        </h2>
        <p className="mt-3 max-w-lg text-[0.875rem] leading-relaxed text-muted">
          Admissions will review your application and reply within three working days. Keep your
          reference — quote it in any correspondence.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="rounded-xl border border-white/[0.1] bg-void/60 px-4 py-3">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
              your reference
            </p>
            <p className="mt-1 font-mono text-lg tracking-wider text-green">{reference}</p>
          </div>
          <button
            type="button"
            onClick={copyRef}
            className="inline-flex items-center gap-2 rounded-lg border border-white/12 px-4 py-3 text-[0.8125rem] text-ink transition-colors hover:border-cyan/40"
          >
            {copied ? <Check className="h-4 w-4 text-green" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <dl className="mt-7 grid gap-x-6 gap-y-3 border-t border-white/[0.08] pt-5 sm:grid-cols-2">
          {[
            ["Applicant", values.name],
            ["Email", values.email],
            ["Programme", chosen?.title ?? "Admissions advice"],
            ["Preferred mode", values.mode || "To be discussed"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">{k}</dt>
              <dd className="mt-0.5 text-[0.8125rem] text-ink/85">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/programmes"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan px-5 py-3 text-sm font-semibold text-void"
          >
            Browse more programmes <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => {
              setReference(null);
              setValues(initial);
              setTouched({});
              setErrors({});
            }}
            className="rounded-xl border border-white/12 px-5 py-3 text-sm text-ink transition-colors hover:border-cyan/40"
          >
            Submit another application
          </button>
        </div>

        <p className="mt-6 text-[0.7rem] leading-relaxed text-muted/70">
          This demonstration form stores the submission in your browser only. A production deployment
          sends it to a rate-limited server endpoint with encrypted storage, in line with the
          Nigeria Data Protection Act.
        </p>
      </motion.div>
    );
  }

  const err = (k: keyof Fields) =>
    errors[k] && touched[k] ? (
      <p className="mt-1.5 flex items-center gap-1 text-[0.7rem] text-red-400">
        <AlertCircle className="h-3 w-3" /> {errors[k]}
      </p>
    ) : null;

  const inputCls = (k: keyof Fields) =>
    `w-full rounded-lg border bg-white/[0.03] px-3.5 py-2.5 text-[0.8125rem] text-ink placeholder:text-muted/50 transition-colors focus:outline-none ${
      errors[k] && touched[k]
        ? "border-red-500/50 focus:border-red-500"
        : "border-white/[0.1] focus:border-cyan/60"
    }`;

  return (
    <form
      id="application-form"
      onSubmit={submit}
      noValidate
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-ink">Application form</h2>
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">
          step 1 of 1
        </span>
      </div>

      <fieldset className="mt-7">
        <legend className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cyan/90">
          Your details
        </legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="mb-1.5 block text-[0.75rem] text-muted">
              Full name <span className="text-cyan">*</span>
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={set("name")}
              onBlur={blur("name")}
              aria-invalid={!!(errors.name && touched.name)}
              placeholder="e.g. Ada Okoro"
              className={inputCls("name")}
            />
            {err("name")}
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-[0.75rem] text-muted">
              Email address <span className="text-cyan">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={set("email")}
              onBlur={blur("email")}
              aria-invalid={!!(errors.email && touched.email)}
              placeholder="you@example.com"
              className={inputCls("email")}
            />
            {err("email")}
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-[0.75rem] text-muted">
              Phone number <span className="text-muted/50">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={set("phone")}
              onBlur={blur("phone")}
              placeholder="+234 800 000 0000"
              className={inputCls("phone")}
            />
            {err("phone")}
          </div>

          <div>
            <label htmlFor="state" className="mb-1.5 block text-[0.75rem] text-muted">
              State
            </label>
            <select id="state" name="state" value={values.state} onChange={set("state")} className={inputCls("state")}>
              <option value="" className="bg-deep">Select…</option>
              {nigerianStates.map((s) => (
                <option key={s} value={s} className="bg-deep">{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="country" className="mb-1.5 block text-[0.75rem] text-muted">
              Country
            </label>
            <input
              id="country"
              name="country"
              autoComplete="country-name"
              value={values.country}
              onChange={set("country")}
              className={inputCls("country")}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-8 border-t border-white/[0.07] pt-7">
        <legend className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cyan/90">
          Programme
        </legend>
        <div className="mt-4 grid gap-4">
          <div>
            <label htmlFor="programme" className="mb-1.5 block text-[0.75rem] text-muted">
              Which programme? <span className="text-cyan">*</span>
            </label>
            <select
              id="programme"
              name="programme"
              value={values.programme}
              onChange={set("programme")}
              onBlur={blur("programme")}
              aria-invalid={!!(errors.programme && touched.programme)}
              className={inputCls("programme")}
            >
              <option value="" className="bg-deep">Select a programme…</option>
              <option value="unsure" className="bg-deep">Not sure yet — advise me</option>
              {departments.map((d) => (
                <optgroup key={d.id} label={d.name} className="bg-deep">
                  {programmes
                    .filter((p) => p.department === d.id)
                    .map((p) => (
                      <option key={p.slug} value={p.slug} className="bg-deep">
                        {p.title} — {p.level}, {p.durationWeeks}w
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
            {err("programme")}
            {chosen && (
              <div className="mt-2.5 rounded-lg border border-cyan/20 bg-cyan/[0.04] px-3 py-2.5">
                <p className="text-[0.75rem] leading-relaxed text-ink/85">{chosen.tagline}</p>
                <div className="mt-1.5 flex flex-wrap gap-3 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-cyan/80">
                  <span>{chosen.durationWeeks} weeks</span>
                  <span>{chosen.level}</span>
                  <span>{chosen.modes.join(" / ")}</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <span className="mb-2 block text-[0.75rem] text-muted">Preferred learning mode</span>
            <div className="flex flex-wrap gap-2">
              {learningModes.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setValues({ ...values, mode: values.mode === m ? "" : m })}
                  aria-pressed={values.mode === m}
                  className={`rounded-lg border px-3.5 py-2 text-[0.75rem] transition-colors ${
                    values.mode === m
                      ? "border-cyan/50 bg-cyan/[0.1] text-cyan"
                      : "border-white/[0.1] text-muted hover:border-white/25 hover:text-ink"
                  }`}
                >
                  {m}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setValues({ ...values, mode: values.mode === "Undecided" ? "" : "Undecided" })}
                aria-pressed={values.mode === "Undecided"}
                className={`rounded-lg border px-3.5 py-2 text-[0.75rem] transition-colors ${
                  values.mode === "Undecided"
                    ? "border-cyan/50 bg-cyan/[0.1] text-cyan"
                    : "border-white/[0.1] text-muted hover:border-white/25 hover:text-ink"
                }`}
              >
                Undecided
              </button>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-8 border-t border-white/[0.07] pt-7">
        <legend className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cyan/90">
          Your background <span className="text-muted/50">(all optional)</span>
        </legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="background" className="mb-1.5 block text-[0.75rem] text-muted">
              Highest education
            </label>
            <select id="background" name="background" value={values.background} onChange={set("background")} className={inputCls("background")}>
              <option value="" className="bg-deep">Select…</option>
              {["Secondary school", "OND / NCE", "HND / Bachelor's", "Master's or above", "Other"].map((o) => (
                <option key={o} value={o} className="bg-deep">{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="experience" className="mb-1.5 block text-[0.75rem] text-muted">
              Previous technical experience
            </label>
            <select id="experience" name="experience" value={values.experience} onChange={set("experience")} className={inputCls("experience")}>
              <option value="" className="bg-deep">Select…</option>
              {["None — starting fresh", "Some self-taught basics", "1–2 years working", "3+ years working"].map((o) => (
                <option key={o} value={o} className="bg-deep">{o}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="heardFrom" className="mb-1.5 block text-[0.75rem] text-muted">
              How did you hear about CEA?
            </label>
            <select id="heardFrom" name="heardFrom" value={values.heardFrom} onChange={set("heardFrom")} className={inputCls("heardFrom")}>
              <option value="" className="bg-deep">Select…</option>
              {["A friend or colleague", "Google or search", "Social media", "Instagram / TikTok", "WhatsApp group", "Walked past the campus", "Current student or alumnus", "Other"].map((o) => (
                <option key={o} value={o} className="bg-deep">{o}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="notes" className="mb-1.5 block text-[0.75rem] text-muted">
              Anything we should know? <span className="text-muted/50">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={values.notes}
              onChange={set("notes")}
              maxLength={600}
              placeholder="Schedule constraints, accessibility needs, questions…"
              className={`${inputCls("notes")} resize-y`}
            />
            <p className="mt-1 text-right font-mono text-[0.6rem] text-muted/50">
              {values.notes.length}/600
            </p>
          </div>
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.7rem] leading-relaxed text-muted/70">
          By submitting you agree to CEA contacting you about your application. We do not sell or
          share applicant data.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan px-6 py-3.5 text-sm font-semibold text-void transition-all hover:brightness-110 disabled:opacity-60"
        >
          {submitting ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-void/30 border-t-void" />
              Submitting…
            </>
          ) : (
            <>
              Submit application <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
