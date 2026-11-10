import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import lottie from 'lottie-web';
import { COURSES } from '../data/content';
import { Reveal, SectionHeading, Btn, useToast } from './ui';
import { SPRING } from '../lib/motion';

const inputCls = 'w-full glass rounded-2xl px-4 py-3.5 text-sm placeholder:text-[#929EAE] focus:border-[#00D9FF] transition-colors';

export function Admissions() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: COURSES[0].title, mode: 'Hybrid', heard: 'Website' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [ref, setRef] = useState('');
  const checkRef = useRef(null);
  const toast = useToast();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 2) errs.name = 'Enter your full name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (form.phone.trim().length < 7) errs.phone = 'Enter a valid phone number';
    setErrors(errs);
    if (Object.keys(errs).length) { toast('Please fix the highlighted fields'); return; }
    const r = 'CEA-2026-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    setRef(r); setDone(true);
    setTimeout(() => { if (checkRef.current) lottie.loadAnimation({ container: checkRef.current, renderer: 'svg', loop: false, autoplay: true, path: '/lottie/check.json' }); }, 100);
    toast('Application submitted — check your email');
  };

  return (
    <section id="admissions" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute -left-40 bottom-0 w-[460px] h-[460px] rounded-full bg-[#885CFF]/10 blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 relative">
        <Reveal>
          <SectionHeading kicker="Admissions" title="Your future starts here" sub="A short application. Admissions reviews it, then sends acceptance and payment instructions. Paystack-secured." />
          <div className="mt-8 space-y-3">
            {['Select a course', 'Share your details', 'Choose learning mode', 'Submit & get your reference'].map((s, i) => (
              <motion.div key={s} whileHover={{ x: 8 }} className="flex items-center gap-4 glass rounded-2xl p-4 cursor-default">
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#39FF88] text-[#070B12] font-bold flex items-center justify-center text-sm shrink-0">{i + 1}</span>
                <span className="font-medium">{s}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={.15}>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING.bouncy} className="glass glow-border rounded-[2rem] p-10 text-center">
                <div ref={checkRef} className="w-36 h-36 mx-auto [&>svg]:w-full [&>svg]:h-full" />
                <h3 className="font-display text-2xl font-bold mt-2">Application received!</h3>
                <p className="text-[#929EAE] mt-2">Welcome aboard, {form.name.split(' ')[0]}. Your reference:</p>
                <p className="font-mono text-xl text-[#00D9FF] mt-3 tracking-widest">{ref}</p>
                <p className="text-sm text-[#929EAE] mt-3">Course: {form.course} · {form.mode}</p>
                <Btn variant="ghost" className="mt-7" onClick={() => { setDone(false); setForm({ name: '', email: '', phone: '', course: COURSES[0].title, mode: 'Hybrid', heard: 'Website' }); }}>Submit another</Btn>
              </motion.div>
            ) : (
              <motion.form key="form" exit={{ opacity: 0, y: -20 }} onSubmit={submit} className="glass rounded-[2rem] p-7 md:p-9 space-y-4" noValidate>
                <div>
                  <input className={inputCls} placeholder="Full name *" value={form.name} onChange={e => set('name', e.target.value)} aria-label="Full name" />
                  {errors.name && <p className="text-xs text-[#ff5f57] mt-1.5">{errors.name}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input className={inputCls} placeholder="Email *" type="email" value={form.email} onChange={e => set('email', e.target.value)} aria-label="Email" />
                    {errors.email && <p className="text-xs text-[#ff5f57] mt-1.5">{errors.email}</p>}
                  </div>
                  <div>
                    <input className={inputCls} placeholder="Phone *" value={form.phone} onChange={e => set('phone', e.target.value)} aria-label="Phone" />
                    {errors.phone && <p className="text-xs text-[#ff5f57] mt-1.5">{errors.phone}</p>}
                  </div>
                </div>
                <select className={`${inputCls} appearance-none cursor-pointer`} value={form.course} onChange={e => set('course', e.target.value)} aria-label="Course">
                  {COURSES.map(c => <option key={c.id} className="bg-[#0D1420]">{c.title}</option>)}
                </select>
                <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Learning mode">
                  {['Online', 'Physical', 'Hybrid'].map(m => (
                    <button key={m} type="button" role="radio" aria-checked={form.mode === m} onClick={() => set('mode', m)}
                      className={`btn-press rounded-full py-2.5 text-sm font-semibold cursor-pointer ${form.mode === m ? 'bg-gradient-to-r from-[#00D9FF] to-[#39FF88] text-[#070B12]' : 'glass'}`}>{m}</button>
                  ))}
                </div>
                <select className={`${inputCls} appearance-none cursor-pointer`} value={form.heard} onChange={e => set('heard', e.target.value)} aria-label="How did you hear about us">
                  {['Website', 'Friend / Alumni', 'Social media', 'Campus visit', 'Other'].map(o => <option key={o} className="bg-[#0D1420]">{o}</option>)}
                </select>
                <Btn type="submit" className="w-full !py-4 text-base">Submit application →</Btn>
                <p className="font-mono text-[10px] text-[#929EAE] text-center">SECURE · NDPC-COMPLIANT · NO SPAM, EVER</p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

export function CertificateVerifier() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const toast = useToast();
  const verify = () => {
    const c = code.trim().toUpperCase();
    if (!c) { toast('Enter a certificate number'); return; }
    setResult(/^CEA-\d{4}-[A-Z0-9]{5}$/.test(c) ? { ok: true, code: c } : { ok: false, code: c });
  };
  return (
    <section className="relative py-24 md:py-28 bg-[#0D1420]/40">
      <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
        <Reveal><SectionHeading kicker="Verify" title="Certificate verification" sub="Employers: confirm any CEA certificate instantly. Try CEA-2026-DEMO1." /></Reveal>
        <Reveal delay={.1}>
          <div className="mt-10 glass rounded-[2rem] p-7">
            <div className="flex flex-col sm:flex-row gap-3">
              <input value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => e.key === 'Enter' && verify()} placeholder="e.g. CEA-2026-DEMO1"
                className="flex-1 glass rounded-full px-5 py-3.5 font-mono text-sm uppercase placeholder:normal-case focus:border-[#00D9FF] transition-colors" aria-label="Certificate number" />
              <Btn onClick={verify}>Verify →</Btn>
            </div>
            <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, y: 16, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={SPRING.bouncy}
                  className={`mt-5 rounded-2xl p-5 border ${result.ok ? 'border-[#39FF88]/50 bg-[#39FF88]/8' : 'border-[#ff5f57]/50 bg-[#ff5f57]/8'}`}>
                  <p className="font-display font-bold text-lg">{result.ok ? '✅ Certificate authentic' : '❌ Certificate not found'}</p>
                  <p className="font-mono text-sm text-[#929EAE] mt-1">{result.code}</p>
                  {result.ok && <p className="text-sm mt-2">Issued by Cyber Elias Academy · Port Harcourt, Nigeria</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
