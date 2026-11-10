import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, SectionHeading, Btn, useToast } from './ui';
import { SPRING } from '../lib/motion';

const EVENTS = [
  { src: 'auth-gateway', msg: 'Login attempt from new device', level: 'SUSPICIOUS' },
  { src: 'firewall', msg: 'Blocked outbound scan · 185.220.x.x', level: 'MALICIOUS' },
  { src: 'mail-relay', msg: 'Newsletter delivered to 1,204 inboxes', level: 'BENIGN' },
  { src: 'ids', msg: 'Repeated failed SSH logins (12×)', level: 'SUSPICIOUS' },
  { src: 'cdn', msg: 'Static assets served · 0 anomalies', level: 'BENIGN' },
  { src: 'endpoint', msg: 'Ransomware signature detected', level: 'MALICIOUS' },
  { src: 'dns', msg: 'DNS query spike to newly-registered domain', level: 'SUSPICIOUS' },
  { src: 'backup', msg: 'Nightly backup verified · checksum OK', level: 'BENIGN' },
];
const LEVEL_STYLE = { BENIGN: 'text-[#39FF88] border-[#39FF88]/40', SUSPICIOUS: 'text-[#febc2e] border-[#febc2e]/40', MALICIOUS: 'text-[#ff5f57] border-[#ff5f57]/40' };

const INVESTIGATION = [
  { t: 'Detect', d: 'Alert fires: 5 failed logins for admin@cea.ng in 90 seconds.' },
  { t: 'Triage', d: 'Analyst checks source IP reputation — flagged in threat intel.' },
  { t: 'Contain', d: 'Account locked, sessions revoked, MFA re-enforced.' },
  { t: 'Eradicate', d: 'Attacker IP blocked at edge; no lateral movement found.' },
  { t: 'Recover', d: 'Legitimate user re-verified; monitoring tightened for 7 days.' },
];

export default function CyberLab() {
  const [feed, setFeed] = useState([]);
  const [running, setRunning] = useState(true);
  const [gameIdx, setGameIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [step, setStep] = useState(0);
  const toast = useToast();
  const idxRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const iv = setInterval(() => {
      const ev = EVENTS[idxRef.current % EVENTS.length]; idxRef.current++;
      setFeed(f => [{ ...ev, id: Date.now() + Math.random(), time: new Date().toLocaleTimeString() }, ...f].slice(0, 6));
    }, 1600);
    return () => clearInterval(iv);
  }, [running]);

  const current = EVENTS[gameIdx % EVENTS.length];
  const answer = (guess) => {
    const ok = guess === current.level;
    setFeedback({ ok, guess });
    if (ok) setScore(s => s + 1);
    setTimeout(() => { setFeedback(null); setGameIdx(g => g + 1); }, 900);
  };

  return (
    <section id="cyber-lab" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-[#00D9FF]/8 blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <Reveal><SectionHeading kicker="Interactive simulation" title="Enter the Cyber Lab" sub="A safe, fictional security operations dashboard. Classify threats, investigate an incident — no real systems are touched." /></Reveal>

        <div className="mt-14 grid lg:grid-cols-3 gap-5">
          {/* Live feed */}
          <Reveal className="lg:col-span-1">
            <div className="glass rounded-3xl p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold flex items-center gap-2"><span className={`w-2.5 h-2.5 rounded-full ${running ? 'bg-[#39FF88] animate-blink' : 'bg-[#929EAE]'}`} /> LIVE FEED</h3>
                <button onClick={() => setRunning(!running)} className="btn-press text-xs font-mono px-3 py-1.5 rounded-full glass cursor-pointer">{running ? '⏸ PAUSE' : '▶ RESUME'}</button>
              </div>
              <div className="space-y-2.5 flex-1 min-h-[280px]">
                <AnimatePresence initial={false}>
                  {feed.map(e => (
                    <motion.div key={e.id} layout initial={{ opacity: 0, x: -30, scale: .95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0 }} transition={SPRING.soft}
                      className="rounded-xl bg-white/4 border border-white/8 p-3 flex items-center justify-between gap-3">
                      <div className="min-w-0"><p className="text-sm truncate">{e.msg}</p><p className="font-mono text-[10px] text-[#929EAE]">{e.src} · {e.time}</p></div>
                      <span className={`font-mono text-[10px] px-2 py-1 rounded-full border shrink-0 ${LEVEL_STYLE[e.level]}`}>{e.level}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {feed.length === 0 && <p className="text-sm text-[#929EAE] font-mono">awaiting events…</p>}
              </div>
              <p className="font-mono text-[10px] text-[#929EAE] mt-4">SIMULATED DATA · EDUCATIONAL ONLY</p>
            </div>
          </Reveal>

          {/* Threat classifier game */}
          <Reveal delay={.1} className="lg:col-span-1">
            <div className="glass rounded-3xl p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold">🎮 Threat Classifier</h3>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#00D9FF]/15 text-[#00D9FF]">SCORE {score}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={gameIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={SPRING.soft} className="flex-1">
                  <p className="font-mono text-xs text-[#929EAE]">{current.src.toUpperCase()}</p>
                  <p className="text-lg font-medium mt-2 leading-snug min-h-[56px]">{current.msg}</p>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {['BENIGN', 'SUSPICIOUS', 'MALICIOUS'].map(l => (
                      <motion.button key={l} whileHover={{ y: -3 }} whileTap={{ scale: .93 }} onClick={() => answer(l)}
                        className={`btn-press rounded-xl py-3 text-xs font-bold border cursor-pointer ${LEVEL_STYLE[l]} ${feedback?.guess === l ? (feedback.ok ? 'bg-[#39FF88]/20' : 'bg-[#ff5f57]/20') : 'bg-white/4'}`}>{l}</motion.button>
                    ))}
                  </div>
                  <AnimatePresence>{feedback && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`mt-3 text-sm font-semibold ${feedback.ok ? 'text-[#39FF88]' : 'text-[#ff5f57]'}`}>{feedback.ok ? '✓ Correct — sharp eye, analyst!' : `✗ It was ${current.level}. Study the signals.`}</motion.p>}</AnimatePresence>
                </motion.div>
              </AnimatePresence>
              <p className="font-mono text-[10px] text-[#929EAE] mt-4">TAP A VERDICT — INSTANT FEEDBACK</p>
            </div>
          </Reveal>

          {/* Incident investigation */}
          <Reveal delay={.2} className="lg:col-span-1">
            <div className="glass rounded-3xl p-6 h-full flex flex-col">
              <h3 className="font-display font-bold mb-1">🔎 Incident: Suspicious Login</h3>
              <p className="text-xs text-[#929EAE] mb-5">Walk the analyst workflow.</p>
              <div className="relative flex-1">
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10" />
                {INVESTIGATION.map((s, i) => {
                  const active = i <= step;
                  return (
                    <motion.button key={s.t} onClick={() => setStep(i)} whileTap={{ scale: .97 }}
                      className="btn-press relative flex gap-4 text-left w-full py-2.5 cursor-pointer group">
                      <motion.span animate={active ? { scale: 1, backgroundColor: '#00D9FF' } : { scale: .8, backgroundColor: '#1c2a3a' }}
                        transition={SPRING.bouncy} className="relative z-10 w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-[#070B12]">{active ? '✓' : i + 1}</motion.span>
                      <span className={active ? 'text-white' : 'text-[#929EAE] group-hover:text-white'}>
                        <span className="block font-semibold text-sm">{s.t}</span>
                        {active && <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="block text-xs mt-1 leading-relaxed">{s.d}</motion.span>}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
              <Btn variant="ghost" className="mt-4 w-full" onClick={() => { setStep(0); toast('Investigation reset — walk it again, analyst'); }}>↺ Restart investigation</Btn>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
