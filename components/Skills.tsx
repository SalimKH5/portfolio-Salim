'use client'

import { motion, useInView } from 'framer-motion'
import React, { useRef } from 'react'
import SectionHeader from './SectionHeader'
import { FaServer } from "react-icons/fa"
import { FiLayout } from 'react-icons/fi'
import { LuBrainCircuit, LuDatabaseZap } from 'react-icons/lu'
import { TbTopologyStarRing3 } from 'react-icons/tb'

// 1. Define safe, strict TypeScript mappings for our incoming data models
interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  tags: string[];
}

interface SkillsProps {
  skills: SkillCategory[];
  sectionTitle: string;
}

// Color matching configuration handling both dark/light variations
const colorMap: Record<string, { bg: string; text: string; lightBg: string; lightText: string }> = {
  purple: { bg: 'rgba(167,139,250,0.15)', text: '#a78bfa', lightBg: 'rgba(139,92,246,0.1)', lightText: '#6d28d9' },
  teal:   { bg: 'rgba(52,211,153,0.15)',  text: '#34d399', lightBg: 'rgba(13,148,136,0.1)',  lightText: '#0f766e' },
  accent: { bg: 'rgba(34,211,238,0.15)',  text: '#22d3ee', lightBg: 'rgba(6,182,212,0.1)',   lightText: '#0369a1' }, // Cyan updated
  coral:  { bg: 'rgba(251,146,60,0.15)',  text: '#fb923c', lightBg: 'rgba(234,88,12,0.1)',   lightText: '#c2410c' },
  blue:   { bg: 'rgba(96,165,250,0.15)',  text: '#60a5fa', lightBg: 'rgba(37,99,235,0.1)',   lightText: '#1d4ed8' },
}

// Maps component declarations dynamically as values instead of fully instantiated nodes
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "FaServer": FaServer,
  "FiLayout": FiLayout,
  "LuBrainCircuit": LuBrainCircuit,
  "LuDatabaseZap": LuDatabaseZap,
  "TbTopologyStarRing3": TbTopologyStarRing3,
}

export default function Skills({ skills, sectionTitle }: SkillsProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-20 border-b border-black/[0.05] dark:border-white/[0.07]" id="skills" ref={ref}>
      <SectionHeader num="02" title={sectionTitle} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Fixed: Mapping cleanly over the localized props data layer directly */}
        {skills?.map((cat, i) => {
          const activeColor = colorMap[cat.color] || colorMap.accent
          const IconComponent = ICON_MAP[cat.icon] || FaServer

          return (
            <motion.div 
              key={cat.name}
              className="bg-neutral-50 dark:bg-[#111113] border border-black/[0.05] dark:border-white/[0.07] rounded-xl p-6 transition-all duration-200 hover:border-black/[0.15] dark:hover:border-white/[0.12] hover:-translate-y-0.5"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.07, 
                ease: [0.22, 1, 0.36, 1] as const // Fixed compilation crash
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                {/* Dynamically resolves styles with an integrated runtime theme checker helper built inside Tailwind setup */}
                <div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[17px] flex-shrink-0"
                  style={{
                    backgroundColor: typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? activeColor.bg : activeColor.lightBg,
                    color: typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? activeColor.text : activeColor.lightText
                  }}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="font-syne text-[15px] font-semibold text-neutral-900 dark:text-[#f0ede8]">{cat.name}</span>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {cat.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="font-mono text-[11px] px-2.5 py-1 border border-black/[0.08] dark:border-white/[0.12] rounded text-neutral-500 dark:text-[#9b9790] tracking-wide transition-colors hover:border-black/[0.2] dark:hover:border-white/20 hover:text-neutral-900 dark:hover:text-[#f0ede8]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}