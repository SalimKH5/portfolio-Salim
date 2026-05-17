import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Define supported locales strictly to prevent malicious file path imports
const SUPPORTED_LOCALES = ['en', 'fr', 'es'] as const;
type SupportedLocale = typeof SUPPORTED_LOCALES[number];

interface HomeProps {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;

  // 1. Instantly validate the locale param
  if (!SUPPORTED_LOCALES.includes(lang as any)) {
    notFound();
  }

  let dict;
  try {
    // 2. Load the matching localized JSON dictionary safely
    dict = (await import(`@/messages/${lang}.json`)).default;
  } catch (error) {
    console.error(`Failed to load dictionary for language: ${lang}`, error);
    notFound();
  }

  return (
    <>
      {/* If your Navbar needs a dynamic language switcher later, pass the current lang */}
      <Navbar currentLang={lang} />
      
      <main className="relative z-[1]">
        <div className="mx-auto max-w-[1100px] px-8 max-sm:px-5">
          <Hero 
            stats={dict.stats}
            name={dict.name}
            role={dict.role}
            heroUI={dict.heroUI}
          />
          <About bio={dict.bio} info={dict.info} sectionTitle={dict.AboutSectionTitle} />
          <Skills skills={dict.skills} sectionTitle={dict.skillsSectionTitle} />
          <Projects projects={dict.projects} sectionTitle={dict.projectsSectionTitle} />
          <Experience experience={dict.experience} sectionTitle={dict.experienceSectionTitle} />
          <Contact contactUI={dict.contactUI}  />
    
          <Footer  footerUI={dict.footerUI}/>
          
        </div>
      </main>
    </>
  )
}