import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import WebGLScene from './WebGLScene';
import { Btn, Magnetic } from './ui';
import { EASE } from '../lib/motion';

const LINES = [
  '> cea init --academy port-harcourt',
  '> loading cyber-lab … OK',
  '> loading programmes … OK',
  '> your future: BUILDING…',
];

function useTypewriter(lines) {
  const [text, setText] = useState('');
  useEffect(() => {
    let li = 0, ci = 0, timer;
    const step = () => {
      const line = lines[li];
      if (ci <= line.length) { setText(lines.slice(0, li).join('\n') + (li ? '\n' : '') + line.slice(0, ci)); ci++; timer = setTimeout(step, 26); }
      else { li++; ci = 0; timer = setTimeout(step, 420); if (li >= lines.length) { li = 0; } }
    };
    timer = setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, [lines]);
  return text;
}

export default function Hero() {
  const ref = useRef(null);
  const typed = useTypewriter(LINES);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 160]);       // parallax: bg slower
  const yFg = useTransform(scrollYProgress, [0, 1], [0, -90]);      // parallax: fg faster
  const fade = useTransform(scrollYProgress, [0, .8], [1, 0]);

  const headline = ['MASTER', 'THE', 'DIGITAL', 'WORLD.'];
  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-noise">
      {/* Parallax background layers */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 bg-grid opacity-70" />
      <motion.div style={{ y: yBg }} className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-[#00D9FF]/12 blur-[140px]" />
      <motion.div style={{ y: yBg }} className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-[#885CFF]/14 blur-[140px]" />
      <WebGLScene className="absolute inset-0 opacity-90" />

      <motion.div style={{ y: yFg, opacity: fade }} className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-32 pb-24 w-full">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .7, ease: EASE.outExpo }}
          className="font-mono text-xs md:text-sm tracking-[.35em] text-[#00D9FF] mb-6">
          <span className="inline-block w-2 h-2 rounded-full bg-[#39FF88] mr-3 animate-blink" />
          THE NEXT GENERATION STARTS HERE — PORT HARCOURT, NIGERIA
        </motion.p>

        <h1 className="font-display font-bold tracking-tight leading-[.95] text-[15vw] sm:text-7xl lg:text-8xl xl:text-9xl">
          {headline.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span initial={{ y: '110%', rotate: 4 }} animate={{ y: 0, rotate: 0 }}
                transition={{ delay: .3 + i * .12, duration: .9, ease: EASE.outExpo }}
                className={`inline-block ${i === 3 ? 'text-gradient' : ''}`}>{w}</motion.span>
            </span>
          ))}
        </h1>

        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9, duration: .8, ease: EASE.outExpo }}
          className="mt-7 max-w-xl text-lg text-[#929EAE] leading-relaxed">
          At <strong className="text-white">Cyber Elias Academy</strong>, we transform curiosity into practical digital skills, technical expertise, and opportunities for the future.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: .8, ease: EASE.outExpo }} className="mt-9 flex flex-wrap gap-4 items-center">
          <Magnetic><Btn href="#programmes">Explore programmes →</Btn></Magnetic>
          <Magnetic><Btn href="#cyber-lab" variant="ghost">Enter the Cyber Lab</Btn></Magnetic>
        </motion.div>

        {/* Live terminal card */}
        <motion.div initial={{ opacity: 0, y: 30, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 1.2, duration: .9, ease: EASE.outExpo }}
          whileHover={{ rotate: 0, y: -4 }} className="mt-12 max-w-xl glass rounded-2xl p-5 font-mono text-sm shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" /><span className="w-3 h-3 rounded-full bg-[#febc2e]" /><span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-[#929EAE]">cea@lab: ~/academy</span>
          </div>
          <pre className="whitespace-pre-wrap text-[#39FF88] min-h-[96px]">{typed}<span className="animate-blink">▌</span></pre>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a href="#why" aria-label="Scroll down" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#929EAE] hover:text-[#00D9FF] transition-colors">
        <span className="font-mono text-[10px] tracking-[.3em]">SCROLL</span>
        <motion.span animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }} className="text-xl">↓</motion.span>
      </motion.a>
    </section>
  );
}
