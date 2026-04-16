'use client';

import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
  useId,
} from 'react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputVariant = 'default' | 'filled';

interface InputBaseProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: InputVariant;
  fullWidth?: boolean;
  wrapperClassName?: string;
}

export interface InputProps
  extends InputBaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {}

export interface TextareaProps
  extends InputBaseProps,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
  resize?: boolean;
}

// ─── Shared Styles ────────────────────────────────────────────────────────────

function getFieldStyles(
  variant: InputVariant,
  hasError: boolean,
  hasLeftIcon: boolean,
  hasRightIcon: boolean,
): string {
  return cn(
    // base — reuses the .input-premium global class plus extras
    'input-premium',
    'transition-all duration-200',
    // icon padding overrides
    hasLeftIcon && 'pl-10',
    hasRightIcon && 'pr-10',
    // variant specifics
    variant === 'filled' && 'bg-white/8 border-white/12',
    // error state
    hasError &&
      'border-red-500/60 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]',
  );
}

// ─── Label ────────────────────────────────────────────────────────────────────

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-slate-300 mb-1.5"
    >
      {children}
    </label>
  );
}

// ─── Helper row (error / hint) ────────────────────────────────────────────────

function FieldHelper({ error, hint }: { error?: string; hint?: string }) {
  if (!error && !hint) return null;
  return (
    <p
      className={cn(
        'mt-1.5 text-xs',
        error ? 'text-red-400' : 'text-slate-500',
      )}
    >
      {error ?? hint}
    </p>
  );
}

// ─── Icon wrapper ─────────────────────────────────────────────────────────────

function IconSlot({
  side,
  children,
}: {
  side: 'left' | 'right';
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 flex items-center justify-center',
        side === 'left' ? 'left-3' : 'right-3',
      )}
    >
      {children}
    </span>
  );
}

// ─── Focus-glow ring wrapper ──────────────────────────────────────────────────
// The ring is already handled by .input-premium:focus via globals.css
// We add a subtle animated outer glow using a div trick for extra premium feel.

function GlowWrapper({
  focused,
  hasError,
  children,
}: {
  focused: boolean;
  hasError: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'relative rounded-xl transition-all duration-300',
        focused && !hasError && 'shadow-[0_0_0_3px_rgba(99,102,241,0.18)]',
        focused && hasError && 'shadow-[0_0_0_3px_rgba(239,68,68,0.15)]',
      )}
    >
      {children}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    variant = 'default',
    fullWidth = true,
    wrapperClassName,
    className,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const id = useId();

  return (
    <div className={cn(fullWidth && 'w-full', wrapperClassName)}>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

      <GlowWrapper focused={focused} hasError={!!error}>
        {leftIcon && <IconSlot side="left">{leftIcon}</IconSlot>}

        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error || hint ? `${id}-helper` : undefined}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            getFieldStyles(variant, !!error, !!leftIcon, !!rightIcon),
            'rounded-xl',
            className,
          )}
          {...rest}
        />

        {rightIcon && <IconSlot side="right">{rightIcon}</IconSlot>}
      </GlowWrapper>

      <div id={`${id}-helper`}>
        <FieldHelper error={error} hint={hint} />
      </div>
    </div>
  );
});

Input.displayName = 'Input';

// ─── Textarea ─────────────────────────────────────────────────────────────────

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    variant = 'default',
    fullWidth = true,
    wrapperClassName,
    className,
    rows = 4,
    resize = true,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const id = useId();

  return (
    <div className={cn(fullWidth && 'w-full', wrapperClassName)}>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

      <GlowWrapper focused={focused} hasError={!!error}>
        {leftIcon && (
          <span className="pointer-events-none absolute top-3 left-3 text-slate-500 w-4 h-4 flex items-center justify-center">
            {leftIcon}
          </span>
        )}

        <textarea
          ref={ref}
          id={id}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error || hint ? `${id}-helper` : undefined}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            getFieldStyles(variant, !!error, !!leftIcon, !!rightIcon),
            'rounded-xl',
            !resize && 'resize-none',
            className,
          )}
          {...rest}
        />

        {rightIcon && (
          <span className="pointer-events-none absolute top-3 right-3 text-slate-500 w-4 h-4 flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </GlowWrapper>

      <div id={`${id}-helper`}>
        <FieldHelper error={error} hint={hint} />
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

export { Input, Textarea };
export default Input;
