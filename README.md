# Cyber Elias Academy — cea.ng

An immersive, production-shaped website for **Cyber Elias Academy (CEA)**, a technology and
cybersecurity training academy at 24 Ebony Road, off Rumuola Road, Port Harcourt, Rivers State,
Nigeria.

Built from the academy website blueprint in [`docs/BRIEF.md`](./docs/BRIEF.md).

- **Stack** — Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion
- **No backend required to run** — every page is statically generated, so the site builds and
  serves without a database or API keys.
- **Design language** — midnight black `#070B12`, electric cyan `#00D9FF`, neon green `#39FF88`,
  violet `#885CFF`; Space Grotesk / Inter / JetBrains Mono.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run typecheck            # tsc --noEmit
```

---

## The route map

| Route | What it does |
| --- | --- |
| `/` | Cinematic hero with interactive network globe, pillars, departments, featured programmes, learning journey, Cyber Lab simulation, projects, story, testimonials, community, final CTA |
| `/about` | Story, mission/vision/philosophy, values, founder's message, facilities, partnerships, full FAQ |
| `/programmes` | Searchable, filterable catalogue (department, level, mode, duration, sort) |
| `/programmes/[slug]` | 15 programme pages: audience, outcomes, prerequisites, tooling, expandable curriculum, projects, assessment, certificate, instructor, FAQ, sticky apply rail |
| `/cybersecurity` | SEO landing page for cybersecurity training in Nigeria, with pathways, lab and role profiles |
| `/cyber-lab` | The **playable investigation** — four decision points, scoring, per-answer verdicts and a debrief |
| `/learning` | Six-stage journey, delivery modes, assessment breakdown |
| `/admissions` | Five-step process, requirements, modes, live programme list, admissions FAQ |
| `/apply` | Validated application form → instant `CEA-YYYY-XXXXX` reference |
| `/portal` | Working student dashboard preview: courses, progress, assignments, certificates, payments, community |
| `/login` | Sign-in form with validation; honestly reports that auth is not connected in preview |
| `/verify` | Certificate verification against a register, including a revoked-record case |
| `/careers` `/community` `/projects` `/enterprise` `/resources` `/resources/[slug]` | Supporting content pages |
| `/contact` | Enquiry form, campus details, channels |
| `/privacy` `/terms` | Data protection (NDPA) and platform terms |
| `sitemap.xml` `robots.txt` `manifest` `icon` `opengraph-image` | SEO + PWA surface |

---

## Architecture

```
src/
├─ app/                     # App Router pages, metadata, sitemap, robots, OG image
├─ components/
│  ├─ shell/                # Header (scroll glass + mobile overlay), footer, page hero, assistant
│  ├─ home/                 # Hero, learning journey, homepage sections
│  ├─ programmes/           # Catalogue filters, programme card, curriculum accordion
│  ├─ immersive/            # Network globe (canvas 3D), command centre, lab simulation
│  ├─ portal/               # Dashboard, certificate verifier, login form
│  ├─ forms/                # Application, contact, enterprise forms
│  ├─ motion/               # Single shared IntersectionObserver reveal provider
│  ├─ ui/                   # Buttons, cards, pills, section headings, badges
│  └─ brand/                # SVG wordmark
└─ data/                    # ⬅ THE SOURCE OF TRUTH
   ├─ academy.ts            # Institution record, departments, modes, levels
   ├─ programmes.ts         # All 15 programmes with full curriculum
   ├─ lab.ts                # Cyber Lab scenario + lab modules + rules
   ├─ content.ts            # Events, values, FAQs, testimonials, articles, career paths
   ├─ portal.ts             # Demo student data (mirrors intended schema)
   └─ certificates.ts       # Demonstration certificate register
```

### One source of truth

The brief is emphatic: *"Establish one authoritative source for courses, fees, durations,
delivery methods, campus information and admission requirements. Then let every page pull from
that source."*

Every page imports from `src/data`. Change a programme's duration in `programmes.ts` and the
catalogue card, the programme page, the admissions list, the portal, the sitemap and the
structured data all update together.

### Honesty rules, enforced in code

- `fee: null` renders as **"Fee on request"** everywhere — no invented pricing.
- Campus address is one `const`, so the 24-vs-26 Ebony Road conflict in the brief cannot recur.
- Unverifiable content is **labelled in the UI**: testimonials, student projects and events carry
  visible "placeholder"/"template" markers; the founder portrait and instructor slots say what is
  pending rather than inventing a person.
- The **assistant** answers from a deterministic, grounded topic map and escalates anything it
  cannot verify to a human — it never generates an unverifiable claim.
- The **login** form validates, then states that authentication is not connected instead of faking
  a session. The **application** form validates fully and returns a real reference number.

### Motion, responsibly

- A single `IntersectionObserver` (`RevealProvider`) drives all scroll reveals rather than one
  observer per element.
- The hero globe is hand-rolled 3D→2D projection on a 2D canvas: no Three.js bundle, pauses when
  scrolled out of view, pauses when the tab is hidden.
- `prefers-reduced-motion` is respected globally in CSS **and** in each JS animation (globe renders
  one static frame; Framer Motion `useReducedMotion`).

### Accessibility

Skip link, semantic landmarks, labelled form controls with inline errors and `aria-invalid`,
`aria-expanded` on disclosures and menus, `aria-pressed` on filter toggles, visible focus rings,
and colour contrast checked against the dark palette.

### SEO

Per-page metadata and canonicals, Open Graph + Twitter cards, generated OG image with embedded
brand fonts, `sitemap.xml`, `robots.txt` (portal and auth excluded), `EducationalOrganization`,
`Course`, `FAQPage` and `Article` JSON-LD.

---

## Interactive features worth trying

1. **The network globe** (homepage) — move your pointer, or drag on touch, to tilt it.
2. **The Cyber Lab scenario** — `/cyber-lab`, or the homepage section. Four decisions, scored,
   with the reasoning explained for every option including the wrong ones.
3. **Programme catalogue filters** — `/programmes`, plus deep links like
   `/programmes?department=cybersecurity&level=Beginner`.
4. **Certificate verification** — `/verify`, try `CEA-CERT-2026-0041` (valid) and
   `CEA-CERT-2025-0212` (revoked).
5. **The assistant** — bottom-right on every page; ask "how much does it cost?" to see it decline
   to invent a figure.
6. **The application form** — `/apply`; validation and reference generation work end to end.

---

## Before this goes live

These are deliberate gaps, not oversights — each is a place where the brief says "confirm with CEA":

- [ ] **Canonical campus address** — confirm 24 vs 26 Ebony Road (`src/data/academy.ts`).
- [ ] **Verified contact channels** — phone, WhatsApp, social handles (currently `null`, which
      renders as honest "pending verification" copy).
- [ ] **Fees and cohort dates** — set `fee` and `cohort` per programme when confirmed.
- [ ] **Instructor profiles** — populate `instructor` per programme once assigned.
- [ ] **Founder portrait and biography** — replace the placeholder block in `/about`.
- [ ] **Real testimonials, student projects and event calendar** — each is label-marked `sample`
      or `demo`; remove the markers as verified content lands.
- [ ] **Images** — the current photography is AI-generated for layout. Replace with real CEA
      campus, instructor and student photographs as the brief recommends; keep the same filenames
      in `public/images/`.
- [ ] **Backend** — swap `src/data/*` for Supabase/PostgreSQL queries; the shapes in
      `portal.ts` and `certificates.ts` mirror the intended schema.
- [ ] **Auth** — wire `/login` to an identity provider with MFA for staff roles.
- [ ] **Payments** — Paystack/Flutterwave with **server-side** verification; never place a secret
      key in the client.
- [ ] **Forms** — point the application/contact/enterprise forms at rate-limited server endpoints
      with validation and encrypted storage.
- [ ] **Legal review** — privacy policy and terms describe intended practice and need sign-off
      (NDPA / NDPC).
- [ ] **Analytics** — GA4 or PostHog, consent-gated.

Secrets are never read in the browser in this codebase; a production deployment should use
`.env.local` (see `.env.example`).

---

## Notes on the build

- 48 routes compile statically; shared JS is ~103 kB gzipped-ish (see `next build` output).
- The OG image embeds Space Grotesk 700 and Inter 400 as static TTFs in `public/fonts/`
  (Satori does not accept woff2), so it renders identically with no network access at build time.
- Security headers (nosniff, frame options, referrer policy, permissions policy, HSTS) are set in
  `next.config.ts`.
