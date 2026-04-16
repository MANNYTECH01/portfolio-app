'use client';

import {
  useState,
  useRef,
  useId,
  type ReactNode,
  type MouseEvent,
  type FocusEvent,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
}

// ─── Placement Styles & Motion ────────────────────────────────────────────────

type MotionState = { opacity: number; y?: number; x?: number; scale: number };

const placementConfig: Record<
  TooltipPlacement,
  {
    wrapper: string;
    initial: MotionState;
    arrow: string;
  }
> = {
  top: {
    wrapper: 'bottom-full left-1/2 -translate-x-1/2 mb-2.5',
    initial: { opacity: 0, y: 6, scale: 0.92 },
    arrow: 'top-full left-1/2 -translate-x-1/2 border-t-[6px] border-t-[#1a2340] border-x-[5px] border-x-transparent border-b-0',
  },
  bottom: {
    wrapper: 'top-full left-1/2 -translate-x-1/2 mt-2.5',
    initial: { opacity: 0, y: -6, scale: 0.92 },
    arrow: 'bottom-full left-1/2 -translate-x-1/2 border-b-[6px] border-b-[#1a2340] border-x-[5px] border-x-transparent border-t-0',
  },
  left: {
    wrapper: 'right-full top-1/2 -translate-y-1/2 mr-2.5',
    initial: { opacity: 0, x: 6, scale: 0.92 },
    arrow: 'left-full top-1/2 -translate-y-1/2 border-l-[6px] border-l-[#1a2340] border-y-[5px] border-y-transparent border-r-0',
  },
  right: {
    wrapper: 'left-full top-1/2 -translate-y-1/2 ml-2.5',
    initial: { opacity: 0, x: -6, scale: 0.92 },
    arrow: 'right-full top-1/2 -translate-y-1/2 border-r-[6px] border-r-[#1a2340] border-y-[5px] border-y-transparent border-l-0',
  },
};

const tooltipMotion = (placement: TooltipPlacement) => ({
  initial: placementConfig[placement].initial,
  animate: { opacity: 1, y: 0, x: 0, scale: 1 },
  exit:    { ...placementConfig[placement].initial, transition: { duration: 0.12 } },
  transition: { type: 'spring' as const, stiffness: 420, damping: 26, mass: 0.6 },
});

// ─── Component ────────────────────────────────────────────────────────────────

export function Tooltip({
  content,
  placement = 'top',
  delay = 400,
  children,
  className,
  contentClassName,
  disabled = false,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();
  const config = placementConfig[placement];

  function show() {
    if (disabled) return;
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }

  function hide() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setVisible(false);
  }

  function handleMouseEnter(_e: MouseEvent) { show(); }
  function handleMouseLeave(_e: MouseEvent) { hide(); }
  function handleFocus(_e: FocusEvent)       { show(); }
  function handleBlur(_e: FocusEvent)        { hide(); }

  return (
    <span
      className={cn('relative inline-flex items-center', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-describedby={visible ? id : undefined}
    >
      {children}

      <AnimatePresence>
        {visible && (
          <motion.div
            id={id}
            role="tooltip"
            key="tooltip"
            className={cn('absolute z-[9999] pointer-events-none', config.wrapper)}
            {...tooltipMotion(placement)}
          >
            {/* Glass bubble */}
            <div
              className={cn(
                'relative px-3 py-1.5',
                'text-xs font-medium text-slate-200 leading-snug whitespace-nowrap',
                'bg-[#1a2340]/95 backdrop-blur-xl',
                'border border-white/[0.08]',
                'rounded-lg',
                'shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(99,102,241,0.1)]',
                contentClassName,
              )}
            >
              {content}

              {/* Arrow */}
              <span
                aria-hidden
                className={cn('absolute w-0 h-0', config.arrow)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

Tooltip.displayName = 'Tooltip';

export default Tooltip;
