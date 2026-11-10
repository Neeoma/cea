# CEA Immersive Website — Complete Build Guide

**Cyber Elias Academy (cea.ng)** — a premium, dark, cinematic, *very alive* single-page experience.
Every control on the site responds to hover, focus, press, and scroll. This guide explains
what was built, how every motion requirement is implemented, and how to customize and ship it.

---

## 1. Quick start

```bash
npm install        # install dependencies
npm run dev        # dev server → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

**Stack:** React 18 + Vite 6 · Tailwind CSS v4 · Framer Motion (springs) · GSAP + ScrollTrigger
(scroll-scrubbing) · Three.js (WebGL) · Lenis (smooth scroll) · lottie-web (vector animation).

---

## 2. Project structure

```
index.html                  ← title, meta, fonts (Space Grotesk / Inter / JetBrains Mono)
public/lottie/*.json        ← Lottie vector animations (pulse orb, success check)
src/
  main.jsx                  ← entry point
  App.jsx                   ← assembles everything + Lenis + smart snapping + back-to-top
  index.css                 ← design tokens, easing curves, skeletons, focus rings, press states
  lib/motion.js             ← central motion system (EASE curves + SPRING presets)
  data/content.js           ← ★ SINGLE SOURCE OF TRUTH: courses, projects, FAQs, stats, nav
  components/
    Preloader.jsx           ← skeleton preloader + curtain lift
    Cursor.jsx              ← custom cursor (dot + spring ring)
    Nav.jsx                 ← glass nav, scroll progress, full-screen overlay menu sweep
    Hero.jsx                ← staggered headline, parallax layers, typing terminal
    WebGLScene.jsx          ← Three.js particle network sphere (mouse-reactive)
    Sections1.jsx           ← marquee, count-up stats, "Why CEA" tilt cards
    Programmes.jsx          ← course explorer: search, filter pills, skeletons, detail modal
    Journey.jsx             ← scroll-SCRUBBED horizontal timeline (GSAP pin + scrub)
    CyberLab.jsx            ← live SOC feed, threat-classifier game, incident walkthrough
    Sections2.jsx           ← projects, about, testimonials, FAQ accordion
    MotionLab.jsx           ← playable playground: easing, springs, Lottie, SVG morph, skeletons
    Admissions.jsx          ← validated application form + success Lottie + certificate verifier
    Assistant.jsx           ← floating AI-assistant chat (rule-based, academy-grounded)
    Footer.jsx              ← final CTA, campus info, newsletter with feedback
    ui.jsx                  ← shared primitives: Magnetic, Btn, TiltCard, Reveal, Toggle, Toast
```

---

## 3. The motion system — requirement by requirement

All motion reads from two files: **`src/lib/motion.js`** (curves + springs) and
**`src/index.css`** (`--ease-*` tokens, durations, keyframes).

### 3.1 Scale & intent

| Requirement | Where | How |
|---|---|---|
| **Micro-interactions** | Every button (`.btn-press`), `Toggle`, `PopIcon` | Press = indent + scale .965 in 60 ms; toggles flip with a bouncy spring; icons pop with rotate+scale on activation |
| **Macro-animations** | `Preloader` curtain lift, `Nav` overlay menu sweep | Full-screen clip-path sweep with staggered links; preloader exits as a curtain |
| **Choreography** | `staggerParent`/`staggerChild` in `lib/motion.js` | Grids (features, stats, projects) cascade in one after another with blur+rise |

### 3.2 Scroll-driven mechanics

| Requirement | Where | How |
|---|---|---|
| **Scroll-triggered** | `Reveal` (framer-motion `whileInView`) | Elements animate precisely when they enter the viewport |
| **Scroll-scrubbed** | `Journey.jsx` (GSAP `scrub: 1`, pinned) | Scrollbar position drives the horizontal timeline frame-by-frame; scrolling up reverses it |
| **Parallax** | `Hero.jsx` (`useScroll` + `useTransform`) | Background grid/glows move slower, foreground content faster — simulated 3D depth |
| **Smart snapping** | `App.jsx` + Motion Lab toggle | `scroll-snap-type: y proximity` gently locks onto sections; toggleable, off by default |

### 3.3 State management & feedback

| Requirement | Where | How |
|---|---|---|
| **Hover** | Custom cursor ring expands; cards lift + tilt; links sweep an underline; buttons glow | Every interactive element signals clickability |
| **Focus** | `:focus-visible` in `index.css` | Animated pulsing cyan ring for keyboard users (try Tab) |
| **Active/Pressed** | `.btn-press:active` | Instant indent at the exact click millisecond |
| **Skeleton loaders** | `Preloader`, `Programmes` (on every filter change), Motion Lab demo | Shimmering placeholder blocks simulate loading |

### 3.4 Heavy-hitting rendering

| Requirement | Where | How |
|---|---|---|
| **Lottie** | `MotionLab` (pulse orb), `Admissions` (success check) | Vector JSON in `public/lottie/`, played via lottie-web |
| **WebGL** | `WebGLScene.jsx` (Three.js) | 900-particle network sphere with connection lines; rotates, reacts to mouse, pauses off-screen |
| **SVG animation** | `MotionLab` SVG morph | Code-driven path interpolation (blob ⇄ diamond), animated dashes on decorative lines |

### 3.5 Principles & math

| Requirement | Where | How |
|---|---|---|
| **Easing (bezier)** | `EASE` in `lib/motion.js` + `--ease-*` in CSS | `outExpo`, `outQuart`, `inOut`, `back`, `overshoot` — no linear motion anywhere. Visualized live in the Motion Lab |
| **Spring physics** | `SPRING` presets (`soft`, `snappy`, `bouncy`, `gentle`, `magnetic`) | Mass/stiffness/damping tuned per interaction. Sliders in the Motion Lab let you feel the math |

**Accessibility:** `prefers-reduced-motion` collapses all animation durations; WebGL rotation
pauses; snapping is opt-in. The site remains fully usable with motion off.

---

## 4. Interactive features (every action does something)

- **Course explorer** — search, department filter pills (sliding `layoutId` indicator), skeleton
  reload on every change, tilt cards, detail modal, "Apply" deep-links to the form.
- **Cyber Lab** — live simulated SOC feed (pause/resume), threat-classifier game with score +
  instant feedback, 5-step incident investigation walkthrough.
- **Admissions** — validated form (name/email/phone), mode radio pills, reference number
  generation, Lottie success animation.
- **Certificate verifier** — try `CEA-2026-DEMO1`.
- **Assistant** — floating chat answering from academy info (fees, location, courses…).
- **Motion Lab** — easing visualizer, spring sliders, Lottie play/pause, SVG morph, skeleton
  simulator, snapping toggle, keyboard-focus demo.
- **Global** — magnetic buttons, 3D tilt cards with cursor spotlight, toast feedback on every
  action, scroll progress bar, back-to-top, custom cursor, newsletter validation.

---

## 5. Customization guide

### Change content (courses, fees, FAQs…)
Edit **`src/data/content.js`** only. The whole site (explorer, modal, form dropdowns,
assistant answers) reads from it. Add a course by appending to `COURSES` with
`{ id, dept, title, level, duration, mode, price, skills, desc }`.

### Change colors / fonts
Edit the `@theme` block in **`src/index.css`** (`--color-cyan`, `--color-mint`, …) and the
Google Fonts link in `index.html`. Brand palette from the CEA blueprint:
`#070B12` void · `#0D1420` panel · `#00D9FF` cyan · `#39FF88` mint · `#885CFF` violet.

### Change motion feel
Edit `EASE` / `SPRING` in **`src/lib/motion.js`** — every animation site-wide updates.

### Add a Lottie animation
Drop a `.json` in `public/lottie/` and load it with `lottie.loadAnimation({ path: '/lottie/x.json' })`
(see `MotionLab.jsx`).

---

## 6. Production roadmap (from the CEA blueprint)

This build is the **immersive front-end**. To ship the full platform:

1. **Backend** — Supabase (Auth, PostgreSQL, Storage, Edge Functions). Tables: `users`,
   `courses`, `modules`, `lessons`, `enrollments`, `applications`, `payments`, `assignments`,
   `assessments`, `certificates`, `instructors`, `announcements`, `events`, `testimonials`.
2. **Payments** — Paystack (Nigeria) with server-side verification; never expose secret keys.
3. **Roles** — super-admin, director, admissions, instructor, student, alumni, finance, content,
   support — enforced with Row-Level Security.
4. **SEO** — per-page metadata, sitemap, robots.txt, Open Graph, Course/Organization JSON-LD.
5. **Deploy** — Vercel + CDN. Build command `npm run build`, output `dist/`.
6. **Compliance** — NDPC / Nigeria Data Protection Act; HTTPS everywhere; rate-limited forms.

> ⚠️ Before launch, reconcile the conflicting details noted in the original blueprint
> (13 short courses vs 8 cohort programmes; 24 vs 26 Ebony Road) — keep `data/content.js`
> as the single authoritative source.

---

## 7. Troubleshooting

| Symptom | Fix |
|---|---|
| Blank page | Run `npm install` then `npm run dev`; check console for errors |
| Journey section feels stuck | It is pinned by design — keep scrolling to traverse it |
| WebGL not visible | WebGL needs a GPU; the site degrades gracefully (gradients + grid remain) |
| Lottie missing | Ensure `public/lottie/*.json` exist and paths start with `/lottie/` |
| Motion too much | Your OS reduced-motion setting automatically calms the site |

---

*Built for Cyber Elias Academy — "The Future Is Built. Not Given."*
