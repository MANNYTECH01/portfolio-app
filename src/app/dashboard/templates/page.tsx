'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Eye, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePortfolio } from '@/contexts/PortfolioContext';
import type { PortfolioTemplate } from '@/lib/utils';

// ─── Filter Tabs ──────────────────────────────────────────────────────────────

type FilterCategory =
  | 'All'
  | 'Developer'
  | 'Designer'
  | 'Freelancer'
  | 'Student'
  | 'Creative';

const FILTER_TABS: FilterCategory[] = [
  'All',
  'Developer',
  'Designer',
  'Freelancer',
  'Student',
  'Creative',
];

// ─── Template Data ────────────────────────────────────────────────────────────

interface TemplateConfig {
  id: PortfolioTemplate;
  name: string;
  category: Exclude<FilterCategory, 'All'>;
  description: string;
  popular?: boolean;
  preview: {
    bg: string;
    accent: string;
    secondary: string;
    headerColor: string;
    barColors: string[];
  };
}

const TEMPLATES: TemplateConfig[] = [
  {
    id: 'developer',
    name: 'Minimal Dark',
    category: 'Developer',
    description: 'Clean dark theme focused on code and projects',
    popular: true,
    preview: {
      bg: '#0d1117',
      accent: '#6366f1',
      secondary: '#1e2433',
      headerColor: '#6366f1',
      barColors: ['#6366f1', '#8b5cf6', '#6366f1cc'],
    },
  },
  {
    id: 'designer',
    name: 'Creative Canvas',
    category: 'Designer',
    description: 'Bold visuals with showcase-first layout',
    popular: true,
    preview: {
      bg: '#0f0f1a',
      accent: '#ec4899',
      secondary: '#1f1b2e',
      headerColor: '#ec4899',
      barColors: ['#ec4899', '#8b5cf6', '#ec4899cc'],
    },
  },
  {
    id: 'backend',
    name: 'Tech Stack',
    category: 'Developer',
    description: 'Architecture-focused with skills matrix',
    preview: {
      bg: '#030712',
      accent: '#06b6d4',
      secondary: '#0c1a2a',
      headerColor: '#06b6d4',
      barColors: ['#06b6d4', '#3b82f6', '#06b6d4cc'],
    },
  },
  {
    id: 'freelancer',
    name: 'Agency Pro',
    category: 'Freelancer',
    description: 'Business-ready with testimonials & services',
    preview: {
      bg: '#0a0a14',
      accent: '#f59e0b',
      secondary: '#1a160a',
      headerColor: '#f59e0b',
      barColors: ['#f59e0b', '#ef4444', '#f59e0bcc'],
    },
  },
  {
    id: 'student',
    name: 'Fresh Start',
    category: 'Student',
    description: 'Entry-level friendly with education highlight',
    preview: {
      bg: '#071523',
      accent: '#10b981',
      secondary: '#0a2016',
      headerColor: '#10b981',
      barColors: ['#10b981', '#06b6d4', '#10b981cc'],
    },
  },
  {
    id: 'cloud',
    name: 'SaaS Builder',
    category: 'Developer',
    description: 'Product-focused with metrics & case studies',
    preview: {
      bg: '#0c0f1d',
      accent: '#7c3aed',
      secondary: '#120f24',
      headerColor: '#7c3aed',
      barColors: ['#7c3aed', '#6366f1', '#7c3aedcc'],
    },
  },
  {
    id: 'creative',
    name: 'Artisan',
    category: 'Creative',
    description: 'Gallery-style with full bleed visuals',
    preview: {
      bg: '#12050d',
      accent: '#f43f5e',
      secondary: '#1f0a14',
      headerColor: '#f43f5e',
      barColors: ['#f43f5e', '#ec4899', '#f43f5ecc'],
    },
  },
];

// ─── Stagger variants ─────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 280, damping: 26 },
  },
  exit: { opacity: 0, y: -12, scale: 0.95, transition: { duration: 0.18 } },
};

// ─── Template Mini Mockup ─────────────────────────────────────────────────────

function TemplateMockup({ preview }: { preview: TemplateConfig['preview'] }) {
  return (
    <div
      className="w-full h-36 rounded-xl overflow-hidden relative"
      style={{ background: preview.bg }}
    >
      {/* Header bar */}
      <div
        className="absolute top-0 left-0 right-0 h-6 flex items-center px-2.5 gap-1.5"
        style={{ background: `${preview.accent}18`, borderBottom: `1px solid ${preview.accent}30` }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-rose-500/70" />
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
        <div className="ml-auto w-12 h-2 rounded-sm" style={{ background: `${preview.accent}40` }} />
      </div>

      {/* Content area */}
      <div className="absolute top-8 left-0 right-0 bottom-0 p-2.5 flex gap-2">
        {/* Left col */}
        <div className="w-1/3 flex flex-col gap-1.5">
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full mb-1"
            style={{ background: `linear-gradient(135deg, ${preview.accent}, ${preview.barColors[1]})` }}
          />
          <div className="h-1.5 rounded-full w-10" style={{ background: `${preview.accent}80` }} />
          <div className="h-1 rounded-full w-14" style={{ background: `${preview.secondary}` }} />
          <div className="h-1 rounded-full w-12 opacity-60" style={{ background: `${preview.secondary}` }} />

          <div className="mt-2 space-y-1">
            {preview.barColors.map((color, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full" style={{ background: color }} />
                <div className="h-1 rounded-full flex-1" style={{ background: `${color}50` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right col */}
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="h-2 rounded-sm w-16" style={{ background: `${preview.accent}90` }} />
          <div className="h-1 rounded-full w-full opacity-40" style={{ background: preview.secondary }} />
          <div className="h-1 rounded-full w-4/5 opacity-30" style={{ background: preview.secondary }} />

          {/* Cards */}
          <div className="grid grid-cols-2 gap-1 mt-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-7 rounded-md"
                style={{
                  background: `${preview.secondary}cc`,
                  border: `1px solid ${preview.accent}20`,
                }}
              />
            ))}
          </div>

          {/* Skill bars */}
          <div className="mt-auto space-y-1">
            {[80, 65, 90].map((w, i) => (
              <div key={i} className="h-1 rounded-full overflow-hidden" style={{ background: `${preview.secondary}` }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${w}%`,
                    background: preview.barColors[i % preview.barColors.length],
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Template Card ────────────────────────────────────────────────────────────

interface TemplateCardProps {
  template: TemplateConfig;
  isSelected: boolean;
  onSelect: (id: PortfolioTemplate) => void;
}

function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      layout
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        perspective: '800px',
        rotateX: isHovered ? -3 : 0,
        rotateY: isHovered ? 3 : 0,
      }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? -3 : 0,
          rotateY: isHovered ? 3 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
        className={cn(
          'relative rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer group',
          isSelected
            ? 'border-indigo-500/60'
            : 'border-white/[0.07] hover:border-white/20'
        )}
        style={{
          background: 'rgba(255,255,255,0.03)',
          boxShadow: isSelected
            ? '0 0 0 1px rgba(99,102,241,0.4), 0 8px 40px rgba(99,102,241,0.2)'
            : undefined,
        }}
        onClick={() => onSelect(template.id)}
      >
        {/* Gradient border glow for selected */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            style={{
              background:
                'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, transparent 60%)',
            }}
          />
        )}

        {/* Selected badge */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 z-20 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/40"
          >
            <Check size={12} className="text-white" />
          </motion.div>
        )}

        {/* Popular badge */}
        {template.popular && !isSelected && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-medium">
            <Star size={9} fill="currentColor" />
            Popular
          </div>
        )}

        {/* Mockup preview */}
        <div className="p-3 pb-0">
          <TemplateMockup preview={template.preview} />
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-semibold text-white">{template.name}</h3>
            <span
              className="shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium"
              style={{
                background: `${template.preview.accent}15`,
                borderColor: `${template.preview.accent}30`,
                color: template.preview.accent,
              }}
            >
              {template.category}
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">{template.description}</p>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(template.id);
              }}
              className={cn(
                'flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200',
                isSelected
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                  : 'bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25 border border-indigo-500/30'
              )}
            >
              {isSelected ? (
                <>
                  <Check size={11} className="inline mr-1" />
                  Active
                </>
              ) : (
                'Select Template'
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/[0.07] transition-all duration-200 flex items-center gap-1"
            >
              <Eye size={11} />
              Preview
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TemplatesPage() {
  const { portfolio, setTemplate } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

  const filtered = TEMPLATES.filter(
    (t) => activeFilter === 'All' || t.category === activeFilter
  );

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-indigo-400" />
          <span className="text-xs text-indigo-400 font-medium uppercase tracking-wider">
            Template Gallery
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Choose Your Template
        </h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Select a premium template to showcase your work. All templates are fully
          customizable with the AI editor.
        </p>
      </motion.div>

      {/* ── Filter Tabs ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={cn(
              'relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
              activeFilter === tab
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            )}
          >
            {activeFilter === tab && (
              <motion.div
                layoutId="filterActive"
                className="absolute inset-0 rounded-xl bg-indigo-600"
                style={{ boxShadow: '0 2px 16px rgba(99,102,241,0.4)' }}
                transition={{ type: 'spring' as const, stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </motion.div>

      {/* ── Template Grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={portfolio.template === template.id}
              onSelect={setTemplate}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-slate-600"
        >
          No templates in this category yet.
        </motion.div>
      )}
    </div>
  );
}
