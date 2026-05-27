'use client';

import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   Scene3 — Breathing Space
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Concept:
   An emotional pause between the sujud and the wedding day.
   Two people sitting together on a terrace at dusk —
   serene, golden hour, romantic but calm. Not dramatic.
   The image breathes, the text breathes, everything rests.

   Composition:
   • Full or near-full viewport height
   • Landscape image centered, ~45-50% of visual space
   • Warm ivory background (#F5F0E8)
   • Quote text below image with generous whitespace
   • Subtle warm radial glow that drifts slowly (p1WarmDrift)

   Animation sequence (scroll-triggered whileInView):
   1. Image reveals with sketch-to-cinematic effect
   2. Quote text fades in with blur dissolve, line by line
   3. Subtle breathing effect on text

   Atmosphere: golden hour, serene, intimate pause
   ────────────────────────────────────────────────────────────── */

// ── Animation variants ──────────────────────────────────────────

const sketchToCinematic: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(8px) grayscale(60%)',
    scale: 1.04,
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px) grayscale(0%)',
    scale: 1,
    transition: {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 1.6,
        ease: 'easeOut',
      },
      filter: {
        duration: 2.2,
        ease: 'easeOut',
      },
      scale: {
        duration: 2.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
};

/** Scene label — "Scene III" fades in gently */
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
      {/* ── Warm ambient glow — golden hour drifting light ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 40%, rgba(198,167,105,0.07) 0%, transparent 65%)',
          animation: 'p1WarmDrift 14s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 35% at 65% 70%, rgba(198,167,105,0.04) 0%, transparent 55%)',
          animation: 'p1WarmDrift 18s ease-in-out infinite',
          animationDelay: '3s',
        }}
        aria-hidden="true"
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 sm:px-8 flex flex-col items-center justify-center py-20 sm:py-28 md:py-36">
        {/* ── Scene Label ── */}
        <motion.div
          className="mb-8 sm:mb-10 flex flex-col items-center gap-3"
          variants={labelFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span
            className="font-serif text-[10px] tracking-[0.3em] uppercase sm:text-xs"
            style={{ color: 'var(--p1-gold-dim, #8A7444)' }}
          >
            Scene III
          </span>
        </motion.div>

        {/* ── Scene Image — two people on terrace at dusk ──
            Landscape format, sketch-to-cinematic reveal.
            Breathing space — the image itself feels like a pause. */}
        <motion.div
          className="w-full max-w-[500px] sm:max-w-[560px] md:max-w-[620px]"
          variants={sketchToCinematic}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div
            className="relative overflow-hidden rounded-lg md:rounded-xl"
            style={{
              aspectRatio: '614 / 378',
              boxShadow:
                '0 2px 8px rgba(28,28,28,0.04), 0 8px 24px rgba(28,28,28,0.06), 0 20px 48px rgba(28,28,28,0.04)',
            }}
          >
            <Image
              src="/template/premium-1/scene-3.webp"
              alt="Two people sitting together on a terrace at golden hour dusk, a quiet moment of peace"
              fill
              sizes="(max-width: 640px) 85vw, (max-width: 768px) 560px, 620px"
              className="object-cover"
              priority={false}
            />

            {/* Subtle warm overlay — golden hour warmth */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(198,167,105,0.03) 0%, transparent 40%), linear-gradient(0deg, rgba(198,167,105,0.04) 0%, transparent 35%)',
              }}
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* ── Top ornamental divider ── */}
        <motion.div
          className="mt-10 sm:mt-12 md:mt-14"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 2.0, duration: 0.6 }}
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
            transition={{ delay: 2.2 }}
          />
        </motion.div>

        {/* ── Quote text ──
            Two lines, each revealed individually with blur dissolve.
            Breathing effect makes the words feel alive. */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center text-center gap-1">
          {/* Line 1 */}
          <motion.p
            className="font-serif italic text-sm leading-[2.2] tracking-wide sm:text-[15px] sm:leading-[2.3] md:text-base md:leading-[2.4]"
            style={{ color: 'var(--p1-warm-brown, #6B5B4A)' }}
            variants={quoteLineReveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 2.6 }}
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
            transition={{ delay: 3.2 }}
          >
            Namun mereka memilih menitipkannya dalam doa.
          </motion.p>
        </div>

        {/* ── Bottom ornamental divider ── */}
        <motion.div
          className="mt-10 sm:mt-12 md:mt-14 flex flex-col items-center gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 3.8, duration: 0.6 }}
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
            transition={{ delay: 4.0 }}
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
