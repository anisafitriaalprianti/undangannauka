'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

// Cinematic easing - feels intentional, not robotic
const cinematicEase = [0.25, 0.46, 0.45, 0.94];
const slowEase = [0.16, 1, 0.3, 1];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const mockupScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const glowIntensity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-16"
    >
      {/* Ambient background lighting — directional, felt, not random */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ opacity: glowIntensity }}
          className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] md:w-[900px] md:h-[900px] bg-[#c9a96e]/[0.03] rounded-full blur-[120px]"
        />
        <div className="absolute bottom-[-10%] right-[-5%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-[#3a2f1f]/[0.06] rounded-full blur-[100px]" />
      </div>

      {/* Cinematic vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,5,0.7)_100%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20 py-20 md:py-28">
          {/* Text Content */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="flex-1 text-center lg:text-left max-w-xl lg:max-w-none"
          >
            {/* Kicker — small, spaced, gold */}
            <motion.p
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1, delay: 0.3, ease: slowEase }}
              className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#c9a96e] mb-8 font-sans"
            >
              Curated Cinematic Invitation Studio
            </motion.p>

            {/* Hero Headline — staggered line reveal */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.1, delay: 0.5, ease: slowEase }}
                className="font-serif text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] text-[#f5f0e8] mb-8"
              >
                Undangan Digital
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.1, delay: 0.65, ease: slowEase }}
                className="font-serif text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] text-[#c9a96e] mb-2"
              >
                Dengan Rasa
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.1, delay: 0.8, ease: slowEase }}
                className="font-serif text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] text-[#f5f0e8]"
              >
                Yang Lebih Hidup
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 1.1, ease: cinematicEase }}
              className="text-[15px] sm:text-lg text-[#8a8578] leading-[1.7] mb-12 max-w-md mx-auto lg:mx-0"
            >
              Bukan sekadar undangan. Sebuah pengalaman emosional yang dirancang dengan cinematic clarity dan meaningful motion.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 1.4, ease: cinematicEase }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <a
                href="#templates"
                className="group relative inline-flex items-center gap-3 px-9 py-4 bg-[#c9a96e] text-[#050505] text-[13px] font-medium tracking-[0.2em] uppercase overflow-hidden hover:bg-[#e0c992] transition-all duration-500"
              >
                <span className="relative z-10">Lihat Template</span>
                <svg
                  className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-500"
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
                className="inline-flex items-center gap-2 px-9 py-4 border border-white/[0.08] text-[#8a8578] text-[13px] tracking-[0.2em] uppercase hover:border-[#c9a96e]/25 hover:text-[#c9a96e] transition-all duration-500"
              >
                Bantuan Pilih
              </a>
            </motion.div>
          </motion.div>

          {/* Mockup — cinematic parallax */}
          <motion.div
            style={{ y: mockupY, scale: mockupScale, opacity: mockupOpacity }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.93 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.7, ease: slowEase }}
              className="relative"
            >
              {/* Warm glow behind phone */}
              <div className="absolute -inset-12 bg-[#c9a96e]/[0.04] rounded-full blur-[80px]" />

              {/* Phone mockup frame */}
              <div className="relative w-[250px] sm:w-[275px] md:w-[300px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/[0.06] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.7)]">
                {/* Inner glow on top edge */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent z-10" />
                <Image
                  src="/hero-mockup.png"
                  alt="Nauka Premium Template Preview"
                  fill
                  className="object-cover"
                  priority
                  sizes="300px"
                  quality={90}
                />
              </div>

              {/* Subtle floating elements — restraint, not clutter */}
              <motion.div
                animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-8 -right-8 w-16 h-16 rounded-full border border-[#c9a96e]/10"
              />
              <motion.div
                animate={{ opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -bottom-6 -left-6 w-10 h-10 rounded-full border border-[#c9a96e]/8"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — breathe, not rush */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-[#5a5650]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-10 bg-gradient-to-b from-[#c9a96e]/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
