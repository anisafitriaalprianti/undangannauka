'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import HandwritingText from './HandwritingText';
import PencilBuildUpImage from './PencilBuildUpImage';

/* ──────────────────────────────────────────────────────────────
   Scene1 — "Menjaga Dalam Diam" (Guarding in Silence)
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Emotion: Distance, longing, quiet interior vs cold exterior

   Composition: ASYMMETRIC — Image offset to the LEFT (~55-60%),
   text zone on the RIGHT with generous whitespace.

   Animations:
   - T2 PencilBuildUp for image (sketch → shading → foto)
   - T1 HandwritingText for story lines (letter-by-letter)
   ────────────────────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

const sceneLines = [
  'Di bawah naungan langit yang sama,',
  'kami dipisahkan oleh dinding ketaatan.',
  'Hati terpaut, namun rasa bukan tiket untuk melanggar batas.',
  'Tidak ada pesan singkat yang tak perlu.',
  'Tidak ada pertemuan di tempat sepi.',
  'Kami memilih menjaga—',
  'karena menunggu juga bentuk ibadah.',
];

const BASE_DELAY = 3.5;
const LINE_GAP = 2.0;

export default function Scene1() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-20% 0px -20% 0px',
  });

  return (
    <section
      ref={sectionRef}
      className="template-p1 nauka-paper nauka-grain nauka-ink-wash nauka-vignette relative w-full min-h-dvh overflow-hidden"
      style={{ backgroundColor: 'var(--p1-ivory)' }}
    >
      {/* ── Directional lighting overlays ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: [
            'radial-gradient(ellipse 70% 40% at 35% 5%, rgba(138,155,174,0.08) 0%, transparent 50%)',
            'radial-gradient(ellipse 65% 55% at 25% 75%, rgba(198,167,105,0.08) 0%, transparent 50%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* ── Breathing ambient warm glow ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 30% at 35% 60%, rgba(198,167,105,0.04) 0%, transparent 60%)',
          animation: 'naukaBreathLight 8s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* ── Asymmetric content wrapper ── */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 min-h-dvh flex items-center">
        <div className="w-full flex flex-col md:flex-row md:items-center gap-8 md:gap-10 lg:gap-16">

          {/* ── LEFT: Image zone ── */}
          <div className="w-full md:w-[58%] flex-shrink-0">
            <PencilBuildUpImage
              src="/template/premium-1/scene-1.webp"
              alt="Faceless hijab woman silhouette behind a window bathed in moonlight, a quiet room aglow with warmth"
              aspectRatio="574 / 388"
              sizes="(max-width: 768px) 85vw, 520px"
              maxWidth="520px"
            />
          </div>

          {/* ── RIGHT: Text zone ── */}
          <div className="w-full md:w-[42%] flex flex-col md:items-start items-center md:text-left text-center">

            {/* Scene label */}
            <motion.div
              className="mb-4 md:mb-6"
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 0.5, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ delay: 1.5, duration: 1.0, ease: EASE }}
            >
              <span
                className="font-serif text-[10px] tracking-[0.3em] uppercase sm:text-xs"
                style={{ color: 'var(--p1-gold-dim)' }}
              >
                Scene I
              </span>
            </motion.div>

            {/* Title */}
            <motion.div
              className="mb-8 md:mb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: 2.0, duration: 1.4, ease: EASE }}
            >
              <h2
                className="font-serif text-lg font-medium tracking-wide sm:text-xl md:text-2xl"
                style={{ color: 'var(--p1-warm-brown)' }}
              >
                <span style={{ fontVariant: 'small-caps' }}>
                  Menjaga Dalam Diam
                </span>
              </h2>
            </motion.div>

            {/* Line-by-line text with T1 Handwriting */}
            <div className="max-w-xs">
              {sceneLines.map((line, i) => (
                <HandwritingText
                  key={i}
                  text={line}
                  className="font-serif italic text-sm leading-[2.2] tracking-wide sm:text-[15px] sm:leading-[2.3] md:text-base md:leading-[2.4]"
                  style={{ color: 'var(--p1-warm-brown)' }}
                  charDelay={0.04}
                  startDelay={BASE_DELAY + i * LINE_GAP}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom edge ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(245,240,232,0.5) 50%, rgba(245,240,232,1) 100%)',
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
