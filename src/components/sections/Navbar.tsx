'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8a7444] flex items-center justify-center">
            <span className="text-[#050505] font-serif font-bold text-sm">N</span>
          </div>
          <span className="font-serif text-lg font-semibold tracking-wider text-[#f5f0e8] group-hover:text-[#c9a96e] transition-colors duration-300">
            NAUKA
          </span>
        </a>

        {/* Nav Links - hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#templates" className="text-[13px] tracking-widest uppercase text-[#8a8578] hover:text-[#f5f0e8] transition-colors duration-300">
            Template
          </a>
          <a href="#why-nauka" className="text-[13px] tracking-widest uppercase text-[#8a8578] hover:text-[#f5f0e8] transition-colors duration-300">
            Why Nauka
          </a>
          <a href="#process" className="text-[13px] tracking-widest uppercase text-[#8a8578] hover:text-[#f5f0e8] transition-colors duration-300">
            Process
          </a>
          <a
            href="#ai-finder"
            className="text-[13px] tracking-widest uppercase px-5 py-2 border border-[#c9a96e]/30 text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-all duration-300 rounded-sm"
          >
            AI Finder
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-[#8a8578] hover:text-[#f5f0e8] transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="4" y1="8" x2="20" y2="8" />
            <line x1="4" y1="16" x2="20" y2="16" />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
}
