"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Perfect to get started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: "Get Started Free",
    ctaHref: "/signup",
    featured: false,
    accent: "from-white/10 to-white/5",
    border: "border-white/10",
    buttonClass:
      "border border-white/15 text-white hover:bg-white/8 hover:border-white/30 transition-all",
    features: [
      { text: "1 portfolio site", included: true },
      { text: "3 template choices", included: true },
      { text: "Folio.AI subdomain", included: true },
      { text: "Basic AI content generation", included: true },
      { text: "5 projects showcase", included: true },
      { text: "Custom domain", included: false },
      { text: "Analytics dashboard", included: false },
      { text: "Priority support", included: false },
      { text: "Remove Folio.AI branding", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For serious job seekers",
    monthlyPrice: 9,
    yearlyPrice: 7,
    cta: "Start Pro — Free for 7 Days",
    ctaHref: "/signup?plan=pro",
    featured: true,
    accent: "from-indigo-500/15 via-violet-500/10 to-fuchsia-500/15",
    border: "border-indigo-500/50",
    buttonClass:
      "bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all",
    features: [
      { text: "1 portfolio site", included: true },
      { text: "All 7 premium templates", included: true },
      { text: "Custom domain connection", included: true },
      { text: "Unlimited AI generation", included: true },
      { text: "Unlimited projects", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Remove Folio.AI branding", included: true },
      { text: "Priority support", included: true },
      { text: "Team features", included: false },
    ],
  },
  {
    id: "team",
    name: "Team",
    description: "For bootcamps & agencies",
    monthlyPrice: 29,
    yearlyPrice: 23,
    cta: "Start Team Trial",
    ctaHref: "/signup?plan=team",
    featured: false,
    accent: "from-cyan-500/10 to-indigo-500/10",
    border: "border-cyan-500/25",
    buttonClass:
      "border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/60 transition-all",
    features: [
      { text: "Up to 20 portfolio sites", included: true },
      { text: "All 7 premium templates", included: true },
      { text: "Custom domain per member", included: true },
      { text: "Unlimited AI generation", included: true },
      { text: "Team admin dashboard", included: true },
      { text: "Advanced analytics", included: true },
      { text: "White-label option", included: true },
      { text: "Priority support + SLA", included: true },
      { text: "Custom onboarding", included: true },
    ],
  },
];

function AnimatedPrice({ value, prefix = "$" }: { value: number; prefix?: string }) {
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    if (displayed === value) return;
    const start = displayed;
    const end = value;
    const duration = 350;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span>
      {prefix}
      {displayed}
    </span>
  );
}

function CheckIcon({ included }: { included: boolean }) {
  return included ? (
    <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center text-indigo-400 text-xs font-bold">
      ✓
    </span>
  ) : (
    <span className="shrink-0 w-5 h-5 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-white/20 text-xs">
      ×
    </span>
  );
}

export default function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative py-24 lg:py-32 bg-[#040817] overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-125 bg-linear-to-r from-indigo-600/6 via-violet-600/8 to-fuchsia-600/6 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Pricing
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5"
          >
            Simple, transparent
            <br />
            <span className="bg-linear-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              pricing
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-white/50 text-lg max-w-xl mx-auto mb-8"
          >
            No hidden fees. No credit card required. Start free and upgrade
            when you're ready.
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-4 p-1.5 rounded-2xl bg-white/5 border border-white/8"
          >
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                !isYearly
                  ? "bg-white/10 text-white shadow-lg"
                  : "text-white/40 hover:text-white/70"
              )}
            >
              Monthly
            </button>

            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "relative px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2",
                isYearly
                  ? "bg-white/10 text-white shadow-lg"
                  : "text-white/40 hover:text-white/70"
              )}
            >
              Yearly
              <AnimatePresence>
                {isYearly && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.7, x: -4 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.7, x: -4 }}
                    className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 text-[10px] font-bold"
                  >
                    Save 20%
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Animated sliding pill */}
            <div className="relative" />
          </motion.div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: plan.featured ? -6 : -4 }}
                className={cn(
                  "relative rounded-2xl border p-6 backdrop-blur-sm",
                  `bg-linear-to-br ${plan.accent}`,
                  plan.border,
                  plan.featured && "shadow-2xl shadow-indigo-500/20 scale-[1.02]"
                )}
              >
                {/* Featured glow ring */}
                {plan.featured && (
                  <>
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-indigo-500/10 via-violet-500/5 to-fuchsia-500/10 pointer-events-none" />
                    <div className="absolute -inset-px rounded-2xl bg-linear-to-br from-indigo-500/50 via-violet-500/30 to-fuchsia-500/50 -z-10 blur-sm" />
                  </>
                )}

                {/* Most popular badge */}
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-linear-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-6">
                  <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-white/50 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-white/8">
                  <div className="flex items-end gap-2">
                    <span className="text-white font-black text-5xl">
                      <AnimatedPrice value={price} />
                    </span>
                    {price > 0 && (
                      <span className="text-white/40 text-sm pb-2">
                        / mo{isYearly ? " (billed yearly)" : ""}
                      </span>
                    )}
                    {price === 0 && (
                      <span className="text-white/40 text-sm pb-2">forever</span>
                    )}
                  </div>
                  {isYearly && plan.monthlyPrice > 0 && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-emerald-400 text-xs mt-1 font-medium"
                    >
                      Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                    </motion.p>
                  )}
                </div>

                {/* CTA button */}
                <a
                  href={plan.ctaHref}
                  className={cn(
                    "block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold mb-6",
                    plan.buttonClass
                  )}
                >
                  {plan.cta}
                </a>

                {/* Features list */}
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f.text}
                      className="flex items-center gap-3"
                    >
                      <CheckIcon included={f.included} />
                      <span
                        className={cn(
                          "text-sm",
                          f.included ? "text-white/70" : "text-white/25 line-through"
                        )}
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/8 bg-white/3">
            <span className="text-xl">🔒</span>
            <span className="text-white/60 text-sm">
              30-day money-back guarantee · Cancel anytime · No credit card to start
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
