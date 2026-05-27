'use client';

import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   Scene2 — "Menitipkan Dalam Sujud"
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Composition:
   • Desktop  — asymmetric split: male top-left, female bottom-right,
                 center quote overlapping both
   • Mobile   — vertical stack: male → female → quote below

   Animation sequence (scroll-triggered):
   1. Male silhouette reveals (sketch → cinematic)
   2. ~0.8s delay → Female silhouette reveals
   3. Center quote fades in slowly

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
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 1.2,
        ease: 'easeOut',
      },
      filter: {
        duration: 1.8,
        ease: 'easeOut',
      },
      scale: {
        duration: 2.0,
        ease: [0.16, 1, 0.3, 1],
      },
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
      delay: 0,
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
      className="template-p1 nauka-paper nauka-grain nauka-vignette relative w-full overflow-hidden"
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
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28 md:px-12 md:py-36 lg:py-44">
        {/* ── Scene title — small caps ── */}
        <motion.div
          className="mb-12 flex flex-col items-center gap-3 sm:mb-16 md:mb-20"
          variants={titleFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span
            className="font-serif text-[10px] tracking-[0.3em] uppercase sm:text-xs"
            style={{ color: 'var(--p1-gold-dim, #8A7444)' }}
          >
            Scene II
          </span>

          <h2
            className="font-serif text-lg font-medium tracking-wide sm:text-xl md:text-2xl"
            style={{ color: 'var(--p1-warm-brown, #6B5B4A)' }}
          >
            <span className="font-serif-small-caps" style={{ fontVariant: 'small-caps' }}>
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
          />
        </motion.div>

        {/* ── Asymmetric split composition ── */}

        {/* Desktop layout — asymmetric grid */}
        <div className="relative hidden md:grid md:grid-cols-12 md:gap-6 lg:gap-8">
          {/* Male — top-left area (cols 1–5, offset from top) */}
          <motion.div
            className="col-span-5 col-start-1 row-start-1 mt-0"
            variants={sketchToCinematic}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div
              className="relative overflow-hidden rounded-lg lg:rounded-xl"
              style={{
                aspectRatio: '3 / 4',
                boxShadow:
                  '0 2px 8px rgba(28,28,28,0.04), 0 8px 24px rgba(28,28,28,0.06), 0 20px 48px rgba(28,28,28,0.04)',
              }}
            >
              <Image
                src="/template/premium-1/scene2-male-pray.png"
                alt="Silhouette of a man praying in the quiet dawn"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
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

          {/* Female — bottom-right area (cols 7–12, offset down) */}
          <motion.div
            className="col-span-5 col-start-8 row-start-1 mt-24 lg:mt-32"
            variants={sketchToCinematic}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.8 }}
          >
            <div
              className="relative overflow-hidden rounded-lg lg:rounded-xl"
              style={{
                aspectRatio: '3 / 4',
                boxShadow:
                  '0 2px 8px rgba(28,28,28,0.04), 0 8px 24px rgba(28,28,28,0.06), 0 20px 48px rgba(28,28,28,0.04)',
              }}
            >
              <Image
                src="/template/premium-1/scene2-female-pray.png"
                alt="Silhouette of a woman praying in the quiet dawn"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                priority={false}
              />

              {/* Subtle warm overlay — cinematic warmth */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(225deg, rgba(198,167,105,0.04) 0%, transparent 60%)',
                }}
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Center quote — overlapping the gap between the two images */}
          <motion.div
            className="col-span-4 col-start-5 row-start-1 flex items-center justify-center self-center"
            variants={quoteFadeIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 1.8 }}
          >
            <div className="relative px-4 py-8 text-center lg:px-6 lg:py-10">
              {/* Soft background glow behind quote */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-full"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(245,240,232,0.9) 0%, rgba(245,240,232,0.4) 50%, transparent 70%)',
                }}
                aria-hidden="true"
              />

              {/* Decorative top mark */}
              <span
                className="mb-4 block font-serif text-2xl leading-none lg:text-3xl"
                style={{ color: 'var(--p1-gold, #C6A769)', opacity: 0.5 }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <blockquote>
                <p
                  className="font-serif text-sm leading-relaxed tracking-wide sm:text-base md:text-[15px] md:leading-[1.9] lg:text-base lg:leading-[2]"
                  style={{ color: 'var(--p1-warm-brown, #6B5B4A)' }}
                >
                  Mereka memilih jalan yang sunyi:
                  <br />
                  <span className="italic">
                    menitipkan rasa itu dalam sujud-sujud panjang.
                  </span>
                </p>
              </blockquote>

              {/* Decorative bottom mark */}
              <span
                className="mt-4 block font-serif text-2xl leading-none lg:text-3xl"
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
                transition={{ delay: 2.4 }}
              />
            </div>
          </motion.div>
        </div>

        {/* ── Mobile layout — vertical stack ── */}
        <div className="flex flex-col items-center gap-8 md:hidden">
          {/* Male praying */}
          <motion.div
            className="w-full max-w-[280px] sm:max-w-[320px]"
            variants={sketchToCinematic}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div
              className="relative overflow-hidden rounded-lg"
              style={{
                aspectRatio: '3 / 4',
                boxShadow:
                  '0 2px 8px rgba(28,28,28,0.04), 0 8px 24px rgba(28,28,28,0.06), 0 20px 48px rgba(28,28,28,0.04)',
              }}
            >
              <Image
                src="/template/premium-1/scene2-male-pray.png"
                alt="Silhouette of a man praying in the quiet dawn"
                fill
                sizes="80vw"
                className="object-cover"
                priority={false}
              />

              {/* Warm overlay */}
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

          {/* Female praying */}
          <motion.div
            className="w-full max-w-[280px] sm:max-w-[320px]"
            variants={sketchToCinematic}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.8 }}
          >
            <div
              className="relative overflow-hidden rounded-lg"
              style={{
                aspectRatio: '3 / 4',
                boxShadow:
                  '0 2px 8px rgba(28,28,28,0.04), 0 8px 24px rgba(28,28,28,0.06), 0 20px 48px rgba(28,28,28,0.04)',
              }}
            >
              <Image
                src="/template/premium-1/scene2-female-pray.png"
                alt="Silhouette of a woman praying in the quiet dawn"
                fill
                sizes="80vw"
                className="object-cover"
                priority={false}
              />

              {/* Warm overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(225deg, rgba(198,167,105,0.04) 0%, transparent 60%)',
                }}
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Center quote */}
          <motion.div
            className="mt-4 px-4 text-center"
            variants={quoteFadeIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 1.8 }}
          >
            {/* Decorative top mark */}
            <span
              className="mb-3 block font-serif text-xl leading-none"
              style={{ color: 'var(--p1-gold, #C6A769)', opacity: 0.5 }}
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <blockquote>
              <p
                className="font-serif text-sm leading-[1.9] tracking-wide sm:text-[15px]"
                style={{ color: 'var(--p1-warm-brown, #6B5B4A)' }}
              >
                Mereka memilih jalan yang sunyi:
                <br />
                <span className="italic">
                  menitipkan rasa itu dalam sujud-sujud panjang.
                </span>
              </p>
            </blockquote>

            {/* Decorative bottom mark */}
            <span
              className="mt-3 block font-serif text-xl leading-none"
              style={{ color: 'var(--p1-gold, #C6A769)', opacity: 0.5 }}
              aria-hidden="true"
            >
              &rdquo;
            </span>

            {/* Small decorative line */}
            <motion.div
              className="mx-auto mt-5 h-[1px] w-[40px] origin-center"
              style={{
                background:
                  'linear-gradient(to right, transparent, var(--p1-gold, #C6A769), transparent)',
              }}
              variants={dividerDraw}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 2.4 }}
            />
          </motion.div>
        </div>
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
    </section>
  );
}
