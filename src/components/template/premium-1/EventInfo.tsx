'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   EventInfo — "Informasi Acara"
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Concept: Clear and elegant event information. Minimalist,
   readable, warm. No excessive cards or dashboard feel.
   This section should feel like it belongs in the same
   emotional world as the story scenes.

   Layout (mobile-first):
   • Warm ivory background (#F5F0E8)
   • "Informasi Acara" title in Playfair Display
   • Two event blocks, stacked vertically
   • Each block: event type label (gold caps), date (serif bold),
     time, venue (italic), small location dot icon
   • Subtle gold divider between blocks
   • Generous whitespace throughout
   • Gold ornamental divider at top and bottom
   • Optional "Lokasi" styled link text

   Animation sequence (scroll-triggered):
   1. Title appears with blur-to-sharp
   2. First event block fades in
   3. Second event block fades in with slight delay
   4. Subtle warm ambient glow breathing
   ────────────────────────────────────────────────────────────── */

// ── Event Data (hardcoded) ────────────────────────────────────

interface EventData {
  type: string;
  date: string;
  time: string;
  venue: string;
}

const events: EventData[] = [
  {
    type: 'Akad Nikah',
    date: 'Minggu, 28 Desember 2025',
    time: '08:00 - 10:00 WIB',
    venue: 'Masjid Al-Ikhlas, Jakarta Selatan',
  },
  {
    type: 'Resepsi',
    date: 'Minggu, 28 Desember 2025',
    time: '11:00 - 14:00 WIB',
    venue: 'Graha Sabha, Jakarta Selatan',
  },
];

// ── Animation Variants ────────────────────────────────────────

/** Title reveal — gentle blur-to-sharp with subtle rise */
const titleReveal: Variants = {
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
      filter: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  },
};

/** Gold ornamental divider — draws from center outward */
const ornamentalDivider: Variants = {
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

/** Event block — fades in with gentle rise and blur-to-sharp */
const eventBlockReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(3px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 1.4,
        ease: 'easeOut',
      },
      filter: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  },
};

/** Separator line between blocks — draws from center */
const separatorDraw: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Location link — subtle fade in */
const linkFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ── Ornamental SVG Divider ────────────────────────────────────

function GoldOrnamentalDivider({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="flex items-center justify-center gap-3"
      variants={ornamentalDivider}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay }}
      style={{ transformOrigin: 'center' }}
    >
      {/* Left fading line */}
      <div
        className="h-[1px] w-12 sm:w-16"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--p1-gold, #C6A769))',
        }}
      />
      {/* Center diamond ornament */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
          fill="var(--p1-gold, #C6A769)"
          opacity="0.6"
        />
      </svg>
      {/* Right fading line */}
      <div
        className="h-[1px] w-12 sm:w-16"
        style={{
          background:
            'linear-gradient(to left, transparent, var(--p1-gold, #C6A769))',
        }}
      />
    </motion.div>
  );
}

// ── Location Dot Icon ─────────────────────────────────────────

function LocationDot() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 mt-1"
    >
      <circle
        cx="4"
        cy="4"
        r="3"
        fill="var(--p1-gold, #C6A769)"
        opacity="0.5"
      />
      <circle
        cx="4"
        cy="4"
        r="1.5"
        fill="var(--p1-gold, #C6A769)"
        opacity="0.8"
      />
    </svg>
  );
}

// ── Event Block ───────────────────────────────────────────────

function EventBlock({
  event,
  delay = 0,
}: {
  event: EventData;
  delay?: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-center text-center gap-3 sm:gap-4"
      variants={eventBlockReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay }}
    >
      {/* Event type label — small gold caps */}
      <span
        className="font-serif text-[10px] tracking-[0.3em] uppercase sm:text-xs"
        style={{ color: 'var(--p1-gold, #C6A769)' }}
      >
        {event.type}
      </span>

      {/* Date — serif, bold */}
      <h3
        className="font-serif text-lg font-semibold tracking-wide sm:text-xl md:text-2xl"
        style={{ color: 'var(--p1-warm-brown, #6B5B4A)' }}
      >
        {event.date}
      </h3>

      {/* Time — sans-serif, muted */}
      <p
        className="font-sans text-sm tracking-wider sm:text-[15px]"
        style={{ color: 'var(--p1-muted, #6B6B6B)' }}
      >
        {event.time}
      </p>

      {/* Venue — italic serif with location dot */}
      <div className="flex items-start gap-2 justify-center">
        <LocationDot />
        <p
          className="font-serif italic text-sm sm:text-[15px] leading-relaxed"
          style={{ color: 'var(--p1-taupe, #8B7D6B)' }}
        >
          {event.venue}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────

export default function EventInfo() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-10% 0px -10% 0px',
  });

  return (
    <section
      ref={sectionRef}
      data-section="event-info"
      className="template-p1 nauka-paper nauka-grain nauka-vignette relative w-full overflow-hidden"
      style={{
        background:
          'linear-gradient(170deg, #F5F0E8 0%, #F2EDE4 40%, #F5F0E8 70%, #F0EBE1 100%)',
      }}
    >
      {/* ── Warm ambient light layers ──
          Center-focused warm glow, like lamplight in a quiet room.
          Breathing animation makes it feel alive. */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: [
            'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(198,167,105,0.05) 0%, transparent 55%)',
            'radial-gradient(ellipse 50% 35% at 50% 70%, rgba(198,167,105,0.04) 0%, transparent 50%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* ── Breathing ambient warm glow ──
          Subtle pulse that makes the section feel warm and alive */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 35% at 50% 50%, rgba(198,167,105,0.04) 0%, transparent 60%)',
          animation: 'naukaBreathLight 8s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 mx-auto w-full max-w-xl px-6 py-20 sm:px-8 sm:py-28 md:px-12 md:py-36 flex flex-col items-center">
        {/* ── Top ornamental divider ── */}
        <GoldOrnamentalDivider />

        {/* ── Section title ── */}
        <motion.div
          className="mt-10 sm:mt-14 mb-12 sm:mb-16 flex flex-col items-center gap-4"
          variants={titleReveal}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span
            className="font-serif text-[10px] tracking-[0.3em] uppercase sm:text-xs"
            style={{ color: 'var(--p1-gold-dim, #8A7444)' }}
          >
            Waktu & Tempat
          </span>

          <h2
            className="font-serif text-2xl font-medium tracking-wide sm:text-3xl md:text-4xl"
            style={{ color: 'var(--p1-warm-brown, #6B5B4A)' }}
          >
            <span style={{ fontVariant: 'small-caps' }}>
              Informasi Acara
            </span>
          </h2>

          {/* Subtle title underline */}
          <motion.div
            className="h-[1px] w-[60px] origin-center"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--p1-gold, #C6A769), transparent)',
            }}
            variants={separatorDraw}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.4 }}
          />
        </motion.div>

        {/* ── Event blocks ── */}
        <div className="flex flex-col items-center gap-10 sm:gap-14 w-full">
          {/* First event — Akad Nikah */}
          <EventBlock event={events[0]} delay={0.6} />

          {/* Gold separator between events */}
          <motion.div
            className="flex items-center gap-4"
            variants={separatorDraw}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 1.2 }}
            style={{ transformOrigin: 'center' }}
          >
            <div
              className="h-[1px] w-10 sm:w-14"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(198,167,105,0.3))',
              }}
            />
            {/* Small ornamental dot */}
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                backgroundColor: 'var(--p1-gold, #C6A769)',
                opacity: 0.4,
              }}
            />
            <div
              className="h-[1px] w-10 sm:w-14"
              style={{
                background:
                  'linear-gradient(to left, transparent, rgba(198,167,105,0.3))',
              }}
            />
          </motion.div>

          {/* Second event — Resepsi */}
          <EventBlock event={events[1]} delay={1.6} />

          {/* Optional "Lokasi" styled link */}
          <motion.div
            className="mt-4 sm:mt-6"
            variants={linkFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 2.2 }}
          >
            <span
              className="font-serif italic text-xs tracking-widest uppercase sm:text-sm nauka-link-reveal cursor-pointer select-none"
              style={{ color: 'var(--p1-gold, #C6A769)' }}
              role="button"
              tabIndex={0}
              aria-label="Lihat lokasi di peta"
            >
              Lihat Lokasi
            </span>
          </motion.div>
        </div>

        {/* ── Bottom ornamental divider ── */}
        <div className="mt-14 sm:mt-20">
          <GoldOrnamentalDivider delay={2.6} />
        </div>
      </div>

      {/* ── Top edge — soft fade from previous scene ── */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-16"
        style={{
          background:
            'linear-gradient(0deg, transparent 0%, rgba(245,240,232,0.5) 50%, rgba(245,240,232,1) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Bottom edge — soft fade into next scene ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(245,240,232,0.5) 50%, rgba(245,240,232,1) 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
