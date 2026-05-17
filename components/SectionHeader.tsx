interface Props { num: string; title: string }

export default function SectionHeader({ num, title }: Props) {
  return (
    <div className="flex items-baseline gap-4 mb-12">
      <span className="font-mono text-[12px] tracking-widest text-[#22d3ee] dark:text-[#e8ff47]">{num}</span>
      <h2 className="font-syne text-3xl font-bold tracking-tight text-[#0e0e0e] dark:text-[#f0ede8]">{title}</h2>
      <div className="flex-1 h-px bg-white/[0.07]" />
    </div>
  )
}
