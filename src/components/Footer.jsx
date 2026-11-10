import { NAV } from '../data/content';
import { Btn, useToast } from './ui';

export default function Footer() {
  const toast = useToast();
  return (
    <footer id="contact" className="relative border-t border-white/10 bg-[#0D1420]/60 overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 relative">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-[.3em] text-[#00D9FF]">FINAL CALL</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mt-4">Your future in technology <span className="text-gradient">starts here.</span></h2>
          <p className="text-[#929EAE] mt-4">Take the first step towards building skills that matter in the digital world.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Btn href="#admissions">Apply now</Btn>
            <Btn href="#programmes" variant="ghost">Explore programmes</Btn>
            <Btn variant="ghost" onClick={() => toast('Admissions: admissions@cea.ng · 24 Ebony Road, Port Harcourt')}>Contact admissions</Btn>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-10 mt-20 pt-12 border-t border-white/10">
          <div>
            <p className="font-display font-bold text-xl">🛡️ CEA<span className="text-[#00D9FF]">.NG</span></p>
            <p className="text-sm text-[#929EAE] mt-3 leading-relaxed">Cyber Elias Academy — practical cybersecurity & technology education. The future is built. Not given.</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-[#00D9FF] mb-4">EXPLORE</p>
            <ul className="space-y-2.5">{NAV.map(n => <li key={n.href}><a href={n.href} className="link-sweep text-sm text-[#c9d4e3] hover:text-white">{n.label}</a></li>)}</ul>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-[#00D9FF] mb-4">CAMPUS</p>
            <p className="text-sm text-[#929EAE] leading-relaxed">24 Ebony Road, off Rumuola Road,<br />Port Harcourt, Rivers State, Nigeria</p>
            <p className="text-sm text-[#929EAE] mt-3">admissions@cea.ng</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-[#00D9FF] mb-4">STAY SHARP</p>
            <p className="text-sm text-[#929EAE] mb-3">One useful cybersecurity tip, monthly.</p>
            <div className="flex gap-2">
              <input placeholder="you@email.com" className="flex-1 glass rounded-full px-4 py-2.5 text-sm focus:border-[#00D9FF] min-w-0" aria-label="Email for newsletter" id="nl-email" />
              <button onClick={() => { const v = document.getElementById('nl-email').value; toast(v.includes('@') ? 'Subscribed — welcome to the lab!' : 'Enter a valid email'); }} className="btn-press rounded-full bg-[#00D9FF] text-[#070B12] px-4 text-sm font-bold cursor-pointer">Join</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-14 pt-8 border-t border-white/10 font-mono text-[11px] text-[#929EAE]">
          <p>© {new Date().getFullYear()} CYBER ELIAS ACADEMY · CEA.NG</p>
          <p>PRIVACY · TERMS · NDPC COMPLIANT</p>
        </div>
      </div>
    </footer>
  );
}
