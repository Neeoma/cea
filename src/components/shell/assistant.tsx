"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Bot, Sparkles, X } from "lucide-react";
import { academy, departments } from "@/data/academy";
import { programmes } from "@/data/programmes";
import { faqs } from "@/data/content";

type Msg = {
  id: number;
  role: "user" | "assistant";
  text: string;
  links?: { label: string; href: string }[];
};

/**
 * CEA assistant — a deterministic, grounded responder.
 *
 * The brief asks for an assistant grounded in verified academy information.
 * Rather than shipping an ungrounded generative endpoint, this answers from the
 * site's own structured record (programmes, modes, fees, campus) and escalates
 * anything it cannot answer to a human. That keeps it honest by construction.
 */

const TOPICS: {
  keys: string[];
  answer: (u: string) => Msg["text"];
  links?: { label: string; href: string }[];
}[] = [
  {
    keys: ["fee", "cost", "price", "tuition", "pay", "afford", "instalment", "installment"],
    answer: () =>
      "Tuition is confirmed by admissions per cohort and learning mode, so this site deliberately does not publish figures it cannot verify. Submit an application and admissions will send the current fee schedule with your acceptance. Instalment arrangements are discussed after acceptance — they are not guaranteed.",
    links: [
      { label: "Apply", href: "/apply" },
      { label: "Fees & payment FAQ", href: "/about#faq" },
    ],
  },
  {
    keys: ["cyber", "security", "hack", "pentest", "soc", "forensic"],
    answer: () =>
      `Cybersecurity has ${programmes.filter((p) => p.department === "cybersecurity").length} programmes: Fundamentals (beginner), Ethical Hacking, Security Operations, Network Security, Digital Forensics (advanced) and more. Everything offensive is taught in isolated, authorised labs only.`,
    links: [
      { label: "Cybersecurity pathways", href: "/cybersecurity" },
      { label: "Try the Cyber Lab", href: "/cyber-lab" },
    ],
  },
  {
    keys: ["beginner", "start", "new", "never", "no experience", "zero"],
    answer: () =>
      "If you are starting from zero, the cleanest entry points are Computer Fundamentals & Office Skills (6 weeks), Cybersecurity Fundamentals (8 weeks) or Full-Stack Web Development (14 weeks). All three assume no prior technical experience.",
    links: [
      { label: "Filter beginner programmes", href: "/programmes?level=Beginner" },
      { label: "Admissions process", href: "/admissions" },
    ],
  },
  {
    keys: ["where", "location", "address", "campus", "port harcourt", "ebony"],
    answer: () =>
      `The campus is at ${academy.address.line1}, ${academy.address.city}, ${academy.address.state}. Admissions hours are ${academy.contact.hours}. Many programmes also run in hybrid or online modes — check the individual programme page.`,
    links: [
      { label: "Contact & directions", href: "/contact" },
      { label: "Programmes by mode", href: "/programmes" },
    ],
  },
  {
    keys: ["online", "remote", "hybrid", "mode", "evening", "work"],
    answer: () =>
      "Programmes run in up to three modes: Physical, Hybrid and Online. Several pathways are built for working people with evening and weekend cohorts, typically five to eight hours of study per week. The exact modes are listed on each programme page.",
    links: [{ label: "Browse programmes", href: "/programmes" }],
  },
  {
    keys: ["apply", "application", "admission", "enrol", "enroll", "register", "join"],
    answer: () =>
      "Apply in four steps: choose a programme, give us your contact details, pick a learning mode, and submit. You receive an application reference immediately, and admissions reviews it and responds with next steps and payment instructions.",
    links: [{ label: "Start an application", href: "/apply" }],
  },
  {
    keys: ["certificate", "verify", "verification", "recognised", "recognized", "accredit"],
    answer: () =>
      "CEA issues a certificate of completion for successful assessment. It is a record of CEA training — not a university degree or a vendor certification. Every certificate carries an ID that can be checked on this site.",
    links: [
      { label: "Verify a certificate", href: "/verify" },
      { label: "Certification FAQ", href: "/about#faq" },
    ],
  },
  {
    keys: ["job", "career", "employment", "salary", "hire", "internship", "work after"],
    answer: () =>
      "CEA provides portfolio review, CV and interview preparation, Demo Day exposure and referral introductions where genuine relationships exist. We do not promise employment outcomes, and no page on this site claims a placement rate.",
    links: [
      { label: "Careers & pathways", href: "/careers" },
      { label: "Student projects", href: "/projects" },
    ],
  },
  {
    keys: ["duration", "how long", "weeks", "time", "schedule", "timetable"],
    answer: () =>
      `Programmes run from ${Math.min(...programmes.map((p) => p.durationWeeks))} to ${Math.max(...programmes.map((p) => p.durationWeeks))} weeks. Shortest entry-level options are Computer Fundamentals (6 weeks) and Python & Automation (8 weeks); the longest is Full-Stack Web Development (14 weeks).`,
    links: [{ label: "Sort by duration", href: "/programmes" }],
  },
  {
    keys: ["design", "ui", "ux", "graphic", "figma"],
    answer: () =>
      "Design & Creativity has two programmes: UI/UX Product Design (10 weeks) and Graphic Design (8 weeks). Both are studio-style with real briefs and end in a portfolio you can present.",
    links: [{ label: "Design programmes", href: "/programmes?department=design" }],
  },
  {
    keys: ["data", "ai", "machine learning", "python", "analytics"],
    answer: () =>
      "AI & Data covers Data Analytics with Python & SQL (9 weeks, beginner) and Applied AI & Machine Learning (10 weeks, intermediate). Python & Automation sits in Software Development and is a good on-ramp.",
    links: [{ label: "AI & Data programmes", href: "/programmes?department=ai-data" }],
  },
  {
    keys: ["corporate", "enterprise", "company", "organisation", "organization", "team", "staff"],
    answer: () =>
      "CEA runs corporate training: security awareness, employee digital skills, IT support capability, custom technical programmes and executive security workshops. Group enrolment is available with consolidated invoicing.",
    links: [{ label: "Enterprise training", href: "/enterprise" }],
  },
];

const greeting: Msg = {
  id: 0,
  role: "assistant",
  text: "Hello — I'm the CEA assistant. I answer from the academy's own programme record. Ask about courses, levels, learning modes, the campus or applying.",
  links: [
    { label: "All programmes", href: "/programmes" },
    { label: "Apply now", href: "/apply" },
  ],
};

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const respond = (q: string): Msg => {
    const lower = q.toLowerCase();
    const hit = TOPICS.find((t) => t.keys.some((k) => lower.includes(k)));

    if (hit) {
      return {
        id: Date.now(),
        role: "assistant",
        text: hit.answer(q),
        links: hit.links,
      };
    }

    // Try a direct programme name match before falling back.
    const programme = programmes.find((p) =>
      p.title.toLowerCase().split(" ").some((w) => w.length > 4 && lower.includes(w)),
    );

    if (programme) {
      return {
        id: Date.now(),
        role: "assistant",
        text: `${programme.title} — ${programme.level}, ${programme.durationWeeks} weeks, ${programme.modes.join(" / ")}. ${programme.tagline}`,
        links: [{ label: `Open ${programme.title}`, href: `/programmes/${programme.slug}` }],
      };
    }

    const faq = faqs.find((f) => f.q.toLowerCase().split(" ").some((w) => w.length > 5 && lower.includes(w)));
    if (faq) {
      return { id: Date.now(), role: "assistant", text: faq.a, links: [{ label: "All FAQs", href: "/about#faq" }] };
    }

    return {
      id: Date.now(),
      role: "assistant",
      text: "I don't have a verified answer for that, and I won't guess. Admissions can answer directly — send the question through the contact form or email admissions@cea.ng and a human will reply.",
      links: [
        { label: "Contact admissions", href: "/contact" },
        { label: "Browse programmes", href: "/programmes" },
      ],
    };
  };

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((m) => [...m, { id: Date.now(), role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    const reply = respond(trimmed);
    window.setTimeout(() => {
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 520);
  };

  const suggestions = [
    "How do I start with no experience?",
    "What does a cybersecurity programme cover?",
    "Where is the campus?",
    "How much does it cost?",
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close CEA assistant" : "Open CEA assistant"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[110] flex h-12 items-center gap-2 rounded-full border border-cyan/30 bg-void/90 px-4 shadow-[0_10px_40px_-8px_rgba(0,217,255,0.4)] backdrop-blur-xl transition-all duration-300 hover:border-cyan/60 hover:shadow-[0_10px_50px_-6px_rgba(0,217,255,0.6)] sm:bottom-6 sm:right-6"
      >
        {open ? (
          <X className="h-4 w-4 text-ink" />
        ) : (
          <>
            <Sparkles className="h-4 w-4 text-cyan" />
            <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink sm:block">
              Ask CEA
            </span>
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="CEA assistant"
            className="fixed inset-x-3 bottom-20 z-[110] flex max-h-[74vh] flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#080e17]/97 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[24rem]"
          >
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan/25 bg-cyan/[0.08]">
                  <Bot className="h-4 w-4 text-cyan" />
                </div>
                <div>
                  <p className="font-display text-[0.8125rem] font-bold text-ink">CEA Assistant</p>
                  <p className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-muted">
                    grounded in academy data
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-1 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-green">
                <span className="h-1 w-1 rounded-full bg-green" /> live
              </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : ""}>
                  <div
                    className={`max-w-[92%] rounded-xl px-3 py-2.5 text-[0.8125rem] leading-relaxed ${
                      m.role === "user"
                        ? "bg-cyan text-void"
                        : "border border-white/[0.07] bg-white/[0.03] text-ink/90"
                    }`}
                  >
                    {m.text}
                    {m.links && m.role === "assistant" && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {m.links.map((l) => (
                          <Link
                            key={l.href}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="rounded-md border border-cyan/25 bg-cyan/[0.08] px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-cyan transition-colors hover:bg-cyan/[0.16]"
                          >
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3 w-fit">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan/70"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              )}

              {messages.length === 1 && (
                <div className="space-y-1.5 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="block w-full rounded-lg border border-white/[0.07] px-3 py-2 text-left text-[0.75rem] text-muted transition-colors hover:border-cyan/30 hover:text-ink"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-white/[0.07] p-3"
            >
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-3 py-1">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about courses, fees, campus…"
                  aria-label="Message the CEA assistant"
                  className="min-w-0 flex-1 bg-transparent py-2 text-[0.8125rem] text-ink placeholder:text-muted/60 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label="Send message"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan text-void transition-opacity disabled:opacity-30"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 px-1 text-[0.6rem] leading-relaxed text-muted/60">
                Answers come only from CEA&apos;s published programme record. {departments.length}{" "}
                departments · {programmes.length} programmes · admissions escalates anything unverified.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
