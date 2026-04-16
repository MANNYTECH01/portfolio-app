import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DeveloperTemplate from '@/components/templates/DeveloperTemplate';
import type { PortfolioData, PortfolioTemplate, Skill, Project, Experience, Education } from '@/lib/utils';
import type { ProfileRow } from '@/lib/supabase/types';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ username: string }>;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

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

// ─── Data fetcher ─────────────────────────────────────────────────────────────

async function getPublishedPortfolio(username: string): Promise<PortfolioData | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .eq('published', true)
    .single();

  if (error || !data) return null;
  return rowToPortfolio(data);
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const portfolio = await getPublishedPortfolio(username);

  if (!portfolio) {
    return { title: 'Portfolio not found — Folio.AI' };
  }

  return {
    title: `${portfolio.name} — ${portfolio.title}`,
    description: portfolio.bio,
    keywords: [
      portfolio.name,
      portfolio.title,
      'portfolio',
      ...portfolio.skills.slice(0, 6).map(s => s.name),
    ],
    openGraph: {
      type: 'profile',
      title: `${portfolio.name} — ${portfolio.title}`,
      description: portfolio.bio,
      url: `/p/${username}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${portfolio.name} — ${portfolio.title}`,
      description: portfolio.bio,
    },
    alternates: {
      canonical: `/p/${username}`,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PublicPortfolioPage({ params }: PageProps) {
  const { username } = await params;
  const portfolio = await getPublishedPortfolio(username);

  if (!portfolio) {
    notFound();
  }

  return <DeveloperTemplate portfolio={portfolio} />;
}
