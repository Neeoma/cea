import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, TESTIMONIALS, FAQS } from '../data/content';
import { Reveal, SectionHeading, TiltCard, Btn, useToast } from './ui';
import { SPRING } from '../lib/motion';

export function Projects() {
  const toast = useToast();
  return (
    <section id="projects" className="relative py-24 md:py-32 bg-[#0D1420]/40">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal><SectionHeading kicker="Student work" title="Projects & achievements" sub="Real builds from real learners — published with permission." /></Reveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * .08}>
              <TiltCard className="p-6 h-full cursor-pointer group" onClick={() => toast(`Opening "${p.title}" by ${p.author}…`)}>
                <div className="h-36 rounded-2xl mb-5 relative overflow-hidden flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${p.hue}22, ${p.hue}08)` }}>
                  <motion.span whileHover={{ scale: 1.25, rotate: -6 }} className="text-6xl">🖥️</motion.span>
                  <span className="absolute top-3 left-3 font-mono text-[10px] px-2 py-1 rounded-full bg-black/40 border border-white/15">{p.tag.toUpperCase()}</span>
                  <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 text-sm font-semibold">View case study →</span>
                </div>
                <h3 className="font-display text-lg font-bold">{p.title}</h3>
                <p className="text-sm text-[#929EAE] mt-1">by {p.author}</p>
                <p className="font-mono text-[11px] text-[#00D9FF] mt-2">{p.tech}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute -right-40 top-20 w-[420px] h-[420px] rounded-full bg-[#39FF88]/8 blur-[130px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center relative">
        <Reveal>
          <SectionHeading kicker="About CEA" title="The future is built. Not given." sub="Cyber Elias Academy is a practical digital education institution in Port Harcourt — computer basics to cybersecurity, design to cloud. Our philosophy: learn by doing, with mentors, in real labs." />
          <div className="mt-8 space-y-4">
            {[['Mission', 'Transform curiosity into practical digital skills and career-ready capability.'], ['Vision', 'A generation of Nigerian technologists who build, defend, and create what comes next.'], ['Campus', '24 Ebony Road, off Rumuola Road, Port Harcourt, Rivers State.']].map(([k, v]) => (
              <motion.div key={k} whileHover={{ x: 8 }} className="glass rounded-2xl p-5 flex gap-4 items-start cursor-default">
                <span className="font-mono text-xs text-[#00D9FF] mt-1 w-20 shrink-0">{k.toUpperCase()}</span>
                <p className="text-sm text-[#c9d4e3] leading-relaxed">{v}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={.15}>
          <div className="relative">
            <motion.div whileHover={{ rotate: 0, scale: 1.02 }} initial={{ rotate: 2 }} transition={SPRING.soft} className="glass glow-border rounded-[2rem] p-8 relative z-10">
              <p className="font-mono text-xs tracking-[.3em] text-[#00D9FF]">FOUNDER'S MESSAGE</p>
              <p className="font-display text-2xl md:text-3xl font-semibold leading-snug mt-4">"We don't hand you the future. We teach you to build it — one lab, one project, one skill at a time."</p>
              <div className="flex items-center gap-4 mt-7">
                <span className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#885CFF] flex items-center justify-center text-xl">👨‍💻</span>
                <div><p className="font-semibold">Founder, Cyber Elias Academy</p><p className="text-sm text-[#929EAE]">Port Harcourt, Nigeria</p></div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }} className="absolute -top-6 -right-3 glass rounded-2xl px-4 py-3 z-20 font-mono text-xs">🟢 LABS OPEN</motion.div>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} className="absolute -bottom-6 -left-3 glass rounded-2xl px-4 py-3 z-20 font-mono text-xs">⚡ 98% PRACTICAL</motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  return (
    <section className="relative py-24 md:py-32 bg-[#0D1420]/40">
      <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
        <Reveal><SectionHeading kicker="Voices" title="Students say it best" /></Reveal>
        <div className="mt-12 relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.figure key={i} initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -30, filter: 'blur(6px)' }} transition={SPRING.soft}>
              <span className="text-5xl text-[#00D9FF]">"</span>
              <blockquote className="font-display text-2xl md:text-3xl font-medium leading-snug">{t.quote}</blockquote>
              <figcaption className="mt-6"><span className="font-semibold">{t.name}</span><span className="block text-sm text-[#929EAE]">{t.role}</span></figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-3 mt-8">
          <button aria-label="Previous testimonial" onClick={() => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="btn-press w-11 h-11 rounded-full glass cursor-pointer hover:border-[#00D9FF]">←</button>
          {TESTIMONIALS.map((_, d) => <button key={d} aria-label={`Go to testimonial ${d + 1}`} onClick={() => setI(d)} className={`btn-press self-center rounded-full cursor-pointer transition-all ${d === i ? 'w-8 h-2.5 bg-[#00D9FF]' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'}`} />)}
          <button aria-label="Next testimonial" onClick={() => setI((i + 1) % TESTIMONIALS.length)} className="btn-press w-11 h-11 rounded-full glass cursor-pointer hover:border-[#00D9FF]">→</button>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <Reveal><SectionHeading kicker="FAQ" title="Questions, answered" /></Reveal>
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * .05}>
                <div className={`glass rounded-2xl overflow-hidden transition-colors ${isOpen ? 'border-[#00D9FF]/50' : ''}`}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="btn-press w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer">
                    <span className="font-semibold">{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={SPRING.bouncy} className="text-[#00D9FF] text-xl shrink-0">+</motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={SPRING.soft} className="overflow-hidden">
                        <p className="px-5 pb-5 text-sm text-[#929EAE] leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
