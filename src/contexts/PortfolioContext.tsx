'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { PortfolioData, defaultPortfolioData, PortfolioTemplate, Skill, Project, Experience, Education } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import type { ProfileRow, Database } from '@/lib/supabase/types';

type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

// ─── Mapping helpers ───────────────────────────────────────────────────────────

function rowToPortfolio(row: ProfileRow): PortfolioData {
  return {
    id: row.id,
    username: row.username,
    name: row.name ?? '',
    title: row.title ?? '',
    bio: row.bio ?? '',
    email: row.email ?? '',
    location: row.location ?? '',
    avatar: row.avatar_url ?? '',
    resumeUrl: row.resume_url ?? '',
    social: ((row.social ?? {}) as unknown) as PortfolioData['social'],
    skills: ((row.skills ?? []) as unknown) as Skill[],
    projects: ((row.projects ?? []) as unknown) as Project[],
    experience: ((row.experience ?? []) as unknown) as Experience[],
    education: ((row.education ?? []) as unknown) as Education[],
    template: (row.template as PortfolioTemplate) ?? 'developer',
    primaryColor: row.primary_color ?? '#6366f1',
    accentColor: row.accent_color ?? '#8b5cf6',
    font: row.font ?? 'inter',
    darkMode: row.dark_mode ?? true,
    published: row.published ?? false,
  };
}

// Supabase JSONB columns use the Json union type; we cast through unknown
// because our typed arrays (Skill[], Project[], etc.) are structurally
// compatible at runtime even though they don't overlap with Json statically.
function portfolioToRow(p: PortfolioData): ProfileUpdate {
  return {
    username: p.username,
    name: p.name || null,
    title: p.title || null,
    bio: p.bio || null,
    email: p.email || null,
    location: p.location || null,
    avatar_url: p.avatar || null,
    resume_url: p.resumeUrl || null,
    social: p.social as unknown as ProfileUpdate['social'],
    skills: (p.skills as unknown) as ProfileUpdate['skills'],
    projects: (p.projects as unknown) as ProfileUpdate['projects'],
    experience: (p.experience as unknown) as ProfileUpdate['experience'],
    education: (p.education as unknown) as ProfileUpdate['education'],
    template: p.template,
    primary_color: p.primaryColor,
    accent_color: p.accentColor,
    font: p.font,
    dark_mode: p.darkMode,
    published: p.published,
  };
}

// Supabase v2 + strict RejectExcessProperties: we need to double-assert
// through `unknown` when passing the update payload to avoid the never type.
async function dbUpdate(
  supabase: ReturnType<typeof createClient>,
  id: string,
  payload: ProfileUpdate,
) {
  return supabase
    .from('profiles')
    .update(payload as never)  // `as never` bypasses RejectExcessProperties — safe because ProfileUpdate matches the schema exactly
    .eq('id', id);
}

// ─── Context type ──────────────────────────────────────────────────────────────

interface PortfolioContextType {
  portfolio: PortfolioData;
  updatePortfolio: (updates: Partial<PortfolioData>) => void;
  updatePersonal: (data: Partial<Pick<PortfolioData, 'name' | 'title' | 'bio' | 'email' | 'location' | 'avatar' | 'resumeUrl'>>) => void;
  updateSocial: (data: Partial<PortfolioData['social']>) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (index: number, skill: Skill) => void;
  removeSkill: (index: number) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  setTemplate: (template: PortfolioTemplate) => void;
  setTheme: (primary: string, accent: string) => void;
  setFont: (font: string) => void;
  toggleDarkMode: () => void;
  publishPortfolio: () => Promise<void>;
  unpublishPortfolio: () => Promise<void>;
  saveNow: () => Promise<void>;
  isSaving: boolean;
  isDirty: boolean;
  isLoading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<PortfolioData>(defaultPortfolioData);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const portfolioRef = useRef(portfolio);
  portfolioRef.current = portfolio;

  // ── Load profile on mount ──────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) { setIsLoading(false); return; }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!cancelled) {
        if (data && !error) {
          setPortfolio(rowToPortfolio(data));
        }
        setIsLoading(false);
      }
    }

    loadProfile();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Auto-save with debounce ────────────────────────────────────────────────
  const scheduleSave = useCallback(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setIsSaving(true);
      await dbUpdate(supabase, user.id, portfolioToRow(portfolioRef.current));
      setIsSaving(false);
      setIsDirty(false);
    }, 2000); // 2-second debounce
  }, [supabase]);

  // ── Save immediately ───────────────────────────────────────────────────────
  const saveNow = useCallback(async () => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setIsSaving(true);
    await dbUpdate(supabase, user.id, portfolioToRow(portfolioRef.current));
    setIsSaving(false);
    setIsDirty(false);
  }, [supabase]);

  // ── Generic updater ────────────────────────────────────────────────────────
  const touch = useCallback((updater: (prev: PortfolioData) => PortfolioData) => {
    setPortfolio(updater);
    setIsDirty(true);
    scheduleSave();
  }, [scheduleSave]);

  // ── Public mutation methods ────────────────────────────────────────────────
  const updatePortfolio = useCallback((updates: Partial<PortfolioData>) => {
    touch(prev => ({ ...prev, ...updates }));
  }, [touch]);

  const updatePersonal = useCallback((data: Partial<Pick<PortfolioData, 'name' | 'title' | 'bio' | 'email' | 'location' | 'avatar' | 'resumeUrl'>>) => {
    touch(prev => ({ ...prev, ...data }));
  }, [touch]);

  const updateSocial = useCallback((data: Partial<PortfolioData['social']>) => {
    touch(prev => ({ ...prev, social: { ...prev.social, ...data } }));
  }, [touch]);

  const addSkill = useCallback((skill: Skill) => {
    touch(prev => ({ ...prev, skills: [...prev.skills, skill] }));
  }, [touch]);

  const updateSkill = useCallback((index: number, skill: Skill) => {
    touch(prev => {
      const skills = [...prev.skills];
      skills[index] = skill;
      return { ...prev, skills };
    });
  }, [touch]);

  const removeSkill = useCallback((index: number) => {
    touch(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  }, [touch]);

  const addProject = useCallback((project: Project) => {
    touch(prev => ({ ...prev, projects: [...prev.projects, project] }));
  }, [touch]);

  const updateProject = useCallback((id: string, project: Partial<Project>) => {
    touch(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...project } : p),
    }));
  }, [touch]);

  const removeProject = useCallback((id: string) => {
    touch(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  }, [touch]);

  const addExperience = useCallback((exp: Experience) => {
    touch(prev => ({ ...prev, experience: [...prev.experience, exp] }));
  }, [touch]);

  const updateExperience = useCallback((id: string, exp: Partial<Experience>) => {
    touch(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, ...exp } : e),
    }));
  }, [touch]);

  const removeExperience = useCallback((id: string) => {
    touch(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  }, [touch]);

  const addEducation = useCallback((edu: Education) => {
    touch(prev => ({ ...prev, education: [...prev.education, edu] }));
  }, [touch]);

  const updateEducation = useCallback((id: string, edu: Partial<Education>) => {
    touch(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, ...edu } : e),
    }));
  }, [touch]);

  const removeEducation = useCallback((id: string) => {
    touch(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  }, [touch]);

  const setTemplate = useCallback((template: PortfolioTemplate) => {
    touch(prev => ({ ...prev, template }));
  }, [touch]);

  const setTheme = useCallback((primaryColor: string, accentColor: string) => {
    touch(prev => ({ ...prev, primaryColor, accentColor }));
  }, [touch]);

  const setFont = useCallback((font: string) => {
    touch(prev => ({ ...prev, font }));
  }, [touch]);

  const toggleDarkMode = useCallback(() => {
    touch(prev => ({ ...prev, darkMode: !prev.darkMode }));
  }, [touch]);

  const publishPortfolio = useCallback(async () => {
    setIsSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await dbUpdate(supabase, user.id, { published: true, ...portfolioToRow(portfolioRef.current) });
    }
    setPortfolio(prev => ({ ...prev, published: true }));
    setIsSaving(false);
    setIsDirty(false);
  }, [supabase]);

  const unpublishPortfolio = useCallback(async () => {
    setIsSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await dbUpdate(supabase, user.id, { published: false });
    }
    setPortfolio(prev => ({ ...prev, published: false }));
    setIsSaving(false);
  }, [supabase]);

  return (
    <PortfolioContext.Provider value={{
      portfolio,
      updatePortfolio,
      updatePersonal,
      updateSocial,
      addSkill, updateSkill, removeSkill,
      addProject, updateProject, removeProject,
      addExperience, updateExperience, removeExperience,
      addEducation, updateEducation, removeEducation,
      setTemplate,
      setTheme,
      setFont,
      toggleDarkMode,
      publishPortfolio,
      unpublishPortfolio,
      saveNow,
      isSaving,
      isDirty,
      isLoading,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
