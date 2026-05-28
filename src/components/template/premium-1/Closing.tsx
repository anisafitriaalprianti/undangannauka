'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useEffect } from 'react';
import CandleFlame from './CandleFlame';

/* ──────────────────────────────────────────────────────────────
   Closing — "Terima kasih telah menungguku dalam ketaatan."
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Concept: Warm emotional ending. The last warm light before
   the credits roll. A candle burns softly — the room darkens
   around its glow, completing the circle back to the opening.

   Composition:
   • Warm dark background (#2A2420) — mirroring Opening
   • REALISTIC CANDLE FLAME with ambient light + living shadows
   • Closing quote in Playfair Display italic, warm gold
   • Couple names: "Arka & Dyana" below
   • Gold ornamental divider above names
   • Arabic doa — barely visible whisper
   • "Nauka" brand mark at very bottom, subtle

   Animation:
   • Candle appears first — flame ignites (scale from 0)
   • Text fades in with blur dissolve, lit by the candle
   • Gold divider draws from center
   • Warm glow breathing synced with flame flicker
   ────────────────────────────────────────────────────────────── */

// ── Animation variants ──────────────────────────────────────────

const candleIgnite: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 0.8,
        ease: 'easeOut',
      },
      filter: {
        duration: 1.0,
        ease: 'easeOut',
      },
    },
  },
};

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

  // Lingering fade — barely perceptible opacity shift after 6s
  // Also dispatch closing-sequence-complete so auto-scroll resumes
  useEffect(() => {
    if (!isInView) return;

    // Dispatch closing-sequence-complete after animations finish
    // This tells auto-scroll to resume (cinematic lock released)
    const completeTimer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('closing-sequence-complete'));
    }, 5000);

    const fadeTimer = setTimeout(() => {
      const el = document.getElementById('closing-content');
      if (el) {
        el.style.transition = 'opacity 4s ease-out';
        el.style.opacity = '0.85';
      }
    }, 6000);

    return () => {
      clearTimeout(completeTimer);
      clearTimeout(fadeTimer);
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      data-section="closing"
      className="template-p1 template-p1-dark relative w-full min-h-dvh overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: '#2A2420' }}
    >
      {/* ═══ CANDLE FLAME — realistic candle with ambient light + shadows ═══
          The flame ignites first, then lights up the entire scene.
          Ambient light (warm glow) + shadow play (deepening vignette)
          are handled inside CandleFlame component via Web Animation API. */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={candleIgnite}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <CandleFlame
          left="50%"
          top="18%"
          scale={1}
          visible={isInView}
        />
      </motion.div>

      {/* ─── Secondary warm wash — broader, softer, underneath everything ───
          Like the warm light filling the room from the candle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 45% 40% at 50% 35%, rgba(201, 169, 110, 0.04) 0%, transparent 65%)',
          zIndex: 1,
        }}
      />

      {/* ─── Paper texture overlay ─── */}
      <div className="nauka-paper absolute inset-0 pointer-events-none" style={{ zIndex: 2 }} />

      {/* ─── Very subtle film grain ───
          Slightly more visible on dark background for analog feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.05, zIndex: 2 }}
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
          Lit by the candle flame above */}
      <div
        className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20 sm:py-28 md:py-36"
        id="closing-content"
        style={{ zIndex: 10 }}
      >
        {/* ── Closing quote ──
            Blur dissolve — words settling into the candlelight */}
        <motion.div
          className="flex flex-col items-center text-center max-w-md"
          variants={quoteFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 1.0 }}
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
          transition={{ delay: 2.0 }}
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
          transition={{ delay: 2.6 }}
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

        {/* ── Arabic blessing text ──
            Between names and brand mark. Very small, warm gold at low opacity,
            with blur dissolve. Like a whispered blessing in the candlelight. */}
        <motion.div
          className="mt-8 sm:mt-10 flex flex-col items-center"
          initial={{ opacity: 0, filter: 'blur(3px)' }}
          animate={isInView ? { opacity: 0.25, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(3px)' }}
          transition={{ delay: 3.0, duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
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
            The last thing you see before the candle goes out. */}
        <motion.div
          className="mt-16 sm:mt-20 md:mt-24"
          variants={brandFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 3.4 }}
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

        {/* ── Warm embers ──
            Tiny warm dots at the bottom that slowly float upward,
            like the last warm embers rising from the candle */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true" style={{ zIndex: 11 }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`ember-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${35 + i * 10}%`,
                bottom: '8%',
                width: '1px',
                height: '1px',
                backgroundColor: 'rgba(201, 169, 110, 0.5)',
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
          zIndex: 5,
        }}
      />

      {/* ─── Top warm gradient ───
          Soft transition from the ivory section above */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '80px',
          background:
            'linear-gradient(0deg, transparent 0%, rgba(42, 36, 32, 0.6) 50%, rgba(42, 36, 32, 1) 100%)',
          zIndex: 5,
        }}
      />
    </section>
  );
}
