'use client';

import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   Scene2 — "Menitipkan Dalam Sujud"
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Composition:
   • Single cinematic image showing both figures in sujud
   • Centered image, landscape format (1024x380)
   • Scene label + title above image
   • Quote text below image
   • Generous whitespace

   Animation sequence (scroll-triggered):
   1. Image reveals with sketch-to-cinematic effect
   2. Title appears after image is ~60% revealed
   3. Quote text fades in slowly after title

   Atmosphere: warm dawn / subuh, spiritual calmness,
               soft cinematic lighting, warm ivory background
   ────────────────────────────────────────────────────────────── */

// ── Animation variants ──────────────────────────────────────────

const sketchToCinematic: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(8px) grayscale(100%)',
    scale: 1.04,
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px) grayscale(0%)',
    scale: 1,
    transition: {
      duration: 2.0,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 1.4,
        ease: 'easeOut',
      },
      filter: {
        duration: 2.0,
        ease: 'easeOut',
      },
      scale: {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
};

const titleFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
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
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const dividerDraw: Variants = {
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

const quoteFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 1.8,
        ease: 'easeOut',
      },
      filter: {
        duration: 1.4,
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
      className="template-p1 nauka-paper nauka-grain nauka-vignette relative w-full min-h-dvh overflow-hidden flex flex-col items-center justify-center"
      style={{
        background:
          'linear-gradient(160deg, #F5F0E8 0%, #F2EDE4 30%, #F5F0E8 60%, #F0EBE1 100%)',
      }}
    >
      {/* ── Warm ambient light — top-left source (subuh window light) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 25% 15%, rgba(198, 167, 105, 0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 75% 80%, rgba(198, 167, 105, 0.03) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 flex flex-col items-center">
        {/* ── Scene Label — "Scene II" ── */}
        <motion.div
          className="mb-6 sm:mb-8 flex flex-col items-center gap-3"
          variants={labelFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span
            className="font-serif text-[10px] tracking-[0.3em] uppercase sm:text-xs"
            style={{ color: 'var(--p1-gold-dim, #8A7444)' }}
          >
            Scene II
          </span>
        </motion.div>

        {/* ── Scene Title ── */}
        <motion.div
          className="mb-8 sm:mb-10 md:mb-12 flex flex-col items-center gap-3"
          variants={titleFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 }}
        >
          <h2
            className="font-serif text-lg font-medium tracking-wide sm:text-xl md:text-2xl"
            style={{ color: 'var(--p1-warm-brown, #6B5B4A)' }}
          >
            <span style={{ fontVariant: 'small-caps' }}>
              Menitipkan Dalam Sujud
            </span>
          </h2>

          {/* Decorative divider */}
          <motion.div
            className="h-[1px] w-[60px] origin-center"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--p1-gold, #C6A769), transparent)',
            }}
            variants={dividerDraw}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.8 }}
          />
        </motion.div>

        {/* ── Scene Image — two figures in sujud ──
            Single cinematic image, landscape format.
            Sketch-to-cinematic reveal with warm dawn light. */}
        <motion.div
          className="w-full max-w-[560px] sm:max-w-[640px] md:max-w-[720px]"
          variants={sketchToCinematic}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
        >
          <div
            className="relative overflow-hidden rounded-lg md:rounded-xl"
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
              sizes="(max-width: 640px) 85vw, (max-width: 768px) 640px, 720px"
              className="object-cover"
              priority={false}
            />

            {/* Subtle warm overlay — cinematic warmth */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(198,167,105,0.04) 0%, transparent 60%)',
              }}
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* ── Quote text ── */}
        <motion.div
          className="mt-10 sm:mt-12 md:mt-14 px-2 sm:px-4 text-center max-w-md"
          variants={quoteFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 2.0 }}
        >
          {/* Decorative opening quotation mark */}
          <span
            className="mb-3 block font-serif text-2xl leading-none sm:text-3xl"
            style={{ color: 'var(--p1-gold, #C6A769)', opacity: 0.5 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote>
            <p
              className="font-serif italic text-sm leading-[2] tracking-wide sm:text-[15px] sm:leading-[2.1] md:text-base"
              style={{
                color: 'var(--p1-warm-brown, #6B5B4A)',
                animation: 'p1TextBreathe 8s ease-in-out infinite',
              }}
            >
              Mereka memilih jalan yang sunyi:
              <br />
              menitipkan rasa itu dalam sujud-sujud panjang.
            </p>
          </blockquote>

          {/* Decorative closing quotation mark */}
          <span
            className="mt-3 block font-serif text-2xl leading-none sm:text-3xl"
            style={{ color: 'var(--p1-gold, #C6A769)', opacity: 0.5 }}
            aria-hidden="true"
          >
            &rdquo;
          </span>

          {/* Small decorative line under quote */}
          <motion.div
            className="mx-auto mt-5 h-[1px] w-[40px] origin-center"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--p1-gold, #C6A769), transparent)',
            }}
            variants={dividerDraw}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 2.6 }}
          />
        </motion.div>
      </div>

      {/* ── Bottom edge — soft fade into next scene ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-20"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(245,240,232,0.6) 60%, rgba(245,240,232,1) 100%)',
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
