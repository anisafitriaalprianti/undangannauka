'use client';

import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   Scene2 — "Menitipkan Dalam Sujud" (Entrusting in Prostration)
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Emotion: Spiritual devotion, surrender, warm dawn light

   Composition: WIDE EDITORIAL — Full-width image in the upper
   portion, large breathing space below with LEFT-ALIGNED text.
   Like a film still with credits below.

   Image treatment:
   • Image spans wider (~85% of container), sitting in upper portion
   • Reveals with slow opacity rise + subtle upward drift (translateY), NO blur
   • Warm dawn light overlay from top-left
   • After image is visible, a very thin horizontal line fades in below it

   Text treatment:
   • Label + Title LEFT-ALIGNED, generous left margin
   • Quote text left-aligned, italic serif, generous line-height
   • Asymmetry of left-aligned text vs centered image = editorial tension
   • No quotation marks, minimal decoration
   ────────────────────────────────────────────────────────────── */

// ── Animation variants ──────────────────────────────────────────

/** Image reveal — opacity rise + subtle upward drift, NO blur */
const imageDriftIn: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 1.01,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 2.8,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 2.6,
        ease: 'easeOut',
      },
      y: {
        duration: 2.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
};

/** Scene label — subtle left-aligned */
const labelFadeIn: Variants = {
  hidden: {
    opacity: 0,
    x: -10,
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

/** Title — left-aligned, appears after image */
const titleFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
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

/** Thin line below image — fades in */
const lineFadeIn: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 0.4,
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Quote text — left-aligned, slow fade */
const quoteFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
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

export default function Scene2() {
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
        background:
          'linear-gradient(160deg, #F5F0E8 0%, #F2EDE4 30%, #F5F0E8 60%, #F0EBE1 100%)',
      }}
    >
      {/* ── Warm dawn light from top-left ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 20% 10%, rgba(198, 167, 105, 0.09) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 75% 80%, rgba(198, 167, 105, 0.03) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      {/* ── Content wrapper — editorial layout ── */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 min-h-dvh flex flex-col justify-center">

        {/* ── Wide image — upper portion, ~85% of container width ── */}
        <motion.div
          className="w-full mx-auto"
          style={{ maxWidth: '85%' }}
          variants={imageDriftIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div
            className="nauka-edge-soft relative overflow-hidden rounded-lg md:rounded-xl"
            style={{
              aspectRatio: '1024 / 380',
              boxShadow:
                '0 2px 8px rgba(28,28,28,0.04), 0 8px 24px rgba(28,28,28,0.06), 0 20px 48px rgba(28,28,28,0.04)',
            }}
          >
            <Image
              src="/template/premium-1/scene-2.webp"
              alt="Two figures in sujud, entrusting their feelings in long prostrations at dawn"
              fill
              sizes="85vw"
              className="object-cover"
              priority={false}
            />

            {/* Warm dawn light overlay from top-left */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(198,167,105,0.06) 0%, transparent 55%)',
              }}
              aria-hidden="true"
            />
            {/* Subtle right-side shadow — light from left */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(270deg, rgba(42,36,32,0.03) 0%, transparent 12%)',
              }}
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* ── Thin horizontal line below image ── */}
        <motion.div
          className="mx-auto mt-8 sm:mt-10 md:mt-12 w-[60px] origin-center"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--p1-gold), transparent)',
          }}
          variants={lineFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 2.0 }}
        />

        {/* ── Text zone — LEFT-ALIGNED, generous left margin ── */}
        <div className="mt-8 sm:mt-10 md:mt-12 w-full pl-4 sm:pl-8 md:pl-16 lg:pl-24">

          {/* Scene label */}
          <motion.div
            className="mb-3"
            variants={labelFadeIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 2.2 }}
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
            className="mb-4"
            variants={titleFadeIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 2.4 }}
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

          {/* Quote — left-aligned, no quotation marks */}
          <motion.div
            className="max-w-sm"
            variants={quoteFadeIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 3.0 }}
          >
            <blockquote>
              <p
                className="font-serif italic text-sm leading-[2.2] tracking-wide sm:text-[15px] sm:leading-[2.3] md:text-base md:leading-[2.4]"
                style={{
                  color: 'var(--p1-warm-brown)',
                  animation: 'p1TextBreathe 8s ease-in-out infinite',
                }}
              >
                Mereka memilih jalan yang sunyi:
                <br />
                menitipkan rasa itu dalam sujud-sujud panjang.
              </p>
            </blockquote>
          </motion.div>
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
