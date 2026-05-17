'use client'

interface FooterProps {
  footerUI: {
    builtWith: string;   // e.g., "Built with Next.js & Tailwind" or "Propulsé par Next.js & Tailwind"
    backToTop: string;   // e.g., "back to top" or "retour en haut"
  };
}

export default function Footer({ footerUI }: FooterProps) {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="flex items-center justify-between py-8">
      <span className="font-mono text-[11px] tracking-widest uppercase text-[#5a5754]">
        © 2026 Salim Khadir — {footerUI.builtWith}
      </span>
      <a 
        href="#" 
        onClick={scrollToTop}
        className="flex items-center gap-1.5 font-mono text-[11px] tracking-widest uppercase text-[#5a5754] transition-colors hover:text-[#22d3ee]"
      >
        <i className="ti ti-arrow-up" /> {footerUI.backToTop}
      </a>
    </footer>
  )
}