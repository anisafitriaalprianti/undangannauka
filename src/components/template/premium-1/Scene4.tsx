'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import HandwritingText from './HandwritingText';
import PencilBuildUpImage from './PencilBuildUpImage';

/* ──────────────────────────────────────────────────────────────
   Scene4 — "Hari Yang Dijanjikan" (The Promised Day)
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Emotion: Fulfillment, sacred warmth, intimate closeness —
   the emotional climax / payoff

   Composition: INTIMATE & CLOSE — Image is LARGER,
   text feels connected to the image. The warmest composition.

   Animations:
   - T2 PencilBuildUp for image (sketch → shading → foto)
   - T1 HandwritingText for story lines (FASTER stagger — payoff!)
   ────────────────────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

const sceneLines = [
  'Lalu hari itu datang.',
  'Bukan karena kami yang memilih—',
  'tapi karena Ia yang mempertemukan.',
  'Ketika ijab kabul terucap,',
  'semua penantian terjawab.',
  'Semata-mata karena-Nya.',
];

const BASE_DELAY = 3.0;
const LINE_GAP = 1.5; // FASTER — payoff moment

export default function Scene4() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-20% 0px -20% 0px',
  });

  return (
    <section
      ref={sectionRef}
      className="template-p1 nauka-paper nauka-grain nauka-ink-wash nauka-vignette relative w-full min-h-dvh overflow-hidden"
      style={{
        background:
          'linear-gradient(170deg, #F7F1E4 0%, #F5EFE3 25%, #F4EDE0 50%, #F3ECE0 75%, #F5F0E6 100%)',
      }}
    >
      {/* ── Multiple warm light layers ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: [
            'radial-gradient(ellipse 60% 45% at 50% 40%, rgba(212, 186, 130, 0.07) 0%, transparent 55%)',
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(198, 167, 105, 0.04) 0%, transparent 60%)',
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

        {/* ── Sacred glow halo + Image ── */}
        <motion.div
          className="relative"
          style={{ width: '100%', maxWidth: '540px' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 2.0, ease: EASE }}
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

          {/* ── Image — T2 PencilBuildUp ── */}
          <PencilBuildUpImage
            src="/template/premium-1/scene-4.webp"
            alt="Bride and groom sitting together bathed in warm sacred light, the moment of a promise fulfilled"
            aspectRatio="606 / 396"
            sizes="(max-width: 640px) 85vw, 540px"
            maxWidth="540px"
          />
        </motion.div>

        {/* ── Text — closer to image ── */}
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col items-center text-center">

          {/* Scene label */}
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 0.5, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ delay: 2.0, duration: 0.9, ease: EASE }}
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
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 2.3, duration: 1.2, ease: EASE }}
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

          {/* Gold line */}
          <motion.div
            className="mb-6 w-[50px] origin-center"
            style={{
              height: '1px',
              background: 'linear-gradient(to right, transparent, var(--p1-gold-light), transparent)',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.6 } : { scaleX: 0, opacity: 0 }}
            transition={{ delay: 2.6, duration: 1.0, ease: EASE }}
          />

          {/* Line-by-line text with T1 Handwriting — FASTER stagger */}
          <div className="max-w-sm">
            {sceneLines.map((line, i) => (
              <HandwritingText
                key={i}
                text={line}
                className="font-serif italic text-sm leading-[2] tracking-wide sm:text-[15px] sm:leading-[2.1] md:text-base md:leading-[2.2]"
                style={{ color: 'var(--p1-warm-brown)' }}
                charDelay={0.035} // Faster per char — payoff!
                startDelay={BASE_DELAY + i * LINE_GAP}
              />
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
