import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useAnimationControls } from 'framer-motion';
import lottie from 'lottie-web';
import { Reveal, SectionHeading, Toggle, Btn, useToast } from './ui';
import { EASE, SPRING } from '../lib/motion';

const CURVES = [
  { name: 'Out Expo', css: 'cubic-bezier(0.16,1,0.3,1)', arr: EASE.outExpo },
  { name: 'Back (overshoot)', css: 'cubic-bezier(0.34,1.56,0.64,1)', arr: EASE.back },
  { name: 'In-Out', css: 'cubic-bezier(0.65,0,0.35,1)', arr: EASE.inOut },
  { name: 'Overshoot', css: 'cubic-bezier(0.22,1.4,0.36,1)', arr: EASE.overshoot },
];

function EasingPlayground() {
  const [curve, setCurve] = useState(CURVES[0]);
  const [run, setRun] = useState(0);
  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="font-display font-bold">📈 Easing curves <span className="text-xs font-mono text-[#929EAE] font-normal">— bezier, never linear</span></h3>
      <div className="relative h-40 mt-5 rounded-2xl bg-black/30 border border-white/10 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d={`M0,100 C ${curve.arr[0] * 100},${100 - curve.arr[1] * 100} ${curve.arr[2] * 100},${100 - curve.arr[3] * 100} 100,0`} fill="none" stroke="#00D9FF" strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>
        <motion.span key={run} initial={{ left: '2%', bottom: '4%' }} animate={{ left: '92%', bottom: '88%' }} transition={{ duration: 1.4, ease: curve.arr }}
          className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#39FF88] shadow-[0_0_20px_rgba(0,217,255,.8)]" />
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {CURVES.map(c => (
          <button key={c.name} onClick={() => { setCurve(c); setRun(r => r + 1); }} className={`btn-press px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${curve.name === c.name ? 'bg-[#00D9FF] text-[#070B12]' : 'glass'}`}>{c.name}</button>
        ))}
        <button onClick={() => setRun(r => r + 1)} className="btn-press px-3 py-1.5 rounded-full text-xs font-semibold glass cursor-pointer">▶ Replay</button>
      </div>
      <p className="font-mono text-[11px] text-[#929EAE] mt-3">{curve.css}</p>
    </div>
  );
}

function SpringPlayground() {
  const [stiff, setStiff] = useState(210);
  const [damp, setDamp] = useState(12);
  const [go, setGo] = useState(0);
  const controls = useAnimationControls();
  useEffect(() => { controls.start({ x: [0, 220, 0], transition: { duration: 1.6, type: 'spring', stiffness: stiff, damping: damp, mass: 1 } }); }, [go, stiff, damp, controls]);
  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="font-display font-bold">🌀 Spring physics <span className="text-xs font-mono text-[#929EAE] font-normal">— mass · stiffness · damping</span></h3>
      <div className="h-24 mt-5 rounded-2xl bg-black/30 border border-white/10 flex items-center px-4 overflow-hidden">
        <motion.span animate={controls} className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#885CFF] to-[#00D9FF] shrink-0" />
      </div>
      <label className="block mt-5 text-xs font-mono text-[#929EAE]">STIFFNESS {stiff}
        <input type="range" min={40} max={400} value={stiff} onChange={e => setStiff(+e.target.value)} className="w-full accent-[#00D9FF] cursor-pointer" aria-label="Spring stiffness" /></label>
      <label className="block mt-3 text-xs font-mono text-[#929EAE]">DAMPING {damp}
        <input type="range" min={4} max={40} value={damp} onChange={e => setDamp(+e.target.value)} className="w-full accent-[#39FF88] cursor-pointer" aria-label="Spring damping" /></label>
      <Btn className="mt-4 w-full" onClick={() => setGo(g => g + 1)}>Launch spring →</Btn>
      <p className="font-mono text-[11px] text-[#929EAE] mt-3">Low damping = bouncy. High stiffness = snappy.</p>
    </div>
  );
}

function LottieShowcase() {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    const anim = lottie.loadAnimation({ container: ref.current, renderer: 'svg', loop: true, autoplay: true, path: '/lottie/pulse.json' });
    return () => anim.destroy();
  }, []);
  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="font-display font-bold">🎞️ Lottie vector animation</h3>
      <div ref={ref} className="h-44 mt-3 flex items-center justify-center [&>svg]:w-40 [&>svg]:h-40" aria-label="Lottie pulsing orb animation" />
      <button onClick={() => setPlaying(!playing)} className="btn-press w-full glass rounded-full py-2.5 text-sm font-semibold cursor-pointer">{playing ? '⏸ Pause' : '▶ Play'}</button>
      <p className="font-mono text-[11px] text-[#929EAE] mt-3">/public/lottie/pulse.json — vector JSON, 60 frames</p>
    </div>
  );
}

function SvgMorph() {
  const [circle, setCircle] = useState(false);
  const toast = useToast();
  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="font-display font-bold">🔷 SVG morphing</h3>
      <div className="h-44 mt-3 flex items-center justify-center">
        <motion.svg width="140" height="140" viewBox="0 0 140 140" animate={{ rotate: circle ? 45 : 0 }} transition={SPRING.bouncy}>
          <motion.path fill="url(#g1)" stroke="#00D9FF" strokeWidth="2"
            animate={{ d: circle ? 'M70,15 L125,70 L70,125 L15,70 Z' : 'M70,15 C110,15 125,40 125,70 C125,100 110,125 70,125 C30,125 15,100 15,70 C15,40 30,15 70,15 Z' }}
            transition={{ duration: .8, ease: EASE.outExpo }} />
          <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00D9FF" /><stop offset="100%" stopColor="#885CFF" /></linearGradient></defs>
        </motion.svg>
      </div>
      <button onClick={() => { setCircle(!circle); toast(circle ? 'Morphed to blob' : 'Morphed to diamond'); }} className="btn-press w-full glass rounded-full py-2.5 text-sm font-semibold cursor-pointer">Morph: {circle ? 'blob' : 'diamond'} ⇄</button>
      <p className="font-mono text-[11px] text-[#929EAE] mt-3">Code-driven path interpolation, no images</p>
    </div>
  );
}

function SkeletonDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="font-display font-bold">⏳ Skeleton loaders</h3>
      <div className="mt-4 min-h-[120px]">
        {loading ? (
          <div className="space-y-3"><div className="skeleton h-5 w-3/4 rounded" /><div className="skeleton h-4 w-full rounded" /><div className="skeleton h-4 w-5/6 rounded" /><div className="skeleton h-10 w-32 rounded-full" /></div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING.soft}>
            <p className="font-semibold">Content loaded ✓</p><p className="text-sm text-[#929EAE] mt-1">Skeletons simulate loading and improve perceived performance.</p>
          </motion.div>
        )}
      </div>
      <Btn variant="ghost" className="w-full mt-3" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1800); }}>↻ Simulate reload</Btn>
    </div>
  );
}

export default function MotionLab({ snap, setSnap }) {
  return (
    <section id="motion-lab" className="relative py-24 md:py-32 bg-[#0D1420]/40">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal><SectionHeading kicker="Motion lab" title="Every motion system, live" sub="This section is the spec made playable: easing curves, spring physics, Lottie, SVG morphing, skeletons, and smart snapping. Touch everything." /></Reveal>
        <Reveal delay={.1}>
          <div className="mt-10 glass rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div><p className="font-display font-bold">🧲 Smart section snapping</p><p className="text-sm text-[#929EAE] mt-1">Gently locks the viewport onto full-screen sections. Respects reduced-motion.</p></div>
            <Toggle checked={snap} onChange={setSnap} label={snap ? 'Snapping ON' : 'Snapping OFF'} />
          </div>
        </Reveal>
        <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          <Reveal><EasingPlayground /></Reveal>
          <Reveal delay={.08}><SpringPlayground /></Reveal>
          <Reveal delay={.16}><LottieShowcase /></Reveal>
          <Reveal><SvgMorph /></Reveal>
          <Reveal delay={.08}><SkeletonDemo /></Reveal>
          <Reveal delay={.16}>
            <div className="glass rounded-3xl p-6 h-full">
              <h3 className="font-display font-bold">⌨️ Keyboard & focus</h3>
              <p className="text-sm text-[#929EAE] mt-3 leading-relaxed">Tab through the site — every control shows an animated focus ring. Press <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-xs">Esc</kbd> to close menus and modals.</p>
              <div className="flex gap-2 mt-5 flex-wrap">
                <Btn variant="ghost" className="!px-4 !py-2 text-xs">Focus me</Btn>
                <Btn variant="ghost" className="!px-4 !py-2 text-xs">And me</Btn>
                <Btn variant="ghost" className="!px-4 !py-2 text-xs">And me too</Btn>
              </div>
              <p className="font-mono text-[11px] text-[#929EAE] mt-4">Try it: Tab → Tab → Tab</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
