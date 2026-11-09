import type { DepartmentId, Level, LearningMode } from "./academy";

export type Module = {
  title: string;
  summary: string;
  lessons: { title: string; minutes: number; type: "Reading" | "Lab" | "Video" | "Project" | "Assessment" }[];
};

export type Programme = {
  slug: string;
  title: string;
  department: DepartmentId;
  level: Level;
  modes: LearningMode[];
  durationWeeks: number;
  hoursPerWeek: number;
  // Fee is only shown when CEA has confirmed it. `null` renders as "On request".
  fee: number | null;
  currency: "NGN";
  heroImage: string;
  tagline: string;
  summary: string;
  audience: string[];
  outcomes: string[];
  prerequisites: string[];
  tools: string[];
  modules: Module[];
  projects: { title: string; brief: string; deliverable: string }[];
  assessment: string;
  certificate: string;
  instructor: { name: string; role: string; initials: string; bio: string } | null;
  featured?: boolean;
  cohort: string;
};

const genericAssessment =
  "Continuous assessment through lab checkpoints and a final practical defence of your project. Pass mark 60%.";

const genericCertificate =
  "CEA Certificate of Completion, carrying a verifiable certificate ID. Verification is available on this site at /verify.";

export const programmes: Programme[] = [
  {
    slug: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    department: "cybersecurity",
    level: "Beginner",
    modes: ["Physical", "Hybrid", "Online"],
    durationWeeks: 8,
    hoursPerWeek: 6,
    fee: null,
    currency: "NGN",
    heroImage: "/images/prog-cyber-fundamentals.jpg",
    tagline: "Understand how systems break — and how defenders think.",
    summary:
      "A ground-up introduction to defensive security. You build the mental model every other security pathway depends on: assets, threats, vulnerabilities, controls, and the analyst's daily loop of detect, triage and respond.",
    audience: [
      "Complete beginners moving into technology",
      "IT support staff who want a security specialism",
      "Career switchers who need a credible starting point",
      "Business owners responsible for protecting their own systems",
    ],
    outcomes: [
      "Explain the CIA triad and apply it to real scenarios",
      "Map a small network and identify its attack surface",
      "Read authentication and access logs for anomalies",
      "Recognise phishing, credential-stuffing and social engineering",
      "Apply hardening basics to a Linux or Windows host",
      "Produce a clear, professional incident write-up",
    ],
    prerequisites: [
      "Comfort using a computer and a browser",
      "No prior security experience required",
      "A laptop capable of running a virtual machine (8GB RAM recommended)",
    ],
    tools: ["Linux VM", "Wireshark", "Wazuh (guided)", "Nmap (authorised lab only)"],
    modules: [
      {
        title: "The Defender's Mindset",
        summary: "Security as a discipline of trade-offs, not a product you buy.",
        lessons: [
          { title: "What security actually protects", minutes: 45, type: "Reading" },
          { title: "Threat, vulnerability, risk, control", minutes: 50, type: "Video" },
          { title: "Lab: mapping the lab network", minutes: 90, type: "Lab" },
        ],
      },
      {
        title: "Identity & Access",
        summary: "Most breaches start with a login. Learn why.",
        lessons: [
          { title: "Authentication vs authorisation", minutes: 40, type: "Reading" },
          { title: "Passwords, MFA and passkeys in practice", minutes: 55, type: "Video" },
          { title: "Lab: chasing a suspicious login", minutes: 90, type: "Lab" },
          { title: "Checkpoint quiz", minutes: 25, type: "Assessment" },
        ],
      },
      {
        title: "Networks Without Fear",
        summary: "Packets, ports and protocols — read them instead of guessing.",
        lessons: [
          { title: "IP, DNS, TLS and what travels in the clear", minutes: 60, type: "Reading" },
          { title: "Lab: capturing your first traffic", minutes: 90, type: "Lab" },
          { title: "Segmentation and the least-privilege network", minutes: 45, type: "Video" },
        ],
      },
      {
        title: "Detect, Triage, Respond",
        summary: "The analyst workflow, practised end to end.",
        lessons: [
          { title: "Anatomy of a security event", minutes: 50, type: "Video" },
          { title: "Severity, scope and escalation", minutes: 45, type: "Reading" },
          { title: "Lab: incident investigation", minutes: 120, type: "Lab" },
          { title: "Capstone: defensive report", minutes: 180, type: "Project" },
        ],
      },
    ],
    projects: [
      {
        title: "Home lab hardening review",
        brief: "Take an intentionally weak virtual machine and produce a before/after hardening report.",
        deliverable: "PDF report + configuration diff",
      },
      {
        title: "Incident timeline reconstruction",
        brief: "Rebuild an attack timeline from supplied authentication and web logs.",
        deliverable: "Timeline, findings and 3 recommendations",
      },
    ],
    assessment: genericAssessment,
    certificate: genericCertificate,
    instructor: null,
    featured: true,
    cohort: "Next cohort: dates confirmed by admissions",
  },
  {
    slug: "ethical-hacking",
    title: "Ethical Hacking & Authorised Testing",
    department: "cybersecurity",
    level: "Intermediate",
    modes: ["Physical", "Hybrid"],
    durationWeeks: 10,
    hoursPerWeek: 7,
    fee: null,
    currency: "NGN",
    heroImage: "/images/prog-ethical-hacking.jpg",
    tagline: "Attack the lab so you can defend the real thing.",
    summary:
      "Penetration-testing concepts taught entirely inside an isolated, authorised environment: scoping, reconnaissance, controlled exploitation, evidence handling and the reporting that makes the work valuable.",
    audience: [
      "Graduates of Cybersecurity Fundamentals",
      "Developers who need to understand how their code is attacked",
      "IT staff moving into security testing",
      "Anyone preparing for junior pentest or red-team roles",
    ],
    outcomes: [
      "Scope an authorised engagement and agree rules of engagement",
      "Perform structured reconnaissance and service enumeration",
      "Validate and responsibly document a finding",
      "Write a client-ready technical and executive report",
      "Explain legal boundaries and Nigerian cyber legislation",
      "Remediate the issues you discover",
    ],
    prerequisites: [
      "Cybersecurity Fundamentals or equivalent experience",
      "Confident with the Linux command line",
      "Signed lab acceptable-use agreement",
    ],
    tools: ["Kali Linux", "Burp Suite Community", "Metasploit (guided)", "OWASP ZAP"],
    modules: [
      {
        title: "Law, Ethics & Scope",
        summary: "Why authorisation is the entire discipline.",
        lessons: [
          { title: "Nigerian Cybercrimes Act in practice", minutes: 60, type: "Reading" },
          { title: "Rules of engagement and scoping documents", minutes: 45, type: "Video" },
          { title: "Lab: writing a scope document", minutes: 60, type: "Lab" },
        ],
      },
      {
        title: "Reconnaissance & Enumeration",
        summary: "Understand the target surface before touching it.",
        lessons: [
          { title: "Passive vs active reconnaissance", minutes: 55, type: "Reading" },
          { title: "Lab: enumerating a lab host", minutes: 120, type: "Lab" },
          { title: "Service identification and versioning", minutes: 50, type: "Video" },
        ],
      },
      {
        title: "Web Application Security",
        summary: "The OWASP terrain, explained properly.",
        lessons: [
          { title: "Injection and broken access control", minutes: 70, type: "Reading" },
          { title: "Lab: finding and fixing an auth flaw", minutes: 120, type: "Lab" },
          { title: "Lab: input handling in a test app", minutes: 100, type: "Lab" },
          { title: "Checkpoint quiz", minutes: 30, type: "Assessment" },
        ],
      },
      {
        title: "Reporting & Remediation",
        summary: "The deliverable is the finding, not the exploit.",
        lessons: [
          { title: "Severity scoring and risk language", minutes: 50, type: "Video" },
          { title: "Writing the executive summary", minutes: 45, type: "Reading" },
          { title: "Capstone: full engagement report", minutes: 240, type: "Project" },
        ],
      },
    ],
    projects: [
      {
        title: "Authorised lab engagement",
        brief: "Run a scoped assessment against a designated training target and deliver a full report.",
        deliverable: "Engagement report with findings, evidence and remediation",
      },
      {
        title: "Remediation pull request",
        brief: "Fix the top finding in the supplied sample application.",
        deliverable: "Code patch + verification notes",
      },
    ],
    assessment: genericAssessment,
    certificate: genericCertificate,
    instructor: null,
    featured: true,
    cohort: "Next cohort: dates confirmed by admissions",
  },
  {
    slug: "security-operations",
    title: "Security Operations & Monitoring",
    department: "cybersecurity",
    level: "Intermediate",
    modes: ["Physical", "Hybrid", "Online"],
    durationWeeks: 9,
    hoursPerWeek: 6,
    fee: null,
    currency: "NGN",
    heroImage: "/images/prog-secops.jpg",
    tagline: "Work the queue like a real SOC analyst.",
    summary:
      "A shift-simulation programme built around alert queues, log sources and escalation discipline. You practise the actual rhythm of a security operations centre rather than memorising acronyms.",
    audience: [
      "Aspiring SOC analysts",
      "IT support staff who handle security alerts today",
      "Fundamentals graduates who enjoy investigation",
    ],
    outcomes: [
      "Triage alerts by severity and business impact",
      "Pivot across log sources to build a timeline",
      "Write detections for common behaviour patterns",
      "Escalate and hand over cleanly between shifts",
      "Reduce false positives without losing coverage",
    ],
    prerequisites: [
      "Cybersecurity Fundamentals or equivalent",
      "Basic Linux and networking literacy",
    ],
    tools: ["Wazuh", "Elastic (Kibana)", "Sysmon", "TheHive (guided)"],
    modules: [
      {
        title: "The SOC Operating Model",
        summary: "Tiers, queues, SLAs and why handover matters.",
        lessons: [
          { title: "How a SOC actually runs", minutes: 55, type: "Video" },
          { title: "Alert fatigue as an engineering problem", minutes: 45, type: "Reading" },
          { title: "Lab: working a simulated queue", minutes: 90, type: "Lab" },
        ],
      },
      {
        title: "Log Sources & Pipelines",
        summary: "From endpoint telemetry to a usable event.",
        lessons: [
          { title: "Windows and Linux telemetry", minutes: 60, type: "Reading" },
          { title: "Lab: building a log pipeline", minutes: 110, type: "Lab" },
          { title: "Lab: searching like an analyst", minutes: 90, type: "Lab" },
        ],
      },
      {
        title: "Detection Engineering Basics",
        summary: "Turn behaviour into a rule.",
        lessons: [
          { title: "Behaviour over indicators", minutes: 50, type: "Reading" },
          { title: "Lab: writing three detections", minutes: 120, type: "Lab" },
          { title: "Checkpoint quiz", minutes: 30, type: "Assessment" },
        ],
      },
      {
        title: "Live-Fire Simulation",
        summary: "Four hours. Twelve alerts. One real incident.",
        lessons: [
          { title: "Preparing the shift", minutes: 30, type: "Video" },
          { title: "Lab: full SOC simulation", minutes: 240, type: "Lab" },
          { title: "Post-incident review", minutes: 90, type: "Project" },
        ],
      },
    ],
    projects: [
      {
        title: "Detection pack",
        brief: "Author and tune a small detection pack against the lab telemetry.",
        deliverable: "Rule set + tuning notes + false positive analysis",
      },
      {
        title: "Shift handover dossier",
        brief: "Produce the handover an oncoming analyst would actually need.",
        deliverable: "One-page dossier + open items",
      },
    ],
    assessment: genericAssessment,
    certificate: genericCertificate,
    instructor: null,
    cohort: "Next cohort: dates confirmed by admissions",
  },
  {
    slug: "network-security",
    title: "Network Security",
    department: "cybersecurity",
    level: "Intermediate",
    modes: ["Physical", "Hybrid"],
    durationWeeks: 8,
    hoursPerWeek: 6,
    fee: null,
    currency: "NGN",
    heroImage: "/images/prog-network-security.jpg",
    tagline: "Design networks that fail safely.",
    summary:
      "Segment, filter and monitor a network you designed yourself. Covers firewalls, VPNs, wireless security and the troubleshooting discipline that separates a designer from a tinkerer.",
    audience: [
      "Network administrators adding security depth",
      "Systems engineers responsible for infrastructure",
      "Security staff who want to go deeper on the network layer",
    ],
    outcomes: [
      "Segment a network by trust boundary",
      "Write and audit firewall rule sets",
      "Harden wireless access and VPN configuration",
      "Detect lateral movement in network telemetry",
      "Troubleshoot without breaking the controls you built",
    ],
    prerequisites: ["Networking basics (TCP/IP addressing)", "Familiarity with a Linux terminal"],
    tools: ["pfSense", "Wireshark", "Cisco Packet Tracer", "WireGuard"],
    modules: [
      {
        title: "Trust Boundaries",
        summary: "If everything can talk to everything, nothing is secure.",
        lessons: [
          { title: "Segmentation architecture", minutes: 55, type: "Reading" },
          { title: "Lab: designing a segmented lab", minutes: 100, type: "Lab" },
        ],
      },
      {
        title: "Firewalls & Filtering",
        summary: "Rules that stay readable a year later.",
        lessons: [
          { title: "Stateful filtering explained", minutes: 50, type: "Video" },
          { title: "Lab: writing and auditing rules", minutes: 110, type: "Lab" },
          { title: "Lab: breaking your own rule set", minutes: 60, type: "Lab" },
        ],
      },
      {
        title: "Remote Access",
        summary: "VPNs, wireless and the mistakes that leak.",
        lessons: [
          { title: "VPN design trade-offs", minutes: 45, type: "Reading" },
          { title: "Lab: secure remote access", minutes: 90, type: "Lab" },
          { title: "Checkpoint quiz", minutes: 25, type: "Assessment" },
        ],
      },
      {
        title: "Network Detection",
        summary: "See lateral movement while it happens.",
        lessons: [
          { title: "North-south vs east-west traffic", minutes: 40, type: "Video" },
          { title: "Capstone: monitored network build", minutes: 210, type: "Project" },
        ],
      },
    ],
    projects: [
      {
        title: "Segmented lab network",
        brief: "Design and build a three-zone network with enforced trust boundaries.",
        deliverable: "Diagram, configuration export, test evidence",
      },
    ],
    assessment: genericAssessment,
    certificate: genericCertificate,
    instructor: null,
    cohort: "Next cohort: dates confirmed by admissions",
  },
  {
    slug: "digital-forensics",
    title: "Digital Forensics",
    department: "cybersecurity",
    level: "Advanced",
    modes: ["Physical", "Hybrid"],
    durationWeeks: 9,
    hoursPerWeek: 7,
    fee: null,
    currency: "NGN",
    heroImage: "/images/prog-forensics.jpg",
    tagline: "Evidence that survives scrutiny.",
    summary:
      "Acquire, preserve and analyse digital evidence with defensible process. Disk imaging, memory artefacts, timelines and the documentation standards a court or client will test.",
    audience: [
      "Security analysts moving into investigation",
      "Law enforcement and compliance professionals",
      "SOC staff who need forensic depth",
    ],
    outcomes: [
      "Image and verify a disk without altering evidence",
      "Recover deleted artefacts and build a file timeline",
      "Analyse volatile memory for indicators",
      "Maintain chain of custody documentation",
      "Present findings clearly under challenge",
    ],
    prerequisites: ["Cybersecurity Fundamentals", "Comfortable with Linux and command-line tools"],
    tools: ["Autopsy", "Volatility", "FTK Imager", "Sleuth Kit"],
    modules: [
      {
        title: "Forensic Soundness",
        summary: "Process is the evidence.",
        lessons: [
          { title: "Chain of custody and hashing", minutes: 55, type: "Reading" },
          { title: "Lab: acquiring and verifying an image", minutes: 100, type: "Lab" },
        ],
      },
      {
        title: "File Systems & Artefacts",
        summary: "Where the story lives on disk.",
        lessons: [
          { title: "NTFS and ext4 artefacts", minutes: 65, type: "Reading" },
          { title: "Lab: deleted file recovery", minutes: 120, type: "Lab" },
        ],
      },
      {
        title: "Memory & Timeline",
        summary: "What was running, and when.",
        lessons: [
          { title: "Volatile data analysis", minutes: 60, type: "Video" },
          { title: "Lab: memory forensics", minutes: 110, type: "Lab" },
          { title: "Checkpoint quiz", minutes: 30, type: "Assessment" },
        ],
      },
      {
        title: "Case Work",
        summary: "Assemble a defensible case file.",
        lessons: [
          { title: "Report standards", minutes: 45, type: "Reading" },
          { title: "Capstone: full case file", minutes: 240, type: "Project" },
        ],
      },
    ],
    projects: [
      {
        title: "Case file reconstruction",
        brief: "Investigate a supplied disk and memory image and produce a full case file.",
        deliverable: "Case file, timeline, findings, expert summary",
      },
    ],
    assessment: genericAssessment,
    certificate: genericCertificate,
    instructor: null,
    cohort: "Next cohort: dates confirmed by admissions",
  },
  {
    slug: "full-stack-web-development",
    title: "Full-Stack Web Development",
    department: "software",
    level: "Beginner",
    modes: ["Physical", "Hybrid", "Online"],
    durationWeeks: 14,
    hoursPerWeek: 8,
    fee: null,
    currency: "NGN",
    heroImage: "/images/prog-fullstack.jpg",
    tagline: "Ship real software, not tutorials.",
    summary:
      "A project-led build programme taking you from semantic HTML to a deployed, authenticated full-stack application. Every module ends with something running in a browser.",
    audience: [
      "Beginners who want a career in software",
      "Designers who want to build what they draw",
      "Career changers needing a portfolio, not a certificate alone",
    ],
    outcomes: [
      "Build responsive interfaces with modern CSS",
      "Write maintainable JavaScript and TypeScript",
      "Model data and build APIs with a relational database",
      "Implement authentication and server-side validation",
      "Deploy and maintain a live application",
      "Work with Git and code review as a team",
    ],
    prerequisites: ["Basic computer literacy", "No coding experience required"],
    tools: ["HTML/CSS", "JavaScript", "TypeScript", "React", "Next.js", "PostgreSQL", "Git"],
    modules: [
      {
        title: "The Web, Properly",
        summary: "Semantic structure and layout that respects the browser.",
        lessons: [
          { title: "HTML semantics and accessibility", minutes: 60, type: "Reading" },
          { title: "Modern CSS layout", minutes: 75, type: "Video" },
          { title: "Project: responsive landing page", minutes: 180, type: "Project" },
        ],
      },
      {
        title: "JavaScript Fundamentals",
        summary: "Language mechanics you'll use every day.",
        lessons: [
          { title: "Values, functions and scope", minutes: 70, type: "Reading" },
          { title: "Async, promises and fetch", minutes: 80, type: "Video" },
          { title: "Lab: build a data-driven UI", minutes: 150, type: "Lab" },
          { title: "Checkpoint quiz", minutes: 30, type: "Assessment" },
        ],
      },
      {
        title: "React & Components",
        summary: "Composition, state and the discipline of reusability.",
        lessons: [
          { title: "Thinking in components", minutes: 65, type: "Video" },
          { title: "Lab: interactive dashboard", minutes: 180, type: "Lab" },
        ],
      },
      {
        title: "Server, Data & Auth",
        summary: "Where the application becomes real.",
        lessons: [
          { title: "APIs, validation and errors", minutes: 75, type: "Reading" },
          { title: "Lab: authentication flow", minutes: 150, type: "Lab" },
          { title: "Lab: database modelling", minutes: 120, type: "Lab" },
        ],
      },
      {
        title: "Ship It",
        summary: "Deploy, monitor, iterate.",
        lessons: [
          { title: "Deployment and environment hygiene", minutes: 60, type: "Video" },
          { title: "Capstone: full-stack product", minutes: 360, type: "Project" },
        ],
      },
    ],
    projects: [
      {
        title: "Personal portfolio",
        brief: "A fast, accessible portfolio that actually represents your work.",
        deliverable: "Live URL + repository",
      },
      {
        title: "Capstone product",
        brief: "Design, build and deploy an authenticated full-stack application of your choosing.",
        deliverable: "Live URL, repository, README, demo video",
      },
    ],
    assessment: genericAssessment,
    certificate: genericCertificate,
    instructor: null,
    featured: true,
    cohort: "Next cohort: dates confirmed by admissions",
  },
  {
    slug: "python-and-automation",
    title: "Python & Automation",
    department: "software",
    level: "Beginner",
    modes: ["Physical", "Hybrid", "Online"],
    durationWeeks: 8,
    hoursPerWeek: 5,
    fee: null,
    currency: "NGN",
    heroImage: "/images/prog-python.jpg",
    tagline: "Stop repeating work a script can do.",
    summary:
      "Python for people who want results: clean fundamentals, file and data handling, APIs, and automation that saves your organisation hours every week.",
    audience: [
      "Office and admin staff drowning in repetitive tasks",
      "Security analysts who need scripting literacy",
      "Data-curious beginners",
    ],
    outcomes: [
      "Write clear, testable Python",
      "Manipulate files, spreadsheets and CSVs automatically",
      "Consume and build simple APIs",
      "Schedule and log automated jobs",
      "Debug confidently instead of guessing",
    ],
    prerequisites: ["Basic computer literacy"],
    tools: ["Python 3", "VS Code", "pandas", "requests"],
    modules: [
      {
        title: "Language Essentials",
        summary: "Enough Python to be dangerous — safely.",
        lessons: [
          { title: "Types, control flow and functions", minutes: 70, type: "Reading" },
          { title: "Lab: first scripts", minutes: 90, type: "Lab" },
        ],
      },
      {
        title: "Files & Data",
        summary: "The work that actually needs doing.",
        lessons: [
          { title: "CSV, JSON and spreadsheets", minutes: 60, type: "Video" },
          { title: "Lab: reporting automation", minutes: 120, type: "Lab" },
          { title: "Checkpoint quiz", minutes: 25, type: "Assessment" },
        ],
      },
      {
        title: "APIs & Integration",
        summary: "Connect tools that weren't built to talk.",
        lessons: [
          { title: "HTTP and API etiquette", minutes: 50, type: "Reading" },
          { title: "Lab: scheduled data sync", minutes: 120, type: "Lab" },
        ],
      },
      {
        title: "Automation Project",
        summary: "Solve a real problem from your own work.",
        lessons: [
          { title: "Capstone: automation tool", minutes: 210, type: "Project" },
        ],
      },
    ],
    projects: [
      {
        title: "Workflow automation",
        brief: "Identify a repetitive task and replace it with a documented script.",
        deliverable: "Script, README, time-saved estimate",
      },
    ],
    assessment: genericAssessment,
    certificate: genericCertificate,
    instructor: null,
    cohort: "Next cohort: dates confirmed by admissions",
  },
  {
    slug: "applied-ai-and-machine-learning",
    title: "Applied AI & Machine Learning",
    department: "ai-data",
    level: "Intermediate",
    modes: ["Hybrid", "Online"],
    durationWeeks: 10,
    hoursPerWeek: 7,
    fee: null,
    currency: "NGN",
    heroImage: "/images/prog-ai-ml.jpg",
    tagline: "Build models that answer real questions.",
    summary:
      "Practical machine learning from data cleaning to deployment, with a strong emphasis on evaluation, bias and the judgement required before shipping a model into a real workflow.",
    audience: [
      "Analysts moving into data science",
      "Developers adding ML capability",
      "Researchers and graduates with quantitative interest",
    ],
    outcomes: [
      "Prepare messy data for modelling without leaking information",
      "Train and evaluate supervised models honestly",
      "Explain model output to non-technical stakeholders",
      "Deploy a model behind a small API",
      "Identify bias, drift and misuse risk",
    ],
    prerequisites: ["Python basics", "Secondary-school level mathematics"],
    tools: ["Python", "scikit-learn", "pandas", "Jupyter", "FastAPI"],
    modules: [
      {
        title: "Data Before Models",
        summary: "Most of the work, and most of the value.",
        lessons: [
          { title: "Cleaning and feature design", minutes: 75, type: "Reading" },
          { title: "Lab: dataset preparation", minutes: 130, type: "Lab" },
        ],
      },
      {
        title: "Supervised Learning",
        summary: "Train, evaluate, and resist overfitting.",
        lessons: [
          { title: "Regression and classification", minutes: 80, type: "Video" },
          { title: "Lab: model comparison", minutes: 140, type: "Lab" },
          { title: "Checkpoint quiz", minutes: 30, type: "Assessment" },
        ],
      },
      {
        title: "Language Models in Practice",
        summary: "What generative AI is good at — and where it fails.",
        lessons: [
          { title: "Prompting, grounding and retrieval", minutes: 70, type: "Reading" },
          { title: "Lab: retrieval-grounded assistant", minutes: 150, type: "Lab" },
        ],
      },
      {
        title: "Deploy & Govern",
        summary: "Ship responsibly.",
        lessons: [
          { title: "Evaluation and drift monitoring", minutes: 60, type: "Video" },
          { title: "Capstone: deployed model", minutes: 240, type: "Project" },
        ],
      },
    ],
    projects: [
      {
        title: "Decision-support model",
        brief: "Build and evaluate a model for a supplied prediction task with an honest accuracy report.",
        deliverable: "Notebook, evaluation report, deployed endpoint",
      },
    ],
    assessment: genericAssessment,
    certificate: genericCertificate,
    instructor: null,
    cohort: "Next cohort: dates confirmed by admissions",
  },
  {
    slug: "data-analytics",
    title: "Data Analytics with Python & SQL",
    department: "ai-data",
    level: "Beginner",
    modes: ["Physical", "Hybrid", "Online"],
    durationWeeks: 9,
    hoursPerWeek: 6,
    fee: null,
    currency: "NGN",
    heroImage: "/images/prog-data-analytics.jpg",
    tagline: "Turn spreadsheets into decisions.",
    summary:
      "SQL, Python and visual storytelling for people who need to answer business questions with evidence. Ends with a dashboard someone could genuinely act on.",
    audience: [
      "Administrators and analysts",
      "Business owners who want to read their own numbers",
      "Graduates entering a data role",
    ],
    outcomes: [
      "Write SQL to answer business questions",
      "Clean and reshape data with pandas",
      "Choose honest visualisations",
      "Build an interactive dashboard",
      "Communicate findings to non-technical readers",
    ],
    prerequisites: ["Comfort with spreadsheets"],
    tools: ["PostgreSQL", "Python", "pandas", "Metabase", "Jupyter"],
    modules: [
      {
        title: "Questions First",
        summary: "Analytics is a questioning discipline.",
        lessons: [
          { title: "Framing a measurable question", minutes: 45, type: "Reading" },
          { title: "Lab: from question to query", minutes: 90, type: "Lab" },
        ],
      },
      {
        title: "SQL",
        summary: "The language of stored truth.",
        lessons: [
          { title: "Select, join, aggregate", minutes: 80, type: "Video" },
          { title: "Lab: twelve business questions", minutes: 150, type: "Lab" },
          { title: "Checkpoint quiz", minutes: 30, type: "Assessment" },
        ],
      },
      {
        title: "Python for Analysis",
        summary: "When SQL isn't enough.",
        lessons: [
          { title: "pandas fundamentals", minutes: 70, type: "Reading" },
          { title: "Lab: cleaning a messy dataset", minutes: 130, type: "Lab" },
        ],
      },
      {
        title: "Dashboards & Narrative",
        summary: "Make the finding impossible to misread.",
        lessons: [
          { title: "Visual honesty", minutes: 50, type: "Video" },
          { title: "Capstone: dashboard + memo", minutes: 220, type: "Project" },
        ],
      },
    ],
    projects: [
      {
        title: "Decision dashboard",
        brief: "Build a dashboard for a supplied dataset and write the one-page memo that goes with it.",
        deliverable: "Live dashboard + decision memo",
      },
    ],
    assessment: genericAssessment,
    certificate: genericCertificate,
    instructor: null,
    cohort: "Next cohort: dates confirmed by admissions",
  },
  {
    slug: "cloud-foundations",
    title: "Cloud Foundations & DevOps",
    department: "cloud-network",
    level: "Intermediate",
    modes: ["Hybrid", "Online"],
    durationWeeks: 10,
    hoursPerWeek: 7,
    fee: null,
    currency: "NGN",
    heroImage: "/images/prog-cloud.jpg",
    tagline: "Operate systems that stay up.",
    summary:
      "Linux, containers, CI/CD and cloud fundamentals — taught by deploying something real, breaking it, and bringing it back with observability in place.",
    audience: [
      "Developers who deploy their own code",
      "Sysadmins modernising their practice",
      "Engineers preparing for cloud certification",
    ],
    outcomes: [
      "Operate confidently on the Linux command line",
      "Containerise and orchestrate an application",
      "Build a CI/CD pipeline with automated tests",
      "Apply least-privilege cloud identity",
      "Instrument logs, metrics and alerts",
      "Respond to a production incident",
    ],
    prerequisites: ["Command-line comfort", "Basic networking"],
    tools: ["Linux", "Docker", "GitHub Actions", "Terraform (guided)", "Grafana"],
    modules: [
      {
        title: "Linux Operations",
        summary: "The substrate of everything.",
        lessons: [
          { title: "Processes, permissions, services", minutes: 70, type: "Reading" },
          { title: "Lab: hardening a server", minutes: 110, type: "Lab" },
        ],
      },
      {
        title: "Containers",
        summary: "Reproducible environments, finally.",
        lessons: [
          { title: "Images, layers and runtime", minutes: 60, type: "Video" },
          { title: "Lab: containerise an app", minutes: 130, type: "Lab" },
        ],
      },
      {
        title: "Pipelines & Infrastructure as Code",
        summary: "Deploy the same way every time.",
        lessons: [
          { title: "CI/CD principles", minutes: 55, type: "Reading" },
          { title: "Lab: build the pipeline", minutes: 140, type: "Lab" },
          { title: "Checkpoint quiz", minutes: 30, type: "Assessment" },
        ],
      },
      {
        title: "Observability & Incidents",
        summary: "You can't fix what you can't see.",
        lessons: [
          { title: "Logs, metrics and traces", minutes: 60, type: "Video" },
          { title: "Capstone: deploy, break, recover", minutes: 240, type: "Project" },
        ],
      },
    ],
    projects: [
      {
        title: "Production-grade deployment",
        brief: "Deploy an application with CI/CD, monitoring and a documented rollback plan.",
        deliverable: "Live service, pipeline config, runbook",
      },
    ],
    assessment: genericAssessment,
    certificate: genericCertificate,
    instructor: null,
    cohort: "Next cohort: dates confirmed by admissions",
  },
  {
    slug: "networking-essentials",
    title: "Networking Essentials",
    department: "cloud-network",
    level: "Beginner",
    modes: ["Physical", "Hybrid", "Online"],
    durationWeeks: 8,
    hoursPerWeek: 5,
    fee: null,
    currency: "NGN",
    heroImage: "/images/prog-networking.jpg",
    tagline: "Know why the internet actually works.",
    summary:
      "A calm, practical introduction to networking: addressing, routing, DNS, wireless and the troubleshooting method that solves problems instead of escalating them.",
    audience: [
      "IT support beginners",
      "Small business technicians",
      "Anyone preparing for a networking certification",
    ],
    outcomes: [
      "Subnet and address a small network",
      "Explain routing, DNS and DHCP behaviour",
      "Diagnose connectivity faults methodically",
      "Configure a small office network",
      "Document a network clearly",
    ],
    prerequisites: ["Basic computer literacy"],
    tools: ["Packet Tracer", "Wireshark", "pfSense"],
    modules: [
      {
        title: "Addressing",
        summary: "The maths that makes everything else possible.",
        lessons: [
          { title: "IP addressing and subnets", minutes: 75, type: "Video" },
          { title: "Lab: plan a subnet scheme", minutes: 100, type: "Lab" },
        ],
      },
      {
        title: "Name & Route",
        summary: "DNS and routing in the real world.",
        lessons: [
          { title: "How DNS resolves", minutes: 55, type: "Reading" },
          { title: "Lab: simulate a network", minutes: 120, type: "Lab" },
          { title: "Checkpoint quiz", minutes: 25, type: "Assessment" },
        ],
      },
      {
        title: "Wireless & Physical",
        summary: "Where most Nigerian offices actually struggle.",
        lessons: [
          { title: "Wireless design realities", minutes: 50, type: "Video" },
          { title: "Lab: small office build", minutes: 150, type: "Lab" },
        ],
      },
      {
        title: "Troubleshooting Discipline",
        summary: "Method beats guessing.",
        lessons: [
          { title: "Layered diagnosis", minutes: 45, type: "Reading" },
          { title: "Capstone: documented build", minutes: 180, type: "Project" },
        ],
      },
    ],
    projects: [
      {
        title: "Office network design",
        brief: "Design and simulate a small office network with documentation a technician could follow.",
        deliverable: "Diagram, config, test plan",
      },
    ],
    assessment: genericAssessment,
    certificate: genericCertificate,
    instructor: null,
    cohort: "Next cohort: dates confirmed by admissions",
  },
  {
    slug: "ui-ux-product-design",
    title: "UI/UX Product Design",
    department: "design",
    level: "Beginner",
    modes: ["Physical", "Hybrid", "Online"],
    durationWeeks: 10,
    hoursPerWeek: 6,
    fee: null,
    currency: "NGN",
    heroImage: "/images/prog-uiux.jpg",
    tagline: "Design decisions you can defend.",
    summary:
      "Research, structure, and interface craft in one studio-style programme. You will design for real constraints — low bandwidth, small screens, first-time users — and present your reasoning.",
    audience: [
      "Aspiring product designers",
      "Graphic designers moving into digital product work",
      "Developers who want design literacy",
    ],
    outcomes: [
      "Run lightweight user research",
      "Structure an information architecture",
      "Build a coherent design system",
      "Prototype and test an interface",
      "Present design rationale to stakeholders",
    ],
    prerequisites: ["Basic computer literacy", "Curiosity about people"],
    tools: ["Figma", "FigJam", "Maze (guided)"],
    modules: [
      {
        title: "Research & Problem Framing",
        summary: "Start with people, not pixels.",
        lessons: [
          { title: "Interviews that reveal behaviour", minutes: 60, type: "Video" },
          { title: "Lab: research synthesis", minutes: 110, type: "Lab" },
        ],
      },
      {
        title: "Structure & Flow",
        summary: "Architecture before aesthetics.",
        lessons: [
          { title: "Information architecture", minutes: 55, type: "Reading" },
          { title: "Lab: user flows and wireframes", minutes: 130, type: "Lab" },
          { title: "Checkpoint quiz", minutes: 25, type: "Assessment" },
        ],
      },
      {
        title: "Interface Craft",
        summary: "Type, colour, space, motion.",
        lessons: [
          { title: "Visual hierarchy that works", minutes: 65, type: "Video" },
          { title: "Lab: design system build", minutes: 150, type: "Lab" },
        ],
      },
      {
        title: "Validate & Present",
        summary: "Test it, then defend it.",
        lessons: [
          { title: "Usability testing on a budget", minutes: 50, type: "Reading" },
          { title: "Capstone: end-to-end product design", minutes: 240, type: "Project" },
        ],
      },
    ],
    projects: [
      {
        title: "Case study product",
        brief: "Take a real local service problem through research, prototype, test and final design.",
        deliverable: "Case study deck + interactive prototype",
      },
    ],
    assessment: genericAssessment,
    certificate: genericCertificate,
    instructor: null,
    featured: true,
    cohort: "Next cohort: dates confirmed by admissions",
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    department: "design",
    level: "Beginner",
    modes: ["Physical", "Hybrid", "Online"],
    durationWeeks: 8,
    hoursPerWeek: 6,
    fee: null,
    currency: "NGN",
    heroImage: "/images/prog-graphic-design.jpg",
    tagline: "Visual work that earns money.",
    summary:
      "Typography, layout, colour and brand systems, taught through commercial briefs with real constraints: print specifications, client revisions and deadlines.",
    audience: [
      "Beginners entering creative work",
      "Small business owners producing their own materials",
      "Those building a freelance practice",
    ],
    outcomes: [
      "Apply typographic and layout principles",
      "Build an identity system, not just a logo",
      "Prepare files correctly for print and screen",
      "Take a client brief and present revisions",
      "Produce a focused portfolio",
    ],
    prerequisites: ["Basic computer literacy"],
    tools: ["Adobe Illustrator", "Photoshop", "Canva Pro"],
    modules: [
      {
        title: "Foundations",
        summary: "The rules before the style.",
        lessons: [
          { title: "Typography and hierarchy", minutes: 65, type: "Reading" },
          { title: "Lab: type studies", minutes: 100, type: "Lab" },
        ],
      },
      {
        title: "Identity Systems",
        summary: "Consistency is the craft.",
        lessons: [
          { title: "Logo to system", minutes: 60, type: "Video" },
          { title: "Lab: brand identity build", minutes: 140, type: "Lab" },
          { title: "Checkpoint quiz", minutes: 20, type: "Assessment" },
        ],
      },
      {
        title: "Production",
        summary: "Getting it printed properly.",
        lessons: [
          { title: "Print specs and prepress", minutes: 50, type: "Reading" },
          { title: "Lab: print-ready artwork", minutes: 110, type: "Lab" },
        ],
      },
      {
        title: "Studio Brief",
        summary: "A real brief, a real deadline.",
        lessons: [
          { title: "Capstone: full campaign", minutes: 220, type: "Project" },
        ],
      },
    ],
    projects: [
      {
        title: "Brand & campaign",
        brief: "Deliver identity, collateral and presentation for a supplied local business brief.",
        deliverable: "Brand guide, collateral, presentation",
      },
    ],
    assessment: genericAssessment,
    certificate: genericCertificate,
    instructor: null,
    cohort: "Next cohort: dates confirmed by admissions",
  },
  {
    slug: "computer-fundamentals",
    title: "Computer Fundamentals & Office Skills",
    department: "productivity",
    level: "Beginner",
    modes: ["Physical", "Online"],
    durationWeeks: 6,
    hoursPerWeek: 5,
    fee: null,
    currency: "NGN",
    heroImage: "/images/prog-office.jpg",
    tagline: "The skills every job assumes you have.",
    summary:
      "Confident, employable computer literacy: operating systems, file discipline, Word, Excel, PowerPoint, email etiquette, safe browsing and basic troubleshooting.",
    audience: [
      "Absolute beginners",
      "Job seekers needing an employment baseline",
      "Students preparing for university or work",
      "Business owners formalising their own skills",
    ],
    outcomes: [
      "Navigate a computer and manage files safely",
      "Produce professional documents and spreadsheets",
      "Use formulas and data tools in Excel",
      "Build a clear presentation",
      "Communicate professionally by email",
      "Recognise common scams and protect accounts",
    ],
    prerequisites: [],
    tools: ["Windows", "Microsoft Office", "Google Workspace"],
    modules: [
      {
        title: "Digital Confidence",
        summary: "Files, folders and not losing your work.",
        lessons: [
          { title: "Operating system basics", minutes: 55, type: "Video" },
          { title: "Lab: file management drill", minutes: 80, type: "Lab" },
        ],
      },
      {
        title: "Documents & Spreadsheets",
        summary: "The everyday tools.",
        lessons: [
          { title: "Word formatting essentials", minutes: 60, type: "Reading" },
          { title: "Lab: professional CV build", minutes: 110, type: "Lab" },
          { title: "Lab: Excel formulas and charts", minutes: 120, type: "Lab" },
        ],
      },
      {
        title: "Presenting & Communicating",
        summary: "Being understood.",
        lessons: [
          { title: "Slide structure", minutes: 45, type: "Video" },
          { title: "Lab: build a deck", minutes: 90, type: "Lab" },
          { title: "Checkpoint quiz", minutes: 20, type: "Assessment" },
        ],
      },
      {
        title: "Staying Safe Online",
        summary: "Practical digital hygiene.",
        lessons: [
          { title: "Accounts, passwords and scams", minutes: 50, type: "Reading" },
          { title: "Capstone: workplace task simulation", minutes: 150, type: "Project" },
        ],
      },
    ],
    projects: [
      {
        title: "Employment toolkit",
        brief: "Produce a CV, cover letter, budget spreadsheet and presentation to a professional standard.",
        deliverable: "Four-document portfolio",
      },
    ],
    assessment: genericAssessment,
    certificate: genericCertificate,
    instructor: null,
    featured: true,
    cohort: "Next cohort: dates confirmed by admissions",
  },
  {
    slug: "computer-repairs-and-it-support",
    title: "Computer Repairs & IT Support",
    department: "productivity",
    level: "Beginner",
    modes: ["Physical"],
    durationWeeks: 8,
    hoursPerWeek: 6,
    fee: null,
    currency: "NGN",
    heroImage: "/images/prog-repairs.jpg",
    tagline: "Fix hardware with a diagnosis, not a guess.",
    summary:
      "Hands-on bench training: hardware assembly, fault diagnosis, operating system installation, data recovery basics and the professionalism of running a support practice.",
    audience: [
      "Aspiring technicians",
      "Existing repairers formalising their knowledge",
      "IT assistants in schools and offices",
    ],
    outcomes: [
      "Assemble and service a desktop system safely",
      "Diagnose hardware faults systematically",
      "Install and configure operating systems",
      "Recover data safely from failing media",
      "Advise customers honestly on repair options",
    ],
    prerequisites: [],
    tools: ["Workbench tools", "Multimeter", "Windows/Linux installers", "Diagnostic utilities"],
    modules: [
      {
        title: "Hardware Literacy",
        summary: "Components, compatibility and safety.",
        lessons: [
          { title: "Inside the machine", minutes: 60, type: "Video" },
          { title: "Lab: full strip and rebuild", minutes: 150, type: "Lab" },
        ],
      },
      {
        title: "Diagnosis",
        summary: "Symptom to cause, in order.",
        lessons: [
          { title: "Fault-tree thinking", minutes: 55, type: "Reading" },
          { title: "Lab: five fault scenarios", minutes: 160, type: "Lab" },
          { title: "Checkpoint quiz", minutes: 25, type: "Assessment" },
        ],
      },
      {
        title: "Software & Data",
        summary: "The invisible half of the job.",
        lessons: [
          { title: "OS install and drivers", minutes: 65, type: "Video" },
          { title: "Lab: recovery and imaging", minutes: 130, type: "Lab" },
        ],
      },
      {
        title: "The Support Practice",
        summary: "Turning skill into a business.",
        lessons: [
          { title: "Customer communication and pricing", minutes: 45, type: "Reading" },
          { title: "Capstone: service case file", minutes: 180, type: "Project" },
        ],
      },
    ],
    projects: [
      {
        title: "Bench case file",
        brief: "Diagnose, repair and document three faulty machines from intake to handover.",
        deliverable: "Three case files + invoice template",
      },
    ],
    assessment: genericAssessment,
    certificate: genericCertificate,
    instructor: null,
    cohort: "Next cohort: dates confirmed by admissions",
  },
];

export const programmeBySlug = (slug: string): Programme | undefined =>
  programmes.find((p) => p.slug === slug);

export const featuredProgrammes = programmes.filter((p) => p.featured);

export const programmesByDepartment = (dept: DepartmentId) =>
  programmes.filter((p) => p.department === dept);

export const totalLessons = (p: Programme) =>
  p.modules.reduce((sum, m) => sum + m.lessons.length, 0);

export const totalMinutes = (p: Programme) =>
  p.modules.reduce(
    (sum, m) => sum + m.lessons.reduce((s, l) => s + l.minutes, 0),
    0,
  );

export const totalLabs = (p: Programme) =>
  p.modules.reduce(
    (sum, m) => sum + m.lessons.filter((l) => l.type === "Lab" || l.type === "Project").length,
    0,
  );
