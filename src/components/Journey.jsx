import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JOURNEY } from '../data/content';
import { SectionHeading, Reveal } from './ui';

gsap.registerPlugin(ScrollTrigger);

// Scroll-SCRUBBED horizontal journey: scrollbar drives the timeline frame-by-frame.
// Scroll down to advance, scroll up to reverse — pure scrub, no playhead drift.
export default function Journey() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const getX = () => -(track.scrollWidth - window.innerWidth + 80);
      gsap.to(track, {
        x: getX,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => { if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`; },
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="relative overflow-hidden bg-[#070B12]">
      <div className="h-screen flex flex-col justify-center py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8 w-full">
          <Reveal><SectionHeading kicker="Learning journey" title="From beginner to capable practitioner" sub="Keep scrolling — the scrollbar drives this journey. Scroll back up and it reverses." /></Reveal>
          <div className="mt-8 h-1.5 rounded-full bg-white/10 overflow-hidden max-w-md">
            <div ref={barRef} className="h-full w-full origin-left bg-gradient-to-r from-[#00D9FF] to-[#39FF88]" style={{ transform: 'scaleX(0)' }} />
          </div>
        </div>
        <div ref={trackRef} className="flex gap-6 px-5 md:px-8 mt-10 w-max items-stretch will-change-transform">
          {JOURNEY.map((j, i) => (
            <div key={j.step} className="glass rounded-3xl p-8 w-[300px] md:w-[360px] shrink-0 relative overflow-hidden hover:border-[#00D9FF]/50 transition-colors">
              <span className="absolute -top-4 -right-2 font-display text-[110px] font-bold text-white/5 leading-none">{j.step}</span>
              <span className="text-5xl">{j.icon}</span>
              <h3 className="font-display text-2xl font-bold mt-5">{j.title}</h3>
              <p className="text-[#929EAE] mt-3 leading-relaxed">{j.desc}</p>
              <div className="mt-6 h-1 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-gradient-to-r from-[#00D9FF] to-[#39FF88]" style={{ width: `${100 - i * 12}%` }} /></div>
              <p className="font-mono text-[10px] text-[#929EAE] mt-3">STEP {j.step} / 06</p>
            </div>
          ))}
          <div className="w-[280px] shrink-0 rounded-3xl p-8 bg-gradient-to-br from-[#00D9FF] to-[#39FF88] text-[#070B12] flex flex-col justify-center">
            <p className="font-display text-2xl font-bold">Ready to start step 01?</p>
            <a href="#admissions" className="btn-press mt-5 inline-flex bg-[#070B12] text-white rounded-full px-5 py-3 text-sm font-semibold w-max">Apply now →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
