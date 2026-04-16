'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  User,
  Layers,
  Pencil,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  X,
  Menu,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Nav Config ───────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Portfolio', href: '/dashboard/portfolio', icon: User },
  { label: 'Templates', href: '/dashboard/templates', icon: Layers },
  { label: 'Editor', href: '/dashboard/editor', icon: Pencil },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
] as const;

// ─── Framer variants ──────────────────────────────────────────────────────────

const sidebarVariants = {
  expanded: { width: 256 },
  collapsed: { width: 72 },
};

const overlayVariants = {
  hidden: { opacity: 0, x: '-100%' },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const navItemVariant = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 30 } },
};

const labelVariant = {
  hidden: { opacity: 0, width: 0 },
  visible: { opacity: 1, width: 'auto', transition: { duration: 0.2 } },
};

// ─── NavItem ──────────────────────────────────────────────────────────────────

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  onClick?: () => void;
}

function NavItem({ href, icon: Icon, label, isCollapsed, onClick }: NavItemProps) {
  const pathname = usePathname();
  const isActive =
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  return (
    <motion.div variants={navItemVariant}>
      <Link href={href} onClick={onClick} className="block">
        <motion.div
          whileHover={{ x: isActive ? 0 : 3 }}
          transition={{ type: 'spring' as const, stiffness: 400, damping: 25 }}
          className={cn(
            'relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 group',
            isActive
              ? 'bg-indigo-500/20 text-indigo-300'
              : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
          )}
        >
          {/* Active left accent bar */}
          {isActive && (
            <motion.div
              layoutId="activeBar"
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-indigo-400"
              style={{ boxShadow: '0 0 8px 2px rgba(99,102,241,0.6)' }}
            />
          )}

          {/* Active glow bg */}
          {isActive && (
            <motion.div
              layoutId="activeGlow"
              className="absolute inset-0 rounded-xl"
              style={{
                background:
                  'radial-gradient(ellipse at left center, rgba(99,102,241,0.18) 0%, transparent 70%)',
              }}
            />
          )}

          {/* Icon */}
          <span className="relative z-10 shrink-0">
            <Icon
              size={18}
              className={cn(
                'transition-colors duration-200',
                isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'
              )}
            />
          </span>

          {/* Label */}
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.span
                key="label"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={labelVariant}
                className="relative z-10 text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Tooltip when collapsed */}
          {isCollapsed && (
            <div className="pointer-events-none absolute left-full ml-3 z-50 hidden group-hover:block">
              <div className="bg-surface-3 border border-white/10 text-slate-200 text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                {label}
              </div>
            </div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ─── Sidebar Content ──────────────────────────────────────────────────────────

interface SidebarContentProps {
  isCollapsed: boolean;
  onToggleCollapse?: () => void;
  onClose?: () => void;
  isMobileOverlay?: boolean;
}

function SidebarContent({
  isCollapsed,
  onToggleCollapse,
  onClose,
  isMobileOverlay = false,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* ── Logo ── */}
      <div
        className={cn(
          'flex items-center gap-2.5 px-4 py-5 border-b border-white/[0.06]',
          isCollapsed && !isMobileOverlay ? 'justify-center px-3' : ''
        )}
      >
        <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Zap size={16} className="text-white" />
        </div>
        <AnimatePresence initial={false}>
          {(!isCollapsed || isMobileOverlay) && (
            <motion.div
              key="logo-text"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-200 bg-clip-text text-transparent whitespace-nowrap">
                Folio.AI
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {isMobileOverlay && (
          <button
            onClick={onClose}
            className="ml-auto text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* ── AI Badge ── */}
      <AnimatePresence initial={false}>
        {(!isCollapsed || isMobileOverlay) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pt-4 pb-1"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20">
              <Sparkles size={13} className="text-indigo-400 shrink-0" />
              <span className="text-xs text-indigo-300 font-medium">AI Builder Active</span>
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-0.5"
        >
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isCollapsed={isCollapsed && !isMobileOverlay}
              onClick={isMobileOverlay ? onClose : undefined}
            />
          ))}
        </motion.div>
      </nav>

      {/* ── User area ── */}
      <div className="border-t border-white/[0.06] p-3">
        <div
          className={cn(
            'flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer',
            isCollapsed && !isMobileOverlay ? 'justify-center' : ''
          )}
        >
          {/* Avatar */}
          <div className="shrink-0 relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-semibold shadow-md shadow-indigo-500/20">
              A
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#040817]" />
          </div>

          <AnimatePresence initial={false}>
            {(!isCollapsed || isMobileOverlay) && (
              <motion.div
                key="user-info"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-slate-200 truncate">Alex Johnson</p>
                <p className="text-xs text-slate-500 truncate">alex@example.com</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {(!isCollapsed || isMobileOverlay) && (
              <motion.button
                key="logout"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="shrink-0 p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Logout"
              >
                <LogOut size={14} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Collapse toggle (desktop) ── */}
      {!isMobileOverlay && onToggleCollapse && (
        <div className="pb-4 flex justify-center">
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main DashboardSidebar ────────────────────────────────────────────────────

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <motion.aside
        variants={sidebarVariants}
        initial={false}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
        className="hidden lg:flex flex-col fixed left-0 top-0 h-full z-40 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,13,30,0.98) 0%, rgba(4,8,23,0.99) 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed((v) => !v)}
        />
      </motion.aside>

      {/* ── Mobile hamburger ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-surface-2 border border-white/10 text-slate-300 hover:text-white transition-colors shadow-lg"
      >
        <Menu size={20} />
      </button>

      {/* ── Mobile Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.aside
              key="mobile-sidebar"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: 'spring' as const, stiffness: 350, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 h-full w-64 z-50 flex flex-col overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, rgba(7,13,30,0.99) 0%, rgba(4,8,23,1) 100%)',
                borderRight: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <SidebarContent
                isCollapsed={false}
                isMobileOverlay
                onClose={() => setMobileOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
