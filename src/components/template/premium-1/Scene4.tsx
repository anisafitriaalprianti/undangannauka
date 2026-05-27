'use client';

import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   Scene4 — "Hari Yang Dijanjikan"
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Concept: The emotional payoff. When the promise is fulfilled,
   everything becomes warmer. This is the sacred moment when
   ijab kabul is spoken and everything changes.

   Composition:
   • Near-full viewport height, warmer golden-tinted background
   • Image centered, ~50-55% of visual space
   • Below image: scene title in small caps tracking
   • Below title: "Hari Yang Dijanjikan" title
   • Below: quote text in italic serif
   • Generous whitespace/padding

   Animation sequence (scroll-triggered, whileInView):
   1. Image reveals with warm sunrise transition:
      warm golden blur → partial color → full sharp cinematic
      (Instead of grayscale → color, this feels like dawn breaking)
   2. Title and text appear with warm dissolve
   3. Extra warm ambient glow around the image — sacred light

   Atmosphere: warmer than all previous scenes, brighter,
               softer, peaceful — like the first light of
               a promise fulfilled
   ────────────────────────────────────────────────────────────── */

// ── Animation variants ──────────────────────────────────────────

/**
 * Warm sunrise image reveal.
 * Unlike other scenes that go grayscale→color (like a sketch coming alive),
 * Scene4 starts from a warm golden blur — like dawn breaking.
 * The reveal feels like sunrise: warm light spreading outward,
 * gradually sharpening into a beautiful, vivid cinematic image.
 *
 *   Stage 1 (0→35%)  — warm golden haze: blur + warm sepia, low opacity
 *   Stage 2 (35→65%) — dawn light spreads: opacity ↑, blur ↓, color emerges
 *   Stage 3 (65→100%) — full sacred light: vivid color, sharp, warm glow
 */
const sunriseReveal: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(8px) sepia(60%) saturate(0.4) brightness(1.15)',
    scale: 1.05,
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px) sepia(0%) saturate(1) brightness(1)',
    scale: 1,
    transition: {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 1.6,
        ease: 'easeOut',
      },
      filter: {
        duration: 2.4,
        ease: 'easeOut',
      },
      scale: {
        duration: 2.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
};

/** Scene label ("Scene IV") — appears with warm gentle dissolve */
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
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Scene title — warm dissolve, slightly slower than other scenes */
const titleFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: 'blur(3px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Decorative divider — draws from center outward, warmer glow */
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

/** Quote text — warm dissolve, like words settling in sacred light */
const quoteFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 2.0,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 2.2,
        ease: 'easeOut',
      },
      filter: {
        duration: 1.6,
        ease: 'easeOut',
      },
    },
  },
};

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
      className="template-p1 nauka-paper nauka-grain nauka-vignette relative w-full min-h-dvh overflow-hidden flex flex-col items-center justify-center"
      style={{
        // Warmer background than other scenes — slightly more golden tint
        // Other scenes use #F5F0E8; this leans warmer, like dawn light on parchment
        background:
          'linear-gradient(170deg, #F7F1E4 0%, #F5EFE3 25%, #F4EDE0 50%, #F3ECE0 75%, #F5F0E6 100%)',
      }}
    >
      {/* ── Warm ambient light layers ──
          This scene has MORE warm light than other scenes.
          The feeling: sacred warmth radiating from the center,
          like the first light after a promise is fulfilled.
          Multiple layers create a warm, breathing atmosphere. */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: [
            // Primary warm glow — center, like sacred light from the image
            'radial-gradient(ellipse 60% 45% at 50% 40%, rgba(212, 186, 130, 0.08) 0%, transparent 55%)',
            // Secondary warm wash — broader ambient warmth filling the scene
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(198, 167, 105, 0.05) 0%, transparent 60%)',
            // Tertiary warm glow — subtle, from below, like warmth rising
            'radial-gradient(ellipse 70% 40% at 50% 85%, rgba(198, 167, 105, 0.04) 0%, transparent 50%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* ── Breathing sacred warm glow ──
          A subtle pulse that makes the scene feel alive and sacred,
          like the warmth of a fulfilled promise breathing gently */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 35% at 50% 40%, rgba(212, 186, 130, 0.07) 0%, transparent 60%)',
          animation: 'naukaBreathLight 7s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 flex flex-col items-center">
        {/* ── Scene Image — faceless wedding silhouette ──
            Takes up ~50-55% of the visual space.
            Sunrise reveal: warm golden blur → vivid cinematic.
            Surrounded by extra warm sacred glow. */}
        <motion.div
          className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px]"
          variants={sunriseReveal}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div
            className="relative overflow-hidden rounded-lg md:rounded-xl"
            style={{
              aspectRatio: '606 / 396',
              boxShadow:
                '0 2px 8px rgba(28,28,28,0.03), 0 8px 24px rgba(28,28,28,0.05), 0 20px 48px rgba(28,28,28,0.03)',
            }}
          >
            <Image
              src="/template/premium-1/scene-4.webp"
              alt="Bride and groom sitting together bathed in warm sacred light, the moment of a promise fulfilled"
              fill
              sizes="(max-width: 640px) 85vw, (max-width: 768px) 450px, 500px"
              className="object-cover"
              priority={false}
            />

            {/* Warm cinematic overlay — sacred warm light on the image
                More prominent than other scenes to convey warmth */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: [
                  // Warm glow from bottom — like sacred light rising
                  'linear-gradient(0deg, rgba(198,167,105,0.07) 0%, transparent 45%)',
                  // Soft warm cast from top — like dawn light filtering in
                  'linear-gradient(180deg, rgba(212,186,130,0.04) 0%, transparent 30%)',
                ].join(', '),
              }}
              aria-hidden="true"
            />

            {/* Extra sacred warm glow — concentrated warm light
                radiating from center, like a blessing on the scene */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(198,167,105,0.05) 0%, transparent 65%)',
              }}
              aria-hidden="true"
            />
          </div>

          {/* ── Sacred light halo around the image ──
              Extra warm ambient glow radiating outward from the image,
              like sacred light emanating from the fulfilled promise.
              This is what makes Scene4 feel distinctly warmer. */}
          <div
            className="pointer-events-none absolute inset-[-15%] -z-10"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(212, 186, 130, 0.10) 0%, rgba(198, 167, 105, 0.04) 35%, transparent 65%)',
              animation: 'naukaBreathLight 9s ease-in-out infinite',
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Scene Label — "Scene IV" ──
            Appears when image is beginning its warm reveal */}
        <motion.div
          className="mt-10 sm:mt-12 md:mt-14 flex flex-col items-center gap-3"
          variants={labelFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 1.4 }}
        >
          <span
            className="font-serif text-[10px] tracking-[0.3em] uppercase sm:text-xs"
            style={{ color: 'var(--p1-gold-dim, #8A7444)' }}
          >
            Scene IV
          </span>
        </motion.div>

        {/* ── Scene Title — small caps ──
            Warm dissolve — appears as the image sharpens */}
        <motion.div
          className="mt-2 flex flex-col items-center gap-3"
          variants={titleFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 1.8 }}
        >
          <h2
            className="font-serif text-lg font-medium tracking-wide sm:text-xl md:text-2xl"
            style={{ color: 'var(--p1-warm-brown, #6B5B4A)' }}
          >
            <span style={{ fontVariant: 'small-caps' }}>
              Hari Yang Dijanjikan
            </span>
          </h2>

          {/* Decorative gold divider — draws from center
              Slightly warmer glow on the divider for this scene */}
          <motion.div
            className="h-[1px] w-[60px] origin-center"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--p1-gold-light, #D4BA82), transparent)',
            }}
            variants={dividerDraw}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 2.2 }}
          />
        </motion.div>

        {/* ── Quote text — italic serif ──
            Fades in with warm dissolve after title has settled.
            The words carry the emotional weight — when ijab kabul
            is spoken, everything changes. Breathing text effect
            via p1TextBreathe keyframe, but gentler. */}
        <motion.div
          className="mt-8 sm:mt-10 md:mt-12 px-2 sm:px-4 text-center max-w-md"
          variants={quoteFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 2.6 }}
        >
          {/* Decorative opening quotation mark */}
          <span
            className="mb-3 block font-serif text-2xl leading-none sm:text-3xl"
            style={{ color: 'var(--p1-gold-light, #D4BA82)', opacity: 0.45 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote>
            <p
              className="font-serif italic text-sm leading-[2] tracking-wide sm:text-[15px] sm:leading-[2.1] md:text-base"
              style={{
                color: 'var(--p1-warm-brown, #6B5B4A)',
                animation: 'p1TextBreathe 9s ease-in-out infinite',
              }}
            >
              Ketika ijab kabul terucap,
              <br />
              segalanya berubah.
            </p>
          </blockquote>

          {/* Decorative closing quotation mark */}
          <span
            className="mt-3 block font-serif text-2xl leading-none sm:text-3xl"
            style={{ color: 'var(--p1-gold-light, #D4BA82)', opacity: 0.45 }}
            aria-hidden="true"
          >
            &rdquo;
          </span>
        </motion.div>
      </div>

      {/* ── Bottom edge — soft warm fade into next scene ──
          Warmer tint than other scenes to maintain the sacred glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(245,239,227,0.5) 50%, rgba(245,239,227,1) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Top edge — soft warm fade from previous scene ── */}
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
