import { useRef, useState, useEffect, useCallback, createContext, useContext } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EASE, SPRING } from '../lib/motion';

/* ── Toast system: instant feedback for every action ── */
const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg) => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[120] flex flex-col items-center gap-2 pointer-events-none">
        {toasts.map(t => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 24, scale: .9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }}
            transition={SPRING.bouncy} className="glass glow-border rounded-full px-5 py-2.5 text-sm font-medium text-white pointer-events-auto">
            <span className="text-[#39FF88] mr-2">✓</span>{t.msg}
          </motion.div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/* ── Magnetic button: cursor pulls it, spring snaps it back (spring physics) ── */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, SPRING.magnetic), sy = useSpring(y, SPRING.magnetic);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }} className={`inline-block ${className}`}>{children}</motion.div>;
}

/* ── Primary button: hover glow + press indent + focus ring ── */
export function Btn({ children, onClick, variant = 'primary', className = '', href, type = 'button' }) {
  const base = 'btn-press inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-sm tracking-wide cursor-pointer select-none';
  const styles = variant === 'primary'
    ? 'bg-gradient-to-r from-[#00D9FF] to-[#39FF88] text-[#070B12] shadow-[0_10px_40px_-10px_rgba(0,217,255,.7)] hover:shadow-[0_16px_50px_-10px_rgba(0,217,255,.9)]'
    : variant === 'ghost'
      ? 'glass text-white hover:border-[#00D9FF]/60 hover:text-[#00D9FF]'
      : 'border border-white/15 text-white hover:border-[#885CFF]/70 hover:text-[#c4b0ff]';
  const cls = `${base} ${styles} ${className}`;
  if (href) return <a href={href} onClick={onClick} className={cls}>{children}</a>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}

/* ── 3D tilt card: rotates toward cursor with spring, spotlight follows ── */
export function TiltCard({ children, className = '', onClick }) {
  const ref = useRef(null);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, SPRING.soft), sry = useSpring(ry, SPRING.soft);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    ry.set((px - .5) * 14); rx.set((.5 - py) * 14);
    ref.current.style.setProperty('--mx', `${px * 100}%`);
    ref.current.style.setProperty('--my', `${py * 100}%`);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      whileHover={{ y: -6 }} whileTap={{ scale: .97 }}
      className={`spotlight glass rounded-3xl ${className}`}>{children}</motion.div>
  );
}

/* ── Scroll-triggered reveal (viewport listener) ── */
export function Reveal({ children, delay = 0, y = 36, className = '' }) {
  return (
    <motion.div initial={{ opacity: 0, y, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: .8, delay, ease: EASE.outExpo }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Section heading with staggered word reveal ── */
export function SectionHeading({ kicker, title, sub }) {
  const words = title.split(' ');
  return (
    <div className="max-w-3xl">
      <motion.p initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
        transition={{ duration: .6, ease: EASE.outExpo }} className="font-mono text-xs tracking-[.3em] text-[#00D9FF] uppercase mb-4">
        <span className="inline-block w-8 h-px bg-[#00D9FF] align-middle mr-3" />{kicker}
      </motion.p>
      <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.02] tracking-tight">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span initial={{ y: '110%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
              transition={{ duration: .8, delay: i * .07, ease: EASE.outExpo }} className="inline-block">{w}&nbsp;</motion.span>
          </span>
        ))}
      </h2>
      {sub && <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: .4, duration: .7 }} className="mt-5 text-[#929EAE] text-lg leading-relaxed">{sub}</motion.p>}
    </div>
  );
}

/* ── Spring toggle switch (micro-interaction) ── */
export function Toggle({ checked, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)}
      className="btn-press inline-flex items-center gap-3 cursor-pointer">
      <span className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${checked ? 'bg-gradient-to-r from-[#00D9FF] to-[#39FF88]' : 'bg-white/10 border border-white/15'}`}>
        <motion.span layout transition={SPRING.bouncy} className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow ${checked ? 'right-1' : 'left-1'}`} />
      </span>
      <span className="text-sm text-[#929EAE]">{label}</span>
    </button>
  );
}

/* ── Icon that explodes with color when activated (micro-interaction) ── */
export function PopIcon({ children, active }) {
  return (
    <motion.span animate={active ? { scale: [1, 1.5, 1], rotate: [0, 12, 0] } : { scale: 1, rotate: 0 }}
      transition={SPRING.bouncy} className="inline-flex">{children}</motion.span>
  );
}

/* ── Count-up when scrolled into view (replays on hover) ── */
export function CountUp({ value, suffix = '' }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const started = useRef(false);
  const run = () => {
    const t0 = performance.now(), dur = 1600;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(value * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) { started.current = true; run(); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref} onMouseEnter={run} title="Hover to replay" className="cursor-default">{n.toLocaleString()}{suffix}</span>;
}
