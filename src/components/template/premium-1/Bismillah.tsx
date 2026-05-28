'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import HandwritingText, { calcLineDelays, calcTotalAnimDuration, getLineGap } from './HandwritingText';

/* ──────────────────────────────────────────────────────────────
   Bismillah Section
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   - بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ in Arabic (Amiri font)
   - Terjemahan Surat Ar-Rum Ayat 22 with T5 Handwriting
   - Maximum whitespace, breathing, sacred pause

   Surat Ar-Rum Ayat 22:
   "Dan di antara tanda-tanda (kebesaran)-Nya ialah penciptaan langit dan bumi,
   serta perbedaan bahasamu dan warna kulitmu. Sungguh, pada yang demikian itu
   terdapat tanda-tanda bagi orang-orang yang mengetahui."
   ────────────────────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

const verseLines = [
  'Dan di antara tanda-tanda kebesaran-Nya',
  'ialah penciptaan langit dan bumi,',
  'serta perbedaan bahasamu dan warna kulitmu.',
  'Sungguh, pada yang demikian itu',
  'terdapat tanda-tanda bagi orang-orang yang mengetahui.',
];

const CHAR_DELAY = 0.05;
const BASE_DELAY = 3.0;
const PAUSE_GAP = 0.5;

export default function Bismillah() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-20% 0px -20% 0px',
  });

  const lineDelays = useMemo(
    () => calcLineDelays(verseLines, CHAR_DELAY, BASE_DELAY, PAUSE_GAP),
    []
  );

  const totalAnimDuration = useMemo(
    () => calcTotalAnimDuration(verseLines, CHAR_DELAY, BASE_DELAY, PAUSE_GAP),
    []
  );

  return (
    <section
      ref={sectionRef}
      className="template-p1 nauka-paper nauka-grain nauka-ink-wash nauka-vignette relative w-full min-h-dvh overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--p1-ivory)' }}
    >
      {/* ── Warm ambient glow from top ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 20%, rgba(198,167,105,0.06) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 sm:px-8 flex flex-col items-center text-center py-20 sm:py-28 md:py-36">

        {/* Arabic Bismillah — large, elegant */}
        <motion.p
          className="font-serif text-center leading-relaxed select-none mb-10 sm:mb-14"
          style={{
            color: 'var(--p1-gold)',
            fontSize: 'clamp(1.8rem, 6vw, 3rem)',
            textShadow: '0 0 40px rgba(198, 167, 105, 0.1)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 2.0, ease: EASE }}
          dir="rtl"
          lang="ar"
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </motion.p>

        {/* Gold line */}
        <motion.div
          className="w-[50px] origin-center mb-10 sm:mb-14"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--p1-gold), transparent)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 0.5 } : { scaleX: 0, opacity: 0 }}
          transition={{ delay: 1.5, duration: 1.5, ease: EASE }}
        />

        {/* Surat reference */}
        <motion.p
          className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-6 sm:mb-8"
          style={{ color: 'var(--p1-gold-dim)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ delay: 2.0, duration: 1.0, ease: EASE }}
        >
          QS. Ar-Rum : 22
        </motion.p>

        {/* Terjemahan — T5 Handwriting mask reveal */}
        <div
          className="flex flex-col items-center"
          style={{ animation: 'p1TextBreathe 10s ease-in-out infinite' }}
        >
          {verseLines.map((line, i) => (
            <HandwritingText
              key={i}
              text={line}
              className="font-serif italic text-sm sm:text-base md:text-lg leading-[2.4] sm:leading-[2.5] md:leading-[2.6] tracking-wide"
              style={{ color: 'var(--p1-warm-brown)' }}
              charDelay={CHAR_DELAY}
              startDelay={lineDelays[i]}
              inView={isInView}
            />
          ))}
        </div>

        {/* Bottom gold line — appears after all text */}
        <motion.div
          className="mt-12 sm:mt-16 w-[50px] origin-center"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--p1-gold), transparent)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 0.5 } : { scaleX: 0, opacity: 0 }}
          transition={{
            delay: totalAnimDuration - 0.5,
            duration: 1.5,
            ease: EASE,
          }}
        />
      </div>

      {/* ── T7: Top edge — cinematic fade-to-black (follows dark Cover) ── */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-14 sm:h-20"
        style={{
          background:
            'linear-gradient(180deg, rgba(26,22,20,1) 0%, rgba(26,22,20,0.4) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── T7: Bottom edge — cinematic fade-to-black ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-16 sm:h-24"
        style={{
          background:
            'linear-gradient(0deg, rgba(26,22,20,1) 0%, rgba(26,22,20,0.4) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
