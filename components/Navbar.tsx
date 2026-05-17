'use client'

import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'

interface NavbarProps {
  currentLang: string;
}

export default function Navbar({ currentLang }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    setMounted(true)
    const scrollHandler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', scrollHandler, { passive: true })
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  const handleLanguageChange = (newLang: string) => {
    if (newLang === currentLang) return

    const segments = pathname.split('/')
    if (segments[1] === currentLang) {
      segments[1] = newLang
    } else {
      segments.splice(1, 0, newLang)
    }

    const newPath = segments.join('/') || '/'
    router.push(newPath, { scroll: false })
  }

  const links = [
    { key: 'about', label: currentLang === 'fr' ? 'À propos' : 'About' },
    { key: 'skills', label: currentLang === 'fr' ? 'Compétences' : 'Skills' },
    { key: 'projects', label: currentLang === 'fr' ? 'Projets' : 'Projects' },
    { key: 'experience', label: currentLang === 'fr' ? 'Expérience' : 'Experience' },
  ]

  const hireMeText = currentLang === 'fr' ? 'recrutez-moi →' : 'hire me →'
  const contactLabel = currentLang === 'fr' ? 'Contact' : 'Contact'

  // Render a placeholder icon before mount to avoid layout shift
  const themeIcon = !mounted
    ? <FiMoon className="w-[16px] h-[16px]" />
    : resolvedTheme === 'dark'
      ? <FiSun className="w-[16px] h-[16px]" />
      : <FiMoon className="w-[16px] h-[16px]" />

  return (
    <nav className={`sticky top-0 z-50 border-b transition-all duration-300 backdrop-blur-xl ${
      scrolled
        ? 'bg-[#0a0a0b]/95 dark:bg-[#0a0a0b]/95 bg-white/95 border-black/[0.05] dark:border-white/[0.07]'
        : 'bg-[#0a0a0b]/70 dark:bg-[#0a0a0b]/70 bg-white/70 border-transparent'
    }`}>
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-6 px-8 py-[18px]">

        {/* Brand Logo Link */}
        <Link href={`/${currentLang}`} className="font-syne text-base font-bold tracking-tight text-neutral-900 dark:text-[#f0ede8] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#22d3ee] rounded">
          SK<span className="text-[#22d3ee]">.</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex gap-8 list-none items-center m-0 p-0">
          {links.map((link) => (
            <li key={link.key}>
              <a href={`#${link.key}`} className="font-mono text-[13px] tracking-wide text-neutral-500 dark:text-[#9b9790] transition-colors hover:text-neutral-900 dark:hover:text-[#f0ede8] focus-visible:outline-none focus-visible:text-neutral-900 dark:focus-visible:text-[#f0ede8]">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Controls & Language Selector */}
        <div className="hidden md:flex items-center gap-6">

          {/* Language Toggle */}
          <div className="flex items-center cursor-pointer gap-2 font-mono text-[12px] border-r border-neutral-200 dark:border-white/[0.1] pr-6" role="navigation" aria-label="Language Selector">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`transition-colors focus-visible:outline-none ${currentLang === 'en' ? 'text-[#22d3ee] font-bold' : 'text-neutral-400 dark:text-[#5a5754] hover:text-neutral-900 dark:hover:text-[#f0ede8]'}`}
            >
              EN
            </button>
            <span className="text-neutral-300 dark:text-[#5a5754]" aria-hidden="true">/</span>
            <button
              onClick={() => handleLanguageChange('fr')}
              className={`transition-colors focus-visible:outline-none ${currentLang === 'fr' ? 'text-[#22d3ee] font-bold' : 'text-neutral-400 dark:text-[#5a5754] hover:text-neutral-900 dark:hover:text-[#f0ede8]'}`}
            >
              FR
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="text-neutral-500 cursor-pointer dark:text-[#9b9790] hover:text-neutral-900 dark:hover:text-[#f0ede8] transition-colors flex items-center justify-center p-1 focus-visible:outline-none"
            aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {themeIcon}
          </button>

          <a href="#contact" className="inline-flex items-center rounded font-mono text-[13px] px-5 py-2 border border-[#22d3ee] text-[#22d3ee] transition-all hover:bg-[#22d3ee] hover:text-[#0a0a0b] focus-visible:outline-none focus-visible:bg-[#22d3ee] focus-visible:text-[#0a0a0b]">
            {hireMeText}
          </a>
        </div>

        {/* Mobile Utilities */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-neutral-500 cursor-pointer dark:text-[#9b9790] p-1 flex items-center justify-center"
            aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {themeIcon}
          </button>

          <button
            className="text-neutral-500 dark:text-[#9b9790] p-1 flex items-center gap-2 focus-visible:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
          >
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-[#5a5754]">{currentLang}</span>
            {menuOpen ? <FiX className="w-[18px] h-[18px]" /> : <FiMenu className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="md:hidden flex flex-col border-t border-neutral-200 dark:border-white/[0.07] bg-white dark:bg-[#0a0a0b] px-8 pb-5 pt-4 transition-colors">
          {links.map((link) => (
            <a key={link.key} href={`#${link.key}`} onClick={() => setMenuOpen(false)}
              className="font-mono text-sm text-neutral-500 dark:text-[#9b9790] border-b border-neutral-100 dark:border-white/[0.07] py-3 transition-colors hover:text-neutral-900 dark:hover:text-[#f0ede8]">
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}
            className="font-mono text-sm text-neutral-500 dark:text-[#9b9790] border-b border-neutral-100 dark:border-white/[0.07] py-3 transition-colors hover:text-neutral-900 dark:hover:text-[#f0ede8]">
            {contactLabel}
          </a>

          {/* Mobile Language Switcher */}
          <div className="flex gap-4 pt-4 font-mono text-xs text-neutral-400 dark:text-[#5a5754]">
            <button
              onClick={() => { handleLanguageChange('en'); setMenuOpen(false); }}
              className={`transition-colors ${currentLang === 'en' ? 'text-[#22d3ee] font-bold' : 'hover:text-neutral-900 dark:hover:text-[#f0ede8]'}`}
            >
              English
            </button>
            <button
              onClick={() => { handleLanguageChange('fr'); setMenuOpen(false); }}
              className={`transition-colors ${currentLang === 'fr' ? 'text-[#22d3ee] font-bold' : 'hover:text-neutral-900 dark:hover:text-[#f0ede8]'}`}
            >
              Français
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}