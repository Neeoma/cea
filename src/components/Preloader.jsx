import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE } from '../lib/motion';

// Preloader: skeleton blocks + progress bar, then curtain lift (macro-animation).
export default function Preloader({ onDone }) {
  const [p, setP] = useState(0);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => setP(v => {
      const n = v + Math.random() * 16;
      if (n >= 100) { clearInterval(iv); setTimeout(() => { setGone(true); setTimeout(onDone, 700); }, 350); return 100; }
      return n;
    }), 110);
    return () => clearInterval(iv);
  }, [onDone]);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div exit={{ y: '-100%' }} transition={{ duration: .8, ease: EASE.inOut }}
          className="fixed inset-0 z-[300] bg-[#070B12] flex flex-col items-center justify-center gap-8 px-6">
          <motion.div initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .6, ease: EASE.back }} className="text-center">
            <div className="text-6xl mb-4 animate-floaty">🛡️</div>
            <p className="font-display text-2xl font-bold tracking-tight">CYBER ELIAS ACADEMY</p>
            <p className="font-mono text-xs tracking-[.3em] text-[#00D9FF] mt-2">THE FUTURE IS BUILT. NOT GIVEN.</p>
          </motion.div>
          <div className="w-64">
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00D9FF] to-[#39FF88] rounded-full transition-all duration-150" style={{ width: `${p}%` }} />
            </div>
            <p className="font-mono text-xs text-[#929EAE] text-center mt-3">{Math.round(p)}% — ESTABLISHING SECURE CONNECTION…</p>
          </div>
          <div className="flex gap-3 w-64">
            <div className="skeleton h-3 flex-1 rounded" /><div className="skeleton h-3 flex-1 rounded" /><div className="skeleton h-3 flex-1 rounded" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
