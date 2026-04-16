'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'purple'
  | 'gradient';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}

// ─── Variant Map ──────────────────────────────────────────────────────────────

const variantStyles: Record<
  BadgeVariant,
  { wrapper: string; dot: string }
> = {
  default: {
    wrapper: [
      'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
      'shadow-[0_0_12px_rgba(99,102,241,0.15)]',
    ].join(' '),
    dot: 'bg-indigo-400 shadow-[0_0_6px_rgba(99,102,241,0.8)]',
  },
  success: {
    wrapper: [
      'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      'shadow-[0_0_12px_rgba(16,185,129,0.15)]',
    ].join(' '),
    dot: 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]',
  },
  warning: {
    wrapper: [
      'bg-amber-500/15 border-amber-500/30 text-amber-300',
      'shadow-[0_0_12px_rgba(245,158,11,0.15)]',
    ].join(' '),
    dot: 'bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]',
  },
  error: {
    wrapper: [
      'bg-red-500/15 border-red-500/30 text-red-300',
      'shadow-[0_0_12px_rgba(239,68,68,0.15)]',
    ].join(' '),
    dot: 'bg-red-400 shadow-[0_0_6px_rgba(239,68,68,0.8)]',
  },
  info: {
    wrapper: [
      'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
      'shadow-[0_0_12px_rgba(6,182,212,0.15)]',
    ].join(' '),
    dot: 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]',
  },
  purple: {
    wrapper: [
      'bg-violet-500/15 border-violet-500/30 text-violet-300',
      'shadow-[0_0_12px_rgba(139,92,246,0.15)]',
    ].join(' '),
    dot: 'bg-violet-400 shadow-[0_0_6px_rgba(139,92,246,0.8)]',
  },
  gradient: {
    wrapper: [
      'bg-gradient-to-r from-indigo-500/20 to-violet-500/20',
      'border-indigo-500/30 text-indigo-200',
      'shadow-[0_0_16px_rgba(99,102,241,0.2)]',
    ].join(' '),
    dot: 'bg-gradient-to-r from-indigo-400 to-violet-400 shadow-[0_0_6px_rgba(139,92,246,0.8)]',
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2    py-0.5 text-[0.65rem] gap-1   rounded-md',
  md: 'px-2.5 py-1   text-xs         gap-1.5 rounded-lg',
};

const dotSizeStyles: Record<BadgeSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2   h-2',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  className,
}: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold border',
        'transition-all duration-200',
        styles.wrapper,
        sizeStyles[size],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            'shrink-0 rounded-full',
            dotSizeStyles[size],
            styles.dot,
          )}
          aria-hidden
        />
      )}
      {children}
    </span>
  );
}

Badge.displayName = 'Badge';

export default Badge;
