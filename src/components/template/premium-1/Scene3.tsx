'use client';

import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   Scene3 — Breathing Space (Rindu)
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Emotion: The heaviest moment — longing, restraint, the
   sacred pause between yearning and fulfillment.

   Composition: MAXIMUM WHITESPACE — Image is SMALLER than other
   scenes, positioned with more space around it. The TEXT is
   the hero — slightly larger than other scenes. Almost like
   a pause in a poetry book.

   Text treatment:
   • NO label, NO scene number — this is a breathing space
   • Text appears LINE BY LINE with SLOWEST stagger (1.2s)
   • Each line fades in slowly, like words being carefully chosen
   • The text is slightly larger than other scenes
   • No quotation marks — the words are the decoration
   ────────────────────────────────────────────────────────────── */

// ── Animation variants ──────────────────────────────────────────

/** Image reveal with sepia fade — memory being recalled */
const sepiaReveal: Variants = {
  hidden: {
    opacity: 0,
    filter: 'sepia(40%)',
    scale: 1.01,
  },
  visible: {
    opacity: 1,
    filter: 'sepia(0%)',
    scale: 1,
    transition: {
      duration: 4.0,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 3.8,
        ease: 'easeOut',
      },
      filter: {
        duration: 4.5,
        ease: 'easeOut',
      },
    },
  },
};

/** Gold line above quote — draws slowly */
const lineDrawSlow: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 0.5,
    transition: {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Line-by-line text reveal — slowest stagger, careful words */
const lineReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 1.4,
        ease: 'easeOut',
      },
    },
  },
};

/** Gold line below quote — draws slowly */
const lineDrawSlowBelow: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 0.5,
    transition: {
      duration: 2.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ── Scene text lines ────────────────────────────────────────────

const sceneLines = [
  'Seringkali, rindu itu menyiksa.',
  'Namun setiap godaan untuk sekadar menyapa muncul,',
  'kami mengingat—',
  'menahan diri adalah bentuk cinta tertinggi kepada Allah.',
];

const BASE_DELAY = 2.5;
const STAGGER_GAP = 1.2;

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
      className="template-p1 nauka-paper nauka-grain nauka-ink-wash nauka-vignette relative w-full min-h-dvh overflow-hidden"
      style={{ backgroundColor: 'var(--p1-ivory)' }}
    >
      {/* ── Golden hour ambient glow from top-right ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 65% 20%, rgba(198,167,105,0.08) 0%, transparent 55%)',
          animation: 'p1WarmDrift 14s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 35% at 65% 70%, rgba(198,167,105,0.03) 0%, transparent 55%)',
          animation: 'p1WarmDrift 18s ease-in-out infinite',
          animationDelay: '3s',
        }}
        aria-hidden="true"
      />

      {/* ── Content — maximum whitespace ── */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 sm:px-8 flex flex-col items-center justify-center py-24 sm:py-32 md:py-40">

        {/* ── Image — SMALLER, floating in generous whitespace ── */}
        <motion.div
          className="w-full"
          style={{ maxWidth: '380px' }}
          variants={sepiaReveal}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div
            className="nauka-edge-soft relative overflow-hidden rounded-lg md:rounded-xl"
            style={{
              aspectRatio: '614 / 378',
              boxShadow:
                '0 2px 8px rgba(28,28,28,0.03), 0 6px 16px rgba(28,28,28,0.04), 0 16px 32px rgba(28,28,28,0.03)',
            }}
          >
            <Image
              src="/template/premium-1/scene-3.webp"
              alt="Two people sitting together on a terrace at golden hour dusk, a quiet moment of peace"
              fill
              sizes="380px"
              className="object-cover"
              priority={false}
            />

            {/* Golden hour warm overlay */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(225deg, rgba(198,167,105,0.06) 0%, transparent 50%), linear-gradient(0deg, rgba(198,167,105,0.04) 0%, transparent 30%)',
              }}
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* ── Top gold line — draws slowly ── */}
        <motion.div
          className="mt-12 sm:mt-16 md:mt-20 w-[50px] origin-center"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--p1-gold), transparent)',
          }}
          variants={lineDrawSlow}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 2.5 }}
        />

        {/* ── Text — THE HERO of this scene ──
            Larger text, generous line-height, very slow reveal
            NO label, NO scene number */}
        <div
          className="mt-8 sm:mt-10 flex flex-col items-center text-center"
          style={{ animation: 'p1TextBreathe 10s ease-in-out infinite' }}
        >
          {sceneLines.map((line, i) => (
            <motion.p
              key={i}
              className="font-serif italic text-base leading-[2.4] tracking-wide sm:text-lg sm:leading-[2.5] md:text-xl md:leading-[2.6]"
              style={{ color: 'var(--p1-warm-brown)' }}
              variants={lineReveal}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: BASE_DELAY + i * STAGGER_GAP }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* ── Bottom gold line — draws slowly ── */}
        <motion.div
          className="mt-10 sm:mt-12 md:mt-16 w-[50px] origin-center"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--p1-gold), transparent)',
          }}
          variants={lineDrawSlowBelow}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: BASE_DELAY + sceneLines.length * STAGGER_GAP + 0.5 }}
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
