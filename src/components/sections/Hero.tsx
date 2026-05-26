'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const mockupScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-16"
    >
      {/* Ambient background lighting */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm radial glow - subtle, directional */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-[#c9a96e]/[0.03] rounded-full blur-[120px]" />
        {/* Secondary cool accent */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#4a3f2f]/[0.05] rounded-full blur-[100px]" />
      </div>

      {/* Cinematic vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-radial-[ellipse_at_center] from-transparent via-transparent to-[#050505]/70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-16 md:py-24">
          {/* Text Content */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="flex-1 text-center lg:text-left max-w-xl lg:max-w-none"
          >
            {/* Kicker */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6 font-sans"
            >
              Curated Cinematic Invitation Studio
            </motion.p>

            {/* Hero Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-[#f5f0e8] mb-6"
            >
              Undangan Digital
              <br />
              <span className="text-[#c9a96e]">Dengan Rasa</span>
              <br />
              Yang Lebih Hidup
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-base sm:text-lg text-[#8a8578] leading-relaxed mb-10 max-w-md mx-auto lg:mx-0"
            >
              Bukan sekadar undangan. Sebuah pengalaman emosional yang dirancang dengan cinematic clarity dan meaningful motion.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <a
                href="#templates"
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#c9a96e] text-[#050505] text-sm font-medium tracking-wider hover:bg-[#e0c992] transition-all duration-300"
              >
                LIHAT TEMPLATE
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/10 text-[#8a8578] text-sm tracking-wider hover:border-[#c9a96e]/30 hover:text-[#c9a96e] transition-all duration-300"
              >
                BANTUAN PILIH
              </a>
            </motion.div>
          </motion.div>

          {/* Mockup */}
          <motion.div
            style={{ y: mockupY, scale: mockupScale }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {/* Phone mockup frame */}
              <div className="relative w-[260px] sm:w-[280px] md:w-[300px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40">
                {/* Subtle outer glow */}
                <div className="absolute -inset-1 bg-gradient-to-b from-[#c9a96e]/10 to-transparent rounded-[2.2rem] blur-sm -z-10" />
                <Image
                  src="/hero-mockup.png"
                  alt="Nauka Premium Template Preview"
                  fill
                  className="object-cover"
                  priority
                  sizes="300px"
                />
              </div>

              {/* Floating decorative element - subtle */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 w-12 h-12 rounded-full border border-[#c9a96e]/20"
              />
              <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full border border-[#c9a96e]/15"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#5a5650]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#c9a96e]/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
