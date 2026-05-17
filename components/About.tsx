'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionHeader from './SectionHeader'

// 1. Define the expected shape of your translated data
interface AboutProps {
  sectionTitle: string; // e.g., "About" or "À propos"
    bio: string[];
    info: {
      key: string;
      value: string;
      accent?: string;
    }[];
};


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] as const // <-- Add "as const" here
    },
  },
}

// 2. Accept the translated data as props
export default function About({ bio,info, sectionTitle }: AboutProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section 
      className="py-20 border-b border-white/[0.07]" 
      id="about" 
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* 3. Use the translated section title */}
      <SectionHeader num="01" title={sectionTitle} />

      <h2 className="sr-only">Salim Khadir - {sectionTitle} & Professional Details</h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
        variants={containerVariants}
      >
        <div className="space-y-4">
          <article className="prose prose-sm prose-invert max-w-none">
            {/* 4. Map over the translated bio array */}
            {bio.map((paragraph, index) => (
              <motion.p 
                key={index} 
                className="text-[15px] text-[#9b9790] leading-[1.85]"
                variants={itemVariants}
                dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="hover:text-[#0e0e0e] text-[#0e0e0e] dark:text-[#f0ede8] font-medium">$1</strong>') }} 
              />
            ))}
          </article>
        </div>

        <motion.div className="flex flex-col" variants={containerVariants}>
          <h3 className="sr-only">Key Professional Information</h3>
          {/* 5. Map over the translated info array */}
          {info.map((row) => (
            <motion.div 
              key={row.key} 
              className="flex items-center justify-between py-3 border-b border-white/[0.07]"
              variants={itemVariants} 
            >
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#5a5754] flex-shrink-0 mr-4">
                {row.key}
              </span>
              <span className={`text-[13px] text-right ${row.accent === 'teal' ? 'text-[#34d399]' : 'text-[#0e0e0e] dark:text-[#f0ede8]'}`}>
                {row.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}