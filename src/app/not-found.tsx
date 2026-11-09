import Link from "next/link";
import { ArrowLeft, ArrowRight, Radar } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/[0.08] blur-[110px]" />
      </div>

      <div className="container-cea">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <Radar className="h-6 w-6 animate-blink text-cyan" />
          </div>
          <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-cyan">
            404 · route not found
          </p>
          <h1 className="display-lg mt-4 text-ink">
            This page isn&apos;t
            <br />
            in the register.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted">
            The address you followed does not resolve to anything CEA publishes. Try the programme
            catalogue, or tell us what you were looking for.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/programmes"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan px-5 py-3 text-sm font-semibold text-void"
            >
              Browse programmes <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/12 px-5 py-3 text-sm text-ink transition-colors hover:border-cyan/40"
            >
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-3 py-3 text-sm text-muted transition-colors hover:text-cyan"
            >
              Report a broken link
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted/60">
            <Link href="/cyber-lab" className="hover:text-cyan">Cyber Lab</Link>
            <Link href="/verify" className="hover:text-cyan">Verify a certificate</Link>
            <Link href="/admissions" className="hover:text-cyan">Admissions</Link>
            <Link href="/resources" className="hover:text-cyan">Resources</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
