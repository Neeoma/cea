import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { SPRING } from '../lib/motion';

// Custom cursor: dot + trailing ring that expands over interactive elements.
export default function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const rx = useSpring(x, SPRING.magnetic), ry = useSpring(y, SPRING.magnetic);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => setHover(!!e.target.closest('a,button,[data-hover],input,select,textarea'));
    const dn = () => setDown(true), up = () => setDown(false);
    window.addEventListener('mousemove', move); window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', dn); window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); window.removeEventListener('mousedown', dn); window.removeEventListener('mouseup', up); };
  }, [x, y]);

  if (typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches) return null;
  return (
    <>
      <motion.div ref={dot} style={{ x, y }} className="fixed top-0 left-0 z-[200] w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#00D9FF] pointer-events-none mix-blend-screen" />
      <motion.div ref={ring} style={{ x: rx, y: ry }} animate={{ scale: down ? .7 : hover ? 1.9 : 1, opacity: hover ? .9 : .5 }}
        transition={SPRING.snappy} className="fixed top-0 left-0 z-[199] w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border border-[#00D9FF] pointer-events-none" />
    </>
  );
}
