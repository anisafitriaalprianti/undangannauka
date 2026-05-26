'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const cinematicEase = [0.25, 0.46, 0.45, 0.94];
const slowEase = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Listen to scroll for navbar bg intensity
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 50);
    }, { passive: true });
  }

  const navLinks = [
    { href: '#templates', label: 'Template' },
    { href: '#why-nauka', label: 'Why Nauka' },
    { href: '#process', label: 'Process' },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: cinematicEase }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-2xl border-b border-white/[0.04]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8a7444] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(201,169,110,0.2)] transition-shadow duration-500">
              <span className="text-[#050505] font-serif font-bold text-sm">N</span>
            </div>
            <span className="font-serif text-lg font-semibold tracking-[0.15em] text-[#f5f0e8] group-hover:text-[#c9a96e] transition-colors duration-500">
              NAUKA
            </span>
          </a>

          {/* Nav Links — desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[12px] tracking-[0.25em] uppercase text-[#8a8578] hover:text-[#f5f0e8] transition-colors duration-400 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c9a96e]/50 group-hover:w-full transition-all duration-500" />
              </a>
            ))}
            <a
              href="#ai-finder"
              className="text-[12px] tracking-[0.25em] uppercase px-6 py-2.5 border border-[#c9a96e]/20 text-[#c9a96e]/80 hover:border-[#c9a96e]/40 hover:text-[#c9a96e] hover:bg-[#c9a96e]/[0.04] transition-all duration-500"
            >
              AI Finder
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-[#8a8578] hover:text-[#f5f0e8] transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-3.5">
              <span className={`absolute left-0 w-5 h-[1px] bg-current transition-all duration-300 ${isMobileOpen ? 'top-[50%] rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-[50%] w-5 h-[1px] bg-current transition-all duration-300 ${isMobileOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-3.5 h-[1px] bg-current transition-all duration-300 ${isMobileOpen ? 'top-[50%] -rotate-45 w-5' : 'bottom-0'}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileOpen ? 1 : 0,
          pointerEvents: isMobileOpen ? 'auto' as const : 'none' as const,
        }}
        transition={{ duration: 0.4, ease: cinematicEase }}
        className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl md:hidden"
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={isMobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: cinematicEase }}
              className="font-serif text-2xl text-[#f5f0e8] tracking-[0.15em] hover:text-[#c9a96e] transition-colors duration-300"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#ai-finder"
            onClick={() => setIsMobileOpen(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={isMobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.3, ease: cinematicEase }}
            className="font-serif text-2xl text-[#c9a96e] tracking-[0.15em]"
          >
            AI Finder
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}
