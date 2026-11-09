/**
 * CYBER LAB — INVESTIGATION SCENARIO
 * ---------------------------------------------------------------------------
 * A deliberately fictional, self-contained training scenario. No live systems
 * are scanned, attacked or contacted at any point; every value below is
 * generated for teaching purposes only.
 */

export type LabOption = {
  id: string;
  label: string;
  detail: string;
  correct: boolean;
  verdict: string;
  points: number;
};

export type LabStage = {
  id: string;
  code: string;
  phase: string;
  title: string;
  brief: string;
  artefact: { label: string; lines: string[] };
  question: string;
  options: LabOption[];
  teachBack: string;
};

export const labScenario = {
  id: "cea-lab-0042",
  name: "Operation Quiet Ledger",
  subtitle: "A suspicious login, three continents, and a spreadsheet that shouldn't exist.",
  classification: "TRAINING — FICTIONAL DATA",
  difficulty: "Foundational · SOC Tier 1",
  duration: "12–18 minutes",
  objective:
    "Work the alert queue exactly as a first-line analyst would: triage, gather evidence, decide, contain, and write the note that the next analyst will depend on.",
  stages: [
    {
      id: "triage",
      code: "ALR-8841",
      phase: "01 · Triage",
      title: "The alert that woke the queue",
      brief:
        "At 02:47 WAT the identity provider raises a severity-high alert: successful authentication to a finance account from an unrecognised location, 40 minutes after the same account authenticated from Port Harcourt.",
      artefact: {
        label: "alert_payload.json",
        lines: [
          '{ "rule": "impossible_travel",',
          '  "severity": "high",',
          '  "user": "a.okoro@northbridge.example",',
          '  "geo_a": "Port Harcourt, NG",',
          '  "geo_b": "Frankfurt, DE",',
          '  "delta_minutes": 41,',
          '  "mfa": "satisfied",',
          '  "result": "success" }',
        ],
      },
      question: "What is your first action as the analyst on duty?",
      options: [
        {
          id: "triage-a",
          label: "Confirm the session is real and still active",
          detail:
            "Query the identity logs and session store to establish whether the Frankfurt session is live and what it has accessed.",
          correct: true,
          verdict:
            "Correct. An alert is a hypothesis. Before acting you confirm the session exists, what it touched, and whether it is still open — that determines urgency.",
          points: 25,
        },
        {
          id: "triage-b",
          label: "Disable the account immediately",
          detail: "Lock the user out first, investigate afterwards.",
          correct: false,
          verdict:
            "Too blunt, too early. Locking a finance account at 02:47 can halt overnight settlement processes, and you have not yet confirmed the session is live. Contain with precision once you have scope.",
          points: 5,
        },
        {
          id: "triage-c",
          label: "Email the user asking if they logged in",
          detail: "Open a line of communication with the account owner.",
          correct: false,
          verdict:
            "Not yet. It is the middle of the night, and if the account is compromised the attacker may read that email. Verify through logs and the manager channel, not the account under suspicion.",
          points: 5,
        },
        {
          id: "triage-d",
          label: "Close the alert as a false positive",
          detail: "Impossible travel is often VPN or mobile carrier noise.",
          correct: false,
          verdict:
            "This alert has a satisfied MFA challenge, which is exactly what the noise source would not produce. Closing it is how a compromise becomes an incident report 72 hours later.",
          points: 0,
        },
      ],
      teachBack:
        "Real SOC work starts with scoping, not reacting. Confirming liveness and reach is what turns an alert into a decision you can defend.",
    },
    {
      id: "evidence",
      code: "LOG-2291",
      phase: "02 · Evidence",
      title: "Three records, one story",
      brief:
        "You confirm the Frankfurt session is active. Pulling identity and mail logs, three records line up that should never appear together.",
      artefact: {
        label: "correlated_events.log",
        lines: [
          "02:41Z  auth.ok      user=a.okoro  src=41.58.x.x   NG  mfa=ok",
          "02:47Z  auth.ok      user=a.okoro  src=185.22.x.x  DE  mfa=ok",
          "02:49Z  mailbox.rule  created by user=a.okoro  fwd→ external",
          "02:52Z  file.access   ledger_q3.xlsx  by a.okoro  (DE session)",
          "02:58Z  auth.fail     user=a.okoro  src=185.22.x.x  DE  (x4)",
        ],
      },
      question: "Which detail most changes the severity of this incident?",
      options: [
        {
          id: "ev-a",
          label: "An external mail-forwarding rule was created",
          detail:
            "A persistent, attacker-controlled channel now exists inside the mailbox and will keep working even after the session ends.",
          correct: true,
          verdict:
            "Correct. The forwarding rule is the real damage: it survives session termination and quietly exports future mail. Persistence is what makes this a high-severity incident, not a single bad login.",
          points: 25,
        },
        {
          id: "ev-b",
          label: "There were four failed logins",
          detail: "Repeated failures suggest brute force.",
          correct: false,
          verdict:
            "Worth noting, but likely noise — the attacker already held a valid session and may have mistyped. Fails after success are noise; persistence is damage.",
          points: 10,
        },
        {
          id: "ev-c",
          label: "The source IP is in Germany",
          detail: "Geolocation proves foreign access.",
          correct: false,
          verdict:
            "You already knew that from the alert. Geolocation is context, not impact. Ask what the session touched, not where it came from.",
          points: 5,
        },
        {
          id: "ev-d",
          label: "The user has MFA enabled",
          detail: "Which means the attacker must have bypassed it.",
          correct: false,
          verdict:
            "Useful reasoning, but not the highest-impact fact. MFA being satisfied tells you how they got in — the forwarding rule tells you what they intend to keep doing.",
          points: 10,
        },
      ],
      teachBack:
        "Ask 'what persists?' before 'how did they get in?'. Persistence converts an event into an incident.",
    },
    {
      id: "decision",
      code: "ACT-7715",
      phase: "03 · Decision",
      title: "Contain without collateral damage",
      brief:
        "It is 03:04. The session is live, the forwarding rule exists, and a finance ledger has been opened. The on-call finance lead is unreachable. What do you do now?",
      artefact: {
        label: "containment_options.txt",
        lines: [
          "A) Revoke all sessions + disable account",
          "B) Revoke sessions, keep account, block the DE range",
          "C) Remove forwarding rule, revoke sessions, notify on-call",
          "D) Wait for business hours to avoid disruption",
        ],
      },
      question: "Choose your containment action.",
      options: [
        {
          id: "dec-a",
          label: "Remove the rule, revoke sessions, then notify on-call",
          detail:
            "Neutralise persistence first, kill the live session, then escalate through the out-of-hours channel with your evidence.",
          correct: true,
          verdict:
            "Correct. Sequence matters: kill persistence, kill the session, then escalate. You have contained the activity and preserved the account for the business, with a documented handover.",
          points: 25,
        },
        {
          id: "dec-b",
          label: "Revoke sessions and keep the account enabled",
          detail: "Minimise disruption to overnight settlement.",
          correct: false,
          verdict:
            "Half a containment. You end the live session, but the forwarding rule keeps exfiltrating mail. Persistence first, always.",
          points: 10,
        },
        {
          id: "dec-c",
          label: "Disable the account entirely",
          detail: "Stop everything and sort it out in the morning.",
          correct: false,
          verdict:
            "Safe but disproportionate at this stage: you halt legitimate settlement work and still leave the forwarding rule in place unless you remove it. Contain what is malicious, not what is merely convenient.",
          points: 10,
        },
        {
          id: "dec-d",
          label: "Wait for business hours",
          detail: "Avoid disrupting critical overnight finance operations.",
          correct: false,
          verdict:
            "Not acceptable for an active, confirmed compromise with persistence in place. Escalation exists precisely for this hour.",
          points: 0,
        },
      ],
      teachBack:
        "Containment is a sequence: remove persistence, end the session, escalate with evidence. Doing it out of order leaves a channel open.",
    },
    {
      id: "writeup",
      code: "RPT-0033",
      phase: "04 · Handover",
      title: "Write the note that matters",
      brief:
        "The incident is contained. Your handover note is the only thing the morning team will read. Which version serves them best?",
      artefact: {
        label: "handover_notes.md",
        lines: [
          "## Draft A",
          "\"Suspicious login, handled. User contacted.\"",
          "",
          "## Draft B",
          "\"Impossible travel alert → confirmed live session DE,",
          "  external mail rule created 02:49Z, rule removed 03:05Z,",
          "  sessions revoked, ledger access confirmed. Owner notified",
          "  via manager. Needs: password reset, mailbox audit 72h.\"",
        ],
      },
      question: "Which handover note do you submit?",
      options: [
        {
          id: "rep-a",
          label: "Draft B",
          detail:
            "Timeline, evidence, actions taken with timestamps, and explicit next steps for the oncoming analyst.",
          correct: true,
          verdict:
            "Correct. A handover is a transfer of responsibility. Draft B states what happened, what you did, when, and what still needs doing — that is the whole job.",
          points: 25,
        },
        {
          id: "rep-b",
          label: "Draft A",
          detail: "Short, calm, resolved.",
          correct: false,
          verdict:
            "Concise but useless. 'Handled' tells the next analyst nothing about scope, evidence or outstanding risk — and the attacker's credentials are still valid.",
          points: 0,
        },
        {
          id: "rep-c",
          label: "Neither — escalate without a note",
          detail: "Let the morning team investigate from scratch.",
          correct: false,
          verdict:
            "You would be discarding the most valuable output of the shift. Evidence gathered at 03:00 is rarely reproducible at 09:00.",
          points: 5,
        },
        {
          id: "rep-d",
          label: "Draft A, with an attached log file",
          detail: "Keep the note brief and let the logs speak.",
          correct: false,
          verdict:
            "Better, but still incomplete: raw logs without interpretation push the analysis back onto someone else. Write the finding.",
          points: 15,
        },
      ],
      teachBack:
        "Documentation is not admin. The quality of your handover is the measure of your professionalism.",
    },
  ],
} satisfies {
  id: string;
  name: string;
  subtitle: string;
  classification: string;
  difficulty: string;
  duration: string;
  objective: string;
  stages: LabStage[];
};

export const labModules = [
  {
    title: "Guided investigations",
    body: "Short, fictional incidents worked stage by stage with full explanations — the same loop as the homepage simulation, in depth.",
    stat: "Scenario-driven",
    icon: "search",
  },
  {
    title: "Linux fundamentals",
    body: "A real terminal in a disposable, isolated container. Permissions, processes, logs and package hygiene you can practise without fear.",
    stat: "Sandboxed",
    icon: "terminal",
  },
  {
    title: "Log analysis drills",
    body: "Authentication, web and endpoint logs with planted anomalies. You learn to read noise until the signal is obvious.",
    stat: "Timed drills",
    icon: "file",
  },
  {
    title: "Network demonstrations",
    body: "Packet capture exercises in an isolated virtual network, with defensive interpretation of every frame you inspect.",
    stat: "Isolated network",
    icon: "network",
  },
  {
    title: "Forensic activities",
    body: "Disk and memory artefacts, hashing and chain-of-custody practice on training images that never touch a live system.",
    stat: "Evidence-first",
    icon: "fingerprint",
  },
  {
    title: "Knowledge challenges",
    body: "Bite-sized security quizzes scored against the CEA curriculum, with explanations rather than just answers.",
    stat: "Self-paced",
    icon: "award",
  },
] as const;

export const labRules = [
  "Every exercise runs against fictional or deliberately vulnerable training systems.",
  "No activity targets real infrastructure, real people, or third-party services.",
  "Lab environments are disposable; state is destroyed when a session ends.",
  "Learners sign an acceptable-use agreement before any advanced exercise.",
  "Findings are documented defensively — the report is the deliverable, not the exploit.",
];
