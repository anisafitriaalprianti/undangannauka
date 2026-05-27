'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const slowEase = [0.16, 1, 0.3, 1];
const cinematicEase = [0.25, 0.46, 0.45, 0.94];

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showWhisper, setShowWhisper] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // PRD: Cinematic parallax — scroll-driven transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const mockupScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const spotlightIntensity = useTransform(scrollYProgress, [0, 0.3], [1, 0.4]);

  // PRD: Opening Nauka — light reveal sequence with delayed whisper
  useEffect(() => {
    const t1 = setTimeout(() => setIsLoaded(true), 200);
    const t2 = setTimeout(() => setShowContent(true), 600);
    const t3 = setTimeout(() => setShowWhisper(true), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section
      ref={containerRef}
      className="nauka-light-warm nauka-grain nauka-vignette nauka-paper relative min-h-screen flex items-center bg-[#F6F2EE] overflow-hidden pt-20 pb-16"
    >
      {/* PRD: Lighting must be felt — directional warm spotlight from top-left */}
      <motion.div
        style={{ opacity: spotlightIntensity }}
        className="absolute top-0 left-0 w-[60%] h-[50%] pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 30%, rgba(198,167,105,0.08) 0%, transparent 60%)',
            animation: 'naukaSpotlightShift 12s ease-in-out infinite',
          }}
        />
      </motion.div>

      {/* PRD: Background must support content — subtle warm ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[40%] h-[40%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(198,167,105,0.03) 0%, transparent 60%)',
            animation: 'naukaBreathLight 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* PRD: Opening Signature — light reveal first, then content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
        animate={isLoaded ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.4, ease: slowEase }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Center warm light — like a candle flicker that reveals the page */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(198,167,105,0.12) 0%, transparent 60%)',
            animation: isLoaded ? 'naukaLightReveal 1.8s ease-out forwards, naukaCandleFlicker 4s ease-in-out 2s infinite' : 'none',
          }}
        />
      </motion.div>

      {/* Content — revealed after light */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left max-w-xl lg:max-w-none"
          >
            {/* Pill badge — with a breathing gold dot */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: slowEase }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C6A769]/10 border border-[#C6A769]/20 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A769]" style={{ animation: 'naukaBreathLight 3s ease-in-out infinite' }} />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C6A769] font-sans">
                Studio Undangan Digital
              </span>
            </motion.div>

            {/* Hero Headline — cinematic rhythm: statement, pause, hook */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={showContent ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.2, ease: slowEase }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] text-[#1C1C1C]"
              >
                Undangan yang
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={showContent ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.35, ease: slowEase }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] text-[#C6A769]"
              >
                Bisa Dirasakan
              </motion.h1>
            </div>

            {/* Whisper — the emotional hook that appears late, like a quiet afterthought */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={showWhisper ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.4, ease: cinematicEase }}
              className="mt-6 mb-8"
            >
              <p className="text-[15px] sm:text-base text-[#6B6B6B]/70 leading-[1.7] italic max-w-md mx-auto lg:mx-0">
                Bukan sekadar dikirim — tapi diterima dengan senyum.
              </p>
            </motion.div>

            {/* CTA Buttons — pill shaped */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.9, ease: cinematicEase }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10"
            >
              <a
                href="#templates"
                className="group relative inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#C6A769] text-white text-[13px] font-medium tracking-[0.15em] uppercase hover:bg-[#D4BA82] transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10">Lihat Template</span>
                <svg
                  className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
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
          </motion.div>

          {/* Phone Mockup — cinematic parallax on scroll + gentle float */}
          <motion.div
            style={{ y: mockupY, scale: mockupScale }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={showContent ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.3, delay: 0.3, ease: slowEase }}
            className="flex-shrink-0 relative"
          >
            {/* PRD: Lighting with direction — warm glow behind phone, from top-left */}
            <div className="absolute -inset-10 pointer-events-none">
              <div
                className="absolute -top-4 -left-4 w-[120%] h-[80%]"
                style={{
                  background: 'radial-gradient(ellipse at 30% 30%, rgba(198,167,105,0.15) 0%, transparent 60%)',
                  animation: 'naukaBreathLight 6s ease-in-out infinite',
                }}
              />
            </div>

            {/* Gentle float animation wrapper */}
            <div style={{ animation: 'naukaGentleFloat 6s ease-in-out infinite' }}>
              {/* Phone frame */}
              <div
                className="relative w-[260px] sm:w-[280px] rounded-[2.5rem] p-2 nauka-shadow-premium ring-1 ring-white/40"
                style={{ backgroundColor: '#1C1C1C', aspectRatio: '9/18' }}
              >
                {/* PRD: Lighting on mockup — subtle top edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-30 rounded-t-[2.5rem]" />

                {/* Light reflection that moves slowly across the phone surface */}
                <div
                  className="absolute inset-0 rounded-[2.5rem] z-20 pointer-events-none overflow-hidden"
                  style={{ animation: 'naukaReflectionShift 8s ease-in-out infinite' }}
                >
                  <div
                    className="absolute -inset-full"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)',
                    }}
                  />
                </div>

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
                    style={{ animationDuration: '10s' }}
                  >
                    {/* Hero photo area — emotional */}
                    <div
                      className="w-full relative overflow-hidden"
                      style={{ height: '35%', background: 'linear-gradient(135deg, #C6A769 0%, #8A7444 40%, #D4BA82 70%, #E8D5A8 100%)' }}
                    >
                      {/* Warm light leak from top */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 40%)',
                          animation: 'naukaBreathLight 5s ease-in-out infinite',
                        }}
                      />
                      {/* Bismillah / opening */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-white/50" style={{ fontSize: 'clamp(3px, 1.8vw, 5px)', letterSpacing: '0.3em' }}>
                          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-white/8 to-transparent" />
                    </div>

                    {/* Greeting */}
                    <div className="px-[8%] pt-[6%] text-center">
                      <p className="text-[#C6A769]" style={{ fontSize: 'clamp(3px, 1.8vw, 5px)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                        The Wedding Of
                      </p>
                      <div className="my-[2%] mx-auto" style={{ width: '12%', height: '1px', background: 'linear-gradient(to right, transparent, #C6A769, transparent)' }} />
                      <p style={{ fontSize: 'clamp(10px, 6vw, 17px)', fontFamily: 'var(--font-playfair)', color: '#1C1C1C', fontStyle: 'italic', lineHeight: '1.2' }}>
                        Arka & Dyana
                      </p>
                      <div className="my-[2%] mx-auto" style={{ width: '12%', height: '1px', background: 'linear-gradient(to right, transparent, #C6A769, transparent)' }} />
                      <p className="text-[#6B6B6B]" style={{ fontSize: 'clamp(3px, 1.8vw, 5px)', letterSpacing: '0.12em' }}>
                        28 Desember 2025
                      </p>
                    </div>

                    {/* Couple avatars */}
                    <div className="flex items-center justify-center gap-[8%] py-[4%]">
                      <div className="rounded-full flex items-center justify-center text-white ring-2 ring-white/30" style={{ width: 'clamp(16px, 10vw, 22px)', height: 'clamp(16px, 10vw, 22px)', fontSize: 'clamp(4px, 2.5vw, 7px)', fontFamily: 'var(--font-playfair)', fontStyle: 'italic', backgroundColor: '#C6A769' }}>A</div>
                      <span className="text-[#C6A769]" style={{ fontSize: 'clamp(4px, 2vw, 6px)' }}>&amp;</span>
                      <div className="rounded-full flex items-center justify-center text-white ring-2 ring-white/30" style={{ width: 'clamp(16px, 10vw, 22px)', height: 'clamp(16px, 10vw, 22px)', fontSize: 'clamp(4px, 2.5vw, 7px)', fontFamily: 'var(--font-playfair)', fontStyle: 'italic', backgroundColor: '#8A7444' }}>D</div>
                    </div>

                    {/* Event card */}
                    <div className="mx-[6%] p-[4%] rounded-lg" style={{ backgroundColor: 'white', boxShadow: '0 1px 4px rgba(28,28,28,0.04)' }}>
                      <p className="text-[#C6A769]" style={{ fontSize: 'clamp(3px, 1.6vw, 5px)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2%' }}>Resepsi</p>
                      <p style={{ fontSize: 'clamp(4px, 2.5vw, 7px)', color: '#1C1C1C', fontWeight: 600, marginBottom: '1%' }}>Minggu, 28 Des 2025</p>
                      <p className="text-[#6B6B6B]" style={{ fontSize: 'clamp(3px, 2vw, 6px)' }}>10:00 - 14:00 WIB</p>
                      <div className="mx-auto mt-[3%]" style={{ width: '20%', height: '1px', background: '#C6A769' }} />
                      <p className="text-[#6B6B6B]" style={{ fontSize: 'clamp(3px, 2vw, 6px)', marginTop: '2%', fontStyle: 'italic' }}>Graha Sabha, Jakarta Selatan</p>
                    </div>

                    {/* RSVP button */}
                    <div className="px-[6%] pt-[4%] pb-[5%] text-center">
                      <div className="inline-block px-[15%] py-[3%] rounded-full text-white" style={{ fontSize: 'clamp(3px, 2vw, 6px)', letterSpacing: '0.15em', backgroundColor: '#C6A769' }}>Konfirmasi Kehadiran</div>
                    </div>

                    {/* Warm closing line */}
                    <div className="px-[6%] pb-[8%] text-center">
                      <div className="mx-auto mb-[2%]" style={{ width: '15%', height: '1px', background: 'linear-gradient(to right, transparent, #C6A769, transparent)' }} />
                      <p className="text-[#999]" style={{ fontSize: 'clamp(2px, 1.4vw, 4px)', letterSpacing: '0.15em', fontStyle: 'italic' }}>Merupakan suatu kehormatan bagi kami</p>
                    </div>

                    {/* Extra space for scroll */}
                    <div style={{ height: '30%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification badge — emotional, like a message from the heart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.3, ease: slowEase }}
              className="absolute -right-3 top-16 sm:-right-4 sm:top-20 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 ring-1 ring-black/5"
              style={{ animation: 'naukaGentleFloat 5s ease-in-out 1s infinite' }}
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
        </motion.div>
      </div>

      {/* PRD: Proper Pacing — scroll indicator with breathing rhythm */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-[#999]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#C6A769]/40 to-transparent"
        />
      </motion.div>

      {/* PRD: Editorial motif — decorative frame lines like a film frame edge */}
      <div className="nauka-frame-line hidden lg:block" />
      <div className="nauka-frame-line-right hidden lg:block" />
    </section>
  );
}
