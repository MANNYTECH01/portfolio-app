"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const templates = [
  {
    id: "developer",
    name: "Developer",
    profession: "Frontend Engineer",
    badge: "Most Popular",
    accent: "from-indigo-500 to-cyan-500",
    accentBg: "from-indigo-500/15 to-cyan-500/10",
    border: "border-indigo-500/30",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-400/30",
    preview: {
      headerColor: "from-indigo-600/40 to-cyan-600/30",
      skills: ["React", "TypeScript", "Node.js"],
      skillColors: ["bg-indigo-500/30", "bg-cyan-500/30", "bg-violet-500/30"],
      bars: [88, 75, 68, 55],
      barColor: "from-indigo-500 to-cyan-500",
    },
  },
  {
    id: "backend",
    name: "Backend Engineer",
    profession: "Systems Architect",
    badge: null,
    accent: "from-violet-500 to-indigo-600",
    accentBg: "from-violet-500/15 to-indigo-500/10",
    border: "border-violet-500/30",
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-400/30",
    preview: {
      headerColor: "from-violet-600/40 to-indigo-600/30",
      skills: ["Go", "PostgreSQL", "Redis"],
      skillColors: ["bg-violet-500/30", "bg-indigo-500/30", "bg-blue-500/30"],
      bars: [90, 80, 72, 65],
      barColor: "from-violet-500 to-indigo-500",
    },
  },
  {
    id: "cloud",
    name: "Cloud Engineer",
    profession: "DevOps & Infrastructure",
    badge: null,
    accent: "from-cyan-500 to-blue-600",
    accentBg: "from-cyan-500/15 to-blue-500/10",
    border: "border-cyan-500/30",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
    preview: {
      headerColor: "from-cyan-600/40 to-blue-600/30",
      skills: ["AWS", "Kubernetes", "Terraform"],
      skillColors: ["bg-cyan-500/30", "bg-blue-500/30", "bg-indigo-500/30"],
      bars: [85, 82, 78, 60],
      barColor: "from-cyan-500 to-blue-500",
    },
  },
  {
    id: "designer",
    name: "UI/UX Designer",
    profession: "Product Designer",
    badge: "Creative",
    accent: "from-fuchsia-500 to-pink-600",
    accentBg: "from-fuchsia-500/15 to-pink-500/10",
    border: "border-fuchsia-500/30",
    badgeColor: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/30",
    preview: {
      headerColor: "from-fuchsia-600/40 to-pink-600/30",
      skills: ["Figma", "Framer", "Webflow"],
      skillColors: ["bg-fuchsia-500/30", "bg-pink-500/30", "bg-rose-500/30"],
      bars: [95, 88, 75, 70],
      barColor: "from-fuchsia-500 to-pink-500",
    },
  },
  {
    id: "student",
    name: "Student",
    profession: "CS Graduate",
    badge: null,
    accent: "from-emerald-500 to-cyan-600",
    accentBg: "from-emerald-500/15 to-cyan-500/10",
    border: "border-emerald-500/30",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    preview: {
      headerColor: "from-emerald-600/40 to-cyan-600/30",
      skills: ["Python", "Java", "ML"],
      skillColors: ["bg-emerald-500/30", "bg-cyan-500/30", "bg-teal-500/30"],
      bars: [70, 65, 58, 50],
      barColor: "from-emerald-500 to-cyan-500",
    },
  },
  {
    id: "freelancer",
    name: "Freelancer",
    profession: "Full-Stack Consultant",
    badge: null,
    accent: "from-orange-500 to-fuchsia-600",
    accentBg: "from-orange-500/15 to-fuchsia-500/10",
    border: "border-orange-500/30",
    badgeColor: "bg-orange-500/20 text-orange-300 border-orange-400/30",
    preview: {
      headerColor: "from-orange-600/40 to-fuchsia-600/30",
      skills: ["React", "WordPress", "SEO"],
      skillColors: ["bg-orange-500/30", "bg-fuchsia-500/30", "bg-amber-500/30"],
      bars: [85, 78, 72, 68],
      barColor: "from-orange-500 to-fuchsia-500",
    },
  },
  {
    id: "creative",
    name: "Creative",
    profession: "Content Creator",
    badge: "Bold",
    accent: "from-rose-500 to-orange-500",
    accentBg: "from-rose-500/15 to-orange-500/10",
    border: "border-rose-500/30",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-400/30",
    preview: {
      headerColor: "from-rose-600/40 to-orange-600/30",
      skills: ["YouTube", "Premiere", "Canva"],
      skillColors: ["bg-rose-500/30", "bg-orange-500/30", "bg-red-500/30"],
      bars: [92, 80, 75, 65],
      barColor: "from-rose-500 to-orange-500",
    },
  },
];

function TemplateMockPreview({ template }: { template: (typeof templates)[0] }) {
  return (
    <div className="w-full h-full p-3 space-y-3">
      {/* Header */}
      <div
        className={cn(
          "h-16 rounded-lg bg-linear-to-br flex items-end p-3",
          template.preview.headerColor
        )}
      >
        <div className="flex items-center gap-2">
          <div className={cn("w-8 h-8 rounded-full bg-linear-to-br", template.accent)} />
          <div>
            <div className="h-2 w-16 rounded bg-white/30 mb-1" />
            <div className="h-1.5 w-12 rounded bg-white/15" />
          </div>
        </div>
      </div>

      {/* Skills chips */}
      <div className="flex flex-wrap gap-1.5">
        {template.preview.skills.map((skill, i) => (
          <span
            key={skill}
            className={cn(
              "text-[9px] px-2 py-0.5 rounded-full text-white/70 border border-white/10",
              template.preview.skillColors[i] || "bg-white/10"
            )}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Skill bars */}
      <div className="space-y-2">
        {template.preview.bars.map((width, i) => (
          <div key={i} className="h-1.5 rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${width}%` }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: "easeOut" }}
              className={cn("h-full rounded-full bg-linear-to-r", template.preview.barColor)}
            />
          </div>
        ))}
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-2 gap-1.5">
        <div className={cn("h-12 rounded-lg bg-linear-to-br border border-white/5", template.accentBg)} />
        <div className={cn("h-12 rounded-lg bg-linear-to-br border border-white/5", template.accentBg)} />
      </div>
    </div>
  );
}

function TemplateCard({
  template,
  index,
  inView,
  isActive,
  onClick,
}: {
  template: (typeof templates)[0];
  index: number;
  inView: boolean;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, rotateX: 4, rotateY: 0 }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      onClick={onClick}
      className={cn(
        "group relative rounded-2xl border bg-white/3 backdrop-blur-sm cursor-pointer overflow-hidden transition-all duration-300",
        isActive ? `border-white/30 ${template.border}` : "border-white/8 hover:border-white/20"
      )}
    >
      {/* Glow when active */}
      {isActive && (
        <div
          className={cn(
            "absolute inset-0 opacity-10 bg-linear-to-br rounded-2xl",
            template.accentBg
          )}
        />
      )}

      {/* Mock preview area */}
      <div className="relative h-44 bg-[#060d20] rounded-t-2xl overflow-hidden border-b border-white/5">
        <TemplateMockPreview template={template} />

        {/* Hover overlay with CTA */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-[#040817]/70 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.button
                initial={{ scale: 0.8, y: 8 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 8 }}
                className={cn(
                  "px-5 py-2.5 rounded-xl bg-linear-to-r text-white text-sm font-semibold shadow-lg",
                  template.accent
                )}
              >
                Use Template
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card info */}
      <div className="p-4 flex items-center justify-between">
        <div>
          <div className="text-white font-semibold text-sm mb-0.5">{template.name}</div>
          <div className="text-white/40 text-xs">{template.profession}</div>
        </div>
        <div className="flex items-center gap-2">
          {template.badge && (
            <span
              className={cn(
                "text-[10px] px-2 py-0.5 rounded-full border font-medium",
                template.badgeColor
              )}
            >
              {template.badge}
            </span>
          )}
          <div
            className={cn(
              "w-6 h-6 rounded-full bg-linear-to-br flex items-center justify-center",
              template.accent
            )}
          >
            <span className="text-white text-[10px] font-bold">→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TemplatesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTemplate, setActiveTemplate] = useState("developer");

  return (
    <section
      id="templates"
      ref={ref}
      className="relative py-24 lg:py-32 bg-[#040817] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-150 h-100 bg-linear-to-tr from-fuchsia-600/8 to-violet-600/5 blur-3xl rounded-full" />
        <div className="absolute top-1/2 right-0 w-100 h-100 bg-linear-to-tl from-indigo-600/8 to-cyan-600/5 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400 text-sm font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
            Templates
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5"
          >
            <span className="bg-linear-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              7 Premium Templates
            </span>
            <br />
            <span className="text-white">for every career</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Each template is crafted to highlight what matters most for your
            specific role. Pick one and personalize it in minutes.
          </motion.p>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {templates.map((template, i) => (
            <TemplateCard
              key={template.id}
              template={template}
              index={i}
              inView={inView}
              isActive={activeTemplate === template.id}
              onClick={() => setActiveTemplate(template.id)}
            />
          ))}
        </div>

        {/* Active template indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-2"
        >
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTemplate(t.id)}
              className={cn(
                "rounded-full transition-all duration-300",
                activeTemplate === t.id
                  ? "w-8 h-2 bg-linear-to-r from-indigo-500 to-violet-500"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-center mt-12"
        >
          <a
            href="/templates"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 hover:border-white/25 bg-white/3 hover:bg-white/6 text-white font-semibold transition-all hover:-translate-y-0.5"
          >
            View All Templates
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
