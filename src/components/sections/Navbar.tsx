'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const cinematicEase = [0.25, 0.46, 0.45, 0.94];

/* PRD: Navbar polish — logo slightly alive, more breathing space,
   elegant menu spacing, still minimal.
   The navbar should feel like a quiet companion, not a loud host. */

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsMobileOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { href: '#templates', label: 'Template' },
    { href: '#why-nauka', label: 'Pendekatan' },
    { href: '#process', label: 'Process' },
  ];

  return (
    <>
      {/* PRD: Cinematic entrance — navbar fades in from top with blur reveal */}
      <motion.nav
        initial={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, delay: 0.3, ease: cinematicEase }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F6F2EE]/80 backdrop-blur-lg border-b border-black/[0.04] shadow-[0_1px_8px_rgba(28,28,28,0.04)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-8 sm:px-10 h-24 sm:h-28 flex items-center justify-between">
          {/* Nav Links — desktop (left) — elegant spacing, breathing room */}
          <div className="hidden md:flex items-center gap-12 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[11px] tracking-[0.25em] uppercase text-[#6B6B6B]/60 hover:text-[#1C1C1C] transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C6A769]/50 group-hover:w-full transition-all duration-400" />
              </a>
            ))}
          </div>

          {/* Logo — centered with breathing space, subtle life
              naukaLogoBreath gives gentle scale pulse
              naukaLogoShimmer adds occasional gold light pass */}
          <a href="#" className="flex items-center group absolute left-1/2 -translate-x-1/2 px-8">
            <div className="relative">
              {/* SVG logo — crisp at any size, lightweight */}
              <img
                src="/logo-nauka.svg"
                alt="Nauka"
                className="h-28 sm:h-32 w-auto group-hover:opacity-85 transition-opacity duration-500"
                style={{ animation: 'naukaLogoBreath 8s ease-in-out infinite' }}
              />
              {/* Logo shimmer — very subtle gold light that passes across occasionally
                  Like sunlight catching the edge of a nameplate */}
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
                style={{ animation: 'naukaLogoShimmer 8s ease-in-out infinite' }}
              >
                <div
                  className="absolute -inset-y-full w-[30%] -skew-x-12"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(198,167,105,0.06), transparent)',
                  }}
                />
              </div>
            </div>
          </a>

          {/* Right side — desktop, breathing space */}
          <div className="hidden md:flex items-center gap-12 flex-1 justify-end">
            <a
              href="#ai-finder"
              className="text-[11px] tracking-[0.25em] uppercase px-7 py-2.5 rounded-full border border-[#C6A769]/15 text-[#C6A769]/80 hover:border-[#C6A769]/35 hover:bg-[#C6A769]/5 hover:text-[#C6A769] transition-all duration-500"
            >
              Bantuan Pilih
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors duration-300 ml-auto"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-3.5">
              <span className={`absolute left-0 w-5 h-px bg-current transition-all duration-300 ${isMobileOpen ? 'top-[50%] rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-[50%] w-5 h-px bg-current transition-all duration-300 ${isMobileOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-3.5 h-px bg-current transition-all duration-300 ${isMobileOpen ? 'top-[50%] -rotate-45 w-5' : 'bottom-0'}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileOpen ? 1 : 0,
          pointerEvents: isMobileOpen ? ('auto' as const) : ('none' as const),
        }}
        transition={{ duration: 0.3, ease: cinematicEase }}
        className="fixed inset-0 z-40 bg-[#F6F2EE]/95 backdrop-blur-xl md:hidden"
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              initial={{ opacity: 0, y: 16 }}
              animate={isMobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.3, delay: i * 0.06, ease: cinematicEase }}
              className="font-serif text-2xl text-[#1C1C1C] tracking-[0.15em] hover:text-[#C6A769] transition-colors duration-300"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#ai-finder"
            onClick={() => setIsMobileOpen(false)}
            initial={{ opacity: 0, y: 16 }}
            animate={isMobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.3, delay: 0.2, ease: cinematicEase }}
            className="font-serif text-2xl text-[#C6A769] tracking-[0.15em]"
          >
            Bantuan Pilih
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}
