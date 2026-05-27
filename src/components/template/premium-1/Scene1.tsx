'use client';

import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   Scene1 — "Menjaga Dalam Diam"
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Concept: Faceless hijab woman silhouette behind window with
   moonlight, a man walking away outside (implied through
   composition), emotional distance feeling.

   Composition:
   • Near-full viewport height, warm ivory background
   • Image centered or slightly above, ~55-60% of space
   • Below image: scene title in small caps tracking
   • Below title: quote text in italic serif
   • Generous whitespace/padding

   Animation sequence (scroll-triggered, whileInView):
   1. Image reveals with sketch-to-cinematic effect:
      grayscale blur → partial color → full sharp cinematic
   2. Title appears after image is ~70% revealed
   3. Quote text fades in slowly after title
   4. Subtle ambient warm glow that breathes

   Atmosphere: warm room inside, moonlight outside,
               emotional distance, calm and intimate
   ────────────────────────────────────────────────────────────── */

// ── Animation variants ──────────────────────────────────────────

/**
 * Sketch-to-cinematic image reveal.
 * Three perceptual stages via Framer Motion orchestration:
 *   Stage 1 (0→40%)  — thin sketch lines: blur + grayscale, low opacity
 *   Stage 2 (40→70%) — shading appears: opacity ↑, blur ↓, some color
 *   Stage 3 (70→100%) — lighting kicks in: full color, sharp, warm
 */
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
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 1.4,
        ease: 'easeOut',
      },
      filter: {
        duration: 2.2,
        ease: 'easeOut',
      },
      scale: {
        duration: 2.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
};

/** Scene title — fades in with gentle blur-to-sharp */
const titleFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: 'blur(3px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Scene label ("Scene I") — appears just before title */
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

/** Decorative divider — draws from center outward */
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

/** Quote text — fades in slowly, like words settling on paper */
const quoteFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: 'blur(4px)',
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
        duration: 1.4,
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
      className="template-p1 nauka-paper nauka-grain nauka-vignette relative w-full min-h-dvh overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#F5F0E8',
      }}
    >
      {/* ── Warm ambient light layers ──
          Top: moonlight blue-grey (outside the window)
          Bottom: warm interior glow (inside the room)
          Together they create the emotional distance —
          cold outside, warm inside */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: [
            // Moonlight from above — cool blue-grey
            'radial-gradient(ellipse 60% 35% at 50% 5%, rgba(138,155,174,0.05) 0%, transparent 55%)',
            // Warm room light — from below/center
            'radial-gradient(ellipse 70% 50% at 50% 85%, rgba(198,167,105,0.06) 0%, transparent 55%)',
            // Secondary warm glow — subtle ambient
            'radial-gradient(ellipse 50% 40% at 30% 60%, rgba(198,167,105,0.03) 0%, transparent 50%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* ── Breathing ambient warm glow ──
          Subtle pulse that makes the scene feel alive,
          like warm lamplight breathing in a quiet room */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 30% at 50% 65%, rgba(198,167,105,0.05) 0%, transparent 60%)',
          animation: 'naukaBreathLight 8s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 flex flex-col items-center">
        {/* ── Scene Image — faceless woman behind window ──
            Takes up ~55-60% of the visual space.
            Sketch-to-cinematic reveal with staggered stages. */}
        <motion.div
          className="w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px]"
          variants={sketchToCinematic}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div
            className="relative overflow-hidden rounded-lg md:rounded-xl"
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
              sizes="(max-width: 640px) 85vw, (max-width: 768px) 480px, 520px"
              className="object-cover"
              priority={false}
            />

            {/* Cinematic warm overlay — warm interior light on the image */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: [
                  // Moonlight cast from top — cool, outside
                  'linear-gradient(180deg, rgba(138,155,174,0.06) 0%, transparent 35%)',
                  // Warm room glow from bottom — inside
                  'linear-gradient(0deg, rgba(198,167,105,0.05) 0%, transparent 40%)',
                ].join(', '),
              }}
              aria-hidden="true"
            />

            {/* Subtle directional warm light — top-left, like a lamp in the room */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 60% 40% at 25% 70%, rgba(198,167,105,0.04) 0%, transparent 60%)',
              }}
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* ── Scene Label — "Scene I" ──
            Appears when image is ~60% revealed */}
        <motion.div
          className="mt-10 sm:mt-12 md:mt-14 flex flex-col items-center gap-3"
          variants={labelFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 1.2 }}
        >
          <span
            className="font-serif text-[10px] tracking-[0.3em] uppercase sm:text-xs"
            style={{ color: 'var(--p1-gold-dim, #8A7444)' }}
          >
            Scene I
          </span>
        </motion.div>

        {/* ── Scene Title — small caps ──
            Appears after image is ~70% revealed */}
        <motion.div
          className="mt-2 flex flex-col items-center gap-3"
          variants={titleFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 1.6 }}
        >
          <h2
            className="font-serif text-lg font-medium tracking-wide sm:text-xl md:text-2xl"
            style={{ color: 'var(--p1-warm-brown, #6B5B4A)' }}
          >
            <span style={{ fontVariant: 'small-caps' }}>
              Menjaga Dalam Diam
            </span>
          </h2>

          {/* Decorative gold divider — draws from center */}
          <motion.div
            className="h-[1px] w-[60px] origin-center"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--p1-gold, #C6A769), transparent)',
            }}
            variants={dividerDraw}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 2.0 }}
          />
        </motion.div>

        {/* ── Quote text — italic serif ──
            Fades in slowly after title has settled.
            Breathing text effect via p1TextBreathe keyframe. */}
        <motion.div
          className="mt-8 sm:mt-10 md:mt-12 px-2 sm:px-4 text-center max-w-md"
          variants={quoteFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 2.4 }}
        >
          {/* Decorative opening quotation mark */}
          <span
            className="mb-3 block font-serif text-2xl leading-none sm:text-3xl"
            style={{ color: 'var(--p1-gold, #C6A769)', opacity: 0.4 }}
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
              Kami saling mengenal sejak lama.
              <br />
              Namun memilih menjaga hati sebelum waktunya tiba.
            </p>
          </blockquote>

          {/* Decorative closing quotation mark */}
          <span
            className="mt-3 block font-serif text-2xl leading-none sm:text-3xl"
            style={{ color: 'var(--p1-gold, #C6A769)', opacity: 0.4 }}
            aria-hidden="true"
          >
            &rdquo;
          </span>
        </motion.div>
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
