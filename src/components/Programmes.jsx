import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSES, DEPARTMENTS } from '../data/content';
import { Reveal, SectionHeading, TiltCard, Btn, useToast } from './ui';
import { EASE, SPRING } from '../lib/motion';

// Course explorer: search + dept filter (layout pill) + skeleton loading + detail modal.
export default function Programmes() {
  const [dept, setDept] = useState('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const toast = useToast();

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1100); return () => clearTimeout(t); }, []);
  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 450); return () => clearTimeout(t); }, [dept, query]);

  const filtered = useMemo(() => COURSES.filter(c =>
    (dept === 'all' || c.dept === dept) &&
    (c.title + c.desc + c.skills.join(' ')).toLowerCase().includes(query.toLowerCase())
  ), [dept, query]);

  return (
    <section id="programmes" className="relative py-24 md:py-32 bg-[#0D1420]/40">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal><SectionHeading kicker="Programmes" title="Explore learning programmes" sub="Six departments. One pathway to real capability. Search, filter, and open any programme." /></Reveal>

        {/* Department cards */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {DEPARTMENTS.map((d, i) => (
            <motion.button key={d.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06, duration: .6, ease: EASE.outExpo }}
              whileHover={{ y: -5 }} whileTap={{ scale: .95 }} onClick={() => setDept(dept === d.id ? 'all' : d.id)}
              className={`btn-press glass rounded-2xl p-4 text-left cursor-pointer ${dept === d.id ? 'border-[#00D9FF] shadow-[0_0_30px_-8px_rgba(0,217,255,.6)]' : ''}`}>
              <span className="text-2xl">{d.icon}</span>
              <span className="block font-display font-semibold text-sm mt-2 leading-tight">{d.name}</span>
              <span className="block text-[11px] text-[#929EAE] mt-1 leading-snug">{d.desc}</span>
            </motion.button>
          ))}
        </div>

        {/* Search + filter pill */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#929EAE]">⌕</span>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search courses, skills…"
              className="w-full glass rounded-full pl-11 pr-4 py-3 text-sm placeholder:text-[#929EAE] focus:border-[#00D9FF] transition-colors" aria-label="Search courses" />
          </div>
          <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Department filter">
            {['all', ...DEPARTMENTS.map(d => d.id)].map(id => (
              <button key={id} role="tab" aria-selected={dept === id} onClick={() => setDept(id)}
                className={`btn-press relative px-4 py-2 rounded-full text-xs font-semibold cursor-pointer ${dept === id ? 'text-[#070B12]' : 'glass text-[#c9d4e3] hover:text-white'}`}>
                {dept === id && <motion.span layoutId="dept-pill" transition={SPRING.snappy} className="absolute inset-0 bg-gradient-to-r from-[#00D9FF] to-[#39FF88] rounded-full" />}
                <span className="relative">{id === 'all' ? 'All' : DEPARTMENTS.find(d => d.id === id)?.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results: skeleton → staggered cards */}
        <div className="mt-8 min-h-[320px]">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass rounded-3xl p-6 space-y-4">
                  <div className="skeleton h-6 w-2/3 rounded" /><div className="skeleton h-4 w-full rounded" /><div className="skeleton h-4 w-5/6 rounded" />
                  <div className="flex gap-2"><div className="skeleton h-6 w-16 rounded-full" /><div className="skeleton h-6 w-16 rounded-full" /></div>
                  <div className="skeleton h-10 w-full rounded-full" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-12 text-center">
              <p className="text-4xl mb-3">🔍</p><p className="text-[#929EAE]">No programmes match. Try another search or department.</p>
              <Btn variant="ghost" className="mt-5" onClick={() => { setQuery(''); setDept('all'); }}>Reset filters</Btn>
            </motion.div>
          ) : (
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map(c => (
                  <motion.div key={c.id} layout initial={{ opacity: 0, scale: .9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .9, y: 20 }} transition={SPRING.soft}>
                    <TiltCard className="p-6 h-full flex flex-col cursor-pointer" onClick={() => setSelected(c)}>
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full border border-[#00D9FF]/40 text-[#00D9FF]">{c.level.toUpperCase()}</span>
                        <span className="text-xs text-[#929EAE]">{c.duration} · {c.mode}</span>
                      </div>
                      <h3 className="font-display text-xl font-bold mt-4 leading-snug">{c.title}</h3>
                      <p className="text-sm text-[#929EAE] mt-2 leading-relaxed flex-1">{c.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mt-4">{c.skills.map(s => <span key={s} className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10">{s}</span>)}</div>
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                        <span className="font-display font-bold text-lg">{c.price}</span>
                        <span className="text-sm text-[#00D9FF] font-semibold">View programme →</span>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Programme detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-4" onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0, y: 60, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: .96 }} transition={SPRING.soft}
              onClick={e => e.stopPropagation()} className="glass glow-border rounded-3xl max-w-lg w-full p-8 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full border border-[#00D9FF]/40 text-[#00D9FF]">{selected.level.toUpperCase()}</span>
                <button aria-label="Close" onClick={() => setSelected(null)} className="btn-press w-9 h-9 rounded-full glass cursor-pointer hover:rotate-90 transition-transform">✕</button>
              </div>
              <h3 className="font-display text-3xl font-bold mt-4">{selected.title}</h3>
              <p className="text-[#929EAE] mt-3 leading-relaxed">{selected.desc}</p>
              <div className="grid grid-cols-3 gap-3 mt-6 text-center">
                {[['Duration', selected.duration], ['Mode', selected.mode], ['Tuition', selected.price]].map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-white/5 p-3"><p className="font-mono text-[10px] text-[#929EAE]">{k.toUpperCase()}</p><p className="font-semibold text-sm mt-1">{v}</p></div>
                ))}
              </div>
              <p className="font-mono text-xs text-[#00D9FF] mt-6 mb-2">SKILLS YOU WILL DEVELOP</p>
              <ul className="space-y-2">{selected.skills.map(s => <li key={s} className="flex gap-2 text-sm"><span className="text-[#39FF88]">✓</span>{s}</li>)}</ul>
              <div className="flex gap-3 mt-8">
                <Btn className="flex-1" onClick={() => { setSelected(null); toast(`Application started: ${selected.title}`); document.querySelector('#admissions')?.scrollIntoView({ behavior: 'smooth' }); }}>Apply for this programme</Btn>
                <Btn variant="ghost" onClick={() => setSelected(null)}>Close</Btn>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
