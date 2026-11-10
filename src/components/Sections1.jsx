import { motion } from 'framer-motion';
import { Reveal, SectionHeading, TiltCard, CountUp, useToast } from './ui';
import { STATS } from '../data/content';
import { staggerParent, staggerChild } from '../lib/motion';

export function Marquee() {
  const items = ['CYBERSECURITY', 'ETHICAL HACKING', 'WEB DEVELOPMENT', 'AI & DATA', 'CLOUD', 'UI/UX DESIGN', 'NETWORKING', 'DIGITAL FORENSICS'];
  const row = [...items, ...items];
  return (
    <div className="relative py-5 border-y border-white/10 bg-[#0D1420]/60 overflow-hidden" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-0">
        {[0, 1].map(half => (
          <div key={half} className="flex shrink-0">
            {row.map((t, i) => <span key={i} className="font-display font-bold text-lg md:text-xl tracking-wide px-6 text-white/70 whitespace-nowrap">{t} <span className="text-[#00D9FF] px-2">✦</span></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div variants={staggerParent(.12)} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(s => (
            <motion.div key={s.label} variants={staggerChild} whileHover={{ y: -6, borderColor: 'rgba(0,217,255,.5)' }}
              className="glass rounded-3xl p-6 text-center transition-colors cursor-default">
              <p className="font-display text-4xl md:text-5xl font-bold text-gradient"><CountUp value={s.value} suffix={s.suffix} /></p>
              <p className="mt-2 text-sm text-[#929EAE]">{s.label}</p>
              <p className="font-mono text-[10px] text-[#929EAE]/60 mt-1">hover to count ↑</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: '🛠️', title: 'Practical learning', desc: 'Learn by doing, not simply watching. Every concept ends in a lab, a build, or a report.', color: '#00D9FF' },
  { icon: '🎯', title: 'Industry-relevant skills', desc: 'Develop knowledge that solves real problems in Nigerian and global tech teams.', color: '#39FF88' },
  { icon: '🧑‍🏫', title: 'Expert instruction', desc: 'Learn from experienced practitioners who ship, defend, and design for a living.', color: '#885CFF' },
  { icon: '🚀', title: 'Career development', desc: 'Turn learning into demonstrable capabilities: portfolio, assessments, certificates.', color: '#00D9FF' },
];

export function Why() {
  const toast = useToast();
  return (
    <section id="why" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal><SectionHeading kicker="Why CEA" title="Built different. On purpose." sub="A serious technology institution — not a gaming website. Practical, mentored, and measured." /></Reveal>
        <motion.div variants={staggerParent(.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(f => (
            <motion.div key={f.title} variants={staggerChild}>
              <TiltCard className="p-7 h-full cursor-pointer" onClick={() => toast(`${f.title} — included in every CEA programme`)}>
                <motion.div whileHover={{ scale: 1.2, rotate: 8 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }} className="text-4xl mb-5 inline-block">{f.icon}</motion.div>
                <h3 className="font-display text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-[#929EAE] leading-relaxed">{f.desc}</p>
                <span className="inline-block mt-5 h-1 w-10 rounded-full" style={{ background: f.color }} />
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
