"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "I landed a senior role at Google within 2 weeks of publishing my Folio.AI portfolio. The AI-generated bio was shockingly good — I barely had to edit it.",
    name: "Marcus Chen",
    title: "Senior Software Engineer",
    company: "Google",
    initial: "MC",
    color: "from-indigo-500 to-violet-600",
    stars: 5,
    delay: 0,
  },
  {
    quote:
      "As a designer, I was skeptical. But the templates are genuinely beautiful. My old portfolio took weeks; Folio.AI took me 30 minutes and it looks 10x better.",
    name: "Sofia Rivera",
    title: "Product Designer",
    company: "Stripe",
    initial: "SR",
    color: "from-fuchsia-500 to-pink-600",
    stars: 5,
    delay: 0.08,
  },
  {
    quote:
      "The analytics feature alone is worth it. I can see exactly which recruiters are visiting and which projects they're clicking. It changed how I job-hunt.",
    name: "James Okafor",
    title: "Backend Engineer",
    company: "Netflix",
    initial: "JO",
    color: "from-cyan-500 to-indigo-600",
    stars: 5,
    delay: 0.16,
  },
  {
    quote:
      "I'm a student with no real work experience, and my portfolio still looks professional. The Student template and AI bio generator made me seem credible.",
    name: "Aisha Patel",
    title: "CS Student",
    company: "MIT",
    initial: "AP",
    color: "from-emerald-500 to-cyan-600",
    stars: 5,
    delay: 0.24,
  },
  {
    quote:
      "Custom domain setup took literally 2 clicks. Now I hand out cards with myname.com and it just works. Professional and affordable — rare combo.",
    name: "Tyler Johnson",
    title: "Freelance Developer",
    company: "Self-employed",
    initial: "TJ",
    color: "from-violet-500 to-fuchsia-600",
    stars: 5,
    delay: 0.32,
  },
  {
    quote:
      "Folio.AI helped me transition from finance to tech. The AI wrote my career change narrative better than I could have. Got 3 interview calls in a week.",
    name: "Emily Wang",
    title: "Full-Stack Developer",
    company: "Shopify",
    initial: "EW",
    color: "from-orange-500 to-fuchsia-600",
    stars: 5,
    delay: 0.4,
  },
];

const marqueeItems = [
  "Google", "Meta", "Apple", "Netflix", "Shopify", "Stripe", "Vercel",
  "Figma", "GitHub", "Notion", "Linear", "Anthropic", "OpenAI", "Databricks",
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-sm">★</span>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  inView,
}: {
  testimonial: (typeof testimonials)[0];
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: testimonial.delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 hover:border-white/15 hover:bg-white/5 transition-all duration-300"
    >
      {/* Quote icon */}
      <div className="text-5xl font-serif leading-none text-white/10 mb-3">"</div>

      {/* Stars */}
      <StarRating count={testimonial.stars} />

      {/* Quote text */}
      <p className="text-white/65 text-sm leading-relaxed mt-3 mb-5 group-hover:text-white/80 transition-colors">
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <div
          className={cn(
            "w-10 h-10 rounded-full bg-linear-to-br flex items-center justify-center text-white text-xs font-bold shadow-lg shrink-0",
            testimonial.color
          )}
        >
          {testimonial.initial}
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{testimonial.name}</div>
          <div className="text-white/40 text-xs">
            {testimonial.title} · {testimonial.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MarqueeTicker() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative overflow-hidden py-4 mb-16">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-[#040817] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#040817] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-white/25 text-sm font-medium hover:text-white/50 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-24 lg:py-32 bg-[#040817] overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-75 bg-linear-to-b from-indigo-600/6 to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(139,92,246,0.25) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Testimonials
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5"
          >
            Loved by builders
            <br />
            <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              everywhere
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-white/50 text-lg max-w-xl mx-auto"
          >
            Join thousands of developers and creatives who've transformed their
            careers with Folio.AI.
          </motion.p>
        </div>

        {/* Company marquee */}
        <MarqueeTicker />

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} inView={inView} />
          ))}
        </div>

        {/* Bottom social proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-16 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-8 text-center"
        >
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">★</span>
            ))}
          </div>
          <p className="text-white font-bold text-2xl mb-1">4.9 / 5</p>
          <p className="text-white/40 text-sm">
            Average rating from{" "}
            <span className="text-white/70 font-medium">2,400+ reviews</span>{" "}
            on Product Hunt, G2, and Trustpilot
          </p>
        </motion.div>
      </div>
    </section>
  );
}
