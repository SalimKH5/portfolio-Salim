"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "./SectionHeader";

interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  featured: boolean;
  github?: string;
  live?: string;
  adminUrl?: string;
  stack: string[];
  highlights?: string[];
}

interface ProjectsProps {
  projects: Project[];
  sectionTitle: string;
}

const accentMap: Record<string, string> = {
  accent: "#22d3ee", // Soft cyan
  purple: "#a78bfa",
  teal: "#34d399",
  coral: "#fb923c",
  blue: "#60a5fa",
};

const bgMap: Record<string, string> = {
  accent: "rgba(34,211,238,0.1)",
  purple: "rgba(167,139,250,0.1)",
  teal: "rgba(52,211,153,0.1)",
  coral: "rgba(251,146,60,0.1)",
  blue: "rgba(96,165,250,0.1)",
};

// Map tech stack string tokens to corresponding Tabler Icons
const techIconMap: Record<string, string> = {
  "next.js": "ti-brand-nextjs",
  "react.js": "ti-brand-react",
  typescript: "ti-brand-typescript",
  "tailwind css": "ti-brand-tailwind",
  ".net": "ti-brand-badge",
  "jwt auth": "ti-lock",
  "rest api": "ti-api",
  postgresql: "ti-database",
  python: "ti-brand-python",
  "claude llm": "ti-brain",
  rag: "ti-binary-tree",
  typesense: "ti-search",
  fastapi: "ti-lightning",
  mongodb: "ti-database-star",
  css3: "ti-brand-css3",
  html5: "ti-brand-html5",
};

export default function Projects({ projects, sectionTitle }: ProjectsProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="py-20 border-b border-white/[0.07]"
      id="projects"
      ref={ref}
    >
      <SectionHeader num="03" title={sectionTitle} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => {
          const colorHex = accentMap[project.color] || accentMap.accent;
          const bgRgba = bgMap[project.color] || bgMap.accent;

          return (
            <motion.div
              key={project.id}
              className={`relative overflow-hidden bg-[#111113] border border-white/[0.07] rounded-xl p-7 flex flex-col gap-4 card-accent-line transition-all duration-200 hover:border-white/[0.12] hover:-translate-y-1 ${project.featured ? "md:col-span-2" : ""}`}
              style={{ "--card-accent": colorHex } as React.CSSProperties}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[18px] transition-transform duration-300 hover:scale-110"
                  style={{ background: bgRgba, color: colorHex }}
                >
                  <i className={`ti ${project.icon}`} />
                </div>

                {/* External Links with scale-up hover adjustments */}
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub Repository"
                      className="h-8 px-2.5 border border-white/[0.12] rounded inline-flex items-center justify-center gap-1.5 text-[#5a5754] font-mono text-[11px] uppercase tracking-wider transition-all hover:text-[#f0ede8] hover:border-white/30 hover:scale-105"
                    >
                      <i className="ti ti-brand-github text-sm" />
                      <span>Code</span>
                    </a>
                  )}

                  {project.adminUrl && (
                    <a
                      href={project.adminUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Admin Dashboard"
                      title="Admin Dashboard"
                      className="h-8 px-2.5 border border-white/[0.12] rounded inline-flex items-center justify-center gap-1.5 text-[#5a5754] font-mono text-[11px] uppercase tracking-wider transition-all hover:text-[#f0ede8] hover:border-white/30 hover:scale-105"
                    >
                      <i className="ti ti-dashboard text-sm" />
                      <span>Admin</span>
                    </a>
                  )}

                  {project.live && project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Live Demo"
                      className="h-8 px-2.5 border border-white/[0.12] rounded inline-flex items-center justify-center gap-1.5 text-[#5a5754] font-mono text-[11px] uppercase tracking-wider transition-all hover:text-[#f0ede8] hover:border-white/30 hover:scale-105"
                    >
                      <i className="ti ti-external-link text-sm" />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-syne text-[18px] font-bold tracking-tight text-[#f0ede8] mb-2">
                  {project.title}
                </h3>
                <p className="text-[13px] text-[#9b9790] leading-[1.75]">
                  {project.description}
                </p>
              </div>

              {/* Highlights for Featured Projects */}
              {project.featured &&
                project.highlights &&
                project.highlights.length > 0 && (
                  <ul className="flex flex-col gap-1.5 mt-1">
                    {project.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="text-[12px] text-[#9b9790] flex items-start gap-2"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: colorHex }}
                        />
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

              {/* Dynamic Tech Stack Badges containing Icons */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {project.stack.map((tech) => {
                  const normalizedTech = tech.toLowerCase();
                  const techIcon = techIconMap[normalizedTech] || null;

                  return (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-0.5 bg-[#18181b] border border-white/[0.07] rounded text-[#9b9790] tracking-wider transition-colors hover:text-[#f0ede8] hover:border-white/[0.15]"
                    >
                      {techIcon && (
                        <i
                          className={`ti ${techIcon} text-[11px] text-[#5a5754]`}
                        />
                      )}
                      {tech}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
