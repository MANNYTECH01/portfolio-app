'use client';

import {
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {
  motion,
  AnimatePresence,
  type HTMLMotionProps,
} from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  children?: ReactNode;
  className?: string;
  overlayClassName?: string;
}

// ─── Size Map ─────────────────────────────────────────────────────────────────

const sizeStyles: Record<ModalSize, string> = {
  sm:   'max-w-sm   w-full',
  md:   'max-w-md   w-full',
  lg:   'max-w-2xl  w-full',
  xl:   'max-w-4xl  w-full',
  full: 'max-w-[calc(100vw-2rem)] w-full min-h-[calc(100vh-4rem)]',
};

// ─── Animation Variants ───────────────────────────────────────────────────────

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' as const } },
  exit:    { opacity: 0, transition: { duration: 0.2,  ease: 'easeIn'  as const } },
};

const panelVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 24,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 380,
      damping: 30,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 12,
    transition: { duration: 0.18, ease: 'easeIn' as const },
  },
};

// ─── Close Button ─────────────────────────────────────────────────────────────

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <motion.button
      type="button"
      aria-label="Close modal"
      onClick={onClose}
      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={cn(
        'flex items-center justify-center',
        'w-8 h-8 rounded-lg',
        'text-slate-400 hover:text-white',
        'bg-white/5 border border-white/10',
        'transition-colors duration-150',
        'focus-visible:ring-2 focus-visible:ring-indigo-500/60 outline-none',
      )}
    >
      {/* ✕ icon drawn inline — no icon library dependency */}
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </motion.button>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Modal({
  open,
  onClose,
  title,
  description,
  footer,
  size = 'md',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  children,
  className,
  overlayClassName,
}: ModalProps) {
  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') onClose();
    },
    [closeOnEscape, onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll while modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        /* ── Overlay ── */
        <motion.div
          key="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={closeOnBackdropClick ? onClose : undefined}
          className={cn(
            'fixed inset-0 z-50 flex items-center justify-center p-4',
            'bg-[#040817]/80 backdrop-blur-md',
            overlayClassName,
          )}
          aria-modal="true"
          role="dialog"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
        >
          {/* ── Panel ── */}
          <motion.div
            key="modal-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              sizeStyles[size],
              // glass morphism
              'bg-[#070d1e]/90 backdrop-blur-2xl',
              'rounded-2xl',
              'border border-white/[0.07]',
              'shadow-[0_24px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(99,102,241,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]',
              'overflow-hidden',
              className,
            )}
          >
            {/* ── Header ── */}
            {(title || true) && (
              <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-white/[0.06]">
                <div className="flex-1 min-w-0">
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-lg font-semibold text-white leading-snug truncate"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p
                      id="modal-description"
                      className="mt-1 text-sm text-slate-400 leading-relaxed"
                    >
                      {description}
                    </p>
                  )}
                </div>
                <CloseButton onClose={onClose} />
              </div>
            )}

            {/* ── Body ── */}
            {children && (
              <div className="px-6 py-5 text-slate-300 text-sm leading-relaxed">
                {children}
              </div>
            )}

            {/* ── Footer ── */}
            {footer && (
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.06] bg-white/[0.02]">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Modal.displayName = 'Modal';

export default Modal;
