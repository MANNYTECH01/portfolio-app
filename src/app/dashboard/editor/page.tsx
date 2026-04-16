'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Link2,
  Cpu,
  FolderKanban,
  GraduationCap,
  Plus,
  Trash2,
  Eye,
  Globe,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Monitor,
  Smartphone,
  Save,
  GitBranch,
  Briefcase,
  AtSign,
  Video,
  Pencil,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import type { Skill, Project, Experience, Education } from '@/lib/utils';
import { cn } from '@/lib/utils';
import PortfolioPreview from '@/components/portfolio/PortfolioPreview';

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = 'personal' | 'social' | 'skills' | 'projects' | 'experience' | 'education';

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS: TabConfig[] = [
  { id: 'personal',   label: 'Personal',   icon: User },
  { id: 'social',     label: 'Social',     icon: Link2 },
  { id: 'skills',     label: 'Skills',     icon: Cpu },
  { id: 'projects',   label: 'Projects',   icon: FolderKanban },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education',  label: 'Education',  icon: GraduationCap },
];

const SKILL_CATEGORIES = ['Frontend', 'Backend', 'Language', 'Database', 'DevOps', 'Design', 'Mobile', 'Other'];

const LEVEL_COLOR_MAP: { min: number; color: string; label: string }[] = [
  { min: 85, color: '#6366f1', label: 'Expert' },
  { min: 70, color: '#8b5cf6', label: 'Advanced' },
  { min: 50, color: '#a78bfa', label: 'Intermediate' },
  { min: 0,  color: '#c4b5fd', label: 'Beginner' },
];

function getLevelMeta(level: number) {
  return LEVEL_COLOR_MAP.find((m) => level >= m.min) ?? LEVEL_COLOR_MAP[LEVEL_COLOR_MAP.length - 1];
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Shared field styles ──────────────────────────────────────────────────────

const fieldBase =
  'w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 focus:border-indigo-500/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]';

const labelBase = 'block text-xs font-medium text-slate-400 mb-1.5';

// ─── Reusable form atoms ──────────────────────────────────────────────────────

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelBase}>{label}</label>
      {children}
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <FieldGroup label={label}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={fieldBase}
      />
    </FieldGroup>
  );
}

function TextareaInput({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <FieldGroup label={label}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn(fieldBase, 'resize-none leading-relaxed')}
      />
    </FieldGroup>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px bg-white/[0.06]" />
      <span className="text-xs text-slate-600 font-medium uppercase tracking-wider">{label}</span>
      <div className="flex-1 h-px bg-white/[0.06]" />
    </div>
  );
}

// ─── Tab: Personal ────────────────────────────────────────────────────────────

function PersonalTab() {
  const { portfolio, updatePersonal } = usePortfolio();

  return (
    <div className="space-y-4">
      <SectionDivider label="Basic Info" />
      <TextInput
        label="Full Name"
        value={portfolio.name}
        onChange={(v) => updatePersonal({ name: v })}
        placeholder="e.g. Alex Johnson"
      />
      <TextInput
        label="Professional Title"
        value={portfolio.title}
        onChange={(v) => updatePersonal({ title: v })}
        placeholder="e.g. Full-Stack Developer"
      />
      <TextareaInput
        label="Bio"
        value={portfolio.bio}
        onChange={(v) => updatePersonal({ bio: v })}
        placeholder="Tell the world who you are..."
        rows={4}
      />
      <SectionDivider label="Contact" />
      <TextInput
        label="Email"
        value={portfolio.email}
        onChange={(v) => updatePersonal({ email: v })}
        placeholder="you@example.com"
        type="email"
      />
      <TextInput
        label="Location"
        value={portfolio.location ?? ''}
        onChange={(v) => updatePersonal({ location: v })}
        placeholder="e.g. San Francisco, CA"
      />
      <TextInput
        label="Resume URL"
        value={portfolio.resumeUrl ?? ''}
        onChange={(v) => updatePersonal({ resumeUrl: v })}
        placeholder="https://drive.google.com/..."
      />
    </div>
  );
}

// ─── Tab: Social ──────────────────────────────────────────────────────────────

interface SocialField {
  key: keyof NonNullable<ReturnType<typeof usePortfolio>['portfolio']['social']>;
  label: string;
  icon: React.ElementType;
  placeholder: string;
}

const SOCIAL_FIELDS: SocialField[] = [
  { key: 'github',   label: 'GitHub',   icon: GitBranch, placeholder: 'github.com/username' },
  { key: 'linkedin', label: 'LinkedIn', icon: Briefcase, placeholder: 'linkedin.com/in/username' },
  { key: 'twitter',  label: 'Twitter',  icon: AtSign,    placeholder: 'twitter.com/username' },
  { key: 'youtube',  label: 'YouTube',  icon: Video,     placeholder: 'youtube.com/@channel' },
  { key: 'website',  label: 'Website',  icon: Globe,     placeholder: 'yoursite.com' },
];

function SocialTab() {
  const { portfolio, updateSocial } = usePortfolio();

  return (
    <div className="space-y-4">
      <SectionDivider label="Social Links" />
      {SOCIAL_FIELDS.map(({ key, label, icon: Icon, placeholder }) => (
        <div key={key}>
          <label className={labelBase}>{label}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              <Icon size={14} />
            </span>
            <input
              type="url"
              value={portfolio.social[key] ?? ''}
              onChange={(e) => updateSocial({ [key]: e.target.value })}
              placeholder={placeholder}
              className={cn(fieldBase, 'pl-9')}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Tab: Skills ──────────────────────────────────────────────────────────────

function SkillRow({
  skill,
  index,
  onUpdate,
  onRemove,
}: {
  skill: Skill;
  index: number;
  onUpdate: (index: number, skill: Skill) => void;
  onRemove: (index: number) => void;
}) {
  const meta = getLevelMeta(skill.level);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16, transition: { duration: 0.18 } }}
      className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2.5"
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={skill.name}
          onChange={(e) => onUpdate(index, { ...skill, name: e.target.value })}
          placeholder="Skill name"
          className={cn(fieldBase, 'flex-1 py-2 text-xs')}
        />
        <select
          value={skill.category}
          onChange={(e) => onUpdate(index, { ...skill, category: e.target.value })}
          className={cn(fieldBase, 'w-32 py-2 text-xs')}
        >
          {SKILL_CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-[#0a1128]">
              {c}
            </option>
          ))}
        </select>
        <button
          onClick={() => onRemove(index)}
          className="shrink-0 p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Level slider */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-500">Proficiency</span>
          <span className="text-xs font-semibold" style={{ color: meta.color }}>
            {skill.level}% — {meta.label}
          </span>
        </div>
        <div className="relative h-5 flex items-center">
          {/* Track */}
          <div className="absolute inset-0 h-1.5 my-auto rounded-full bg-white/[0.07]" />
          {/* Fill */}
          <div
            className="absolute left-0 h-1.5 my-auto rounded-full transition-all duration-100"
            style={{ width: `${skill.level}%`, background: meta.color }}
          />
          <input
            type="range"
            min={0}
            max={100}
            value={skill.level}
            onChange={(e) => onUpdate(index, { ...skill, level: Number(e.target.value) })}
            className="relative w-full appearance-none bg-transparent cursor-pointer z-10"
            style={{ '--thumb-color': meta.color } as React.CSSProperties}
          />
        </div>
      </div>
    </motion.div>
  );
}

function SkillsTab() {
  const { portfolio, addSkill, updateSkill, removeSkill } = usePortfolio();

  const handleAdd = useCallback(() => {
    addSkill({ name: '', level: 60, category: 'Frontend' });
  }, [addSkill]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <SectionDivider label={`${portfolio.skills.length} Skills`} />
        <button
          onClick={handleAdd}
          className="ml-3 shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
        >
          <Plus size={12} />
          Add Skill
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {portfolio.skills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8 text-center text-slate-600 text-sm"
          >
            No skills yet. Click "Add Skill" to get started.
          </motion.div>
        )}
        {portfolio.skills.map((skill, i) => (
          <SkillRow
            key={`${i}-${skill.name}`}
            skill={skill}
            index={i}
            onUpdate={updateSkill}
            onRemove={removeSkill}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Tab: Projects ────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  onUpdate,
  onRemove,
}: {
  project: Project;
  onUpdate: (id: string, p: Partial<Project>) => void;
  onRemove: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,$/, '');
      if (newTag && !project.tags.includes(newTag)) {
        onUpdate(project.id, { tags: [...project.tags, newTag] });
      }
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    onUpdate(project.id, { tags: project.tags.filter((t) => t !== tag) });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16, transition: { duration: 0.18 } }}
      className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
    >
      {/* Header row */}
      <div className="flex items-center gap-3 px-3 py-2.5">
        <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center shrink-0">
          <FolderKanban size={13} className="text-indigo-400" />
        </div>
        <p className="flex-1 text-sm font-medium text-slate-200 truncate">
          {project.title || <span className="text-slate-600 italic">Untitled Project</span>}
        </p>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="p-1 rounded-lg text-slate-500 hover:text-slate-300 transition-colors"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        <button
          onClick={() => onRemove(project.id)}
          className="p-1 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-3 border-t border-white/[0.05]">
              <div className="pt-3">
                <TextInput
                  label="Title"
                  value={project.title}
                  onChange={(v) => onUpdate(project.id, { title: v })}
                  placeholder="Project title"
                />
              </div>
              <TextareaInput
                label="Description"
                value={project.description}
                onChange={(v) => onUpdate(project.id, { description: v })}
                placeholder="What does this project do?"
                rows={3}
              />
              <TextInput
                label="Live URL"
                value={project.link ?? ''}
                onChange={(v) => onUpdate(project.id, { link: v })}
                placeholder="https://example.com"
              />
              <TextInput
                label="GitHub URL"
                value={project.github ?? ''}
                onChange={(v) => onUpdate(project.id, { github: v })}
                placeholder="https://github.com/..."
              />
              {/* Tags */}
              <div>
                <label className={labelBase}>Tags</label>
                <div className="flex flex-wrap gap-1.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] min-h-[40px]">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-red-400 transition-colors">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add tag, press Enter"
                    className="flex-1 min-w-[100px] bg-transparent outline-none text-xs text-slate-300 placeholder-slate-600"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProjectsTab() {
  const { portfolio, addProject, updateProject, removeProject } = usePortfolio();

  const handleAdd = useCallback(() => {
    addProject({
      id: generateId(),
      title: '',
      description: '',
      tags: [],
    });
  }, [addProject]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <SectionDivider label={`${portfolio.projects.length} Projects`} />
        <button
          onClick={handleAdd}
          className="ml-3 shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
        >
          <Plus size={12} />
          Add Project
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {portfolio.projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8 text-center text-slate-600 text-sm"
          >
            No projects yet. Click "Add Project" to get started.
          </motion.div>
        )}
        {portfolio.projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onUpdate={updateProject}
            onRemove={removeProject}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Tab: Experience ──────────────────────────────────────────────────────────

function ExperienceCard({
  exp,
  onUpdate,
  onRemove,
}: {
  exp: Experience;
  onUpdate: (id: string, e: Partial<Experience>) => void;
  onRemove: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16, transition: { duration: 0.18 } }}
      className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
    >
      <div className="flex items-center gap-3 px-3 py-2.5">
        <div className="w-7 h-7 rounded-lg bg-violet-500/15 flex items-center justify-center shrink-0">
          <Briefcase size={13} className="text-violet-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-200 truncate">
            {exp.role || <span className="text-slate-600 italic">Role</span>}
          </p>
          <p className="text-xs text-slate-500 truncate">{exp.company}</p>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="p-1 rounded-lg text-slate-500 hover:text-slate-300 transition-colors"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        <button
          onClick={() => onRemove(exp.id)}
          className="p-1 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-3 border-t border-white/[0.05] pt-3">
              <TextInput
                label="Company"
                value={exp.company}
                onChange={(v) => onUpdate(exp.id, { company: v })}
                placeholder="Company name"
              />
              <TextInput
                label="Role / Title"
                value={exp.role}
                onChange={(v) => onUpdate(exp.id, { role: v })}
                placeholder="e.g. Senior Developer"
              />
              <div className="grid grid-cols-2 gap-2">
                <TextInput
                  label="Start Date"
                  value={exp.startDate}
                  onChange={(v) => onUpdate(exp.id, { startDate: v })}
                  placeholder="2022-01"
                />
                <TextInput
                  label="End Date"
                  value={exp.endDate ?? ''}
                  onChange={(v) => onUpdate(exp.id, { endDate: v })}
                  placeholder="2024-06"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onChange={(e) => onUpdate(exp.id, { current: e.target.checked })}
                  className="rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500/50"
                />
                <label htmlFor={`current-${exp.id}`} className="text-xs text-slate-400">
                  Currently working here
                </label>
              </div>
              <TextareaInput
                label="Description"
                value={exp.description}
                onChange={(v) => onUpdate(exp.id, { description: v })}
                placeholder="Describe your responsibilities and achievements..."
                rows={3}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ExperienceTab() {
  const { portfolio, addExperience, updateExperience, removeExperience } = usePortfolio();

  const handleAdd = useCallback(() => {
    addExperience({
      id: generateId(),
      company: '',
      role: '',
      startDate: '',
      current: false,
      description: '',
    });
  }, [addExperience]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <SectionDivider label={`${portfolio.experience.length} Positions`} />
        <button
          onClick={handleAdd}
          className="ml-3 shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 transition-colors"
        >
          <Plus size={12} />
          Add
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {portfolio.experience.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8 text-center text-slate-600 text-sm"
          >
            No experience added yet.
          </motion.div>
        )}
        {portfolio.experience.map((exp) => (
          <ExperienceCard
            key={exp.id}
            exp={exp}
            onUpdate={updateExperience}
            onRemove={removeExperience}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Tab: Education ───────────────────────────────────────────────────────────

function EducationCard({
  edu,
  onUpdate,
  onRemove,
}: {
  edu: Education;
  onUpdate: (id: string, e: Partial<Education>) => void;
  onRemove: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16, transition: { duration: 0.18 } }}
      className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
    >
      <div className="flex items-center gap-3 px-3 py-2.5">
        <div className="w-7 h-7 rounded-lg bg-fuchsia-500/15 flex items-center justify-center shrink-0">
          <GraduationCap size={13} className="text-fuchsia-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-200 truncate">
            {edu.degree || <span className="text-slate-600 italic">Degree</span>}
          </p>
          <p className="text-xs text-slate-500 truncate">{edu.institution}</p>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="p-1 rounded-lg text-slate-500 hover:text-slate-300 transition-colors"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        <button
          onClick={() => onRemove(edu.id)}
          className="p-1 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-3 border-t border-white/[0.05] pt-3">
              <TextInput
                label="Institution"
                value={edu.institution}
                onChange={(v) => onUpdate(edu.id, { institution: v })}
                placeholder="University / School name"
              />
              <TextInput
                label="Degree"
                value={edu.degree}
                onChange={(v) => onUpdate(edu.id, { degree: v })}
                placeholder="e.g. Bachelor of Science"
              />
              <TextInput
                label="Field of Study"
                value={edu.field}
                onChange={(v) => onUpdate(edu.id, { field: v })}
                placeholder="e.g. Computer Science"
              />
              <div className="grid grid-cols-2 gap-2">
                <TextInput
                  label="Start Date"
                  value={edu.startDate}
                  onChange={(v) => onUpdate(edu.id, { startDate: v })}
                  placeholder="2016-09"
                />
                <TextInput
                  label="End Date"
                  value={edu.endDate ?? ''}
                  onChange={(v) => onUpdate(edu.id, { endDate: v })}
                  placeholder="2020-05"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-edu-${edu.id}`}
                  checked={edu.current}
                  onChange={(e) => onUpdate(edu.id, { current: e.target.checked })}
                  className="rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500/50"
                />
                <label htmlFor={`current-edu-${edu.id}`} className="text-xs text-slate-400">
                  Currently studying here
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function EducationTab() {
  const { portfolio, addEducation, updateEducation, removeEducation } = usePortfolio();

  const handleAdd = useCallback(() => {
    addEducation({
      id: generateId(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      current: false,
    });
  }, [addEducation]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <SectionDivider label={`${portfolio.education.length} Entries`} />
        <button
          onClick={handleAdd}
          className="ml-3 shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-fuchsia-300 bg-fuchsia-500/10 border border-fuchsia-500/20 hover:bg-fuchsia-500/20 transition-colors"
        >
          <Plus size={12} />
          Add
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {portfolio.education.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8 text-center text-slate-600 text-sm"
          >
            No education added yet.
          </motion.div>
        )}
        {portfolio.education.map((edu) => (
          <EducationCard
            key={edu.id}
            edu={edu}
            onUpdate={updateEducation}
            onRemove={removeEducation}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Save Status Indicator ────────────────────────────────────────────────────

function SaveStatus({ isSaving, isDirty }: { isSaving: boolean; isDirty: boolean }) {
  if (isSaving) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-slate-400">
        <Loader2 size={13} className="animate-spin text-indigo-400" />
        Saving...
      </span>
    );
  }
  if (isDirty) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-amber-400">
        <AlertCircle size={13} />
        Unsaved changes
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-xs text-emerald-400">
      <CheckCircle2 size={13} />
      Saved
    </span>
  );
}

// ─── Tab Panels Map ───────────────────────────────────────────────────────────

const TAB_PANELS: Record<TabId, React.ComponentType> = {
  personal:   PersonalTab,
  social:     SocialTab,
  skills:     SkillsTab,
  projects:   ProjectsTab,
  experience: ExperienceTab,
  education:  EducationTab,
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EditorPage() {
  const { portfolio, isSaving, isDirty, publishPortfolio } = usePortfolio();
  const [activeTab, setActiveTab] = useState<TabId>('personal');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = useCallback(async () => {
    setIsPublishing(true);
    await publishPortfolio();
    setIsPublishing(false);
  }, [publishPortfolio]);

  const ActivePanel = TAB_PANELS[activeTab];

  return (
    <div className="flex flex-col h-screen bg-[#040817] overflow-hidden">
      {/* ── Top Bar ── */}
      <header className="shrink-0 flex items-center justify-between gap-4 px-6 py-3 border-b border-white/[0.06] bg-[#040817]/90 backdrop-blur-xl z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Pencil size={13} className="text-white" />
            </div>
            <h1 className="text-base font-semibold text-white hidden sm:block">Portfolio Editor</h1>
          </div>
          <SaveStatus isSaving={isSaving} isDirty={isDirty} />
        </div>

        <div className="flex items-center gap-2">
          {/* Preview live */}
          <a
            href={`/portfolio/${portfolio.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-colors"
          >
            <Eye size={13} />
            Preview Live
          </a>

          {/* Save */}
          <button
            disabled={isSaving || !isDirty}
            onClick={() => {/* auto-saves via context */ }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Save size={13} />
            Save
          </button>

          {/* Publish */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handlePublish}
            disabled={isPublishing}
            className={cn(
              'flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all',
              portfolio.published
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/25'
                : 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40',
              isPublishing && 'opacity-70 cursor-not-allowed',
            )}
          >
            {isPublishing ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Publishing...
              </>
            ) : portfolio.published ? (
              <>
                <Globe size={13} />
                Published
              </>
            ) : (
              <>
                <Globe size={13} />
                Publish
              </>
            )}
          </motion.button>
        </div>
      </header>

      {/* ── Main split panel ── */}
      <div className="flex flex-1 min-h-0">
        {/* Left panel: Editor sidebar (40%) */}
        <div className="w-full lg:w-[40%] xl:w-[38%] flex flex-col border-r border-white/[0.06] min-h-0">
          {/* Tab navigation */}
          <div className="shrink-0 flex overflow-x-auto border-b border-white/[0.06] bg-[#040817]/60 backdrop-blur-sm">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'relative flex items-center gap-1.5 px-3.5 py-3 text-xs font-medium whitespace-nowrap transition-all duration-150 border-b-2',
                    active
                      ? 'text-indigo-300 border-indigo-500'
                      : 'text-slate-500 border-transparent hover:text-slate-300 hover:border-white/10',
                  )}
                >
                  <Icon size={13} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab content area */}
          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <ActivePanel />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right panel: Live preview (60%) */}
        <div className="hidden lg:flex flex-col flex-1 min-h-0 bg-[#030611]">
          {/* Preview toolbar */}
          <div className="shrink-0 flex items-center justify-between px-5 py-2.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-500 font-medium">Live Preview</span>
            </div>

            {/* View mode toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
              <button
                onClick={() => setViewMode('desktop')}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all',
                  viewMode === 'desktop'
                    ? 'bg-indigo-500/20 text-indigo-300 shadow-sm'
                    : 'text-slate-500 hover:text-slate-300',
                )}
              >
                <Monitor size={12} />
                Desktop
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all',
                  viewMode === 'mobile'
                    ? 'bg-indigo-500/20 text-indigo-300 shadow-sm'
                    : 'text-slate-500 hover:text-slate-300',
                )}
              >
                <Smartphone size={12} />
                Mobile
              </button>
            </div>
          </div>

          {/* Preview area */}
          <div className="flex-1 overflow-y-auto flex items-start justify-center p-6">
            {/* Subtle grid bg */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.015]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div
              className={cn(
                'relative w-full transition-all duration-300',
                viewMode === 'mobile' ? 'max-w-[400px]' : 'max-w-[720px]',
              )}
            >
              {/* Outer glow */}
              <div className="absolute -inset-4 rounded-3xl bg-indigo-500/5 blur-2xl pointer-events-none" />

              <PortfolioPreview portfolio={portfolio} viewMode={viewMode} />
            </div>
          </div>
        </div>
      </div>

      {/* Slider thumb custom styles */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--thumb-color, #6366f1);
          border: 2px solid rgba(255,255,255,0.15);
          box-shadow: 0 0 6px var(--thumb-color, #6366f1);
          cursor: pointer;
          transition: box-shadow 0.15s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 10px var(--thumb-color, #6366f1);
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--thumb-color, #6366f1);
          border: 2px solid rgba(255,255,255,0.15);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
