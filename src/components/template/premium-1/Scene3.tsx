'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   Scene3 — Breathing Space
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Concept:
   This scene is an emotional pause. No large image.
   Just warm atmosphere, subtle moving ambience, whitespace,
   and elegant typography. Like a quiet moment between scenes
   in a film — the silence where the heart catches up.

   Composition:
   • Full or near-full viewport height
   • Centered text composition with generous whitespace
   • Warm ivory background (#F5F0E8)
   • Subtle warm radial glow that drifts slowly (p1WarmDrift)
   • Gold ornamental divider above and below the quote
   • Text in Playfair Display italic, warm brown
   • "Scene III" label in small caps tracking

   Animation sequence (scroll-triggered whileInView):
   1. Background warm glow appears first, slowly
   2. Top divider draws from center
   3. Quote text fades in with blur dissolve, line by line
   4. Bottom divider draws from center
   5. Very subtle text breathing effect (p1TextBreathe)

   Atmosphere: very calm, very spacious, like warm stillness
   ────────────────────────────────────────────────────────────── */

// ── Animation variants ──────────────────────────────────────────

/** Background warm glow — fades in slowly, like warm light filling a room */
const glowReveal: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Scene label — "Scene III" fades in gently before dividers */
const labelFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
    filter: 'blur(2px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Gold ornamental divider — draws from center outward */
const dividerDraw: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Quote line — fades in with blur dissolve, one line at a time */
const quoteLineReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 2.0,
        ease: 'easeOut',
      },
      filter: {
        duration: 1.6,
        ease: 'easeOut',
      },
    },
  },
};

// ── Component ───────────────────────────────────────────────────

export default function Scene3() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-10% 0px -10% 0px',
  });

  return (
    <section
      ref={sectionRef}
      className="template-p1 nauka-paper nauka-grain nauka-vignette relative w-full min-h-dvh overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#F5F0E8',
      }}
    >
      {/* ── Warm ambient glow — appears first, slowly ──
          A gentle warm radial glow that drifts slowly across the background,
          like warm light breathing in a quiet room.
          Uses p1WarmDrift keyframe for subtle organic drift. */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        variants={glowReveal}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Primary warm glow — center, large and soft */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(198,167,105,0.07) 0%, transparent 65%)',
            animation: 'p1WarmDrift 14s ease-in-out infinite',
          }}
          aria-hidden="true"
        />

        {/* Secondary warm glow — offset, very subtle */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 40% 35% at 35% 55%, rgba(198,167,105,0.04) 0%, transparent 55%)',
            animation: 'p1WarmDrift 18s ease-in-out infinite',
            animationDelay: '3s',
          }}
          aria-hidden="true"
        />

        {/* Tertiary ambient warmth — slight, from bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 30% at 65% 70%, rgba(198,167,105,0.03) 0%, transparent 50%)',
            animation: 'p1WarmDrift 20s ease-in-out infinite',
            animationDelay: '6s',
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Content wrapper — centered with generous whitespace ── */}
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 sm:px-8 flex flex-col items-center justify-center py-24 sm:py-32 md:py-40">
        {/* ── Scene Label — "Scene III" ──
            Appears gently after the glow has started to reveal */}
        <motion.div
          className="mb-12 sm:mb-16 md:mb-20 flex flex-col items-center gap-6 sm:gap-8"
          variants={labelFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 1.0 }}
        >
          <span
            className="font-serif text-[10px] tracking-[0.3em] uppercase sm:text-xs"
            style={{ color: 'var(--p1-gold-dim, #8A7444)' }}
          >
            Scene III
          </span>

          {/* ── Top ornamental divider ──
              Gold line that draws from center, like a breath mark in music */}
          <motion.div
            className="h-[1px] w-[60px] origin-center"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--p1-gold, #C6A769), transparent)',
            }}
            variants={dividerDraw}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 1.6 }}
          />
        </motion.div>

        {/* ── Quote text ──
            Two lines, each revealed individually with blur dissolve.
            After both lines appear, a subtle breathing effect (p1TextBreathe)
            begins on the entire quote, making it feel alive — like words
            that breathe with the reader. */}
        <div className="flex flex-col items-center text-center gap-1">
          {/* Line 1 */}
          <motion.p
            className="font-serif italic text-sm leading-[2.2] tracking-wide sm:text-[15px] sm:leading-[2.3] md:text-base md:leading-[2.4]"
            style={{ color: 'var(--p1-warm-brown, #6B5B4A)' }}
            variants={quoteLineReveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 2.2 }}
          >
            Seringkali rindu itu menyiksa.
          </motion.p>

          {/* Line 2 */}
          <motion.p
            className="font-serif italic text-sm leading-[2.2] tracking-wide sm:text-[15px] sm:leading-[2.3] md:text-base md:leading-[2.4]"
            style={{
              color: 'var(--p1-warm-brown, #6B5B4A)',
              animation: 'p1TextBreathe 8s ease-in-out infinite',
              animationDelay: '4s',
            }}
            variants={quoteLineReveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 2.8 }}
          >
            Namun mereka memilih menitipkannya dalam doa.
          </motion.p>
        </div>

        {/* ── Bottom ornamental divider ──
            Appears after the quote has fully materialized,
            closing the breathing space like a gentle period. */}
        <motion.div
          className="mt-12 sm:mt-16 md:mt-20 flex flex-col items-center gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 3.6, duration: 0.6 }}
        >
          <motion.div
            className="h-[1px] w-[60px] origin-center"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--p1-gold, #C6A769), transparent)',
            }}
            variants={dividerDraw}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 3.8 }}
          />
        </motion.div>
      </div>

      {/* ── Top edge — soft fade from previous scene ── */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-20"
        style={{
          background:
            'linear-gradient(0deg, transparent 0%, rgba(245,240,232,0.5) 50%, rgba(245,240,232,1) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Bottom edge — soft fade into next scene ── */}
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
