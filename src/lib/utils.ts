import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function generateUsername(name: string): string {
  return slugify(name) + '-' + Math.random().toString(36).substr(2, 4);
}

export type PortfolioTemplate =
  | 'developer'
  | 'designer'
  | 'backend'
  | 'cloud'
  | 'student'
  | 'freelancer'
  | 'creative';

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  logo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  dribbble?: string;
  behance?: string;
  youtube?: string;
  instagram?: string;
  website?: string;
}

export interface PortfolioData {
  // DB
  id?: string;

  // Personal
  name: string;
  title: string;
  bio: string;
  email: string;
  location?: string;
  avatar?: string;
  resumeUrl?: string;

  // Social
  social: SocialLinks;

  // Content
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];

  // Customize
  template: PortfolioTemplate;
  primaryColor: string;
  accentColor: string;
  font: string;
  darkMode: boolean;

  // Meta
  username: string;
  published: boolean;
}

export const defaultPortfolioData: PortfolioData = {
  name: 'Alex Johnson',
  title: 'Full-Stack Developer',
  bio: 'I build elegant, high-performance web applications that users love. Passionate about clean code and great UX.',
  email: 'alex@example.com',
  location: 'San Francisco, CA',
  avatar: undefined,
  resumeUrl: undefined,
  social: {
    github: 'github.com/alexjohnson',
    linkedin: 'linkedin.com/in/alexjohnson',
    twitter: 'twitter.com/alexjohnson',
  },
  skills: [
    { name: 'React', level: 90, category: 'Frontend' },
    { name: 'TypeScript', level: 85, category: 'Language' },
    { name: 'Node.js', level: 80, category: 'Backend' },
    { name: 'Python', level: 75, category: 'Language' },
    { name: 'PostgreSQL', level: 70, category: 'Database' },
    { name: 'Docker', level: 65, category: 'DevOps' },
  ],
  projects: [
    {
      id: '1',
      title: 'CloudDeploy',
      description: 'A platform for deploying containerized applications with one click.',
      tags: ['React', 'Docker', 'AWS', 'Node.js'],
      link: 'https://clouddeploy.io',
      github: 'https://github.com/alex/clouddeploy',
    },
    {
      id: '2',
      title: 'DataViz Pro',
      description: 'Real-time data visualization dashboard with AI-powered insights.',
      tags: ['Vue.js', 'D3.js', 'Python', 'FastAPI'],
      github: 'https://github.com/alex/dataviz',
    },
    {
      id: '3',
      title: 'TaskFlow',
      description: 'Collaborative project management tool for remote teams.',
      tags: ['Next.js', 'PostgreSQL', 'Redis', 'Socket.io'],
      link: 'https://taskflow.app',
      github: 'https://github.com/alex/taskflow',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'TechCorp',
      role: 'Senior Full-Stack Developer',
      startDate: '2022-01',
      current: true,
      description: 'Leading a team of 5 developers building the next-generation platform. Architected microservices that handle 1M+ daily requests.',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      role: 'Full-Stack Developer',
      startDate: '2020-03',
      endDate: '2021-12',
      current: false,
      description: 'Built core product features from 0 to 50k users. Implemented real-time features using WebSockets.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2016-09',
      endDate: '2020-05',
      current: false,
    },
  ],
  template: 'developer',
  primaryColor: '#6366f1',
  accentColor: '#8b5cf6',
  font: 'inter',
  darkMode: true,
  username: 'alexjohnson',
  published: false,
};
