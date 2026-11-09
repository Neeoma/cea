"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Eye, EyeOff, Info, Loader2 } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "notice">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setState("loading");
    await new Promise((r) => setTimeout(r, 800));
    setState("notice");
  };

  if (state === "notice") {
    return (
      <div className="rounded-2xl border border-cyan/25 bg-cyan/[0.04] p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan/30 bg-cyan/[0.1]">
          <Info className="h-4 w-4 text-cyan" />
        </div>
        <h2 className="mt-4 font-display text-lg font-bold text-ink">Authentication not connected</h2>
        <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
          This deployment runs as a design preview without a credentials store, so sign-in is
          intentionally disabled rather than faked. In production this form posts to an
          authentication service with MFA for staff roles, rate limiting and audit logging.
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link
            href="/portal"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan px-4 py-2.5 text-[0.8125rem] font-semibold text-void"
          >
            View portal preview <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setState("idle")}
            className="rounded-xl border border-white/12 px-4 py-2.5 text-[0.8125rem] text-ink"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
    >
      <h2 className="font-display text-lg font-bold text-ink">Student sign in</h2>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="login-email" className="mb-1.5 block text-[0.75rem] text-muted">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-white/[0.1] bg-white/[0.03] px-3.5 py-2.5 text-[0.8125rem] text-ink placeholder:text-muted/50 focus:border-cyan/60 focus:outline-none"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <label htmlFor="login-password" className="text-[0.75rem] text-muted">
              Password
            </label>
            <span className="font-mono text-[0.55rem] text-muted/60">reset via admissions</span>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/[0.1] bg-white/[0.03] px-3.5 py-2.5 pr-10 text-[0.8125rem] text-ink placeholder:text-muted/50 focus:border-cyan/60 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-3 flex items-center gap-1.5 rounded-lg border border-red-500/25 bg-red-500/[0.06] px-3 py-2 text-[0.7rem] text-red-300">
          <AlertCircle className="h-3 w-3 shrink-0" /> {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan px-5 py-3 text-sm font-semibold text-void transition-all hover:brightness-110 disabled:opacity-60"
      >
        {state === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
          </>
        ) : (
          <>
            Sign in <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="mt-4 text-[0.65rem] leading-relaxed text-muted/60">
        Preview deployment — no credentials are transmitted or stored. Rate limiting, MFA and audit
        logging are specified for production.
      </p>
    </form>
  );
}
