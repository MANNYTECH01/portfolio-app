'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Palette,
  Globe,
  Bell,
  Save,
  Upload,
  Check,
  ExternalLink,
  Sun,
  Moon,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePortfolio } from '@/contexts/PortfolioContext';

// ─── Tab Config ───────────────────────────────────────────────────────────────

type SettingsTab = 'profile' | 'appearance' | 'domain' | 'notifications';

const TABS: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'domain', label: 'Domain', icon: Globe },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

// ─── Color swatches ───────────────────────────────────────────────────────────

const COLOR_OPTIONS = [
  { label: 'Indigo', value: '#6366f1', ring: 'ring-indigo-500' },
  { label: 'Violet', value: '#8b5cf6', ring: 'ring-violet-500' },
  { label: 'Cyan', value: '#06b6d4', ring: 'ring-cyan-500' },
  { label: 'Emerald', value: '#10b981', ring: 'ring-emerald-500' },
  { label: 'Rose', value: '#f43f5e', ring: 'ring-rose-500' },
  { label: 'Amber', value: '#f59e0b', ring: 'ring-amber-500' },
];

const FONT_OPTIONS = ['Inter', 'Geist', 'Fira Code', 'Playfair Display', 'Space Grotesk'];

// ─── Shared components ────────────────────────────────────────────────────────

function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.07] backdrop-blur-sm overflow-hidden',
        className
      )}
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      {children}
    </div>
  );
}

function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">{label}</label>
      {children}
      {hint && <p className="text-xs text-slate-600">{hint}</p>}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        'w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-200 placeholder:text-slate-600',
        'bg-white/[0.04] border border-white/10',
        'focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30',
        'transition-all duration-200',
        className
      )}
    />
  );
}

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={cn(
        'w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-200 placeholder:text-slate-600',
        'bg-white/[0.04] border border-white/10 resize-none',
        'focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30',
        'transition-all duration-200'
      )}
    />
  );
}

function SaveButton({
  onClick,
  saving,
  saved,
}: {
  onClick: () => void;
  saving: boolean;
  saved: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      disabled={saving}
      className={cn(
        'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
        saved
          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
          : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30 hover:from-indigo-500 hover:to-violet-500',
        saving && 'opacity-70 cursor-not-allowed'
      )}
    >
      {saving ? (
        <Loader2 size={14} className="animate-spin" />
      ) : saved ? (
        <Check size={14} />
      ) : (
        <Save size={14} />
      )}
      {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Changes'}
    </motion.button>
  );
}

// ─── Section: Profile ─────────────────────────────────────────────────────────

function ProfileSection() {
  const { portfolio, updatePersonal } = usePortfolio();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: portfolio.name,
    title: portfolio.title,
    bio: portfolio.bio,
    email: portfolio.email,
    location: portfolio.location ?? '',
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    updatePersonal(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (v: string) => setForm((p) => ({ ...p, [key]: v })),
  });

  return (
    <div className="space-y-6">
      {/* Avatar & Resume */}
      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold text-white mb-5">Profile Media</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Avatar */}
          <div>
            <p className="text-xs font-medium text-slate-400 mb-2">Profile Photo</p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/20 shrink-0">
                {form.name.charAt(0)}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <Upload size={13} />
                Upload Photo
              </motion.button>
            </div>
            <p className="text-xs text-slate-600 mt-2">JPG, PNG or GIF. Max 2MB.</p>
          </div>

          {/* Resume */}
          <div>
            <p className="text-xs font-medium text-slate-400 mb-2">Resume / CV</p>
            <div
              className="h-16 rounded-2xl border-2 border-dashed border-white/10 hover:border-indigo-500/40 flex items-center justify-center gap-2 text-xs text-slate-500 hover:text-slate-400 transition-all cursor-pointer group"
              onDragOver={(e) => e.preventDefault()}
            >
              <Upload size={14} className="group-hover:text-indigo-400 transition-colors" />
              Drop PDF here or{' '}
              <span className="text-indigo-400 hover:underline">browse</span>
            </div>
            {portfolio.resumeUrl && (
              <p className="text-xs text-emerald-400 mt-1.5 flex items-center gap-1">
                <CheckCircle2 size={11} /> Resume uploaded
              </p>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Personal Info */}
      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold text-white mb-5">Personal Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField label="Full Name">
            <TextInput {...field('name')} placeholder="Alex Johnson" />
          </FormField>
          <FormField label="Professional Title">
            <TextInput {...field('title')} placeholder="Full-Stack Developer" />
          </FormField>
          <FormField label="Email Address">
            <TextInput {...field('email')} type="email" placeholder="alex@example.com" />
          </FormField>
          <FormField label="Location">
            <TextInput {...field('location')} placeholder="San Francisco, CA" />
          </FormField>
          <div className="sm:col-span-2">
            <FormField
              label="Bio"
              hint="Write a concise summary for your portfolio header. Supports markdown."
            >
              <TextArea
                {...field('bio')}
                rows={4}
                placeholder="Tell the world who you are and what you do…"
              />
            </FormField>
          </div>
        </div>
      </GlassCard>

      <div className="flex justify-end">
        <SaveButton onClick={handleSave} saving={saving} saved={saved} />
      </div>
    </div>
  );
}

// ─── Section: Appearance ──────────────────────────────────────────────────────

function AppearanceSection() {
  const { portfolio, setTheme, setFont, toggleDarkMode } = usePortfolio();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(portfolio.primaryColor);
  const [accentColor, setAccentColor] = useState(portfolio.accentColor);
  const [font, setFontState] = useState(portfolio.font);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setTheme(primaryColor, accentColor);
    setFont(font);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Dark / Light mode */}
      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold text-white mb-5">Appearance Mode</h3>
        <div className="grid grid-cols-2 gap-3 max-w-sm">
          {(['dark', 'light'] as const).map((mode) => {
            const isDark = mode === 'dark';
            const isActive = portfolio.darkMode === isDark;
            return (
              <motion.button
                key={mode}
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all duration-200',
                  isActive
                    ? 'border-indigo-500/60 bg-indigo-500/10'
                    : 'border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05]'
                )}
              >
                {isDark ? (
                  <Moon size={22} className={isActive ? 'text-indigo-400' : 'text-slate-500'} />
                ) : (
                  <Sun size={22} className={isActive ? 'text-indigo-400' : 'text-slate-500'} />
                )}
                <span
                  className={cn(
                    'text-xs font-medium capitalize',
                    isActive ? 'text-indigo-300' : 'text-slate-500'
                  )}
                >
                  {mode}
                </span>
                {isActive && (
                  <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
                    <Check size={9} className="text-white" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </GlassCard>

      {/* Colors */}
      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold text-white mb-5">Color Theme</h3>
        <div className="space-y-5">
          <FormField label="Primary Color">
            <div className="flex flex-wrap gap-2.5 mt-1">
              {COLOR_OPTIONS.map((c) => (
                <motion.button
                  key={c.value}
                  onClick={() => setPrimaryColor(c.value)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    'w-8 h-8 rounded-full transition-all duration-200',
                    primaryColor === c.value
                      ? `ring-2 ring-offset-2 ring-offset-[#040817] ${c.ring} scale-110`
                      : 'hover:scale-110'
                  )}
                  style={{ background: c.value }}
                  title={c.label}
                />
              ))}
              <div className="flex items-center gap-2 ml-2">
                <div
                  className="w-8 h-8 rounded-full border-2 border-white/20 overflow-hidden"
                  style={{ background: primaryColor }}
                />
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="sr-only"
                  id="primary-picker"
                />
                <label
                  htmlFor="primary-picker"
                  className="text-xs text-slate-500 hover:text-slate-300 cursor-pointer transition-colors"
                >
                  Custom
                </label>
              </div>
            </div>
          </FormField>

          <FormField label="Accent Color">
            <div className="flex flex-wrap gap-2.5 mt-1">
              {COLOR_OPTIONS.map((c) => (
                <motion.button
                  key={c.value}
                  onClick={() => setAccentColor(c.value)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    'w-8 h-8 rounded-full transition-all duration-200',
                    accentColor === c.value
                      ? `ring-2 ring-offset-2 ring-offset-[#040817] ${c.ring} scale-110`
                      : 'hover:scale-110'
                  )}
                  style={{ background: c.value }}
                  title={c.label}
                />
              ))}
            </div>
          </FormField>
        </div>
      </GlassCard>

      {/* Font */}
      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold text-white mb-5">Typography</h3>
        <FormField label="Font Family">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
            {FONT_OPTIONS.map((f) => (
              <motion.button
                key={f}
                onClick={() => setFontState(f.toLowerCase())}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'px-3 py-2.5 rounded-xl text-xs font-medium border transition-all duration-200 text-left',
                  font === f.toLowerCase()
                    ? 'border-indigo-500/60 bg-indigo-500/10 text-indigo-300'
                    : 'border-white/[0.07] bg-white/[0.02] text-slate-400 hover:bg-white/[0.05] hover:text-slate-300'
                )}
              >
                <span style={{ fontFamily: f }}>{f}</span>
              </motion.button>
            ))}
          </div>
        </FormField>
      </GlassCard>

      <div className="flex justify-end">
        <SaveButton onClick={handleSave} saving={saving} saved={saved} />
      </div>
    </div>
  );
}

// ─── Section: Domain ──────────────────────────────────────────────────────────

function DomainSection() {
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'connected' | 'error'>('idle');
  const folioUrl = `folio.ai/p/alexjohnson`;

  const handleConnect = async () => {
    if (!domain.trim()) return;
    setStatus('checking');
    await new Promise((r) => setTimeout(r, 2000));
    // Simulate success
    setStatus('connected');
  };

  return (
    <div className="space-y-6">
      {/* Folio subdomain */}
      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold text-white mb-1">Your Folio.AI URL</h3>
        <p className="text-xs text-slate-500 mb-4">This is your free portfolio URL — always active.</p>
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-indigo-500/8 border border-indigo-500/20">
          <Globe size={14} className="text-indigo-400 shrink-0" />
          <span className="text-sm text-indigo-300 font-medium flex-1 truncate">{folioUrl}</span>
          <a
            href={`https://${folioUrl}`}
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ExternalLink size={13} />
          </a>
        </div>
      </GlassCard>

      {/* Custom domain */}
      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold text-white mb-1">Custom Domain</h3>
        <p className="text-xs text-slate-500 mb-5">
          Connect your own domain to make your portfolio stand out. Point your DNS
          CNAME to{' '}
          <code className="text-indigo-400 bg-indigo-500/10 px-1 py-0.5 rounded text-xs">
            cname.folio.ai
          </code>
        </p>

        <div className="flex gap-2">
          <TextInput
            value={domain}
            onChange={setDomain}
            placeholder="yourname.com"
            className="flex-1"
          />
          <motion.button
            onClick={handleConnect}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={status === 'checking' || !domain.trim()}
            className={cn(
              'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-2',
              status === 'connected'
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500',
              (status === 'checking' || !domain.trim()) && 'opacity-60 cursor-not-allowed'
            )}
          >
            {status === 'checking' && <Loader2 size={14} className="animate-spin" />}
            {status === 'connected' && <Check size={14} />}
            {status === 'checking' ? 'Checking…' : status === 'connected' ? 'Connected' : 'Connect'}
          </motion.button>
        </div>

        {/* Status messages */}
        <AnimatePresence>
          {status === 'connected' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-3 flex items-center gap-2 text-xs text-emerald-400"
            >
              <CheckCircle2 size={13} />
              Domain connected successfully! DNS propagation may take up to 24 hrs.
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-3 flex items-center gap-2 text-xs text-rose-400"
            >
              <AlertCircle size={13} />
              Domain verification failed. Check your DNS settings and try again.
            </motion.div>
          )}
        </AnimatePresence>

        {/* DNS instructions */}
        <div className="mt-5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <p className="text-xs font-medium text-slate-400 mb-3 flex items-center gap-1.5">
            <ChevronRight size={12} className="text-indigo-400" />
            DNS Configuration
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-600">
                  <th className="text-left pb-2 font-medium">Type</th>
                  <th className="text-left pb-2 font-medium">Name</th>
                  <th className="text-left pb-2 font-medium">Value</th>
                </tr>
              </thead>
              <tbody className="text-slate-400 font-mono">
                <tr>
                  <td className="pr-4 py-1">CNAME</td>
                  <td className="pr-4 py-1">www</td>
                  <td className="text-indigo-400">cname.folio.ai</td>
                </tr>
                <tr>
                  <td className="pr-4 py-1">A</td>
                  <td className="pr-4 py-1">@</td>
                  <td className="text-indigo-400">76.76.21.21</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

// ─── Section: Notifications ───────────────────────────────────────────────────

function NotificationsSection() {
  const { portfolio, updatePortfolio } = usePortfolio();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const NOTIFICATION_OPTIONS = [
    {
      id: 'emailOnView' as const,
      label: 'Portfolio Viewed',
      desc: 'Get notified when someone views your portfolio',
      icon: '👁',
    },
    {
      id: 'emailOnContact' as const,
      label: 'Contact Message',
      desc: 'Receive an email when someone sends you a message',
      icon: '✉️',
    },
    {
      id: 'weeklyDigest' as const,
      label: 'Weekly Digest',
      desc: 'Summary of views, clicks, and activity every Monday',
      icon: '📊',
    },
  ] as const;

  type NotifKey = (typeof NOTIFICATION_OPTIONS)[number]['id'];

  const localNotifs = {
    emailOnView: (portfolio as unknown as Record<string, boolean>).emailOnView ?? true,
    emailOnContact: (portfolio as unknown as Record<string, boolean>).emailOnContact ?? true,
    weeklyDigest: (portfolio as unknown as Record<string, boolean>).weeklyDigest ?? false,
  };

  const [settings, setSettings] = useState(localNotifs);

  const toggle = (key: NotifKey) => {
    setSettings((p) => ({ ...p, [key]: !p[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    updatePortfolio(settings as Partial<typeof portfolio>);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold text-white mb-5">Email Notifications</h3>
        <div className="space-y-3">
          {NOTIFICATION_OPTIONS.map((opt) => (
            <div
              key={opt.id}
              className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{opt.icon}</span>
                <div>
                  <p className="text-sm font-medium text-slate-200">{opt.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                </div>
              </div>
              <motion.button
                onClick={() => toggle(opt.id)}
                className={cn(
                  'relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0',
                  settings[opt.id] ? 'bg-indigo-600' : 'bg-white/10'
                )}
                style={
                  settings[opt.id]
                    ? { boxShadow: '0 0 12px rgba(99,102,241,0.5)' }
                    : undefined
                }
              >
                <motion.div
                  animate={{ x: settings[opt.id] ? 20 : 2 }}
                  transition={{ type: 'spring' as const, stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                />
              </motion.button>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="flex justify-end">
        <SaveButton onClick={handleSave} saving={saving} saved={saved} />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const tabContentVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Settings</h1>
        <p className="text-sm text-slate-400">Manage your portfolio profile, appearance, and preferences.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Sidebar Tabs ── */}
        <motion.nav
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="lg:w-48 xl:w-56 shrink-0"
        >
          <div className="space-y-1 lg:sticky lg:top-8">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ x: isActive ? 0 : 2 }}
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 30 }}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/25'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
                  )}
                >
                  <Icon size={15} className={isActive ? 'text-indigo-400' : 'text-slate-500'} />
                  {tab.label}
                  {isActive && (
                    <ChevronRight
                      size={13}
                      className="ml-auto text-indigo-500/60"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.nav>

        {/* ── Tab Content ── */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {activeTab === 'profile' && <ProfileSection />}
              {activeTab === 'appearance' && <AppearanceSection />}
              {activeTab === 'domain' && <DomainSection />}
              {activeTab === 'notifications' && <NotificationsSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
