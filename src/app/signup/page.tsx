'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Eye, EyeOff, Sparkles, Code2, Globe, ArrowRight, Lock, Mail, User, Check, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const perks = [
  'Free forever plan available',
  '7 premium portfolio templates',
  'AI-powered content generation',
  'One-click publish & share',
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'github' | 'google' | null>(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [error, setError] = useState('');

  const supabase = createClient();

  const handleOAuth = async (provider: 'github' | 'google') => {
    setOauthLoading(provider);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setOauthLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    // Show "check your email" state
    setStep('verify');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#040817] flex items-center justify-center relative overflow-hidden px-4 py-10">
      {/* Background orbs */}
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full orb orb-cyan opacity-15 animate-blob" />
      <div className="absolute bottom-[-100px] left-[-200px] w-[500px] h-[500px] rounded-full orb orb-purple opacity-20 animate-blob delay-2000" />
      <div className="absolute inset-0 dot-bg opacity-20" />

      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left: perks panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block"
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Folio.AI</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Build your portfolio<br />
            <span className="gradient-text">in minutes, not days</span>
          </h2>
          <p className="text-gray-400 mb-8 text-lg leading-relaxed">
            Join 10,000+ professionals who use Folio.AI to showcase their work and land their dream opportunities.
          </p>
          <ul className="space-y-3">
            {perks.map((perk, i) => (
              <motion.li
                key={perk}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 text-gray-300"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                {perk}
              </motion.li>
            ))}
          </ul>

          {/* Social proof */}
          <div className="mt-10 glass rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['AB', 'CD', 'EF', 'GH'].map((init, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#040817] flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: ['#6366f1', '#8b5cf6', '#06b6d4', '#d946ef'][i] }}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                <span className="text-white font-semibold">2,400+</span> portfolios created this week
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: signup form */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Mobile logo */}
          <div className="md:hidden text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Folio.AI</span>
            </Link>
          </div>

          <div className="glass-strong rounded-2xl p-8 border border-white/10">
            {step === 'verify' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Check your email</h3>
                <p className="text-gray-400 text-sm mb-4">
                  We sent a confirmation link to <span className="text-white">{form.email}</span>
                </p>
                <p className="text-gray-500 text-xs">
                  Click the link in the email to activate your account, then{' '}
                  <Link href="/login" className="text-indigo-400 hover:text-indigo-300">sign in</Link>.
                </p>
              </motion.div>
            ) : (
              <>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
                  <p className="text-gray-400 text-sm mb-8">Start building for free — no credit card required</p>
                </motion.div>

                {/* Error banner */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm mb-6"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </motion.div>
                )}

                {/* Social login */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => handleOAuth('github')}
                    disabled={!!oauthLoading || isLoading}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-medium text-gray-300 hover:border-white/20 hover:text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {oauthLoading === 'github' ? (
                      <div className="w-4 h-4 spinner" />
                    ) : (
                      <Code2 className="w-4 h-4" />
                    )}
                    GitHub
                  </button>
                  <button
                    onClick={() => handleOAuth('google')}
                    disabled={!!oauthLoading || isLoading}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-medium text-gray-300 hover:border-white/20 hover:text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {oauthLoading === 'google' ? (
                      <div className="w-4 h-4 spinner" />
                    ) : (
                      <Globe className="w-4 h-4" />
                    )}
                    Google
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-gray-500 font-medium">or sign up with email</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Full name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Alex Johnson"
                        required
                        className="input-premium pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="alex@example.com"
                        required
                        className="input-premium pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                        placeholder="At least 8 characters"
                        required
                        minLength={8}
                        className="input-premium pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading || !!oauthLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
                    }}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 spinner" />
                        Creating account...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Create Free Account
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center">
                    By signing up, you agree to our{' '}
                    <Link href="/terms" className="text-indigo-400 hover:text-indigo-300">Terms</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</Link>
                  </p>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                  Already have an account?{' '}
                  <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
