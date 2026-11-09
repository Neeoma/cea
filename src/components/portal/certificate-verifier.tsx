"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  QrCode,
  Search,
  ShieldX,
} from "lucide-react";
import { certificates, findCertificate, type CertificateRecord } from "@/data/certificates";
import { academy } from "@/data/academy";

type Result =
  | { state: "idle" }
  | { state: "searching" }
  | { state: "found"; record: CertificateRecord }
  | { state: "notfound"; query: string };

export function CertificateVerifier() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Result>({ state: "idle" });

  const search = async (value: string) => {
    const id = value.trim();
    if (!id) return;
    setResult({ state: "searching" });
    await new Promise((r) => setTimeout(r, 700));
    const record = findCertificate(id);
    setResult(record ? { state: "found", record } : { state: "notfound", query: id });
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
      <h2 className="font-display text-lg font-bold text-ink">Verify a certificate</h2>
      <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">
        Enter the certificate ID printed on the document, or scan its QR code to land here with the
        ID pre-filled.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void search(query);
        }}
        className="mt-6"
      >
        <label htmlFor="certificate-id" className="mb-1.5 block text-[0.75rem] text-muted">
          Certificate ID
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="certificate-id"
              value={query}
              onChange={(e) => setQuery(e.target.value.toUpperCase())}
              placeholder="CEA-CERT-YYYY-XXXX"
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-lg border border-white/[0.1] bg-white/[0.03] py-3 pl-10 pr-3 font-mono text-[0.8125rem] tracking-wider text-ink placeholder:tracking-normal placeholder:text-muted/50 focus:border-cyan/60 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={!query.trim() || result.state === "searching"}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan px-5 py-3 text-sm font-semibold text-void transition-all hover:brightness-110 disabled:opacity-50"
          >
            {result.state === "searching" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Checking
              </>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </form>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {certificates.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setQuery(c.id);
              void search(c.id);
            }}
            className="rounded border border-white/[0.08] px-2 py-1 font-mono text-[0.55rem] text-muted transition-colors hover:border-cyan/40 hover:text-cyan"
          >
            try {c.id}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {result.state === "found" && (
          <motion.div
            key="found"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-7"
          >
            {result.record.status === "valid" ? (
              <div className="overflow-hidden rounded-xl border border-green/30 bg-green/[0.05]">
                <div className="flex items-center gap-2.5 border-b border-green/20 bg-green/[0.07] px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-green" />
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-green">
                    Valid certificate
                  </p>
                </div>
                <div className="space-y-3 p-4">
                  <Row label="Certificate ID" value={result.record.id} mono />
                  <Row label="Holder" value={result.record.holder} />
                  <Row label="Programme" value={result.record.programme} />
                  <Row label="Cohort" value={result.record.cohort} mono />
                  <Row
                    label="Issued"
                    value={new Date(result.record.issued).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  />
                  <Row label="Awarded" value={result.record.grade} />
                  <Row label="Issued by" value={academy.name} />
                </div>
                <div className="border-t border-green/20 px-4 py-2.5">
                  <p className="flex items-start gap-1.5 text-[0.65rem] leading-relaxed text-green/70">
                    <QrCode className="mt-0.5 h-3 w-3 shrink-0" />
                    Demonstration record — this register ships with sample entries that are clearly
                    labelled until real certificates are issued.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-red-500/30 bg-red-500/[0.05]">
                <div className="flex items-center gap-2.5 border-b border-red-500/20 bg-red-500/[0.08] px-4 py-3">
                  <ShieldX className="h-4 w-4 text-red-400" />
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-red-400">
                    Revoked certificate
                  </p>
                </div>
                <div className="space-y-3 p-4">
                  <Row label="Certificate ID" value={result.record.id} mono />
                  <Row label="Programme" value={result.record.programme} />
                  <Row label="Issued" value={result.record.issued} />
                </div>
                <div className="border-t border-red-500/20 px-4 py-3">
                  <p className="flex items-start gap-1.5 text-[0.7rem] leading-relaxed text-red-300/80">
                    <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
                    {result.record.revokedReason ?? "This certificate has been revoked."}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {result.state === "notfound" && (
          <motion.div
            key="notfound"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-7 rounded-xl border border-amber-400/25 bg-amber-400/[0.05] p-4"
          >
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-amber-300">
                No record found
              </p>
            </div>
            <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted">
              <span className="font-mono text-ink/85">{result.query}</span> is not in the CEA
              register. Check the ID for transcription errors. If it still does not resolve, the
              document is not a CEA certificate — contact{" "}
              <a
                href={`mailto:${academy.contact.admissionsEmail}`}
                className="text-cyan underline decoration-cyan/30 underline-offset-2"
              >
                {academy.contact.admissionsEmail}
              </a>{" "}
              and we will confirm in writing.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-2.5 last:border-0 last:pb-0">
      <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      <span
        className={`text-right text-[0.8125rem] text-ink ${mono ? "font-mono tracking-wide" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
