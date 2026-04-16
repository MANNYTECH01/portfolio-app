"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does the AI content generation work?",
    answer:
      "Folio.AI uses GPT-4 under the hood. You fill in a short intake form — your role, skills, and experience highlights — and our AI crafts a professional bio, project descriptions, and even a career summary. Everything is editable, so you stay in full control. Most users find the AI output is 80-90% publish-ready.",
  },
  {
    question: "Do I need to know how to code to use Folio.AI?",
    answer:
      "Not at all. Folio.AI is built for everyone — from experienced engineers to bootcamp students to career-changers. Our drag-and-drop editor and pre-built templates mean you never touch a line of code. If you can fill out a form, you can build a stunning portfolio.",
  },
  {
    question: "Can I connect my own domain name?",
    answer:
      "Yes — custom domains are available on the Pro and Team plans. You simply add a CNAME record in your DNS provider pointing to Folio.AI, and we handle the SSL certificate automatically. The whole process takes under 5 minutes and we have step-by-step guides for every major registrar.",
  },
  {
    question: "What templates are available and can I switch between them?",
    answer:
      "We offer 7 premium templates: Developer, Backend Engineer, Cloud Engineer, UI/UX Designer, Student, Freelancer, and Creative. You can switch templates at any time with a single click — your content migrates instantly. No data loss, no rebuilding. Pro users get access to all templates.",
  },
  {
    question: "Is there a free plan? What are its limitations?",
    answer:
      "Yes! The Free plan lets you build and publish one portfolio with a Folio.AI subdomain (yourname.folio.ai), choose from 3 starter templates, and use basic AI generation for up to 5 projects. It is fully functional for getting started — no credit card required ever.",
  },
  {
    question: "How does the analytics dashboard work?",
    answer:
      "Pro users get a real-time analytics dashboard showing unique visitors, page views, time on page, referral sources, and which projects get the most attention. We track link clicks so you can see if recruiters are clicking your GitHub or resume. All data is private and only visible to you.",
  },
  {
    question: "Can I export my portfolio or am I locked in?",
    answer:
      "You are never locked in. You can export your portfolio content as JSON at any time. We also provide an HTML/CSS export for Pro users so you can self-host your portfolio if you ever want to leave — though we are confident you will stay.",
  },
  {
    question: "Is Folio.AI suitable for team use, like a bootcamp cohort?",
    answer:
      "Absolutely. Our Team plan supports up to 20 portfolios under one admin dashboard. Bootcamp instructors love it because they can onboard a whole cohort at once, review portfolios, and push template updates across all members. We offer educational discounts — reach out to hello@folio.ai.",
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
  inView,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300",
        isOpen
          ? "border-indigo-500/30 bg-indigo-500/5"
          : "border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "text-base font-semibold transition-colors",
            isOpen ? "text-white" : "text-white/80 group-hover:text-white"
          )}
        >
          {faq.question}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300",
            isOpen
              ? "border-indigo-500/50 bg-indigo-500/20 text-indigo-400"
              : "border-white/15 bg-white/5 text-white/40 group-hover:border-white/30 group-hover:text-white/70"
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1V13M1 7H13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-6">
              <div className="w-full h-px bg-linear-to-r from-indigo-500/30 to-transparent mb-5" />
              <p className="text-white/60 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={ref}
      className="relative py-24 lg:py-32 bg-[#040817] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-125 h-100 bg-linear-to-tl from-violet-600/8 to-transparent blur-3xl" />
        <div className="absolute top-0 left-1/4 w-125 h-75 bg-linear-to-br from-indigo-600/6 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            FAQ
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5"
          >
            Got{" "}
            <span className="bg-linear-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              questions?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-white/50 text-lg max-w-xl mx-auto"
          >
            Everything you need to know about Folio.AI. Cannot find the answer?{" "}
            <a
              href="mailto:hello@folio.ai"
              className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2"
            >
              Chat with us.
            </a>
          </motion.p>
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-16 text-center rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-10"
        >
          <div className="text-5xl mb-4 text-indigo-400 font-bold">?</div>
          <h3 className="text-white font-bold text-2xl mb-3">
            Still have questions?
          </h3>
          <p className="text-white/50 text-sm mb-6 max-w-sm mx-auto">
            Our team usually replies within a few hours. We are here to help you
            build the portfolio that lands your dream role.
          </p>
          <a
            href="mailto:hello@folio.ai"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300 font-medium text-sm transition-all"
          >
            Contact Support
            <span className="text-base">&#8594;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
