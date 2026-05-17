"use client";

import { motion } from "framer-motion";

// 1. Define clean TypeScript interfaces for your JSON structure
interface HeroProps {
  name: string;
  role: string;
  stats?: {
    label: string;
    imageUrl?: string;
    num?: number | string;
  }[];
  heroUI: {
    description: string;
    viewWork: string;
    getInTouch: string;
    available: string;
  };
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.6, 
    delay, 
    ease: [0.22, 1, 0.36, 1] as const 
  },
})

export default function Hero({ role, name, heroUI, stats }: HeroProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center py-16 md:py-24 border-b border-black/[0.05] dark:border-white/[0.07]">
      {/* Left Column: Text & CTAs */}
      <div>
        <motion.div
          {...fadeUp(0)}
          className="flex items-center gap-3 font-mono text-[12px] tracking-[0.12em] uppercase text-cyan-500 dark:text-[#22d3ee] mb-6 before:inline-block before:w-6 before:h-px before:bg-cyan-500 dark:before:bg-[#22d3ee]"
        >
          {role}
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="font-syne font-extrabold leading-[0.95] tracking-[-2px] text-[clamp(48px,7vw,80px)] text-neutral-900 dark:text-[#f0ede8] mb-7"
        >
          {name.split(" ")[0]}
          <br />
          <span className="text-stroke">{name.split(" ")[1]}</span>
        </motion.h1>

        {/* Dynamic injection layer converting Markdown bold tokens safely */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-base text-neutral-600 dark:text-[#9b9790] max-w-[480px] leading-[1.75] mb-10"
          dangerouslySetInnerHTML={{
            __html: (heroUI?.description || "").replace(
              /\*\*(.*?)\*\*/g,
              '<strong class="text-neutral-900 dark:text-[#f0ede8] font-medium">$1</strong>'
            ),
          }}
        />

        <motion.div
          {...fadeUp(0.3)}
          className="flex gap-4 flex-wrap items-center"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3 bg-cyan-500 dark:bg-[#22d3ee] text-white dark:text-[#0a0a0b] font-mono text-[13px] font-medium rounded transition-all hover:bg-cyan-600 dark:hover:bg-[#06b6d4] hover:-translate-y-0.5"
          >
            <i className="ti ti-code" /> {heroUI?.viewWork}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 border border-neutral-200 dark:border-white/[0.12] text-neutral-600 dark:text-[#9b9790] font-mono text-[13px] rounded transition-all hover:border-neutral-300 dark:hover:border-white/30 hover:text-neutral-900 dark:hover:text-[#f0ede8]"
          >
            <i className="ti ti-send" /> {heroUI?.getInTouch}
          </a>
        </motion.div>
      </div>

      {/* Right Column: Status & Stats */}
      <motion.div {...fadeUp(0.2)} className="w-full flex flex-col items-center md:items-end gap-6 mt-8 md:mt-0">
        
        {/* Status badge */}
        <div className="flex items-center gap-2 px-4 py-2 border border-neutral-200 dark:border-white/[0.12] rounded-full font-mono text-[12px] text-neutral-500 dark:text-[#9b9790] whitespace-nowrap">
          <span className="w-[7px] h-[7px] rounded-full bg-[#34d399] animate-status-dot flex-shrink-0" />
          {heroUI?.available}
        </div>

        {/* Stats Grid: Responsive 3-column row on mobile, stacked column on desktop */}
        <div className="w-full grid grid-cols-3 md:flex md:flex-col gap-2 md:gap-3 px-0 md:px-4">
          {stats && stats.map((s) => (
            <div key={s.label} className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
              
              {/* Image visualization block - kept strictly dark for visual contrast as seen in screenshot */}
              <div className="w-full md:w-[120px] h-[60px] border border-white/[0.07] rounded-lg bg-[#111113] p-2 overflow-hidden flex items-center justify-center">
                {s.imageUrl ? (
                  <img
                    src={s.imageUrl}
                    alt={`${s.label} visualization`}
                    className="w-auto h-auto max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full border border-[#22d3ee]/20 rounded-md bg-[#22d3ee]/5 p-2 flex gap-1 items-end justify-center">
                    <div className="w-[3px] h-[90%] bg-[#22d3ee] rounded-t-sm animate-pulse" style={{ animationDelay: "0.1s" }} />
                    <div className="w-[3px] h-[70%] bg-[#22d3ee] rounded-t-sm animate-pulse" style={{ animationDelay: "0.3s" }} />
                    <div className="w-[3px] h-[50%] bg-[#22d3ee] rounded-t-sm animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <div className="w-[3px] h-[30%] bg-[#22d3ee] rounded-t-sm animate-pulse" style={{ animationDelay: "0.5s" }} />
                    <div className="w-[3px] h-[10%] bg-[#22d3ee] rounded-t-sm animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                )}
              </div>

              {/* Stat numerical text card box */}
              <div className="w-full flex flex-col items-center md:items-end px-2 py-3 md:px-5 md:py-3 border border-white/[0.07] rounded-lg bg-[#111113] md:min-w-[130px] transition-colors hover:border-white/[0.12]">
                <span className="font-syne text-[20px] md:text-[28px] font-extrabold text-[#f0ede8] leading-none">
                  {s.num}
                </span>
                <span className="font-mono text-[9px] md:text-[11px] tracking-widest uppercase text-[#5a5754] mt-1 text-center md:text-right">
                  {s.label}
                </span>
              </div>
              
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}