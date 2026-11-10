// Single source of truth for CEA content (per README §1: reconcile everything here).
export const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Programmes', href: '#programmes' },
  { label: 'Cyber Lab', href: '#cyber-lab' },
  { label: 'Journey', href: '#journey' },
  { label: 'Motion Lab', href: '#motion-lab' },
  { label: 'Contact', href: '#contact' },
];

export const DEPARTMENTS = [
  { id: 'cyber', name: 'Cybersecurity', icon: '🛡️', color: '#00D9FF', desc: 'Digital defence, security operations and ethical security.' },
  { id: 'dev', name: 'Software Development', icon: '💻', color: '#39FF88', desc: 'Websites, applications and software engineering.' },
  { id: 'ai', name: 'AI & Data', icon: '🤖', color: '#885CFF', desc: 'Artificial intelligence, analytics and data science.' },
  { id: 'cloud', name: 'Cloud & Networking', icon: '☁️', color: '#00D9FF', desc: 'Infrastructure, cloud and network technologies.' },
  { id: 'design', name: 'Design & Creativity', icon: '🎨', color: '#39FF88', desc: 'Graphic design, UI/UX and creative tools.' },
  { id: 'prod', name: 'Digital Productivity', icon: '⚡', color: '#885CFF', desc: 'Office skills, computer basics and digital literacy.' },
];

export const COURSES = [
  { id: 'cyber-fund', dept: 'cyber', title: 'Cybersecurity Fundamentals', level: 'Beginner', duration: '8 weeks', mode: 'Hybrid', price: '₦85,000', skills: ['Security principles', 'Digital safety', 'Threat awareness'], desc: 'Security principles and digital safety for absolute beginners.' },
  { id: 'ethical', dept: 'cyber', title: 'Ethical Hacking', level: 'Intermediate', duration: '12 weeks', mode: 'Physical', price: '₦150,000', skills: ['Authorised pentesting', 'Linux basics', 'Lab reports'], desc: 'Authorised penetration-testing concepts in isolated labs.' },
  { id: 'soc', dept: 'cyber', title: 'Security Operations (SOC)', level: 'Advanced', duration: '16 weeks', mode: 'Hybrid', price: '₦220,000', skills: ['Monitoring', 'Log analysis', 'Incident triage'], desc: 'Monitoring and defensive security operations.' },
  { id: 'web', dept: 'dev', title: 'Web Development Bootcamp', level: 'Beginner', duration: '12 weeks', mode: 'Hybrid', price: '₦120,000', skills: ['HTML/CSS/JS', 'React', 'Portfolio projects'], desc: 'Websites, applications and software engineering from zero.' },
  { id: 'ai-intro', dept: 'ai', title: 'AI & Data Foundations', level: 'Beginner', duration: '10 weeks', mode: 'Online', price: '₦110,000', skills: ['Python basics', 'Data viz', 'AI tools'], desc: 'Artificial intelligence, analytics and data science.' },
  { id: 'cloud', dept: 'cloud', title: 'Cloud & Networking Essentials', level: 'Intermediate', duration: '12 weeks', mode: 'Hybrid', price: '₦140,000', skills: ['Cloud basics', 'Networks', 'Troubleshooting'], desc: 'Infrastructure, cloud and network technologies.' },
  { id: 'uiux', dept: 'design', title: 'UI/UX & Graphic Design', level: 'Beginner', duration: '10 weeks', mode: 'Physical', price: '₦95,000', skills: ['Figma', 'Design systems', 'Branding'], desc: 'Graphic design, UI/UX and creative tools.' },
  { id: 'office', dept: 'prod', title: 'Digital Productivity Suite', level: 'Beginner', duration: '6 weeks', mode: 'Physical', price: '₦45,000', skills: ['Office apps', 'Data entry', 'Computer basics'], desc: 'Office skills, computer basics and digital literacy.' },
];

export const JOURNEY = [
  { step: '01', title: 'Discover', desc: 'Identify your interests and choose a learning pathway.', icon: '🧭' },
  { step: '02', title: 'Learn', desc: 'Attend lessons, watch tutorials and study the concepts.', icon: '📚' },
  { step: '03', title: 'Practise', desc: 'Work on exercises, simulations and practical tasks.', icon: '🧪' },
  { step: '04', title: 'Build', desc: 'Complete real projects and develop your portfolio.', icon: '🛠️' },
  { step: '05', title: 'Demonstrate', desc: 'Complete assessments and demonstrate your skills.', icon: '🎯' },
  { step: '06', title: 'Advance', desc: 'Earn an eligible certificate and explore further opportunities.', icon: '🚀' },
];

export const PROJECTS = [
  { title: 'Campus Network Shield', author: 'Adaeze O.', tag: 'Cybersecurity', tech: 'Wireshark · Linux', hue: '#00D9FF' },
  { title: 'Port Harcourt Eats', author: 'Emeka N.', tag: 'Web App', tech: 'React · Supabase', hue: '#39FF88' },
  { title: 'Brand Identity — Kola Foods', author: 'Blessing A.', tag: 'Design', tech: 'Figma · Illustrator', hue: '#885CFF' },
  { title: 'Log Forensics Report', author: 'Tunde B.', tag: 'Cyber Lab', tech: 'Python · ELK', hue: '#00D9FF' },
  { title: 'DataViz: River State Trends', author: 'Chioma E.', tag: 'AI & Data', tech: 'Python · Tableau', hue: '#39FF88' },
  { title: 'Cloud Cost Dashboard', author: 'Ibrahim S.', tag: 'Cloud', tech: 'AWS · Grafana', hue: '#885CFF' },
];

export const TESTIMONIALS = [
  { name: 'Adaeze Okafor', role: 'Ethical Hacking Graduate', quote: 'The Cyber Lab changed everything. I stopped watching videos and started defending real networks — with mentors beside me the whole way.' },
  { name: 'Emeka Nwosu', role: 'Web Development Student', quote: 'Every week I shipped something real. My portfolio went from empty to employable in one cohort.' },
  { name: 'Blessing Adeyemi', role: 'UI/UX Graduate', quote: 'CEA treats design like engineering: systems, critique, and craft. I left with a brand system, not just certificates.' },
];

export const FAQS = [
  { q: 'Where is CEA located?', a: 'Our physical training centre is at 24 Ebony Road, off Rumuola Road, Port Harcourt, Rivers State. Many programmes are also available online or hybrid.' },
  { q: 'Do I need a laptop to start?', a: 'No. Our ICT Hub provides workstations for physical classes. For online learning, any laptop with a stable internet connection is enough to begin.' },
  { q: 'Are the Cyber Lab exercises safe?', a: 'Yes — every simulation runs in isolated, authorised environments. You learn defensive security by investigating fictional incidents, never attacking real systems.' },
  { q: 'How do I verify a certificate?', a: 'Use the Certificate Verifier on this page with the unique certificate number. Employers can confirm authenticity instantly.' },
  { q: 'Can I pay in instalments?', a: 'Yes. Admissions will share flexible payment plans after your application is accepted. Payments are processed securely via Paystack.' },
];

export const STATS = [
  { value: 1200, suffix: '+', label: 'Students trained' },
  { value: 24, suffix: '', label: 'Programmes & courses' },
  { value: 98, suffix: '%', label: 'Practical lab hours' },
  { value: 6, suffix: '', label: 'Learning departments' },
];
