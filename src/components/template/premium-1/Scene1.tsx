'use client';

import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   Scene1 — "Menjaga Dalam Diam" (Guarding in Silence)
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Emotion: Distance, longing, quiet interior vs cold exterior

   Composition: ASYMMETRIC — Image offset to the LEFT (~55-60%),
   text zone on the RIGHT with generous whitespace.
   Visual tension matching the emotional distance.

   Image treatment:
   • Thin gold outline frame appears FIRST (like a sketch)
   • Image slowly materializes behind it with opacity only (NO blur)
   • The outline frame fades away as image becomes fully present
   • Directional lighting overlay: cool moonlight from top, warm lamp from bottom-left

   Text treatment:
   • Scene label "Scene I" is subtle, far to the right, small
   • Title appears after image is ~70% revealed, right of image area
   • Quote text appears last, in the right whitespace zone
   • No quotation marks — just the words themselves
   • Single thin gold line between title and quote
   ────────────────────────────────────────────────────────────── */

// ── Animation variants ──────────────────────────────────────────

/** Sketch frame — thin gold border appears first, then fades */
const sketchFrameIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.02,
  },
  visible: {
    opacity: [0, 1, 1, 0],
    scale: [1.02, 1, 1, 0.98],
    transition: {
      duration: 3.6,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 3.6,
        times: [0, 0.15, 0.65, 1],
        ease: 'easeOut',
      },
      scale: {
        duration: 3.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
};

/** Image materialize — opacity + slight scale, NO blur */
const imageMaterialize: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.03,
  },
  visible: {
    opacity: [0, 0, 0.3, 0.7, 1],
    scale: 1,
    transition: {
      duration: 3.4,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 3.4,
        times: [0, 0.1, 0.3, 0.6, 1],
        ease: 'easeOut',
      },
      scale: {
        duration: 3.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
};

/** Scene label — subtle, far right */
const labelFadeIn: Variants = {
  hidden: {
    opacity: 0,
    x: 10,
  },
  visible: {
    opacity: 0.5,
    x: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Title — appears after image is ~70% revealed */
const titleFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Gold line — draws from center outward */
const lineDraw: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Quote text — fades in slowly */
const quoteFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 2.0,
        ease: 'easeOut',
      },
    },
  },
};

// ── Component ───────────────────────────────────────────────────

export default function Scene1() {
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
      {/* ── Directional lighting overlays ──
          Cool moonlight from top, warm lamp from bottom-left */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: [
            'radial-gradient(ellipse 70% 40% at 35% 5%, rgba(138,155,174,0.08) 0%, transparent 50%)',
            'radial-gradient(ellipse 65% 55% at 25% 75%, rgba(198,167,105,0.08) 0%, transparent 50%)',
            'radial-gradient(ellipse 50% 40% at 20% 55%, rgba(198,167,105,0.03) 0%, transparent 50%)',
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

      {/* ── Asymmetric content wrapper ──
          Image LEFT, text RIGHT. Two-column on md+, stacked on mobile. */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 min-h-dvh flex items-center">
        <div className="w-full flex flex-col md:flex-row md:items-center gap-8 md:gap-10 lg:gap-16">

          {/* ── LEFT: Image zone — offset to left, ~55-60% on desktop ── */}
          <div className="w-full md:w-[58%] flex-shrink-0">
            <motion.div
              className="relative"
              style={{ maxWidth: '520px' }}
              variants={imageMaterialize}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <div
                className="nauka-edge-soft relative overflow-hidden rounded-lg md:rounded-xl"
                style={{
                  aspectRatio: '574 / 388',
                  boxShadow:
                    '0 2px 8px rgba(28,28,28,0.04), 0 8px 24px rgba(28,28,28,0.06), 0 20px 48px rgba(28,28,28,0.04)',
                }}
              >
                <Image
                  src="/template/premium-1/scene-1.webp"
                  alt="Faceless hijab woman silhouette behind a window bathed in moonlight, a quiet room aglow with warmth"
                  fill
                  sizes="(max-width: 768px) 85vw, 520px"
                  className="object-cover"
                  priority={false}
                />

                {/* Directional lighting on image
                    Cool moonlight from top, warm lamp from bottom-left */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: [
                      'linear-gradient(180deg, rgba(138,155,174,0.08) 0%, transparent 40%)',
                      'linear-gradient(315deg, rgba(198,167,105,0.07) 0%, transparent 45%)',
                    ].join(', '),
                  }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 60% 45% at 25% 70%, rgba(198,167,105,0.05) 0%, transparent 55%)',
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* ── Sketch frame — thin gold outline that appears first, then fades ── */}
              <motion.div
                className="absolute inset-[-4px] rounded-lg md:rounded-xl pointer-events-none"
                style={{
                  border: '1px solid var(--p1-gold)',
                  opacity: 0.6,
                }}
                variants={sketchFrameIn}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              />
            </motion.div>
          </div>

          {/* ── RIGHT: Text zone — generous whitespace ── */}
          <div className="w-full md:w-[42%] flex flex-col md:items-start items-center md:text-left text-center">

            {/* Scene label — subtle, small */}
            <motion.div
              className="mb-4 md:mb-6"
              variants={labelFadeIn}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 1.6 }}
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
              className="mb-4 md:mb-5"
              variants={titleFadeIn}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 2.2 }}
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

            {/* Single thin gold line */}
            <motion.div
              className="mb-5 md:mb-6 w-[50px] origin-center md:origin-left"
              style={{
                height: '1px',
                background: 'linear-gradient(to right, var(--p1-gold), transparent)',
              }}
              variants={lineDraw}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 2.6 }}
            />

            {/* Quote text — no quotation marks */}
            <motion.div
              className="max-w-xs"
              variants={quoteFadeIn}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 3.0 }}
            >
              <blockquote>
                <p
                  className="font-serif italic text-sm leading-[2] tracking-wide sm:text-[15px] sm:leading-[2.1] md:text-base"
                  style={{
                    color: 'var(--p1-warm-brown)',
                    animation: 'p1TextBreathe 8s ease-in-out infinite',
                  }}
                >
                  Kami saling mengenal sejak lama.
                  <br />
                  Namun memilih menjaga hati sebelum waktunya tiba.
                </p>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Bottom edge — soft fade into next scene ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(245,240,232,0.5) 50%, rgba(245,240,232,1) 100%)',
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
    </section>
  );
}
