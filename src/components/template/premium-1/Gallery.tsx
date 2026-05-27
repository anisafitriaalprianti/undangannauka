'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   Gallery — "Galeri"
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Concept: Simple cinematic gallery. No heavy masonry chaos.
   Focus on atmosphere, spacing, elegance.

   Composition:
   • Warm ivory background (#F5F0E8)
   • "Galeri" title in Playfair Display
   • Grid of 6 placeholder images (colored divs with warm tones)
   • 2 columns mobile, 3 columns desktop
   • 3:4 aspect ratio for portrait feel
   • Subtle rounded corners, gentle shadow, warm border
   • Generous gap between items
   • Hover: slight scale(1.02) and warmer shadow

   Animation: Scroll-triggered fade in with stagger
   ────────────────────────────────────────────────────────────── */

// ── Animation variants ──────────────────────────────────────────

const titleFadeIn: Variants = {
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
      duration: 1.2,
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

const galleryItemFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: 'blur(4px)',
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ── Gallery placeholder data ────────────────────────────────────
// Warm cinematic tones — each placeholder has a unique warm hue
const galleryItems = [
  {
    id: 1,
    bg: 'linear-gradient(145deg, #E8D5B7 0%, #D4BA82 50%, #C6A769 100%)',
    label: 'Moment I',
  },
  {
    id: 2,
    bg: 'linear-gradient(145deg, #D5C4A8 0%, #C9B896 50%, #B8A47E 100%)',
    label: 'Moment II',
  },
  {
    id: 3,
    bg: 'linear-gradient(145deg, #E2CEB0 0%, #D8C0A0 50%, #CDB090 100%)',
    label: 'Moment III',
  },
  {
    id: 4,
    bg: 'linear-gradient(145deg, #DCD0C0 0%, #CFC3B0 50%, #C0B4A0 100%)',
    label: 'Moment IV',
  },
  {
    id: 5,
    bg: 'linear-gradient(145deg, #E0D2BC 0%, #D6C8AE 50%, #CAB89C 100%)',
    label: 'Moment V',
  },
  {
    id: 6,
    bg: 'linear-gradient(145deg, #D8C8AE 0%, #CEBC9E 50%, #C0AE90 100%)',
    label: 'Moment VI',
  },
];

// ── Component ───────────────────────────────────────────────────

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-10% 0px -10% 0px',
  });

  return (
    <section
      ref={sectionRef}
      className="template-p1 nauka-paper nauka-grain nauka-vignette relative w-full overflow-hidden"
      style={{ backgroundColor: '#F5F0E8' }}
    >
      {/* ── Warm ambient light layers ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: [
            'radial-gradient(ellipse 60% 40% at 50% 10%, rgba(198,167,105,0.05) 0%, transparent 55%)',
            'radial-gradient(ellipse 50% 35% at 30% 80%, rgba(198,167,105,0.03) 0%, transparent 50%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* ── Breathing ambient warm glow ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 30% at 50% 50%, rgba(198,167,105,0.04) 0%, transparent 60%)',
          animation: 'naukaBreathLight 8s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-20 sm:px-8 sm:py-28 md:px-12 md:py-36">
        {/* ── Section title ── */}
        <motion.div
          className="mb-14 flex flex-col items-center gap-4 sm:mb-20"
          variants={titleFadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span
            className="font-serif text-[10px] tracking-[0.3em] uppercase sm:text-xs"
            style={{ color: 'var(--p1-gold-dim, #8A7444)' }}
          >
            Momen Kami
          </span>

          <h2
            className="font-serif text-2xl font-medium tracking-wide sm:text-3xl md:text-4xl"
            style={{ color: 'var(--p1-warm-brown, #6B5B4A)' }}
          >
            <span className="italic">Galeri</span>
          </h2>

          {/* Gold divider — draws from center */}
          <motion.div
            className="h-[1px] w-[60px] origin-center"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--p1-gold, #C6A769), transparent)',
            }}
            variants={dividerDraw}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.4 }}
          />
        </motion.div>

        {/* ── Gallery grid ──
            2 columns on mobile, 3 columns on desktop.
            Generous gaps, portrait aspect ratio, subtle shadows */}
        <div className="grid grid-cols-2 gap-5 sm:gap-8 md:grid-cols-3 md:gap-10">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group cursor-pointer"
              variants={galleryItemFadeIn}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.6 + index * 0.15 }}
            >
              <div
                className="relative overflow-hidden rounded-lg md:rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                style={{
                  aspectRatio: '3 / 4',
                  background: item.bg,
                  boxShadow:
                    '0 2px 8px rgba(28,28,28,0.04), 0 8px 24px rgba(28,28,28,0.06), 0 20px 48px rgba(28,28,28,0.04)',
                  border: '1px solid rgba(198, 167, 105, 0.12)',
                }}
              >
                {/* Subtle warm overlay on hover */}
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(198,167,105,0.06) 0%, transparent 60%)',
                  }}
                  aria-hidden="true"
                />

                {/* Warmer shadow on hover — achieved through inner glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg md:rounded-xl transition-shadow duration-500"
                  style={{
                    boxShadow: 'inset 0 0 40px rgba(198,167,105,0.04)',
                  }}
                  aria-hidden="true"
                />

                {/* Placeholder label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-serif text-xs tracking-[0.2em] uppercase sm:text-sm"
                    style={{
                      color: 'rgba(107, 91, 74, 0.35)',
                    }}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Film grain texture on each item */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    opacity: 0.02,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                    mixBlendMode: 'overlay',
                  }}
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Subtle bottom note ── */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-2 sm:mt-20"
          initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 10, filter: 'blur(2px)' }
          }
          transition={{ delay: 1.8, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="h-[1px] w-[40px]"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(198,167,105,0.2), transparent)',
            }}
          />
          <span
            className="font-serif text-[10px] tracking-[0.25em] italic"
            style={{ color: 'var(--p1-muted, #6B6B6B)' }}
          >
            kenangan yang perlahan hidup
          </span>
        </motion.div>
      </div>

      {/* ── Bottom edge — soft fade into next section ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(245,240,232,0.5) 50%, rgba(245,240,232,1) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Top edge — soft fade from previous section ── */}
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
