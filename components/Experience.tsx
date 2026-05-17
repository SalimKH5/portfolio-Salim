'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionHeader from './SectionHeader'

// 1. Define the expected shape of your experience data
interface ExperienceItem {
  period: string;
  type: string;
  role: string;
  company: string;
  location: string;
  bullets: string[];
}

interface ExperienceProps {
  experience: ExperienceItem[];
  sectionTitle: string;
}

// 2. Accept the typed data and sectionTitle as props
export default function Experience({ experience, sectionTitle }: ExperienceProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-20 border-b border-white/[0.07]" id="experience" ref={ref}>
      {/* 3. Use the translated section title */}
      <SectionHeader num="04" title={sectionTitle} />
      
      <div className="flex flex-col">
        {experience.map((exp, i) => (
          <motion.div
            key={i}
            className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 py-9 border-b border-white/[0.07] last:border-b-0"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <div className="font-mono text-[11px] tracking-widest uppercase text-[#5a5754] mb-2">{exp.period}</div>
              <span className="inline-block font-mono text-[10px] tracking-widest uppercase px-2.5 py-0.5 border border-white/[0.12] rounded text-[#5a5754]">
                {exp.type}
              </span>
            </div>
            <div>
              <div className="font-syne text-[18px] font-bold tracking-tight text-[#0e0e0e] dark:text-[#f0ede8] mb-1">{exp.role}</div>
              {/* Updated the color from #e8ff47 to #22d3ee to match your new sapphire/cyan theme */}
              <div className="font-mono text-[13px] text-[#22d3ee] mb-4">{exp.company}</div>
              <ul className="flex flex-col gap-2">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-[13px] text-[#9b9790] leading-[1.7]">
                    <span className="font-mono text-[12px] text-[#5a5754] flex-shrink-0 mt-0.5">→</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}