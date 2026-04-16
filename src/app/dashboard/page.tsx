'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  Users,
  FolderKanban,
  Zap,
  Globe,
  Share2,
  Pencil,
  Layers,
  ExternalLink,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatCard {
  label: string;
  value: number;
  suffix?: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
  gradient: string;
  glowColor: string;
}

interface ActivityItem {
  id: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  message: string;
  time: string;
  type: 'success' | 'info' | 'warning';
}

interface QuickAction {
  label: string;
  description: string;
  href: string;
  icon: React.ElementType;
  gradient: string;
  glowColor: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const STAT_CARDS: StatCard[] = [
  {
    label: 'Portfolio Views',
    value: 2847,
    change: '+12.5%',
    positive: true,
    icon: Eye,
    gradient: 'from-indigo-500/20 to-violet-500/20',
    glowColor: 'rgba(99,102,241,0.15)',
  },
  {
    label: 'Profile Visits',
    value: 1293,
    change: '+8.2%',
    positive: true,
    icon: Users,
    gradient: 'from-cyan-500/20 to-blue-500/20',
    glowColor: 'rgba(6,182,212,0.15)',
  },
  {
    label: 'Projects Added',
    value: 12,
    change: '+3',
    positive: true,
    icon: FolderKanban,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    glowColor: 'rgba(16,185,129,0.15)',
  },
  {
    label: 'Skills Listed',
    value: 28,
    suffix: '',
    change: '+4',
    positive: true,
    icon: Zap,
    gradient: 'from-amber-500/20 to-orange-500/20',
    glowColor: 'rgba(245,158,11,0.15)',
  },
];

const ACTIVITY_ITEMS: ActivityItem[] = [
  {
    id: '1',
    icon: Eye,
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10',
    message: 'Your portfolio was viewed by someone in New York',
    time: '2 min ago',
    type: 'info',
  },
  {
    id: '2',
    icon: CheckCircle2,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    message: 'CloudDeploy project received 5 new clicks',
    time: '18 min ago',
    type: 'success',
  },
  {
    id: '3',
    icon: TrendingUp,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    message: 'Traffic spike detected — 47 visits in the last hour',
    time: '1 hr ago',
    type: 'success',
  },
  {
    id: '4',
    icon: AlertCircle,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    message: 'Resume link is not yet added to your profile',
    time: '3 hrs ago',
    type: 'warning',
  },
  {
    id: '5',
    icon: Activity,
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
    message: 'AI suggestion: Add 2 more projects to boost visibility',
    time: '5 hrs ago',
    type: 'info',
  },
];

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: 'Edit Portfolio',
    description: 'Update your content & skills',
    href: '/dashboard/editor',
    icon: Pencil,
    gradient: 'from-indigo-600 to-violet-600',
    glowColor: 'rgba(99,102,241,0.35)',
  },
  {
    label: 'Choose Template',
    description: 'Browse 7 premium designs',
    href: '/dashboard/templates',
    icon: Layers,
    gradient: 'from-cyan-600 to-blue-600',
    glowColor: 'rgba(6,182,212,0.35)',
  },
  {
    label: 'View Live',
    description: 'See your published site',
    href: '/p/alexjohnson',
    icon: ExternalLink,
    gradient: 'from-emerald-600 to-teal-600',
    glowColor: 'rgba(16,185,129,0.35)',
  },
  {
    label: 'Share Link',
    description: 'Copy & share your URL',
    href: '#',
    icon: Share2,
    gradient: 'from-rose-600 to-pink-600',
    glowColor: 'rgba(244,63,94,0.35)',
  },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ target, duration = 1.8 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return <>{count.toLocaleString()}</>;
}

// ─── Stagger Variants ─────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 28 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.07] backdrop-blur-md overflow-hidden',
        className
      )}
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://folio.ai/p/alexjohnson');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">

      {/* ── Header ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <motion.div variants={fadeUp}>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back, Alex{' '}
            <span className="inline-block animate-[wave_1.5s_ease-in-out_1]">👋</span>
          </h1>
          <p className="mt-1 text-sm text-slate-400 flex items-center gap-1.5">
            <Clock size={13} className="text-slate-500" />
            {today}
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-medium">
            <Sparkles size={13} />
            AI suggestions ready
          </div>
        </motion.div>
      </motion.div>

      {/* ── Stat Cards ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              variants={cardVariants}
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
            >
              <GlassCard>
                <div
                  className={cn('p-5 bg-gradient-to-br', card.gradient)}
                  style={{ boxShadow: `inset 0 0 40px ${card.glowColor}` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.08)' }}
                    >
                      <Icon size={18} className="text-white/80" />
                    </div>
                    <span
                      className={cn(
                        'text-xs font-semibold px-2 py-1 rounded-full',
                        card.positive
                          ? 'text-emerald-300 bg-emerald-500/15'
                          : 'text-rose-300 bg-rose-500/15'
                      )}
                    >
                      {card.change}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-white tracking-tight">
                    <AnimatedCounter target={card.value} />
                    {card.suffix}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{card.label}</p>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Portfolio Status + Activity ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* Portfolio Status */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="xl:col-span-2"
        >
          <GlassCard className="h-full">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-white">Portfolio Status</h2>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Unpublished
                </div>
              </div>

              {/* Progress to publish */}
              <div className="space-y-3 mb-6">
                {[
                  { label: 'Profile info', done: true },
                  { label: 'Projects added', done: true },
                  { label: 'Skills listed', done: true },
                  { label: 'Resume uploaded', done: false },
                  { label: 'Custom domain', done: false },
                ].map((step) => (
                  <div key={step.label} className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
                        step.done
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-white/5 text-slate-600'
                      )}
                    >
                      <CheckCircle2 size={12} />
                    </div>
                    <span
                      className={cn(
                        'text-sm',
                        step.done ? 'text-slate-300' : 'text-slate-600'
                      )}
                    >
                      {step.label}
                    </span>
                    {!step.done && (
                      <span className="ml-auto text-xs text-slate-600">Optional</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Completion bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400">Profile completion</span>
                  <span className="text-indigo-400 font-medium">60%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' as const }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    style={{ boxShadow: '0 0 12px rgba(99,102,241,0.5)' }}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all duration-200"
                style={{ boxShadow: '0 4px 24px rgba(99,102,241,0.35)' }}
              >
                <Globe size={14} className="inline mr-2" />
                Publish Portfolio
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="xl:col-span-3"
        >
          <GlassCard className="h-full">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-white">Recent Activity</h2>
                <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                  View all <ChevronRight size={12} />
                </button>
              </div>

              <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-3 flex-1"
              >
                {ACTIVITY_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={item.id}
                      variants={cardVariants}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors group"
                    >
                      <div
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5',
                          item.iconBg
                        )}
                      >
                        <Icon size={14} className={item.iconColor} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-300 leading-snug">{item.message}</p>
                        <p className="mt-1 text-xs text-slate-600">{item.time}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* ── Quick Actions ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 variants={fadeUp} className="text-base font-semibold text-white mb-4">
          Quick Actions
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            const isShare = action.label === 'Share Link';

            return (
              <motion.div
                key={action.label}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring' as const, stiffness: 300, damping: 22 }}
              >
                {isShare ? (
                  <div onClick={handleCopyLink} role="button" className="block cursor-pointer">
                    <div
                      className="relative overflow-hidden rounded-2xl p-5 cursor-pointer group border border-white/[0.07]"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <div className={cn('absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br', action.gradient)} />
                      <div className={cn('relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br', action.gradient)} style={{ boxShadow: `0 4px 20px ${action.glowColor}` }}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <p className="relative z-10 text-sm font-semibold text-white mb-1">
                        {copied ? 'Copied!' : action.label}
                      </p>
                      <p className="relative z-10 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{action.description}</p>
                      <ArrowUpRight size={14} className="absolute top-4 right-4 text-slate-600 group-hover:text-slate-400 transition-colors z-10" />
                    </div>
                  </div>
                ) : (
                  <Link href={action.href} className="block">
                    <div
                      className="relative overflow-hidden rounded-2xl p-5 cursor-pointer group border border-white/[0.07]"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <div className={cn('absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br', action.gradient)} />
                      <div className={cn('relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br', action.gradient)} style={{ boxShadow: `0 4px 20px ${action.glowColor}` }}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <p className="relative z-10 text-sm font-semibold text-white mb-1">{action.label}</p>
                      <p className="relative z-10 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{action.description}</p>
                      <ArrowUpRight size={14} className="absolute top-4 right-4 text-slate-600 group-hover:text-slate-400 transition-colors z-10" />
                    </div>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
