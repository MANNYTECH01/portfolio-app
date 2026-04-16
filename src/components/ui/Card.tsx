'use client';

import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardVariant = 'glass' | 'premium' | 'solid' | 'flat';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof HTMLMotionProps<'div'>> {
  variant?: CardVariant;
  padding?: CardPadding;
  header?: ReactNode;
  footer?: ReactNode;
  hoverable?: boolean;
  children?: ReactNode;
  className?: string;
  headerClassName?: string;
  footerClassName?: string;
  bodyClassName?: string;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const variantStyles: Record<CardVariant, string> = {
  glass: [
    'bg-white/[0.03] backdrop-blur-xl',
    'border border-white/[0.07]',
    'shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]',
  ].join(' '),

  premium: [
    // gradient border via ring + pseudo-element trick using Tailwind's ring
    'relative',
    'bg-[#070d1e]',
    'before:absolute before:inset-0 before:rounded-[inherit] before:p-px',
    'before:bg-gradient-to-br before:from-indigo-500/40 before:via-violet-500/20 before:to-transparent',
    'before:-z-10',
    'shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(99,102,241,0.15)]',
    'ring-1 ring-inset ring-indigo-500/20',
  ].join(' '),

  solid: [
    'bg-[#0a1128]',
    'border border-white/[0.06]',
    'shadow-[0_4px_24px_rgba(0,0,0,0.3)]',
  ].join(' '),

  flat: [
    'bg-[#0e1530]',
    'border border-white/[0.04]',
  ].join(' '),
};

const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  sm:   'p-3',
  md:   'p-5',
  lg:   'p-6',
  xl:   'p-8',
};

const hoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.005,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function CardHeader({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'px-5 py-4 border-b border-white/[0.06] flex items-center justify-between gap-3',
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardFooter({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'px-5 py-4 border-t border-white/[0.06] flex items-center justify-end gap-3',
        className,
      )}
    >
      {children}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = 'glass',
    padding = 'md',
    header,
    footer,
    hoverable = false,
    children,
    className,
    headerClassName,
    footerClassName,
    bodyClassName,
    ...rest
  },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      variants={hoverable ? hoverVariants : undefined}
      initial={hoverable ? 'rest' : undefined}
      whileHover={hoverable ? 'hover' : undefined}
      className={cn(
        'rounded-2xl overflow-hidden',
        variantStyles[variant],
        hoverable && 'cursor-default',
        className,
      )}
      {...(rest as HTMLMotionProps<'div'>)}
    >
      {/* Optional header slot */}
      {header && <CardHeader className={headerClassName}>{header}</CardHeader>}

      {/* Body */}
      <div className={cn(header || footer ? '' : '', paddingStyles[padding], bodyClassName)}>
        {children}
      </div>

      {/* Optional footer slot */}
      {footer && <CardFooter className={footerClassName}>{footer}</CardFooter>}
    </motion.div>
  );
});

Card.displayName = 'Card';

// ─── Named exports for direct sub-component use ───────────────────────────────

export { Card, CardHeader, CardFooter };
export default Card;
