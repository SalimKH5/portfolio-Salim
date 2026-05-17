import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Providers from "@/components/Providers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

// 1. Dynamic metadata generator to localize browser/SEO properties
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const isFr = lang === "fr";
  return {
    title: isFr
      ? "Salim Khadir — Ingénieur Fullstack & IA"
      : "Salim Khadir — Fullstack & AI Engineer",
    description: isFr
      ? "Portfolio professionnel de Salim Khadir, Ingénieur Fullstack et Data spécialisé dans les applications web et systèmes d'IA."
      : "Professional portfolio of Salim Khadir, Fullstack & Data Engineer specializing in scalable web applications and AI systems.",
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  // 2. Await the params object asynchronously
  const { lang } = await params;

  return (
    <html
      lang={lang} // Uses dynamic locale for html lang attribute matching the proxy
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FaFaFb] dark:bg-[#0a0a0b]">
         <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
