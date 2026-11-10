// Central motion system — every animation in the site reads from here.
// Easing curves (bezier) + spring physics presets (mass / stiffness / damping).

export const EASE = {
  outExpo: [0.16, 1, 0.3, 1],
  outQuart: [0.25, 1, 0.5, 1],
  inOut: [0.65, 0, 0.35, 1],
  back: [0.34, 1.56, 0.64, 1],
  overshoot: [0.22, 1.4, 0.36, 1],
};

// Spring physics presets — framer-motion `type: "spring"`
export const SPRING = {
  soft: { type: 'spring', stiffness: 120, damping: 18, mass: 0.9 },
  snappy: { type: 'spring', stiffness: 320, damping: 22, mass: 0.6 },
  bouncy: { type: 'spring', stiffness: 210, damping: 12, mass: 1 },
  gentle: { type: 'spring', stiffness: 80, damping: 20, mass: 1.2 },
  magnetic: { type: 'spring', stiffness: 150, damping: 15, mass: 0.4 },
};

// Stagger choreography helpers
export const staggerParent = (stagger = 0.09, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});
export const staggerChild = {
  hidden: { opacity: 0, y: 34, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE.outExpo } },
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
