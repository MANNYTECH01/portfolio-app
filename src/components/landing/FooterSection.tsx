"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Templates", href: "/#templates" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Changelog", href: "/changelog" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Blog", href: "/blog" },
    { label: "Showcase", href: "/showcase" },
    { label: "Status", href: "/status" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Press", href: "/press" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Security", href: "/security" },
  ],
};

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-fuchsia-300">
      <path d="M12 2L13.09 8.26L19 6L14.74 10.91L21 12L14.74 13.09L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.09L3 12L9.26 10.91L5 6L10.91 8.26L12 2Z" />
    </svg>
  );
}

const socials = [
  { icon: GitHubIcon, href: "https://github.com", label: "GitHub" },
  { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
  { icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-[#040817] overflow-hidden">
      {/* Gradient divider at top */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-75 bg-linear-to-t from-indigo-600/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <a href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <SparkleIcon />
                </div>
                <div className="absolute inset-0 rounded-xl bg-linear-to-br from-indigo-500 to-fuchsia-500 blur-lg opacity-30 group-hover:opacity-60 transition-opacity" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-white via-indigo-200 to-violet-300 bg-clip-text text-transparent">
                Folio.AI
              </span>
            </a>

            <p className="text-white/40 text-sm leading-relaxed mb-7 max-w-xs">
              Build stunning AI-powered portfolios in minutes. No code required.
              Land your dream role with a portfolio that actually gets noticed.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-white/60 text-sm font-medium mb-3">
                Stay in the loop
              </p>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-emerald-400 text-sm"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-xs">
                    ✓
                  </span>
                  Thanks! You are on the list.
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                    className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white text-sm placeholder-white/25 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="shrink-0 w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
                  >
                    <span className="text-base leading-none">→</span>
                  </motion.button>
                </form>
              )}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-5">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-sm text-white/45 hover:text-white/85 transition-colors duration-200 relative group"
                      >
                        {item.label}
                        <span className="absolute -bottom-px left-0 w-0 h-px bg-linear-to-r from-indigo-400 to-violet-400 group-hover:w-full transition-all duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient divider */}
        <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Copyright */}
          <p className="text-white/25 text-sm order-2 sm:order-1">
            &copy; {new Date().getFullYear()} Folio.AI, Inc. All rights reserved.
          </p>

          {/* Center: made with love */}
          <p className="text-white/20 text-xs order-3 sm:order-2 hidden sm:block">
            Built with{" "}
            <span className="text-fuchsia-400/70">♥</span>
            {" "}for builders everywhere
          </p>

          {/* Socials */}
          <div className="flex items-center gap-2 order-1 sm:order-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "w-9 h-9 rounded-xl border border-white/8 bg-white/3",
                  "flex items-center justify-center text-white/35",
                  "hover:text-white/80 hover:border-white/20 hover:bg-white/6",
                  "transition-all duration-200"
                )}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
