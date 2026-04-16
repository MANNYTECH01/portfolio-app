'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { PortfolioData } from '@/lib/utils';

// ─── Icon Components ──────────────────────────────────────────────────────────

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Animation Helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const stagger = (delay = 0.1) => ({
  visible: { transition: { staggerChildren: delay } },
});

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger(0.12)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Skill Bar ────────────────────────────────────────────────────────────────

function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-300">{name}</span>
        <span className="text-xs text-slate-500 tabular-nums">{level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: delay + 0.2, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
        />
      </div>
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav({ name, sections }: { name: string; sections: string[] }) {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', v => setScrolled(v > 60));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach(s => {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.span
          className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.03 }}
        >
          {name.split(' ')[0]}
          <span className="text-white/20">.</span>
        </motion.span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {sections.map(s => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                active === s
                  ? 'text-white bg-white/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {sections.map(s => (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium capitalize text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection({ portfolio }: { portfolio: PortfolioData }) {
  const [typedIndex, setTypedIndex] = useState(0);
  const roles = [portfolio.title, 'Problem Solver', 'Open Source Enthusiast', 'Tech Innovator'];
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[typedIndex % roles.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < currentRole.length) {
      timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTypedIndex(v => v + 1);
    }
    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed, isDeleting, typedIndex]);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[120px]"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          className="absolute -bottom-20 -right-40 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[100px]"
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-900/10 blur-[80px]"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6"
            >
              <span className="text-white">Hi, I&apos;m</span>
              <br />
              <span className="bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                {portfolio.name}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-3 mb-6"
            >
              <CodeIcon className="w-5 h-5 text-indigo-400 shrink-0" />
              <span className="text-xl sm:text-2xl text-slate-300 font-medium font-mono">
                {displayed}
                <span className="animate-pulse text-indigo-400">|</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg"
            >
              {portfolio.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-base shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <ExternalLinkIcon className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {portfolio.resumeUrl ? (
                <a
                  href={portfolio.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-white/10 bg-white/5 text-slate-200 font-semibold text-base backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:scale-105"
                >
                  Download Resume
                </a>
              ) : (
                <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-white/10 bg-white/5 text-slate-200 font-semibold text-base backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:scale-105">
                  Download Resume
                </button>
              )}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex items-center gap-4"
            >
              {portfolio.social.github && (
                <a
                  href={`https://${portfolio.social.github.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:scale-110"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              )}
              {portfolio.social.linkedin && (
                <a
                  href={`https://${portfolio.social.linkedin.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-200 hover:scale-110"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              )}
              {portfolio.social.twitter && (
                <a
                  href={`https://${portfolio.social.twitter.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all duration-200 hover:scale-110"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>
              )}
              <div className="h-px w-12 bg-white/10" />
              <span className="text-xs text-slate-600 font-mono">@{portfolio.username}</span>
            </motion.div>
          </div>

          {/* Right: Code snippet visual */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Floating glow */}
              <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-3xl" />
              {/* Code card */}
              <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-indigo-500/10">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-black/20">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-3 text-xs text-slate-500 font-mono">portfolio.ts</span>
                </div>
                <div className="p-6 font-mono text-sm leading-7">
                  <div><span className="text-violet-400">const</span> <span className="text-blue-300">developer</span> <span className="text-slate-400">=</span> <span className="text-yellow-300">{'{'}</span></div>
                  <div className="pl-6"><span className="text-emerald-400">name</span><span className="text-slate-400">:</span> <span className="text-orange-300">&quot;{portfolio.name}&quot;</span><span className="text-slate-500">,</span></div>
                  <div className="pl-6"><span className="text-emerald-400">role</span><span className="text-slate-400">:</span> <span className="text-orange-300">&quot;{portfolio.title}&quot;</span><span className="text-slate-500">,</span></div>
                  <div className="pl-6"><span className="text-emerald-400">skills</span><span className="text-slate-400">:</span> <span className="text-yellow-300">[</span></div>
                  {portfolio.skills.slice(0, 3).map((s, i) => (
                    <div key={i} className="pl-12"><span className="text-orange-300">&quot;{s.name}&quot;</span><span className="text-slate-500">,</span></div>
                  ))}
                  <div className="pl-12"><span className="text-slate-500">// +{portfolio.skills.length - 3} more</span></div>
                  <div className="pl-6"><span className="text-yellow-300">]</span><span className="text-slate-500">,</span></div>
                  <div className="pl-6"><span className="text-emerald-400">available</span><span className="text-slate-400">:</span> <span className="text-indigo-400">true</span><span className="text-slate-500">,</span></div>
                  <div><span className="text-yellow-300">{'}'}</span><span className="text-slate-500">;</span></div>
                  <div className="mt-4">
                    <span className="text-violet-400">export default</span> <span className="text-blue-300">developer</span><span className="text-slate-500">;</span>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-sm"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
              >
                Open to work
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-sm"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.5 }}
              >
                {portfolio.skills.length} Skills
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-600 font-mono tracking-widest uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const }}
          >
            <ChevronDownIcon className="w-5 h-5 text-slate-600" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

function AboutSection({ portfolio }: { portfolio: PortfolioData }) {
  const stats = [
    { label: 'Years Experience', value: `${new Date().getFullYear() - 2020}+` },
    { label: 'Projects Built', value: `${portfolio.projects.length * 8}+` },
    { label: 'Technologies', value: `${portfolio.skills.length * 3}+` },
    { label: 'Commits', value: '2.4K+' },
  ];

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Section>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16">
            <span className="text-indigo-400 font-mono text-sm">01.</span>
            <h2 className="text-4xl font-black text-white">About Me</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Avatar + stats */}
            <motion.div variants={fadeUp} className="space-y-8">
              {/* Avatar */}
              <div className="relative w-64 h-64 mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl rotate-3 opacity-30" />
                <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-indigo-500/20 to-violet-600/20 border border-white/10 flex items-center justify-center overflow-hidden">
                  {portfolio.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={portfolio.avatar} alt={portfolio.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-4xl font-black text-white">
                        {portfolio.name.charAt(0)}
                      </div>
                      <span className="text-slate-500 text-sm">{portfolio.name}</span>
                    </div>
                  )}
                </div>
                {/* Status badge */}
                <div className="absolute -bottom-3 -right-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-white/10 shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-slate-300 font-medium">Available</span>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="p-4 rounded-2xl bg-white/3 border border-white/8 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-200"
                  >
                    <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bio + info */}
            <motion.div variants={fadeUp} className="space-y-8">
              <div className="space-y-4">
                <p className="text-lg text-slate-300 leading-relaxed">
                  {portfolio.bio}
                </p>
                <p className="text-slate-400 leading-relaxed">
                  I&apos;m passionate about building things that live on the internet — from tiny CLI tools to full-scale platforms. I care deeply about performance, accessibility, and great developer experience.
                </p>
              </div>

              {/* Info items */}
              <div className="space-y-3">
                {portfolio.location && (
                  <div className="flex items-center gap-3 text-slate-400">
                    <MapPinIcon className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="text-sm">{portfolio.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-slate-400">
                  <MailIcon className="w-4 h-4 text-indigo-400 shrink-0" />
                  <a href={`mailto:${portfolio.email}`} className="text-sm hover:text-indigo-400 transition-colors">
                    {portfolio.email}
                  </a>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                {portfolio.social.github && (
                  <a
                    href={`https://${portfolio.social.github.replace(/^https?:\/\//, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 text-sm transition-all hover:scale-105"
                  >
                    <GithubIcon className="w-4 h-4" />
                    GitHub
                  </a>
                )}
                {portfolio.social.linkedin && (
                  <a
                    href={`https://${portfolio.social.linkedin.replace(/^https?:\/\//, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-blue-400 hover:border-blue-500/30 text-sm transition-all hover:scale-105"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────

function SkillsSection({ portfolio }: { portfolio: PortfolioData }) {
  const categories = Array.from(new Set(portfolio.skills.map(s => s.category)));

  const techBadgeColors: Record<string, string> = {
    Frontend: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
    Backend: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
    Language: 'text-violet-300 bg-violet-500/10 border-violet-500/20',
    Database: 'text-orange-300 bg-orange-500/10 border-orange-500/20',
    DevOps: 'text-pink-300 bg-pink-500/10 border-pink-500/20',
    Default: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
  };

  return (
    <section id="skills" className="py-28 px-6 bg-gradient-to-b from-transparent via-slate-950/50 to-transparent">
      <div className="max-w-6xl mx-auto">
        <Section>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16">
            <span className="text-indigo-400 font-mono text-sm">02.</span>
            <h2 className="text-4xl font-black text-white">Skills & Tools</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Skill bars */}
            <motion.div variants={fadeUp} className="space-y-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Proficiency</h3>
              {portfolio.skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.08} />
              ))}
            </motion.div>

            {/* Category badges */}
            <motion.div variants={fadeUp} className="space-y-8">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">By Category</h3>
              {categories.map(cat => (
                <div key={cat} className="space-y-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{cat}</div>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.skills.filter(s => s.category === cat).map(skill => (
                      <span
                        key={skill.name}
                        className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-sm font-medium transition-all hover:scale-105 cursor-default ${techBadgeColors[cat] || techBadgeColors.Default}`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

function ProjectsSection({ portfolio }: { portfolio: PortfolioData }) {
  const tagColors = [
    'text-blue-300 bg-blue-500/10 border-blue-500/20',
    'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
    'text-violet-300 bg-violet-500/10 border-violet-500/20',
    'text-orange-300 bg-orange-500/10 border-orange-500/20',
    'text-pink-300 bg-pink-500/10 border-pink-500/20',
  ];

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Section>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16">
            <span className="text-indigo-400 font-mono text-sm">03.</span>
            <h2 className="text-4xl font-black text-white">Projects</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.projects.map((project, i) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring' as const, stiffness: 400, damping: 25 }}
                className="group relative flex flex-col rounded-2xl border border-white/8 bg-gradient-to-b from-white/4 to-transparent overflow-hidden hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
              >
                {/* Top colored accent bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${
                  i % 3 === 0 ? 'from-indigo-500 to-violet-500' :
                  i % 3 === 1 ? 'from-emerald-500 to-cyan-500' :
                  'from-pink-500 to-rose-500'
                }`} />

                {/* Image placeholder */}
                <div className={`h-44 w-full bg-gradient-to-br flex items-center justify-center relative overflow-hidden ${
                  i % 3 === 0 ? 'from-indigo-900/40 to-violet-900/40' :
                  i % 3 === 1 ? 'from-emerald-900/40 to-cyan-900/40' :
                  'from-pink-900/40 to-rose-900/40'
                }`}>
                  {project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <CodeIcon className="w-12 h-12 text-white" />
                      <span className="text-xs text-white font-mono">{project.title}</span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag, ti) => (
                      <span
                        key={tag}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${tagColors[ti % tagColors.length]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors font-medium"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                      >
                        <ExternalLinkIcon className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────────

function ExperienceSection({ portfolio }: { portfolio: PortfolioData }) {
  return (
    <section id="experience" className="py-28 px-6 bg-gradient-to-b from-transparent via-slate-950/40 to-transparent">
      <div className="max-w-6xl mx-auto">
        <Section>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16">
            <span className="text-indigo-400 font-mono text-sm">04.</span>
            <h2 className="text-4xl font-black text-white">Experience</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-violet-500/30 to-transparent hidden md:block" />

            <div className="space-y-10">
              {portfolio.experience.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  variants={fadeUp}
                  className="relative md:pl-24"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-5 h-5 rounded-full border-2 border-indigo-500 bg-slate-950 hidden md:flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full ${exp.current ? 'bg-emerald-400 animate-pulse' : 'bg-indigo-500'}`} />
                  </div>

                  <div className="p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-indigo-500/20 hover:bg-indigo-500/3 transition-all duration-200 group">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/30 to-violet-500/30 border border-indigo-500/20 flex items-center justify-center">
                            <BriefcaseIcon className="w-4 h-4 text-indigo-400" />
                          </div>
                          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {exp.role}
                          </h3>
                        </div>
                        <p className="text-indigo-400 font-semibold text-sm ml-12">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {exp.current && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                            Current
                          </span>
                        )}
                        <span className="text-xs text-slate-500 font-mono whitespace-nowrap">
                          {exp.startDate} → {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── Education Section ────────────────────────────────────────────────────────

function EducationSection({ portfolio }: { portfolio: PortfolioData }) {
  return (
    <section id="education" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Section>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16">
            <span className="text-indigo-400 font-mono text-sm">05.</span>
            <h2 className="text-4xl font-black text-white">Education</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {portfolio.education.map(edu => (
              <motion.div
                key={edu.id}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring' as const, stiffness: 400, damping: 25 }}
                className="p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-indigo-500/20 hover:bg-indigo-500/3 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <GraduationCapIcon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white mb-0.5">{edu.institution}</h3>
                    <p className="text-indigo-400 font-medium text-sm mb-1">{edu.degree} · {edu.field}</p>
                    <p className="text-xs text-slate-500 font-mono">
                      {edu.startDate} → {edu.current ? 'Present' : edu.endDate}
                    </p>
                  </div>
                  {edu.current && (
                    <span className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold shrink-0">
                      Current
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection({ portfolio }: { portfolio: PortfolioData }) {
  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Section>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16 justify-center">
            <span className="text-indigo-400 font-mono text-sm">06.</span>
            <h2 className="text-4xl font-black text-white">Get In Touch</h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative p-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 pointer-events-none" />

            <div className="relative z-10">
              <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl mx-auto">
                Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open.
              </p>

              <a
                href={`mailto:${portfolio.email}`}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 mb-10"
              >
                <MailIcon className="w-5 h-5" />
                Say Hello
                <ExternalLinkIcon className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Social row */}
              <div className="flex justify-center gap-4 mt-6">
                {portfolio.social.github && (
                  <a
                    href={`https://${portfolio.social.github.replace(/^https?:\/\//, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all hover:scale-110"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                )}
                {portfolio.social.linkedin && (
                  <a
                    href={`https://${portfolio.social.linkedin.replace(/^https?:\/\//, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all hover:scale-110"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                )}
                {portfolio.social.twitter && (
                  <a
                    href={`https://${portfolio.social.twitter.replace(/^https?:\/\//, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all hover:scale-110"
                  >
                    <TwitterIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </Section>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ portfolio }: { portfolio: PortfolioData }) {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} {portfolio.name}. All rights reserved.
        </span>
        <span className="text-slate-600 text-sm flex items-center gap-1">
          Built with{' '}
          <a
            href="/"
            className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
          >
            Folio.AI
          </a>
        </span>
      </div>
    </footer>
  );
}

// ─── Main Template ────────────────────────────────────────────────────────────

export interface DeveloperTemplateProps {
  portfolio: PortfolioData;
}

const NAV_SECTIONS = ['about', 'skills', 'projects', 'experience', 'education', 'contact'];

export default function DeveloperTemplate({ portfolio }: DeveloperTemplateProps) {
  const isDark = portfolio.darkMode !== false; // default dark

  return (
    <div className={isDark ? 'dark' : ''}>
      <div
        className={`min-h-screen ${
          isDark
            ? 'bg-[#030712] text-white'
            : 'bg-slate-50 text-slate-900'
        } antialiased`}
        style={{ fontFamily: portfolio.font === 'mono' ? 'ui-monospace, monospace' : 'var(--font-inter), sans-serif' }}
      >
        <Nav name={portfolio.name} sections={NAV_SECTIONS} />
        <HeroSection portfolio={portfolio} />
        <AboutSection portfolio={portfolio} />
        <SkillsSection portfolio={portfolio} />
        <ProjectsSection portfolio={portfolio} />
        <ExperienceSection portfolio={portfolio} />
        <EducationSection portfolio={portfolio} />
        <ContactSection portfolio={portfolio} />
        <Footer portfolio={portfolio} />
      </div>
    </div>
  );
}
