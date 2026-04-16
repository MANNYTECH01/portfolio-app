'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLMotionProps<'button'>> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
}

// ─── Variant & Size Maps ──────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'relative overflow-hidden',
    'bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600',
    'text-white font-semibold',
    'shadow-lg shadow-indigo-500/30',
    'border border-indigo-400/20',
  ].join(' '),

  secondary: [
    'bg-white/5 backdrop-blur-sm',
    'text-slate-200 font-medium',
    'border border-white/10',
    'hover:bg-white/10 hover:border-white/20',
  ].join(' '),

  outline: [
    'relative overflow-hidden',
    'bg-transparent',
    'text-indigo-300 font-semibold',
    'border border-indigo-500/50',
    'hover:border-indigo-400 hover:text-indigo-200',
    'before:absolute before:inset-0',
    'before:bg-gradient-to-r before:from-indigo-500/10 before:to-violet-500/10',
    'before:opacity-0 hover:before:opacity-100 before:transition-opacity',
  ].join(' '),

  ghost: [
    'bg-transparent',
    'text-slate-300 font-medium',
    'border border-transparent',
    'hover:bg-white/5 hover:text-white',
  ].join(' '),

  danger: [
    'bg-gradient-to-r from-red-600 to-rose-600',
    'text-white font-semibold',
    'shadow-lg shadow-red-500/25',
    'border border-red-500/20',
  ].join(' '),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm:  'h-8  px-3   text-xs  gap-1.5 rounded-lg',
  md:  'h-10 px-4   text-sm  gap-2   rounded-xl',
  lg:  'h-12 px-6   text-base gap-2.5 rounded-xl',
  xl:  'h-14 px-8   text-lg  gap-3   rounded-2xl',
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4   h-4',
  lg: 'w-5   h-5',
  xl: 'w-6   h-6',
};

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ size }: { size: ButtonSize }) {
  return (
    <span
      className={cn(
        'inline-block animate-spin rounded-full border-2 border-current border-t-transparent opacity-70',
        iconSizeStyles[size],
      )}
      aria-hidden
    />
  );
}

// ─── Shimmer Overlay (primary variant only) ───────────────────────────────────

function PrimaryShimmer() {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
      animate={{ translateX: ['−100%', '200%'] }}
      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    className,
    children,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      ref={ref}
      whileHover={isDisabled ? undefined : { scale: 1.02 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      disabled={isDisabled}
      className={cn(
        // base
        'inline-flex items-center justify-center',
        'select-none outline-none',
        'transition-all duration-200',
        'focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040817]',
        // variant & size
        variantStyles[variant],
        sizeStyles[size],
        // states
        isDisabled && 'cursor-not-allowed opacity-50',
        fullWidth && 'w-full',
        className,
      )}
      {...(rest as HTMLMotionProps<'button'>)}
    >
      {/* shimmer only on primary */}
      {variant === 'primary' && !isDisabled && <PrimaryShimmer />}

      {/* left icon / loading spinner on the left */}
      {isLoading ? (
        <Spinner size={size} />
      ) : leftIcon ? (
        <span className={cn('shrink-0', iconSizeStyles[size])}>{leftIcon}</span>
      ) : null}

      {/* label */}
      {children && (
        <span className={cn(isLoading && 'opacity-70')}>{children}</span>
      )}

      {/* right icon */}
      {!isLoading && rightIcon && (
        <span className={cn('shrink-0', iconSizeStyles[size])}>{rightIcon}</span>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export { Button };
export default Button;
