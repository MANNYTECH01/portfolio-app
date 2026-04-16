"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: "✦",
    title: "AI-Powered Content",
    description:
      "Generate compelling bio and project descriptions in seconds. Our AI understands your career story.",
    gradient: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/25",
    border: "hover:border-indigo-500/40",
    delay: 0,
  },
  {
    icon: "◈",
    title: "Premium Templates",
    description:
      "7 stunning templates crafted for every profession — from engineers to designers.",
    gradient: "from-violet-500 to-fuchsia-600",
    glow: "shadow-violet-500/25",
    border: "hover:border-violet-500/40",
    delay: 0.08,
  },
  {
    icon: "◉",
    title: "Real-time Preview",
    description:
      "See changes instantly as you type. What you design is exactly what visitors see.",
    gradient: "from-fuchsia-500 to-pink-600",
    glow: "shadow-fuchsia-500/25",
    border: "hover:border-fuchsia-500/40",
    delay: 0.16,
  },
  {
    icon: "⟐",
    title: "One-click Publish",
    description:
      "Deploy to your unique Folio.AI URL instantly. No servers, no config, no headaches.",
    gradient: "from-cyan-500 to-indigo-600",
    glow: "shadow-cyan-500/25",
    border: "hover:border-cyan-500/40",
    delay: 0.24,
  },
  {
    icon: "◎",
    title: "Custom Domain",
    description:
      "Connect your own domain name with one click. Be professional with yourname.com.",
    gradient: "from-indigo-500 to-cyan-600",
    glow: "shadow-indigo-500/25",
    border: "hover:border-indigo-400/40",
    delay: 0.32,
  },
  {
    icon: "◈",
    title: "Analytics Dashboard",
    description:
      "Track visitors, engagement, and recruiter interest with beautiful real-time analytics.",
    gradient: "from-violet-500 to-indigo-600",
    glow: "shadow-violet-500/25",
    border: "hover:border-violet-400/40",
    delay: 0.4,
  },
];

function FeatureCard({
  feature,
  index,
  inView,
}: {
  feature: (typeof features)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: feature.delay,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        rotateX: 3,
        rotateY: index % 3 === 0 ? 3 : index % 3 === 1 ? 0 : -3,
        transition: { duration: 0.25 },
      }}
      style={{ transformStyle: "preserve-3d", perspective: "800px" }}
      className={cn(
        "group relative rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6",
        "hover:bg-white/6 transition-colors duration-300",
        "cursor-default select-none",
        feature.border
      )}
    >
      {/* Gradient glow on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          `bg-linear-to-br ${feature.gradient}/5`
        )}
      />

      {/* Top border glow line */}
      <div
        className={cn(
          "absolute top-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          `bg-linear-to-r ${feature.gradient}`
        )}
      />

      {/* Icon */}
      <div className="relative mb-5">
        <div
          className={cn(
            "w-12 h-12 rounded-xl bg-linear-to-br flex items-center justify-center text-xl font-bold text-white shadow-lg",
            feature.gradient,
            feature.glow
          )}
        >
          {feature.icon}
        </div>
        <div
          className={cn(
            "absolute inset-0 w-12 h-12 rounded-xl bg-linear-to-br blur-xl opacity-40 group-hover:opacity-70 transition-opacity",
            feature.gradient
          )}
        />
      </div>

      {/* Content */}
      <h3 className="text-white font-semibold text-lg mb-2.5 group-hover:text-white transition-colors">
        {feature.title}
      </h3>
      <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/65 transition-colors">
        {feature.description}
      </p>

      {/* Arrow indicator */}
      <div className="mt-5 flex items-center gap-1 text-white/20 group-hover:text-white/50 transition-colors text-sm">
        <span>Learn more</span>
        <motion.span
          animate={inView ? { x: [0, 3, 0] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, delay: feature.delay + 1 }}
        >
          →
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="features"
      ref={ref}
      className="relative py-24 lg:py-32 bg-[#040817] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-100 bg-linear-to-r from-indigo-600/8 via-violet-600/8 to-fuchsia-600/8 blur-3xl rounded-full" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(99,102,241,0.3) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Features
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5"
          >
            Everything you need
            <br />
            <span className="bg-linear-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              to stand out
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Folio.AI combines powerful AI, beautiful design, and seamless
            publishing into one platform that gets you noticed by the right
            people.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-center mt-16"
        >
          <a
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white font-semibold hover:shadow-2xl hover:shadow-indigo-500/30 transition-all hover:-translate-y-0.5"
          >
            Start Building for Free
            <span className="text-lg">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
