'use client';

import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   Scene4 — "Hari Yang Dijanjikan" (The Promised Day)
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Emotion: Fulfillment, sacred warmth, intimate closeness —
   the emotional climax

   Composition: INTIMATE & CLOSE — Image is LARGER and closer
   than other scenes, more immersive. Text feels connected to
   the image, not separated. The warmest composition.

   Text treatment:
   • Title in warmer gold tone (not the standard brown)
   • Text appears LINE BY LINE with slightly faster stagger (0.7s)
   • This is the payoff — words arrive with more urgency
   • Each line fades in with opacity + slight Y drift
   • No quotation marks — the words are the declaration
   ────────────────────────────────────────────────────────────── */

// ── Animation variants ──────────────────────────────────────────

/** Radial reveal — warm glow at center, then image materializes outward */
const radialReveal: Variants = {
  hidden: {
    clipPath: 'circle(0% at 50% 50%)',
    opacity: 0,
  },
  visible: {
    clipPath: 'circle(75% at 50% 50%)',
    opacity: 1,
    transition: {
      duration: 3.0,
      ease: [0.16, 1, 0.3, 1],
      clipPath: {
        duration: 3.0,
        ease: [0.16, 1, 0.3, 1],
      },
      opacity: {
        duration: 1.0,
        ease: 'easeOut',
      },
    },
  },
};

/** Sacred glow — appears before image, then breathes */
const sacredGlowIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Scene label — warm gentle dissolve */
const labelFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  visible: {
    opacity: 0.5,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Title — warm dissolve, warmer gold tone */
const titleFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Gold line — draws from center, warmer */
const lineDraw: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 0.6,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Line-by-line text reveal — slightly faster, payoff moment */
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

// ── Scene text lines ────────────────────────────────────────────

const sceneLines = [
  'Lalu hari itu datang.',
  'Bukan karena kami yang memilih—',
  'tapi karena Ia yang mempertemukan.',
  'Ketika ijab kabul terucap,',
  'semua penantian terjawab.',
  'Semata-mata karena-Nya.',
];

const BASE_DELAY = 1.8;
const STAGGER_GAP = 0.7;

// ── Component ───────────────────────────────────────────────────

export default function Scene4() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-10% 0px -10% 0px',
  });

  return (
    <section
      ref={sectionRef}
      className="template-p1 nauka-paper nauka-grain nauka-ink-wash nauka-vignette relative w-full min-h-dvh overflow-hidden"
      style={{
        // Warmer background than other scenes — slightly more golden tint
        background:
          'linear-gradient(170deg, #F7F1E4 0%, #F5EFE3 25%, #F4EDE0 50%, #F3ECE0 75%, #F5F0E6 100%)',
      }}
    >
      {/* ── Multiple warm light layers — sacred warmth from center ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: [
            'radial-gradient(ellipse 60% 45% at 50% 40%, rgba(212, 186, 130, 0.07) 0%, transparent 55%)',
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(198, 167, 105, 0.04) 0%, transparent 60%)',
            'radial-gradient(ellipse 70% 40% at 50% 85%, rgba(198, 167, 105, 0.03) 0%, transparent 50%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* ── Breathing sacred warm glow ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 35% at 50% 40%, rgba(212, 186, 130, 0.06) 0%, transparent 60%)',
          animation: 'p1WarmGlowPulse 7s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 min-h-dvh flex flex-col items-center justify-center">

        {/* ── Sacred glow halo — appears before image ── */}
        <motion.div
          className="relative"
          style={{ width: '100%', maxWidth: '540px' }}
          variants={sacredGlowIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Glow halo behind image */}
          <div
            className="pointer-events-none absolute inset-[-12%] -z-10"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(212, 186, 130, 0.12) 0%, rgba(198, 167, 105, 0.04) 35%, transparent 65%)',
              animation: 'p1WarmGlowPulse 9s ease-in-out infinite',
            }}
            aria-hidden="true"
          />

          {/* ── Image — LARGER, radial reveal ── */}
          <motion.div
            className="nauka-edge-soft relative overflow-hidden rounded-lg md:rounded-xl"
            style={{
              aspectRatio: '606 / 396',
              boxShadow:
                '0 2px 8px rgba(28,28,28,0.03), 0 8px 24px rgba(28,28,28,0.05), 0 20px 48px rgba(28,28,28,0.03)',
            }}
            variants={radialReveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.3 }}
          >
            <Image
              src="/template/premium-1/scene-4.webp"
              alt="Bride and groom sitting together bathed in warm sacred light, the moment of a promise fulfilled"
              fill
              sizes="(max-width: 640px) 85vw, 540px"
              className="object-cover"
              priority={false}
            />

            {/* Warm cinematic overlay — sacred light from center */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: [
                  'linear-gradient(0deg, rgba(198,167,105,0.06) 0%, transparent 40%)',
                  'linear-gradient(180deg, rgba(212,186,130,0.03) 0%, transparent 25%)',
                ].join(', '),
              }}
              aria-hidden="true"
            />
            {/* Extra sacred warm glow from center outward */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(198,167,105,0.05) 0%, transparent 60%)',
              }}
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>

        {/* ── Text — closer to image than other scenes ── */}
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col items-center text-center">

          {/* Scene label */}
          <motion.div
            className="mb-2"
            variants={labelFadeIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 2.0 }}
          >
            <span
              className="font-serif text-[10px] tracking-[0.3em] uppercase sm:text-xs"
              style={{ color: 'var(--p1-gold-light)' }}
            >
              Scene IV
            </span>
          </motion.div>

          {/* Title — warmer gold tone */}
          <motion.div
            className="mb-6 md:mb-8"
            variants={titleFadeIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 2.3 }}
          >
            <h2
              className="font-serif text-lg font-medium tracking-wide sm:text-xl md:text-2xl"
              style={{ color: 'var(--p1-gold-light)' }}
            >
              <span style={{ fontVariant: 'small-caps' }}>
                Hari Yang Dijanjikan
              </span>
            </h2>
          </motion.div>

          {/* Single thin warm gold line */}
          <motion.div
            className="mb-6 w-[50px] origin-center"
            style={{
              height: '1px',
              background: 'linear-gradient(to right, transparent, var(--p1-gold-light), transparent)',
            }}
            variants={lineDraw}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 2.6 }}
          />

          {/* Line-by-line text reveal — payoff moment, slightly faster */}
          <div
            className="max-w-sm"
            style={{ animation: 'p1TextBreathe 9s ease-in-out infinite' }}
          >
            {sceneLines.map((line, i) => (
              <motion.p
                key={i}
                className="font-serif italic text-sm leading-[2] tracking-wide sm:text-[15px] sm:leading-[2.1] md:text-base md:leading-[2.2]"
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
        </div>
      </div>

      {/* ── Bottom edge ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(245,239,227,0.5) 50%, rgba(245,239,227,1) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Top edge ── */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-16"
        style={{
          background:
            'linear-gradient(0deg, transparent 0%, rgba(245,239,227,0.5) 50%, rgba(245,239,227,1) 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
