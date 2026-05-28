'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import HandwritingText, { calcLineDelays } from './HandwritingText';
import PencilBuildUpImage from './PencilBuildUpImage';

/* ──────────────────────────────────────────────────────────────
   Scene2 — "Menitipkan Dalam Sujud" (Entrusting in Prostration)
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Emotion: Spiritual devotion, surrender, warm dawn light

   Composition: WIDE EDITORIAL — Full-width image upper,
   left-aligned text below with generous margin.

   Animations:
   - T2 PencilBuildUp for image (sketch → shading → foto)
   - T5 HandwritingText for story lines (mask reveal)
   ────────────────────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

const sceneLines = [
  'Malam-malam yang panjang,',
  'kami tidak pernah bertemu dalam dunia—',
  'tapi mungkin, dalam sujud,',
  'hati kami pernah bersentuhan.',
  'Kami menitipkan segala rindu',
  'kepada Dzat yang mendengar bisikan yang tidak terucap.',
];

const CHAR_DELAY = 0.05;
const BASE_DELAY = 1.5;
const PAUSE_GAP = 0.5;

export default function Scene2() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-20% 0px -20% 0px',
  });

  const lineDelays = useMemo(
    () => calcLineDelays(sceneLines, CHAR_DELAY, BASE_DELAY, PAUSE_GAP),
    []
  );

  return (
    <section
      ref={sectionRef}
      className="template-p1 nauka-paper nauka-grain nauka-ink-wash nauka-vignette relative w-full min-h-dvh overflow-hidden"
      style={{
        background:
          'linear-gradient(160deg, #F5F0E8 0%, #F2EDE4 30%, #F5F0E8 60%, #F0EBE1 100%)',
      }}
    >
      {/* ── Warm dawn light from top-left ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 20% 10%, rgba(198, 167, 105, 0.09) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      {/* ── Content wrapper — editorial layout ── */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 min-h-dvh flex flex-col justify-center">

        {/* ── Wide image — T2 PencilBuildUp ── */}
        <PencilBuildUpImage
          src="/template/premium-1/scene-2.webp"
          alt="Two figures in sujud, entrusting their feelings in long prostrations at dawn"
          aspectRatio="1024 / 380"
          sizes="85vw"
          maxWidth="85%"
          className="mx-auto"
        />

        {/* ── Thin horizontal line below image ── */}
        <motion.div
          className="mx-auto mt-8 sm:mt-10 md:mt-12 w-[60px] origin-center"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--p1-gold), transparent)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 0.4 } : { scaleX: 0, opacity: 0 }}
          transition={{ delay: 1.5, duration: 1.6, ease: EASE }}
        />

        {/* ── Text zone — LEFT-ALIGNED ── */}
        <div className="mt-8 sm:mt-10 md:mt-12 w-full pl-4 sm:pl-8 md:pl-16 lg:pl-24">

          {/* Scene label */}
          <motion.div
            className="mb-3"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 0.5, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: 1.7, duration: 1.0, ease: EASE }}
          >
            <span
              className="font-serif text-[10px] tracking-[0.3em] uppercase sm:text-xs"
              style={{ color: 'var(--p1-gold-dim)' }}
            >
              Scene II
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: 1.9, duration: 1.2, ease: EASE }}
          >
            <h2
              className="font-serif text-lg font-medium tracking-wide sm:text-xl md:text-2xl"
              style={{ color: 'var(--p1-warm-brown)' }}
            >
              <span style={{ fontVariant: 'small-caps' }}>
                Menitipkan Dalam Sujud
              </span>
            </h2>
          </motion.div>

          {/* Line-by-line text with T5 Handwriting */}
          <div className="max-w-sm">
            {sceneLines.map((line, i) => (
              <HandwritingText
                key={i}
                text={line}
                className="font-serif italic text-sm leading-[2.2] tracking-wide sm:text-[15px] sm:leading-[2.3] md:text-base md:leading-[2.4]"
                style={{ color: 'var(--p1-warm-brown)' }}
                charDelay={CHAR_DELAY}
                startDelay={lineDelays[i]}
                inView={isInView}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom edge ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-20"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(245,240,232,0.6) 60%, rgba(245,240,232,1) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Top edge ── */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-16"
        style={{
          background:
            'linear-gradient(0deg, transparent 0%, rgba(245,240,232,0.5) 50%, rgba(245,240,232,1) 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
