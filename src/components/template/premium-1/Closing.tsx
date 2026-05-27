'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useEffect } from 'react';

/* ──────────────────────────────────────────────────────────────
   Closing — "Terima kasih telah menungguku dalam ketaatan."
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Concept: Warm emotional ending. Returning to the opening's
   darkness, completing the circle. Intimate, breathing, final.

   Composition:
   • Warm dark background (#2A2420) — mirroring Opening
   • Closing quote in Playfair Display italic, warm gold
   • Couple names: "Arka & Dyana" below
   • Gold ornamental divider above names
   • "Nauka" brand mark at very bottom, subtle
   • Subtle candle/warm glow breathing (same as Opening, more subtle)

   Animation:
   • Text fades in with blur dissolve
   • Gold divider draws from center
   • Subtle warm glow breathing
   ────────────────────────────────────────────────────────────── */

// ── Animation variants ──────────────────────────────────────────

const quoteFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: 'blur(6px)',
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
        duration: 1.6,
        ease: 'easeOut',
      },
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
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const namesFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 1.6,
        ease: 'easeOut',
      },
      filter: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  },
};

const brandFadeIn: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(2px)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ── Component ───────────────────────────────────────────────────

export default function Closing() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-10% 0px -10% 0px',
  });

  // PRIORITY 8: Lingering fade — barely perceptible opacity shift after 5s
  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      const el = document.getElementById('closing-content');
      if (el) {
        el.style.transition = 'opacity 4s ease-out';
        el.style.opacity = '0.85';
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="template-p1 template-p1-dark relative w-full min-h-dvh overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: '#2A2420' }}
    >
      {/* ─── Candle ambience glow ───
          Same as Opening but even more subtle — like the final
          flicker before the credits roll */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 45% 35% at 50% 30%, rgba(198, 167, 105, 0.06) 0%, rgba(198, 167, 105, 0.02) 40%, transparent 70%)',
          animation: 'p1CandleAmbience 7s ease-in-out infinite',
        }}
      />

      {/* Secondary warm wash — broader, softer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(198, 167, 105, 0.03) 0%, transparent 60%)',
          animation: 'p1CandleAmbience 9s ease-in-out 2s infinite',
        }}
      />

      {/* Warm ambient drift — very subtle shifting warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 35% 25% at 48% 50%, rgba(198, 167, 105, 0.025) 0%, transparent 55%)',
          animation: 'p1WarmDrift 14s ease-in-out infinite',
        }}
      />

      {/* ─── Paper texture overlay ─── */}
      <div className="nauka-paper absolute inset-0 pointer-events-none" />

      {/* ─── Subtle warm vignette ───
          Stronger than ivory sections — dark scene, edge darkening for intimacy */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 45%, transparent 30%, rgba(20, 16, 12, 0.35) 100%)',
        }}
      />

      {/* ─── Very subtle film grain ───
          Slightly more visible on dark background for analog feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.05 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* ─── Content ───
          Vertically centered, sequential reveal with generous breathing room
          PRIORITY 8: Lingering fade — see useEffect above */}
      <div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 sm:py-28 md:py-36"
        id="closing-content"
      >
        {/* ── Closing quote ──
            Blur dissolve — words settling into the darkness */}
        <motion.div
          className="flex flex-col items-center text-center max-w-md"
          variants={quoteFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Decorative opening quotation mark */}
          <span
            className="mb-4 block font-serif text-3xl leading-none sm:text-4xl"
            style={{ color: 'rgba(198, 167, 105, 0.35)' }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote>
            <p
              className="font-serif italic text-base leading-[2] tracking-wide sm:text-lg sm:leading-[2.1] md:text-xl"
              style={{
                color: 'rgba(212, 186, 130, 0.85)',
                textShadow: '0 0 30px rgba(198, 167, 105, 0.1)',
                animation: 'p1TextBreathe 8s ease-in-out infinite',
              }}
            >
              Terima kasih telah menungguku dalam ketaatan.
            </p>
          </blockquote>

          {/* Decorative closing quotation mark */}
          <span
            className="mt-4 block font-serif text-3xl leading-none sm:text-4xl"
            style={{ color: 'rgba(198, 167, 105, 0.35)' }}
            aria-hidden="true"
          >
            &rdquo;
          </span>
        </motion.div>

        {/* ── Gold ornamental divider ──
            Draws from center — elegant transition from quote to names */}
        <motion.div
          className="my-10 sm:my-14 md:my-16"
          style={{ originX: '50%', originY: '50%' }}
          variants={dividerDraw}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 1.4 }}
        >
          {/* Main divider line */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: '80px' }}
          >
            {/* Left taper */}
            <div
              className="absolute left-0 h-[1px]"
              style={{
                width: '35px',
                background:
                  'linear-gradient(to right, transparent, rgba(198, 167, 105, 0.5))',
              }}
            />
            {/* Center diamond */}
            <div
              className="relative z-10"
              style={{
                width: '6px',
                height: '6px',
                transform: 'rotate(45deg)',
                backgroundColor: 'rgba(198, 167, 105, 0.5)',
              }}
            />
            {/* Right taper */}
            <div
              className="absolute right-0 h-[1px]"
              style={{
                width: '35px',
                background:
                  'linear-gradient(to left, transparent, rgba(198, 167, 105, 0.5))',
              }}
            />
          </div>
        </motion.div>

        {/* ── Couple names ──
            Fade in with blur dissolve after divider appears */}
        <motion.div
          className="flex flex-col items-center gap-1 sm:gap-2"
          variants={namesFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 2.0 }}
        >
          <h3
            className="font-serif italic text-3xl sm:text-4xl md:text-5xl leading-tight tracking-wide"
            style={{
              color: 'rgba(212, 186, 130, 0.7)',
              textShadow: '0 0 20px rgba(198, 167, 105, 0.08)',
            }}
          >
            Arka
          </h3>
          <span
            className="font-serif italic text-xl sm:text-2xl md:text-3xl"
            style={{
              color: 'rgba(198, 167, 105, 0.5)',
            }}
          >
            &amp;
          </span>
          <h3
            className="font-serif italic text-3xl sm:text-4xl md:text-5xl leading-tight tracking-wide"
            style={{
              color: 'rgba(212, 186, 130, 0.7)',
              textShadow: '0 0 20px rgba(198, 167, 105, 0.08)',
            }}
          >
            Dyana
          </h3>
        </motion.div>

        {/* ── Arabic blessing text (PRIORITY 8) ──
            Between names and brand mark. Very small, warm gold at low opacity,
            with blur dissolve. Like a whispered blessing. */}
        <motion.div
          className="mt-8 sm:mt-10 flex flex-col items-center"
          initial={{ opacity: 0, filter: 'blur(3px)' }}
          animate={isInView ? { opacity: 0.25, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(3px)' }}
          transition={{ delay: 2.4, duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-serif select-none leading-relaxed"
            style={{
              color: 'rgba(212, 186, 130, 1)',
              fontSize: 'clamp(10px, 2vw, 12px)',
              letterSpacing: '0.05em',
            }}
            dir="rtl"
            lang="ar"
          >
            بارك الله لكما وبارك عليكما وجمع بينكما في خير
          </p>
        </motion.div>

        {/* ── "Nauka" brand mark ──
            Very subtle — barely there, like a watermark.
            The last thing you see before it fades to black. */}
        <motion.div
          className="mt-16 sm:mt-20 md:mt-24"
          variants={brandFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 2.8 }}
        >
          <p
            className="font-serif text-[10px] tracking-[0.3em] uppercase select-none"
            style={{
              color: 'rgba(198, 167, 105, 0.18)',
            }}
          >
            Nauka
          </p>
        </motion.div>

        {/* ── Warm embers (PRIORITY 8) ──
            3-4 tiny warm dots at the bottom that very slowly float upward,
            like the last warm embers of a candle */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`ember-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${35 + i * 10}%`,
                bottom: '8%',
                width: '1px',
                height: '1px',
                backgroundColor: 'rgba(198, 167, 105, 0.5)',
                animation: `p1EmberFloat ${8 + i * 2}s ease-in-out ${i * 1.5}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ─── Bottom warm gradient ───
          Fades into absolute darkness — the final frame */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '25%',
          background:
            'linear-gradient(180deg, transparent 0%, rgba(26, 20, 16, 0.4) 100%)',
        }}
      />

      {/* ─── Top warm gradient ───
          Soft transition from the ivory section above */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: '80px',
          background:
            'linear-gradient(0deg, transparent 0%, rgba(42, 36, 32, 0.6) 50%, rgba(42, 36, 32, 1) 100%)',
        }}
      />
    </section>
  );
}
