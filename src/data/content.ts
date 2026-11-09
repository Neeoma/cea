/**
 * Site-wide editorial content.
 * NOTE: Events, projects and testimonials marked `sample: true` are clearly
 * labelled placeholders until CEA supplies verified records.
 */

export const events = [
  {
    id: "evt-open-lab",
    title: "Open Lab Night",
    kind: "Campus",
    cadence: "Monthly · last Friday",
    time: "17:00 – 20:00 WAT",
    location: "CEA Campus, Port Harcourt",
    description:
      "The lab doors open to the public. Bring a laptop, work through a guided defensive scenario with our instructors, and see how a SOC analyst actually thinks.",
    status: "Recurring",
    sample: true,
  },
  {
    id: "evt-career-clinic",
    title: "Tech Career Clinic",
    kind: "Webinar",
    cadence: "Fortnightly",
    time: "18:00 WAT · Online",
    location: "Online",
    description:
      "A Thursday-evening session on pathways, portfolios and what employers in Port Harcourt and Lagos actually screen for. Live questions, honest answers.",
    status: "Recurring",
    sample: true,
  },
  {
    id: "evt-capture-flag",
    title: "CEA Capture-the-Flag",
    kind: "Competition",
    cadence: "Termly",
    time: "Saturday · 10:00 – 16:00",
    location: "CEA Campus + Online",
    description:
      "Team-based challenges across web, forensics and log analysis — run entirely on authorised CEA challenge infrastructure. Beginners bracket included.",
    status: "Announced per term",
    sample: true,
  },
  {
    id: "evt-demo-day",
    title: "Student Demo Day",
    kind: "Showcase",
    cadence: "End of cohort",
    time: "11:00 – 15:00 WAT",
    location: "CEA Campus",
    description:
      "Graduating cohorts present capstone work to peers, instructors and invited employers. The strongest evidence of what practical training produces.",
    status: "Per cohort",
    sample: true,
  },
] as const;

export const communityPillars = [
  {
    title: "Discussion groups",
    body: "Course cohorts get their own working group — questions, screenshots, late-night debugging and shared notes.",
    icon: "messages",
  },
  {
    title: "Mentorship",
    body: "Graduates returning to guide current learners, with structured check-ins rather than vague availability.",
    icon: "users",
  },
  {
    title: "Student clubs",
    body: "Security, development and design clubs that meet on campus and set their own projects.",
    icon: "flag",
  },
  {
    title: "Hackathons",
    body: "Time-boxed builds on authorised challenge environments, with mentors on the floor and real prizes.",
    icon: "trophy",
  },
  {
    title: "Alumni network",
    body: "A directory of graduates who have opted in — for referrals, collaboration and hiring.",
    icon: "network",
  },
  {
    title: "Career board",
    body: "Internships and entry-level roles shared with the community as they arrive, never invented.",
    icon: "briefcase",
  },
] as const;

export const careerPaths = [
  {
    role: "Security Operations Analyst",
    track: "Cybersecurity",
    entry: "Cybersecurity Fundamentals → Security Operations",
    dayToDay: "Triage alerts, investigate anomalies, document findings, escalate real incidents.",
    skills: ["Log analysis", "Triage discipline", "Clear written handover"],
  },
  {
    role: "Penetration Tester (Junior)",
    track: "Cybersecurity",
    entry: "Cybersecurity Fundamentals → Ethical Hacking",
    dayToDay: "Scoped testing, evidence collection, remediation advice and client reporting.",
    skills: ["Reconnaissance", "Web security", "Report writing"],
  },
  {
    role: "Frontend Developer",
    track: "Software",
    entry: "Full-Stack Web Development",
    dayToDay: "Build and maintain interfaces, work with designers, review code, ship improvements.",
    skills: ["TypeScript", "Accessibility", "Component architecture"],
  },
  {
    role: "Data Analyst",
    track: "AI & Data",
    entry: "Data Analytics → Applied AI",
    dayToDay: "Answer business questions with queries, dashboards and a written recommendation.",
    skills: ["SQL", "pandas", "Visual communication"],
  },
  {
    role: "IT Support Technician",
    track: "Productivity",
    entry: "Computer Fundamentals → Repairs & Support",
    dayToDay: "Diagnose hardware and software faults, support users, maintain equipment.",
    skills: ["Fault diagnosis", "OS deployment", "Customer care"],
  },
  {
    role: "Product Designer",
    track: "Design",
    entry: "UI/UX Product Design",
    dayToDay: "Research problems, design flows and interfaces, test with users, present rationale.",
    skills: ["Research synthesis", "Figma", "Design systems"],
  },
] as const;

export const careerSupport = [
  "Portfolio review with an instructor at the end of every programme",
  "CV and interview preparation sessions built around local employer expectations",
  "Capstone work presented publicly at Demo Day",
  "Certificate verification so employers can confirm your record instantly",
  "Referral introductions where CEA has a genuine relationship — never invented",
  "Alumni directory access after graduation, opt-in only",
];

export const studentProjects = [
  {
    title: "Riverside Clinic booking system",
    discipline: "Full-Stack Web Development",
    student: "Cohort project",
    summary:
      "A low-bandwidth appointment system for a small clinic, with SMS-style confirmations and an offline-first reception view.",
    stack: ["Next.js", "PostgreSQL", "Tailwind"],
    accent: "green",
    sample: true,
  },
  {
    title: "Login anomaly detector",
    discipline: "Security Operations",
    student: "Capstone",
    summary:
      "A detection pack that flags impossible-travel and mailbox-rule creation from synthetic authentication logs.",
    stack: ["Python", "Wazuh", "Sigma"],
    accent: "cyan",
    sample: true,
  },
  {
    title: "Market trader price board",
    discipline: "UI/UX Product Design",
    student: "Studio brief",
    summary:
      "Field research with 14 traders produced a large-type price board designed for daylight readability and low literacy.",
    stack: ["Figma", "Design system"],
    accent: "violet",
    sample: true,
  },
  {
    title: "School results dashboard",
    discipline: "Data Analytics",
    student: "Cohort project",
    summary:
      "Term-by-term performance dashboard with a one-page decision memo written for a non-technical principal.",
    stack: ["SQL", "pandas", "Metabase"],
    accent: "cyan",
    sample: true,
  },
  {
    title: "Identity system for a logistics brand",
    discipline: "Graphic Design",
    student: "Commercial brief",
    summary:
      "Full identity system — wordmark, vehicle livery, waybill templates and print-ready artwork.",
    stack: ["Illustrator", "Photoshop"],
    accent: "violet",
    sample: true,
  },
  {
    title: "Bench repair case files",
    discipline: "Computer Repairs",
    student: "Workshop assessment",
    summary:
      "Three intake-to-handover case files documenting diagnosis, parts, labour and customer advice.",
    stack: ["Workshop", "Documentation"],
    accent: "green",
    sample: true,
  },
] as const;

export const testimonials = [
  {
    quote:
      "The lab is where it clicked for me. Reading about log analysis is one thing; being handed a queue and a timeline is another.",
    name: "Placeholder record",
    role: "Security Operations cohort",
    sample: true,
  },
  {
    quote:
      "I came in able to use a computer and left able to build and deploy one. The capstone is what I show in interviews.",
    name: "Placeholder record",
    role: "Full-Stack cohort",
    sample: true,
  },
  {
    quote:
      "What I valued most was the honesty about what employers want here — not imported advice from somewhere else.",
    name: "Placeholder record",
    role: "Design cohort",
    sample: true,
  },
] as const;

export const faqs = [
  {
    q: "Do I need to be technical to start?",
    a: "No. Digital Productivity and Computer Fundamentals are built for absolute beginners. Cybersecurity Fundamentals and Full-Stack Web Development also start from zero, provided you are comfortable using a computer.",
    category: "Admissions",
  },
  {
    q: "Where are classes held?",
    a: "At our campus at 24 Ebony Road, off Rumuola Road, Port Harcourt, Rivers State. Many programmes also run in hybrid or fully online modes — check the programme page for the modes available.",
    category: "Admissions",
  },
  {
    q: "How much does a programme cost?",
    a: "Tuition is confirmed by admissions for each cohort and learning mode. This site deliberately does not publish figures it cannot verify; submit an application and admissions will send the current fee schedule with your acceptance.",
    category: "Fees",
  },
  {
    q: "What payment methods are accepted?",
    a: "Payment instructions are issued with your acceptance letter. Where online payment is available, it is processed through a licensed Nigerian payment provider and verified server-side before enrolment is confirmed.",
    category: "Fees",
  },
  {
    q: "Is the certificate recognised?",
    a: "CEA issues a certificate of completion for successful assessment against the programme's learning outcomes. It is a record of CEA training, not a university degree or a vendor certification. Every certificate carries an ID verifiable on this site.",
    category: "Certification",
  },
  {
    q: "Can I study while working?",
    a: "Yes. Programmes are scheduled around evening and weekend cohorts, and hybrid or online modes exist for most pathways. Expect roughly five to eight hours of study per week.",
    category: "Study",
  },
  {
    q: "Do you offer scholarships or instalments?",
    a: "Scholarship consideration is available by application and is assessed case by case. Instalment arrangements are discussed with admissions after acceptance. Neither is guaranteed.",
    category: "Fees",
  },
  {
    q: "Will training include real hacking?",
    a: "You will learn offensive concepts, but exclusively inside isolated, authorised lab environments against fictional or deliberately vulnerable targets. Anyone attempting to test systems they do not own is removed from the programme.",
    category: "Cyber Lab",
  },
  {
    q: "Do you help with jobs?",
    a: "CEA provides portfolio review, CV and interview preparation, Demo Day exposure and referral introductions where genuine relationships exist. We do not promise employment outcomes.",
    category: "Careers",
  },
  {
    q: "How do I apply?",
    a: "Use the apply form on this site. You will receive an application reference immediately, and admissions will review your application and respond with next steps.",
    category: "Admissions",
  },
] as const;

export const values = [
  {
    title: "Practical over theoretical",
    body: "Every module ends with something you built, configured, tested or repaired. If you cannot demonstrate it, you have not finished learning it.",
    icon: "hammer",
  },
  {
    title: "Honesty about outcomes",
    body: "No invented statistics, no promised salaries, no imaginary employers. We tell you what the training does and what it does not do.",
    icon: "scale",
  },
  {
    title: "Authorisation, always",
    body: "Offensive skill is taught the way the law and professional ethics require: in isolated labs, on systems we control, with written agreements.",
    icon: "lock",
  },
  {
    title: "Access before prestige",
    body: "Rivers State deserves world-class technical education without needing to travel for it. Our programmes are priced and scheduled for working people.",
    icon: "door",
  },
  {
    title: "Local context, high standard",
    body: "We teach for Nigerian infrastructure realities — bandwidth, power, procurement — without lowering the technical bar.",
    icon: "map",
  },
  {
    title: "The student's evidence",
    body: "Your portfolio, your lab write-ups, your case files. The work you can show is the qualification that matters most.",
    icon: "folder",
  },
] as const;

export const learningJourney = [
  {
    step: "01",
    title: "Discover",
    body: "Identify your interests and choose a pathway with an admissions conversation, not guesswork.",
  },
  {
    step: "02",
    title: "Learn",
    body: "Attend lessons, work through material, and build the conceptual model behind the tool.",
  },
  {
    step: "03",
    title: "Practise",
    body: "Exercises, simulations and lab tasks with checkpoints that tell you where you actually are.",
  },
  {
    step: "04",
    title: "Build",
    body: "Complete real projects and assemble a portfolio that survives a technical interview.",
  },
  {
    step: "05",
    title: "Demonstrate",
    body: "Assessments, defence of your project, and a documented record of your competence.",
  },
  {
    step: "06",
    title: "Advance",
    body: "Earn your verifiable certificate and move into further study, internship or employment.",
  },
] as const;

export const enterpriseOfferings = [
  {
    title: "Security awareness",
    body: "Role-appropriate phishing, credential hygiene and data handling training for staff who do not work in IT.",
    icon: "shield",
    duration: "1–2 days",
  },
  {
    title: "Employee digital skills",
    body: "Office productivity, data handling and collaboration tools taught against your own workflows.",
    icon: "monitor",
    duration: "Per cohort",
  },
  {
    title: "IT support capability",
    body: "Upskill internal support staff on diagnosis, deployment and documentation standards.",
    icon: "wrench",
    duration: "4–6 weeks",
  },
  {
    title: "Custom technical training",
    body: "Bespoke programmes in development, cloud or security built around your team's actual stack.",
    icon: "sliders",
    duration: "Scoped",
  },
  {
    title: "Leadership security workshops",
    body: "A half-day executive session on security risk, governance and decision-making under incident conditions.",
    icon: "presentation",
    duration: "Half day",
  },
  {
    title: "Group enrolment",
    body: "Enrol a team into existing programmes with consolidated invoicing and progress reporting.",
    icon: "users",
    duration: "Rolling",
  },
];

export const articles = [
  {
    slug: "start-a-career-in-cybersecurity-in-nigeria",
    title: "How to start a career in cybersecurity in Nigeria",
    excerpt:
      "The realistic route from beginner to first security role — what to learn first, what to ignore, and how to prove competence without a degree.",
    category: "Careers",
    readMinutes: 9,
    level: "Beginner",
    date: "2026-01-12",
    body: [
      {
        h: "Start with the defender's model, not the tools",
        p: "Most beginners open a hacking tool before they understand what they are looking at. That produces familiarity without competence. Learn assets, threats, vulnerabilities and controls first; then a firewall configuration, a log query or a scan result becomes readable instead of magical.",
      },
      {
        h: "Prove competence with artefacts",
        p: "Nigerian employers hiring into entry-level security roles are looking for evidence: a lab write-up, a detection rule you authored and tuned, a documented investigation. A certificate opens the door; a case file gets you through it.",
      },
      {
        h: "Learn the law before the technique",
        p: "Authorisation is the line between a professional and an offender. Understand the Cybercrimes Act, understand scope documents, and never touch a system you have not been given written permission to test.",
      },
      {
        h: "Build a twelve-week plan",
        p: "Weeks 1–4: fundamentals and Linux confidence. Weeks 5–8: networking and log reading. Weeks 9–12: a guided investigation end to end, documented. That is a credible foundation, and it is achievable alongside work.",
      },
    ],
  },
  {
    slug: "five-digital-skills-every-student-should-learn",
    title: "Five digital skills every student should learn first",
    excerpt:
      "Before specialising, build the baseline that every technical career quietly depends on.",
    category: "Learning",
    readMinutes: 6,
    level: "Beginner",
    date: "2026-01-28",
    body: [
      {
        h: "1. File discipline",
        p: "Naming, folders, backups and versioning. It sounds trivial until you lose four hours of work or cannot find the right file for a client. This is the cheapest productivity gain available.",
      },
      {
        h: "2. Spreadsheet fluency",
        p: "Formulas, sorting, filtering and one honest chart. Most organisational decisions are made from a spreadsheet, and being the person who can read it changes your usefulness immediately.",
      },
      {
        h: "3. Account security",
        p: "A password manager, multi-factor authentication, and the ability to recognise a phishing page. This protects your work before it protects anyone else's.",
      },
      {
        h: "4. Clear written communication",
        p: "Technical value is communicated in writing: a status update, a bug report, an incident note. Writing well is a technical skill in practice.",
      },
      {
        h: "5. One tool, deeply",
        p: "Pick the tool your field actually uses — Excel, Figma, VS Code, a terminal — and learn it past the tutorial level. Depth in one tool teaches you how to learn the next.",
      },
    ],
  },
  {
    slug: "what-an-ethical-hacker-actually-does",
    title: "What an ethical hacker actually does all day",
    excerpt:
      "Less Hollywood, more documentation. A realistic account of authorised security testing work.",
    category: "Cybersecurity",
    readMinutes: 8,
    level: "Beginner",
    date: "2026-02-09",
    body: [
      {
        h: "Scoping comes first",
        p: "Before a single packet is sent, the engagement is defined: which systems, which times, which techniques, what happens if something breaks. Most of the professional skill is in this boundary work.",
      },
      {
        h: "Reconnaissance is patient work",
        p: "Understanding an application's surface — endpoints, roles, data flows — takes longer than exploiting it. Good testers spend the majority of their time here.",
      },
      {
        h: "The output is a report",
        p: "A finding that is not documented with reproduction steps is not a finding. The deliverable is a document a developer can act on and an executive can fund.",
      },
      {
        h: "Authorisation is not paperwork",
        p: "Testing without permission is a crime, regardless of intent or outcome. The professional boundary is documentation, and it exists to protect the tester as much as the target.",
      },
    ],
  },
  {
    slug: "protect-your-online-accounts",
    title: "A practical guide to protecting your online accounts",
    excerpt:
      "Five changes you can make this evening that meaningfully reduce your risk.",
    category: "Security",
    readMinutes: 5,
    level: "Beginner",
    date: "2026-02-22",
    body: [
      {
        h: "Turn on multi-factor authentication",
        p: "Start with email, then banking, then social accounts. Authentication apps and hardware keys are stronger than SMS, but SMS is far better than nothing.",
      },
      {
        h: "Use a password manager",
        p: "One strong passphrase protects the vault; the vault generates everything else. This removes password reuse — the single most exploited weakness in personal security.",
      },
      {
        h: "Check your mailbox rules",
        p: "Attackers create forwarding rules to keep reading your mail after you change your password. Review rules and filters quarterly.",
      },
      {
        h: "Slow down on links",
        p: "Check the domain character by character before entering credentials. Phishing succeeds on urgency; removing urgency removes most of the risk.",
      },
      {
        h: "Review active sessions",
        p: "Most major services list where you are signed in. Sign out anything you do not recognise, then change the password.",
      },
    ],
  },
  {
    slug: "understanding-cybersecurity-threats",
    title: "Understanding the threats that actually reach Nigerian organisations",
    excerpt:
      "Phishing, business email compromise and credential theft cause more real damage than exotic malware.",
    category: "Security",
    readMinutes: 10,
    level: "Intermediate",
    date: "2026-03-04",
    body: [
      {
        h: "Business email compromise is the expensive one",
        p: "An attacker gains a mailbox, studies the payment patterns, then redirects a legitimate invoice. There is no malware, no alert-worthy exploit — just a convincing email from a real account.",
      },
      {
        h: "Credential theft is the entry point",
        p: "Reused passwords, infostealer malware on personal devices, and lookalike login pages. Almost every serious incident begins with a valid login.",
      },
      {
        h: "Ransomware follows unpatched exposure",
        p: "Internet-facing services without updates are the recurring vector. Patching is unglamorous and remains the highest-value control available to most organisations.",
      },
      {
        h: "Detection beats prevention alone",
        p: "Assume something gets through. Logging, alerting and a rehearsed response convert a disaster into an incident with a timeline.",
      },
    ],
  },
  {
    slug: "how-to-become-a-web-developer",
    title: "How to become a web developer without wasting a year",
    excerpt:
      "A sequence that produces employable output instead of a folder of abandoned tutorials.",
    category: "Learning",
    readMinutes: 7,
    level: "Beginner",
    date: "2026-03-18",
    body: [
      {
        h: "Build three things, not thirty",
        p: "A landing page, a data-driven interface, and a full application with authentication and a database. Depth on three projects beats fragments of thirty.",
      },
      {
        h: "Learn the browser properly",
        p: "Semantic HTML, CSS layout and accessibility fundamentals will outlast every framework you install. Frameworks change; the platform does not.",
      },
      {
        h: "Deploy early",
        p: "Put your work on the internet in week two. Deployment surfaces the problems — environment variables, build errors, DNS — that tutorials hide from you.",
      },
      {
        h: "Read code you did not write",
        p: "Open-source reading is how you acquire idiom. Pick a small library you already use and trace one feature end to end.",
      },
    ],
  },
] as const;

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
