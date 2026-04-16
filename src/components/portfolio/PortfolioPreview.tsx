'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, Globe, GitBranch, Briefcase, AtSign, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PortfolioData, Skill, Project, Experience } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PortfolioPreviewProps {
  portfolio: PortfolioData;
  viewMode?: 'desktop' | 'mobile';
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLevelColor(level: number): string {
  if (level >= 85) return '#6366f1';
  if (level >= 70) return '#8b5cf6';
  if (level >= 50) return '#a78bfa';
  return '#c4b5fd';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BrowserChrome({
  username,
  children,
  viewMode,
}: {
  username: string;
  children: React.ReactNode;
  viewMode: 'desktop' | 'mobile';
}) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50',
        'bg-[#1a1f35]',
        viewMode === 'mobile' ? 'max-w-[375px] mx-auto' : 'w-full',
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#151929] border-b border-white/[0.06]">
        {/* Traffic dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>

        {/* URL bar */}
        <div className="flex-1 mx-3">
          <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-md px-3 py-1.5">
            <div className="w-3 h-3 rounded-full bg-green-400/60 shrink-0" />
            <span className="text-xs text-slate-400 font-mono truncate">
              folio.ai/<span className="text-indigo-300">{username || 'yourname'}</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-4 h-4 rounded bg-white/[0.04] border border-white/[0.06]" />
          <div className="w-4 h-4 rounded bg-white/[0.04] border border-white/[0.06]" />
        </div>
      </div>

      {/* Page content */}
      <div className="overflow-y-auto max-h-[520px] bg-[#0a0f1f]">{children}</div>
    </div>
  );
}

function HeroSection({
  portfolio,
  primaryColor,
}: {
  portfolio: PortfolioData;
  primaryColor: string;
}) {
  return (
    <div
      className="relative px-6 py-8 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primaryColor}18 0%, #0a0f1f 60%)`,
        borderBottom: `1px solid ${primaryColor}20`,
      }}
    >
      {/* Glow orb */}
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: primaryColor }}
      />

      <div className="relative flex items-start gap-4">
        {/* Avatar */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${portfolio.accentColor})` }}
        >
          {portfolio.avatar ? (
            <img
              src={portfolio.avatar}
              alt={portfolio.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials(portfolio.name || 'You')
          )}
        </div>

        <div className="min-w-0 flex-1">
          <motion.h1
            key={portfolio.name}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-bold text-white leading-tight truncate"
          >
            {portfolio.name || 'Your Name'}
          </motion.h1>

          <motion.p
            key={portfolio.title}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-sm font-medium mt-0.5"
            style={{ color: primaryColor }}
          >
            {portfolio.title || 'Your Title'}
          </motion.p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            {portfolio.location && (
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <MapPin size={10} />
                {portfolio.location}
              </span>
            )}
            {portfolio.email && (
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Mail size={10} />
                <span className="truncate max-w-[120px]">{portfolio.email}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {portfolio.bio && (
        <motion.p
          key={portfolio.bio.slice(0, 40)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-xs text-slate-300 leading-relaxed line-clamp-3"
        >
          {portfolio.bio}
        </motion.p>
      )}

      {/* Social links */}
      <div className="flex items-center gap-2 mt-4">
        {portfolio.social.github && (
          <a
            href="#"
            className="p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
          >
            <GitBranch size={12} />
          </a>
        )}
        {portfolio.social.linkedin && (
          <a
            href="#"
            className="p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
          >
            <Briefcase size={12} />
          </a>
        )}
        {portfolio.social.twitter && (
          <a
            href="#"
            className="p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
          >
            <AtSign size={12} />
          </a>
        )}
        {portfolio.social.website && (
          <a
            href="#"
            className="p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
          >
            <Globe size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

function SkillsSection({
  skills,
  primaryColor,
}: {
  skills: Skill[];
  primaryColor: string;
}) {
  if (!skills.length) return null;

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <div className="px-6 py-5 border-b border-white/[0.05]">
      <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Skills
      </h2>
      <div className="space-y-3">
        {Object.entries(grouped).map(([category, catSkills]) => (
          <div key={category}>
            <p className="text-xs text-slate-500 mb-1.5">{category}</p>
            <div className="space-y-1.5">
              {catSkills.map((skill, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs text-slate-300">{skill.name}</span>
                    <span className="text-xs text-slate-500">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      key={`${skill.name}-${skill.level}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.04 }}
                      className="h-full rounded-full"
                      style={{ background: getLevelColor(skill.level) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection({
  projects,
  primaryColor,
}: {
  projects: Project[];
  primaryColor: string;
}) {
  if (!projects.length) return null;

  return (
    <div className="px-6 py-5 border-b border-white/[0.05]">
      <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Projects
      </h2>
      <div className="grid gap-2">
        {projects.slice(0, 3).map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">{project.title}</p>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
              {(project.link || project.github) && (
                <ExternalLink size={10} className="text-slate-600 group-hover:text-slate-400 transition-colors shrink-0 mt-0.5" />
              )}
            </div>
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                    style={{
                      background: `${primaryColor}20`,
                      color: primaryColor,
                      border: `1px solid ${primaryColor}30`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
        {projects.length > 3 && (
          <p className="text-xs text-slate-500 text-center py-1">
            +{projects.length - 3} more projects
          </p>
        )}
      </div>
    </div>
  );
}

function ExperienceSection({ experience }: { experience: Experience[] }) {
  if (!experience.length) return null;

  return (
    <div className="px-6 py-5 border-b border-white/[0.05]">
      <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Experience
      </h2>
      <div className="relative pl-4">
        <div className="absolute left-1.5 top-0 bottom-0 w-px bg-white/[0.08]" />
        <div className="space-y-4">
          {experience.slice(0, 3).map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="relative"
            >
              <div className="absolute -left-[18px] top-1 w-2.5 h-2.5 rounded-full border-2 border-indigo-500 bg-[#0a0f1f]" />
              <p className="text-xs font-semibold text-white">{exp.role}</p>
              <p className="text-xs text-indigo-300 mt-0.5">{exp.company}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
              </p>
              {exp.description && (
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {exp.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const PortfolioPreview = memo(function PortfolioPreview({
  portfolio,
  viewMode = 'desktop',
  className,
}: PortfolioPreviewProps) {
  const primaryColor = portfolio.primaryColor || '#6366f1';

  return (
    <div className={cn('w-full', className)}>
      <BrowserChrome username={portfolio.username} viewMode={viewMode}>
        <AnimatePresence mode="wait">
          <motion.div
            key={portfolio.name + portfolio.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <HeroSection portfolio={portfolio} primaryColor={primaryColor} />
            <SkillsSection skills={portfolio.skills} primaryColor={primaryColor} />
            <ProjectsSection projects={portfolio.projects} primaryColor={primaryColor} />
            <ExperienceSection experience={portfolio.experience} />

            {/* Footer */}
            <div className="px-6 py-4 text-center">
              <p className="text-xs text-slate-600">
                Built with{' '}
                <span className="text-indigo-400 font-medium">Folio.AI</span>
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </BrowserChrome>
    </div>
  );
});

export default PortfolioPreview;
