import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import { Marquee, Stats, Why } from './components/Sections1';
import Programmes from './components/Programmes';
import Journey from './components/Journey';
import CyberLab from './components/CyberLab';
import { Projects, About, Testimonials, FAQ } from './components/Sections2';
import MotionLab from './components/MotionLab';
import { Admissions, CertificateVerifier } from './components/Admissions';
import Assistant from './components/Assistant';
import Footer from './components/Footer';
import { ToastProvider } from './components/ui';
import { SPRING } from './lib/motion';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [snap, setSnap] = useState(false);
  const [showTop, setShowTop] = useState(false);

  // Lenis smooth scrolling, synced with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => { lenis.raf(time * 1000); requestAnimationFrame(raf); };
    const id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  // Smart section snapping (toggle in Motion Lab)
  useEffect(() => {
    document.documentElement.style.scrollSnapType = snap ? 'y proximity' : '';
    document.querySelectorAll('section').forEach(s => { s.style.scrollSnapAlign = snap ? 'start' : ''; });
    ScrollTrigger.refresh();
  }, [snap]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <ToastProvider>
      <div className="bg-[#070B12] text-[#F4F7FB] font-body min-h-screen">
        <Preloader onDone={() => setLoaded(true)} />
        <Cursor />
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Stats />
          <Why />
          <Programmes />
          <Journey />
          <CyberLab />
          <Projects />
          <About />
          <Testimonials />
          <MotionLab snap={snap} setSnap={setSnap} />
          <Admissions />
          <CertificateVerifier />
          <FAQ />
        </main>
        <Footer />
        <Assistant />
        <AnimatePresence>
          {showTop && (
            <motion.button aria-label="Back to top" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={SPRING.soft}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn-press fixed bottom-24 right-6 z-[104] w-12 h-12 rounded-full glass glow-border cursor-pointer text-lg">↑</motion.button>
          )}
        </AnimatePresence>
      </div>
    </ToastProvider>
  );
}
