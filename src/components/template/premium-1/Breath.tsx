'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   Breath — Hikmah / Closing Wisdom
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   A short (40-50vh) breathing space between Scene4 and EventInfo.
   No image. Just the hikmah — the closing wisdom that ties
   the entire story together.

   Text: "Menahan diri karena Allah tidak akan pernah
          membuat seseorang merugi."

   Atmosphere: warm ivory, sacred, breathing, minimal
   Animation: opacity + translateY only, NO blur
   ────────────────────────────────────────────────────────────── */

// ── Animation variants ──────────────────────────────────────────

const quoteReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 2.8,
        ease: 'easeOut',
      },
    },
  },
};

const dividerReveal: Variants = {
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

// ── Component ───────────────────────────────────────────────────

export default function Breath() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-10% 0px -10% 0px',
  });

  return (
    <section
      ref={sectionRef}
      className="template-p1 nauka-paper nauka-grain nauka-ink-wash nauka-vignette relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        minHeight: '40vh',
        backgroundColor: '#F5F0E8',
      }}
    >
      {/* ── Breathing warm glow ──
          Very subtle warm glow that breathes — like a sacred pause */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 35% 30% at 50% 50%, rgba(198,167,105,0.06) 0%, transparent 60%)',
          animation: 'p1BreathGlow 8s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* ── Top edge — soft fade from previous scene ── */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-16"
        style={{
          background:
            'linear-gradient(0deg, transparent 0%, rgba(245,240,232,0.5) 50%, rgba(245,240,232,1) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-md px-6 sm:px-8 py-12 sm:py-16 flex flex-col items-center text-center">
        {/* ── Top gold divider ── */}
        <motion.div
          className="mb-8 sm:mb-10"
          style={{ originX: '50%', originY: '50%' }}
          variants={dividerReveal}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div
            className="h-[1px] mx-auto"
            style={{
              width: '50px',
              background:
                'linear-gradient(to right, transparent, var(--p1-gold, #C6A769), transparent)',
            }}
          />
        </motion.div>

        {/* ── Hikmah — closing wisdom ──
            Single line, slow reveal, breathing effect */}
        <motion.div
          className="flex flex-col items-center"
          variants={quoteReveal}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <p
            className="font-serif italic text-sm leading-[2.2] tracking-wide sm:text-[15px] sm:leading-[2.3] md:text-base"
            style={{
              color: 'var(--p1-warm-brown, #6B5B4A)',
              animation: 'p1TextBreathe 9s ease-in-out infinite',
            }}
          >
            Menahan diri karena Allah tidak akan pernah membuat seseorang merugi.
          </p>
        </motion.div>

        {/* ── Bottom gold divider ── */}
        <motion.div
          className="mt-8 sm:mt-10"
          style={{ originX: '50%', originY: '50%' }}
          variants={dividerReveal}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.6 }}
        >
          <div
            className="h-[1px] mx-auto"
            style={{
              width: '50px',
              background:
                'linear-gradient(to right, transparent, var(--p1-gold, #C6A769), transparent)',
            }}
          />
        </motion.div>
      </div>

      {/* ── Bottom edge — soft fade into next section ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-16"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(245,240,232,0.5) 50%, rgba(245,240,232,1) 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
