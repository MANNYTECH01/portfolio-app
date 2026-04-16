"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

function SparkleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="text-fuchsia-400"
    >
      <path
        d="M12 2L13.09 8.26L19 6L14.74 10.91L21 12L14.74 13.09L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.09L3 12L9.26 10.91L5 6L10.91 8.26L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between cursor-pointer">
      <motion.span
        animate={open ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="block h-0.5 w-6 bg-white rounded-full origin-left"
      />
      <motion.span
        animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="block h-0.5 w-6 bg-white rounded-full"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="block h-0.5 w-6 bg-white rounded-full origin-left"
      />
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#040817]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/20"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <SparkleIcon />
                </div>
                <div className="absolute inset-0 rounded-lg bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-white via-indigo-200 to-violet-300 bg-clip-text text-transparent">
                Folio.AI
              </span>
            </motion.a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors group"
                  whileHover={{ y: -1 }}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors" />
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-linear-to-r from-indigo-400 to-violet-400 group-hover:w-4/5 transition-all duration-300" />
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href="/login"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-all hover:bg-white/5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Log In
              </motion.a>
              <motion.a
                href="/signup"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative px-5 py-2 text-sm font-semibold text-white rounded-xl overflow-hidden group"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
                <span className="absolute inset-0 bg-linear-to-r from-indigo-400 via-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute inset-0 shadow-lg shadow-indigo-500/40" />
                <span className="relative">Get Started Free</span>
              </motion.a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#040817]/95 backdrop-blur-2xl border-b border-white/10 md:hidden overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="w-full text-left px-4 py-3 text-base font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="pt-3 pb-1 flex flex-col gap-3 border-t border-white/10 mt-2">
                <a
                  href="/login"
                  className="w-full text-center px-4 py-2.5 text-sm font-medium text-white/80 border border-white/10 rounded-xl hover:bg-white/5 transition-all"
                >
                  Log In
                </a>
                <a
                  href="/signup"
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-indigo-500/30"
                >
                  Get Started Free
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
