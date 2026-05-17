'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { siteData } from '@/lib/data'
import SectionHeader from './SectionHeader'

const colorMap: Record<string, { bg: string; text: string }> = {
  purple: { bg: 'rgba(167,139,250,0.15)', text: '#a78bfa' },
  teal:   { bg: 'rgba(52,211,153,0.15)',  text: '#34d399' },
  accent: { bg: 'rgba(232,255,71,0.15)',  text: '#e8ff47' },
  coral:  { bg: 'rgba(251,146,60,0.15)',  text: '#fb923c' },
  blue:   { bg: 'rgba(96,165,250,0.15)',  text: '#60a5fa' },
}

export default function Skills({ skills, sectionTitle }: { skills: any[]; sectionTitle: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-20 border-b border-white/[0.07]" id="skills" ref={ref}>
      <SectionHeader num="02" title="Skills" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {siteData.skills.map((cat, i) => (
          <motion.div key={cat.name}
            className="bg-[#111113] border border-white/[0.07] rounded-xl p-6 transition-all duration-200 hover:border-white/[0.12] hover:-translate-y-0.5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[17px] flex-shrink-0"
                style={{ background: colorMap[cat.color]?.bg, color: colorMap[cat.color]?.text }}>
                <i className={`ti ${cat.icon}`} />
              </div>
              <span className="font-syne text-[15px] font-semibold text-[#f0ede8]">{cat.name}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.tags.map((tag) => (
                <span key={tag}
                  className="font-mono text-[11px] px-2.5 py-1 border border-white/[0.12] rounded text-[#9b9790] tracking-wide transition-colors hover:border-white/20 hover:text-[#f0ede8]">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
