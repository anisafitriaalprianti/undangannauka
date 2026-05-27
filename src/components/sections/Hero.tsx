'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const slowEase = [0.16, 1, 0.3, 1];

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-[#F6F2EE] overflow-hidden pt-20 pb-16">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left max-w-xl lg:max-w-none"
          >
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: slowEase }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C6A769]/10 border border-[#C6A769]/20 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A769]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C6A769] font-sans">
                Curated Cinematic Studio
              </span>
            </motion.div>

            {/* Hero Headline */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.4, ease: slowEase }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] text-[#1C1C1C]"
              >
                Undangan Digital
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.55, ease: slowEase }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] text-[#C6A769]"
              >
                Dengan Rasa
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.7, ease: slowEase }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] text-[#1C1C1C]"
              >
                Yang Lebih Hidup
              </motion.h1>
            </div>

            {/* Subtitle — short, no manifesto */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.9, ease: slowEase }}
              className="text-[15px] sm:text-base text-[#6B6B6B] leading-[1.7] mb-10 max-w-md mx-auto lg:mx-0"
            >
              Setiap undangan dirancang dengan feel, taste, dan cinematic clarity. Bukan template biasa.
            </motion.p>

            {/* CTA Buttons — pill shaped */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.1, ease: slowEase }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10"
            >
              <a
                href="#templates"
                className="group relative inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#C6A769] text-white text-[13px] font-medium tracking-[0.15em] uppercase hover:bg-[#D4BA82] transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10">Lihat Template</span>
                <svg
                  className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </a>
              <a
                href="#ai-finder"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full border border-[#1C1C1C]/10 text-[#6B6B6B] text-[13px] tracking-[0.15em] uppercase hover:border-[#C6A769]/30 hover:text-[#C6A769] transition-all duration-500"
              >
                Bantuan Pilih
              </a>
            </motion.div>

            {/* Trust badges — social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 1.4 }}
              className="flex items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex -space-x-1.5">
                {['#E8C4A0', '#A0C4E8', '#C4A0E8', '#A0E8C4'].map((color, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full ring-2 ring-white flex items-center justify-center text-[8px] font-semibold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {['A', 'R', 'N', 'D'][i]}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#1C1C1C]">12,000+ pasangan</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-[#C6A769]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[11px] text-[#6B6B6B]">4.9</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Phone Mockup — coded, not image */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.6, ease: slowEase }}
            className="flex-shrink-0 relative"
          >
            {/* Glow behind phone */}
            <div
              className="absolute -inset-8 blur-3xl opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(198,167,105,0.25) 0%, transparent 70%)',
              }}
            />

            {/* Phone frame */}
            <div
              className="relative w-[260px] sm:w-[280px] rounded-[2.5rem] p-2 shadow-[0_25px_50px_-12px_rgba(28,28,28,0.2)] ring-1 ring-white/40"
              style={{ backgroundColor: '#1C1C1C', aspectRatio: '9/18' }}
            >
              {/* Notch */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 rounded-b-2xl z-20"
                style={{ backgroundColor: '#1C1C1C' }}
              />

              {/* Screen */}
              <div
                className="relative w-full h-full rounded-[2rem] overflow-hidden"
                style={{ backgroundColor: '#F6F2EE' }}
              >
                {/* Mini invitation content — scrolling */}
                <div
                  className="animate-[phoneScroll_8s_ease-in-out_infinite]"
                  style={{ animationDuration: '8s' }}
                >
                  {/* Hero photo area */}
                  <div
                    className="w-full h-[140px] relative"
                    style={{
                      background: 'linear-gradient(135deg, #C6A769 0%, #8A7444 50%, #D4BA82 100%)',
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/20 text-4xl font-serif">N</span>
                    </div>
                  </div>

                  {/* Greeting */}
                  <div className="px-5 pt-4 text-center">
                    <p style={{ fontSize: '6px', letterSpacing: '0.15em', color: '#C6A769', textTransform: 'uppercase' as const }}>
                      The Wedding Of
                    </p>
                    <p style={{ fontSize: '16px', fontFamily: 'var(--font-playfair)', color: '#1C1C1C', marginTop: '4px', fontStyle: 'italic' }}>
                      Arka & Dyana
                    </p>
                    <p style={{ fontSize: '5px', color: '#6B6B6B', marginTop: '2px', letterSpacing: '0.1em' }}>
                      28 Desember 2025
                    </p>
                  </div>

                  {/* Couple avatars */}
                  <div className="flex items-center justify-center gap-3 py-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                      style={{ fontSize: '6px', backgroundColor: '#C6A769' }}
                    >
                      A
                    </div>
                    <span style={{ fontSize: '8px', color: '#C6A769' }}>&</span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                      style={{ fontSize: '6px', backgroundColor: '#8A7444' }}
                    >
                      D
                    </div>
                  </div>

                  {/* Event card */}
                  <div className="mx-4 p-3 rounded-lg" style={{ backgroundColor: 'white' }}>
                    <p style={{ fontSize: '5px', color: '#C6A769', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: '3px' }}>
                      Resepsi
                    </p>
                    <p style={{ fontSize: '7px', color: '#1C1C1C', fontWeight: 600, marginBottom: '1px' }}>
                      Minggu, 28 Des 2025
                    </p>
                    <p style={{ fontSize: '6px', color: '#6B6B6B' }}>
                      10:00 - 14:00 WIB
                    </p>
                    <p style={{ fontSize: '6px', color: '#6B6B6B', marginTop: '2px' }}>
                      Graha Sabha, Jakarta Selatan
                    </p>
                  </div>

                  {/* RSVP button */}
                  <div className="px-4 pt-3 pb-6 text-center">
                    <div
                      className="inline-block px-6 py-1.5 rounded-full text-white"
                      style={{ fontSize: '6px', letterSpacing: '0.15em', backgroundColor: '#C6A769' }}
                    >
                      RSVP
                    </div>
                  </div>

                  {/* Extra space for scroll */}
                  <div style={{ height: '60px' }} />
                </div>
              </div>
            </div>

            {/* Floating notification badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.5, ease: slowEase }}
              className="absolute -right-3 top-16 sm:-right-4 sm:top-20 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 ring-1 ring-black/5"
            >
              <div className="w-6 h-6 rounded-full bg-[#C6A769]/10 flex items-center justify-center">
                <svg className="w-3 h-3 text-[#C6A769]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-semibold text-[#1C1C1C]">RSVP Masuk</p>
                <p className="text-[7px] text-[#6B6B6B]">+3 tamu baru</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-[#999]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#C6A769]/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
