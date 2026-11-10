import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV } from '../data/content';
import { EASE, SPRING } from '../lib/motion';
import { Btn, useToast } from './ui';

// Nav: transparent → blurred glass on scroll. Overlay menu sweeps in (macro-animation).
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const toast = useToast();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  return (
    <>
      <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, ease: EASE.outExpo, delay: .1 }}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${scrolled ? 'glass shadow-[0_10px_40px_-15px_rgba(0,0,0,.8)]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-[72px] flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-3 group">
            <motion.span whileHover={{ rotate: 12, scale: 1.1 }} whileTap={{ scale: .9 }} transition={SPRING.bouncy} className="text-3xl">🛡️</motion.span>
            <span className="leading-none">
              <span className="block font-display font-bold tracking-tight text-lg">CEA<span className="text-[#00D9FF]">.NG</span></span>
              <span className="block font-mono text-[9px] tracking-[.25em] text-[#929EAE]">CYBER ELIAS ACADEMY</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {NAV.map(n => <a key={n.href} href={n.href} className="link-sweep text-sm text-[#c9d4e3] hover:text-white transition-colors">{n.label}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => toast('Student portal sign-in coming with Phase 2 — explore the Cyber Lab meanwhile!')} className="hidden md:inline-flex link-sweep text-sm text-[#c9d4e3] hover:text-white">Login</button>
            <Btn href="#admissions" className="!px-5 !py-2.5 hidden sm:inline-flex">Apply Now</Btn>
            <button aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)} className="btn-press lg:hidden w-11 h-11 rounded-full glass flex flex-col items-center justify-center gap-1.5 cursor-pointer">
              <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-white rounded" />
              <motion.span animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-white rounded" />
            </button>
          </div>
        </div>
        {/* Scroll progress bar */}
        <div className="h-[3px] bg-white/5"><motion.div className="h-full bg-gradient-to-r from-[#00D9FF] via-[#39FF88] to-[#885CFF]" style={{ scaleX: progress, transformOrigin: 'left' }} /></div>
      </motion.header>

      {/* Full-screen overlay menu — sweeps across with staggered links */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} exit={{ clipPath: 'inset(0 0 0 100%)' }}
            transition={{ duration: .65, ease: EASE.inOut }} className="fixed inset-0 z-[95] bg-[#0D1420]/97 backdrop-blur-2xl flex flex-col justify-center px-8">
            <div className="bg-grid absolute inset-0 opacity-40 pointer-events-none" />
            <nav className="relative flex flex-col gap-2 max-w-md" aria-label="Menu">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .15 + i * .07, duration: .55, ease: EASE.outExpo }}
                  whileHover={{ x: 12, color: '#00D9FF' }} whileTap={{ scale: .96 }}
                  className="font-display text-4xl font-bold py-2 text-white flex items-center gap-4">
                  <span className="font-mono text-xs text-[#00D9FF]">0{i + 1}</span>{n.label}
                </motion.a>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .7 }} className="mt-8">
                <Btn href="#admissions" onClick={() => setOpen(false)}>Apply Now →</Btn>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
