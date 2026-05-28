'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import HandwritingText, { calcLineDelays, calcTotalAnimDuration } from './HandwritingText';
import PencilBuildUpImage from './PencilBuildUpImage';

/* ──────────────────────────────────────────────────────────────
   Scene3 — Breathing Space (Rindu)
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Emotion: The heaviest moment — longing, restraint,
   the sacred pause between yearning and fulfillment.

   Composition: MAXIMUM WHITESPACE — Image is SMALLER,
   text is slightly larger. Almost a pause in a poetry book.

   Animations:
   - T2 PencilBuildUp for image (sketch → shading → foto)
   - T5 HandwritingText for story lines (SLOWEST stagger)
   ────────────────────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

const sceneLines = [
  'Seringkali, rindu itu menyiksa.',
  'Namun setiap godaan untuk sekadar menyapa muncul,',
  'kami mengingat—',
  'menahan diri adalah bentuk cinta tertinggi kepada Allah.',
];

const CHAR_DELAY = 0.06;   // SLOWEST — heaviest moment
const BASE_DELAY = 2.0;
const PAUSE_GAP = 0.6;     // longer pauses for emotional weight

export default function Scene3() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-20% 0px -20% 0px',
  });

  const lineDelays = useMemo(
    () => calcLineDelays(sceneLines, CHAR_DELAY, BASE_DELAY, PAUSE_GAP),
    []
  );

  const totalAnimDuration = useMemo(
    () => calcTotalAnimDuration(sceneLines, CHAR_DELAY, BASE_DELAY, PAUSE_GAP),
    []
  );

  return (
    <section
      ref={sectionRef}
      className="template-p1 nauka-paper nauka-grain nauka-ink-wash nauka-vignette relative w-full min-h-dvh overflow-hidden"
      style={{ backgroundColor: 'var(--p1-ivory)' }}
    >
      {/* ── Golden hour ambient glow ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 65% 20%, rgba(198,167,105,0.08) 0%, transparent 55%)',
          animation: 'p1WarmDrift 14s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* ── Content — maximum whitespace ── */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 sm:px-8 flex flex-col items-center justify-center py-24 sm:py-32 md:py-40">

        {/* ── Image — SMALLER, T2 PencilBuildUp ── */}
        <PencilBuildUpImage
          src="/template/premium-1/scene-3.webp"
          alt="Two people sitting together on a terrace at golden hour dusk, a quiet moment of peace"
          aspectRatio="614 / 378"
          sizes="380px"
          maxWidth="380px"
        />

        {/* ── Top gold line ── */}
        <motion.div
          className="mt-12 sm:mt-16 md:mt-20 w-[50px] origin-center"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--p1-gold), transparent)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 0.5 } : { scaleX: 0, opacity: 0 }}
          transition={{ delay: 1.5, duration: 2.5, ease: EASE }}
        />

        {/* ── Text — THE HERO, T5 Handwriting, SLOWEST ── */}
        <div
          className="mt-8 sm:mt-10 flex flex-col items-center text-center"
          style={{ animation: 'p1TextBreathe 10s ease-in-out infinite' }}
        >
          {sceneLines.map((line, i) => (
            <HandwritingText
              key={i}
              text={line}
              className="font-serif italic text-base leading-[2.4] tracking-wide sm:text-lg sm:leading-[2.5] md:text-xl md:leading-[2.6]"
              style={{ color: 'var(--p1-warm-brown)' }}
              charDelay={CHAR_DELAY}
              startDelay={lineDelays[i]}
              inView={isInView}
            />
          ))}
        </div>

        {/* ── Bottom gold line ── */}
        <motion.div
          className="mt-10 sm:mt-12 md:mt-16 w-[50px] origin-center"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--p1-gold), transparent)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 0.5 } : { scaleX: 0, opacity: 0 }}
          transition={{
            delay: totalAnimDuration - 0.5,
            duration: 2.0,
            ease: EASE,
          }}
        />
      </div>

      {/* ── Top edge ── */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-20"
        style={{
          background:
            'linear-gradient(0deg, transparent 0%, rgba(245,240,232,0.5) 50%, rgba(245,240,232,1) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Bottom edge ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-20"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(245,240,232,0.5) 50%, rgba(245,240,232,1) 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
