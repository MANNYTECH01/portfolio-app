"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

const stats = [
  { value: "10k+", label: "Portfolios Built" },
  { value: "50+", label: "Templates" },
  { value: "99%", label: "Satisfaction" },
];

const avatarColors = [
  "from-indigo-400 to-violet-500",
  "from-violet-400 to-fuchsia-500",
  "from-fuchsia-400 to-pink-500",
  "from-cyan-400 to-indigo-500",
  "from-emerald-400 to-cyan-500",
];
const avatarInitials = ["AJ", "SM", "KR", "PL", "TM"];

const words = ["Dream", "Portfolio"];

function AnimatedHeadline() {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className="flex flex-wrap justify-center gap-x-4 gap-y-2"
      >
        {["Build", "Your", "Dream", "Portfolio"].map((word, i) => (
          <motion.span
            key={word + i}
            variants={{
              hidden: { y: 80, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className={cn(
              "text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight",
              i >= 2
                ? "bg-linear-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
                : "text-white"
            )}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

function FloatingOrb({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.15, 1],
        x: [0, 30, -20, 0],
        y: [0, -30, 20, 0],
        opacity: [0.6, 0.9, 0.6],
      }}
      transition={{
        duration: 12 + delay * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={cn("absolute rounded-full blur-3xl pointer-events-none", className)}
    />
  );
}

function FloatingParticle({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      animate={{ y: [-15, 15, -15], opacity: [0.3, 0.8, 0.3] }}
      transition={{
        duration: 3 + Math.random() * 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2,
      }}
      className="absolute w-1 h-1 rounded-full bg-indigo-400/60"
      style={style}
    />
  );
}

function DotGrid() {
  return (
    <div
      className="absolute inset-0 opacity-20 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(99,102,241,0.4) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    />
  );
}

function MockPortfolioCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 8 }}
      transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      className="relative mx-auto w-full max-w-sm lg:max-w-md"
    >
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Glow shadow */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-indigo-500/30 via-violet-500/20 to-fuchsia-500/30 blur-2xl scale-105" />

        {/* Card */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl">
          {/* Header bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 h-5 rounded-md bg-white/5 mx-4 flex items-center px-2">
              <span className="text-white/30 text-[10px] font-mono">
                alexjohnson.folio.ai
              </span>
            </div>
          </div>

          {/* Portfolio Preview Content */}
          <div className="p-5 space-y-4">
            {/* Avatar + name */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30">
                AJ
              </div>
              <div>
                <div className="h-4 w-32 rounded bg-white/15 mb-2" />
                <div className="h-3 w-24 rounded bg-white/8" />
              </div>
            </div>

            {/* Skill bars */}
            <div className="space-y-2.5">
              {[
                { label: "React", width: "88%", color: "from-indigo-500 to-cyan-500" },
                { label: "TypeScript", width: "75%", color: "from-violet-500 to-fuchsia-500" },
                { label: "Node.js", width: "68%", color: "from-fuchsia-500 to-pink-500" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white/50 text-[10px] font-mono">{s.label}</span>
                    <span className="text-white/30 text-[10px]">{s.width}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: s.width }}
                      transition={{ delay: 1.3, duration: 1.2, ease: "easeOut" }}
                      className={cn("h-full rounded-full bg-linear-to-r", s.color)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Project cards */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "CloudDeploy", tag: "React · AWS", color: "from-indigo-500/20 to-violet-500/20" },
                { name: "DataViz Pro", tag: "Python · D3", color: "from-violet-500/20 to-fuchsia-500/20" },
              ].map((p) => (
                <div
                  key={p.name}
                  className={cn(
                    "rounded-xl p-3 border border-white/8 bg-linear-to-br",
                    p.color
                  )}
                >
                  <div className="text-white/70 text-[10px] font-semibold mb-1">{p.name}</div>
                  <div className="text-white/30 text-[9px]">{p.tag}</div>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex gap-2 pt-1">
              <div className="h-7 flex-1 rounded-lg bg-linear-to-r from-indigo-500/40 to-violet-500/40 border border-indigo-400/20 flex items-center justify-center">
                <span className="text-indigo-300 text-[10px] font-semibold">View Portfolio</span>
              </div>
              <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-white/40 text-[10px]">↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating badge */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 bg-linear-to-br from-fuchsia-500 to-violet-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-fuchsia-500/30 border border-white/20"
        >
          ✦ AI Generated
        </motion.div>

        {/* Bottom badge */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-4 -left-4 bg-[#0c1228]/90 backdrop-blur-lg border border-white/10 rounded-xl px-3 py-2 shadow-xl"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">
              98
            </div>
            <div>
              <div className="text-white/80 text-[10px] font-semibold">Performance</div>
              <div className="text-white/40 text-[9px]">Lighthouse Score</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  top: `${5 + Math.random() * 90}%`,
}));

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#040817] pt-20 pb-12"
    >
      {/* Background layers */}
      <DotGrid />
      <FloatingOrb
        delay={0}
        className="w-150 h-150 -top-40 -left-40 bg-linear-to-br from-indigo-600/25 to-violet-700/20"
      />
      <FloatingOrb
        delay={3}
        className="w-125 h-125 top-1/3 -right-32 bg-linear-to-br from-fuchsia-600/20 to-violet-600/15"
      />
      <FloatingOrb
        delay={6}
        className="w-100 h-100 bottom-0 left-1/4 bg-linear-to-br from-cyan-600/15 to-indigo-600/20"
      />

      {/* Particles */}
      {particles.map((p) => (
        <FloatingParticle
          key={p.id}
          style={{ left: p.left, top: p.top }}
        />
      ))}

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
            </span>
            <span className="text-sm text-indigo-300 font-medium">
              Now with GPT-4 Powered AI Content Generation
            </span>
            <span className="text-indigo-400">→</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left space-y-8">
            <AnimatedHeadline />

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Transform your career with an AI-powered portfolio that showcases
              your skills, projects, and achievements — built in minutes, not
              days.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative group px-8 py-4 rounded-2xl text-white font-semibold text-base overflow-hidden shadow-xl shadow-indigo-500/25"
              >
                <span className="absolute inset-0 bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
                <span className="absolute inset-0 bg-linear-to-r from-indigo-400 via-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  Build My Portfolio Free
                  <span className="text-lg">→</span>
                </span>
              </motion.a>

              <motion.a
                href="#templates"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("templates")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 rounded-2xl text-white/80 font-semibold text-base border border-white/10 hover:border-white/25 hover:bg-white/5 hover:text-white transition-all"
              >
                View Templates
              </motion.a>
            </motion.div>

            {/* Social proof avatars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.7 }}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <div className="flex -space-x-3">
                {avatarColors.map((color, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-9 h-9 rounded-full border-2 border-[#040817] bg-linear-to-br flex items-center justify-center text-white text-xs font-bold shadow-lg",
                      color
                    )}
                  >
                    {avatarInitials[i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-white/50 text-sm">
                  <span className="text-white font-semibold">10,000+</span>{" "}
                  developers trust Folio.AI
                </p>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5 max-w-sm mx-auto lg:mx-0"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="text-2xl font-black bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Mock Portfolio Card */}
          <div className="flex items-center justify-center lg:justify-end">
            <MockPortfolioCard />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-indigo-400" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
