import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSES } from '../data/content';
import { SPRING } from '../lib/motion';

const REPLIES = [
  { k: ['fee', 'price', 'cost', 'pay'], a: 'Tuition varies by programme — e.g. Digital Productivity ₦45,000, Web Development ₦120,000, SOC ₦220,000. Instalments are available after acceptance. See the Programmes section for exact fees.' },
  { k: ['where', 'location', 'address', 'port harcourt'], a: 'Our ICT Hub is at 24 Ebony Road, off Rumuola Road, Port Harcourt, Rivers State. Many programmes are also online or hybrid.' },
  { k: ['cyber', 'hack', 'security'], a: 'Cybersecurity pathways: Fundamentals (8 wks), Ethical Hacking (12 wks), and Security Operations (16 wks) — all with isolated Cyber Lab practice. Scroll to the Cyber Lab to try a live simulation!' },
  { k: ['apply', 'enrol', 'admission', 'register'], a: 'Applying takes 2 minutes: pick a course, share your details, choose Online / Physical / Hybrid, and submit. You will get a reference like CEA-2026-XXXXX instantly.' },
  { k: ['certificate', 'verify'], a: 'Use the Certificate Verifier on this page with the unique certificate number (try CEA-2026-DEMO1) — employers can confirm authenticity instantly.' },
  { k: ['laptop', 'need', 'requirement'], a: 'No laptop needed to start — our ICT Hub provides workstations. For online learning, any laptop with stable internet works.' },
  { k: ['hello', 'hi', 'hey'], a: 'Hello! I can answer questions about courses, fees, location, admissions, and certificates. What would you like to know?' },
];

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ from: 'bot', text: 'Hi, I am the CEA assistant. Ask me about courses, fees, admissions, or certificates.' }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const send = (text) => {
    const t = (text ?? input).trim();
    if (!t) return;
    setMsgs(m => [...m, { from: 'user', text: t }]); setInput(''); setTyping(true);
    const hit = REPLIES.find(r => r.k.some(k => t.toLowerCase().includes(k)));
    const courseHit = COURSES.find(c => t.toLowerCase().includes(c.title.toLowerCase().split(' ')[0]));
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { from: 'bot', text: hit ? hit.a : courseHit ? `${courseHit.title}: ${courseHit.duration}, ${courseHit.mode}, ${courseHit.price}. Skills: ${courseHit.skills.join(', ')}.` : 'Great question! For details, explore Programmes or apply — admissions replies fast. I can also help with fees, location, and certificates.' }]);
    }, 700);
  };

  return (
    <>
      <motion.button aria-label="Open CEA assistant" onClick={() => setOpen(!open)} whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }} transition={SPRING.bouncy}
        className="fixed bottom-6 right-6 z-[105] w-14 h-14 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#885CFF] text-2xl shadow-[0_15px_40px_-10px_rgba(0,217,255,.8)] cursor-pointer">
        {open ? '✕' : '💬'}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 40, scale: .92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: .94 }} transition={SPRING.soft}
            className="fixed bottom-24 right-6 z-[105] w-[min(360px,calc(100vw-3rem))] glass glow-border rounded-3xl overflow-hidden flex flex-col" style={{ height: 480 }}>
            <div className="p-4 bg-gradient-to-r from-[#00D9FF]/20 to-[#885CFF]/20 flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <div><p className="font-display font-bold text-sm">CEA Assistant</p><p className="text-xs text-[#39FF88]">● Online — answers from academy info</p></div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.from === 'user' ? 'ml-auto bg-[#00D9FF] text-[#070B12] font-medium' : 'bg-white/8'}`}>{m.text}</motion.div>
              ))}
              {typing && <div className="bg-white/8 rounded-2xl px-4 py-3 w-max text-sm text-[#929EAE]">typing<span className="animate-blink">…</span></div>}
            </div>
            <div className="p-3 flex gap-2 border-t border-white/10">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask about courses, fees…" className="flex-1 glass rounded-full px-4 py-2.5 text-sm focus:border-[#00D9FF]" aria-label="Message assistant" />
              <button onClick={() => send()} aria-label="Send" className="btn-press w-11 h-11 rounded-full bg-[#00D9FF] text-[#070B12] font-bold cursor-pointer">↑</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
