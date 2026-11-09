"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight, Check } from "lucide-react";

const topics = ["Programmes", "Admissions", "Fees & payment", "Enterprise training", "Something else"];

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) errs.email = "A valid email is required.";
    if (form.message.trim().length < 10) errs.message = "A sentence or two, so we can help properly.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-green/25 bg-green/[0.04] p-8 sm:p-10">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-green/30 bg-green/10">
          <Check className="h-5 w-5 text-green" />
        </div>
        <h2 className="mt-5 font-display text-xl font-bold text-ink">Message sent.</h2>
        <p className="mt-2 max-w-md text-[0.875rem] leading-relaxed text-muted">
          Admissions will reply to {form.email} within two working days. If your question is urgent,
          visit the campus during opening hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setForm({ name: "", email: "", topic: "", message: "" });
          }}
          className="mt-6 rounded-lg border border-white/12 px-4 py-2.5 text-[0.8125rem] text-ink transition-colors hover:border-cyan/40"
        >
          Send another message
        </button>
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
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8"
    >
      <h2 className="font-display text-lg font-bold text-ink">Send an enquiry</h2>
      <p className="mt-1 text-[0.8125rem] text-muted">
        Read by admissions staff, not an autoresponder.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cname" className="mb-1.5 block text-[0.75rem] text-muted">
            Your name <span className="text-cyan">*</span>
          </label>
          <input
            id="cname"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls("name")}
            placeholder="Full name"
          />
          {errors.name && (
            <p className="mt-1.5 flex items-center gap-1 text-[0.7rem] text-red-400">
              <AlertCircle className="h-3 w-3" /> {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cemail" className="mb-1.5 block text-[0.75rem] text-muted">
            Email <span className="text-cyan">*</span>
          </label>
          <input
            id="cemail"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputCls("email")}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1.5 flex items-center gap-1 text-[0.7rem] text-red-400">
              <AlertCircle className="h-3 w-3" /> {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <span className="mb-2 block text-[0.75rem] text-muted">What is this about?</span>
          <div className="flex flex-wrap gap-1.5">
            {topics.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm({ ...form, topic: form.topic === t ? "" : t })}
                aria-pressed={form.topic === t}
                className={`rounded-lg border px-3 py-1.5 text-[0.75rem] transition-colors ${
                  form.topic === t
                    ? "border-cyan/50 bg-cyan/[0.1] text-cyan"
                    : "border-white/[0.1] text-muted hover:border-white/25 hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cmsg" className="mb-1.5 block text-[0.75rem] text-muted">
            Message <span className="text-cyan">*</span>
          </label>
          <textarea
            id="cmsg"
            rows={5}
            maxLength={1200}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${inputCls("message")} resize-y`}
            placeholder="Tell us what you want to learn, or what you need to know."
          />
          {errors.message ? (
            <p className="mt-1.5 flex items-center gap-1 text-[0.7rem] text-red-400">
              <AlertCircle className="h-3 w-3" /> {errors.message}
            </p>
          ) : (
            <p className="mt-1 text-right font-mono text-[0.6rem] text-muted/50">
              {form.message.length}/1200
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan px-6 py-3.5 text-sm font-semibold text-void transition-all hover:brightness-110"
      >
        Send message <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
