"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight, Check } from "lucide-react";
import { enterpriseOfferings } from "@/data/content";

const sizes = ["1–10 staff", "11–25 staff", "26–50 staff", "50+ staff"];

export function EnterpriseForm() {
  const [form, setForm] = useState({
    org: "",
    name: "",
    email: "",
    teamSize: "",
    interests: [] as string[],
    goal: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const toggleInterest = (title: string) =>
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(title)
        ? f.interests.filter((i) => i !== title)
        : [...f.interests, title],
    }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.org.trim().length < 2) errs.org = "Organisation name is required.";
    if (form.name.trim().length < 2) errs.name = "Contact name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) errs.email = "A valid work email is required.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex h-full flex-col justify-center rounded-2xl border border-green/25 bg-green/[0.04] p-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-green/30 bg-green/10">
          <Check className="h-5 w-5 text-green" />
        </div>
        <h2 className="mt-5 font-display text-xl font-bold text-ink">Enquiry noted.</h2>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
          Our enterprise lead will contact {form.email} to arrange a scoping call. Expect a reply
          within two working days.
        </p>
        <p className="mt-6 text-[0.7rem] leading-relaxed text-muted/60">
          Demonstration form — in production this posts to a server endpoint with rate limiting and
          audit logging.
        </p>
      </div>
    );
  }

  const inputCls = (k: string) =>
    `w-full rounded-lg border bg-white/[0.03] px-3.5 py-2.5 text-[0.8125rem] text-ink placeholder:text-muted/50 focus:outline-none ${
      errors[k] ? "border-red-500/50" : "border-white/[0.1] focus:border-cyan/60"
    }`;

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7"
    >
      <h2 className="font-display text-lg font-bold text-ink">Corporate enquiry</h2>
      <p className="mt-1 text-[0.8125rem] text-muted">
        Four fields. We will come back with a scoping conversation, not a brochure.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="org" className="mb-1.5 block text-[0.75rem] text-muted">
            Organisation <span className="text-cyan">*</span>
          </label>
          <input
            id="org"
            value={form.org}
            onChange={(e) => setForm({ ...form, org: e.target.value })}
            placeholder="Company or institution"
            className={inputCls("org")}
          />
          {errors.org && (
            <p className="mt-1.5 flex items-center gap-1 text-[0.7rem] text-red-400">
              <AlertCircle className="h-3 w-3" /> {errors.org}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="ename" className="mb-1.5 block text-[0.75rem] text-muted">
            Contact name <span className="text-cyan">*</span>
          </label>
          <input
            id="ename"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className={inputCls("name")}
          />
          {errors.name && (
            <p className="mt-1.5 flex items-center gap-1 text-[0.7rem] text-red-400">
              <AlertCircle className="h-3 w-3" /> {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="eemail" className="mb-1.5 block text-[0.75rem] text-muted">
            Work email <span className="text-cyan">*</span>
          </label>
          <input
            id="eemail"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            className={inputCls("email")}
          />
          {errors.email && (
            <p className="mt-1.5 flex items-center gap-1 text-[0.7rem] text-red-400">
              <AlertCircle className="h-3 w-3" /> {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <span className="mb-2 block text-[0.75rem] text-muted">Team size</span>
          <div className="flex flex-wrap gap-1.5">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setForm({ ...form, teamSize: s })}
                aria-pressed={form.teamSize === s}
                className={`rounded-lg border px-3 py-1.5 text-[0.75rem] transition-colors ${
                  form.teamSize === s
                    ? "border-cyan/50 bg-cyan/[0.1] text-cyan"
                    : "border-white/[0.1] text-muted hover:border-white/25 hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <span className="mb-2 block text-[0.75rem] text-muted">Areas of interest</span>
          <div className="flex flex-wrap gap-1.5">
            {enterpriseOfferings.map((o) => (
              <button
                key={o.title}
                type="button"
                onClick={() => toggleInterest(o.title)}
                aria-pressed={form.interests.includes(o.title)}
                className={`rounded-lg border px-2.5 py-1.5 text-[0.7rem] transition-colors ${
                  form.interests.includes(o.title)
                    ? "border-green/40 bg-green/[0.08] text-green"
                    : "border-white/[0.1] text-muted hover:border-white/25 hover:text-ink"
                }`}
              >
                {o.title}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="goal" className="mb-1.5 block text-[0.75rem] text-muted">
            What should your team be able to do afterwards?
          </label>
          <textarea
            id="goal"
            rows={3}
            value={form.goal}
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
            placeholder="A sentence or two is plenty."
            className={`${inputCls("goal")} resize-y`}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan px-5 py-3.5 text-sm font-semibold text-void transition-all hover:brightness-110"
      >
        Send enquiry <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
