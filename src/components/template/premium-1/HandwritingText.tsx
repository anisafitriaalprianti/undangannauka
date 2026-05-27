'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';

/* ──────────────────────────────────────────────────────────────
   T1: HandwritingText — Mask Reveal (ditarik dari samping)
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Adapted from undangan-nira clip-path:inset() horizontal wipe.
   Instead of stagger-per-letter, the ENTIRE LINE is revealed
   via a sliding mask — like a curtain being pulled aside,
   or like a pen dragging across paper revealing ink.

   Technique: clip-path: inset(0 X% 0 0) where X goes from 100→0
   This wipes the text in from LEFT to RIGHT.

   Enhancements over the Irwan-Anira original:
   1. Each line reveals sequentially (story pacing)
   2. Word-boundary micro-pauses built into timing
   3. Subtle blur dissolve at the reveal edge (ink settling)
   4. Gold pen-line underline draws in sync with the mask

   Props:
   - text: string to animate
   - className: styling for the text container
   - style: inline styles
   - charDelay: not used per-char, but controls LINE reveal duration
   - startDelay: delay before this line starts revealing
   - as: HTML element tag (default 'p')
   - showPenLine: whether to show the gold underline
   ────────────────────────────────────────────────────────────── */

const EASE_CINEMA = [0.25, 0.46, 0.45, 0.94] as const;

interface HandwritingTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  charDelay?: number; // repurposed: affects reveal speed (lower = faster)
  startDelay?: number;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'div';
  onComplete?: () => void;
  showPenLine?: boolean;
}

export default function HandwritingText({
  text,
  className = '',
  style = {},
  charDelay = 0.07,
  startDelay = 0,
  as: Tag = 'p',
  onComplete,
  showPenLine = true,
}: HandwritingTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  // Calculate reveal duration based on text length
  // Longer lines = longer reveal, proportional to charDelay
  const textLength = text.length;
  const revealDuration = Math.max(1.2, textLength * charDelay * 1.5);

  // Calculate total duration for onComplete
  const totalDuration = startDelay + revealDuration + 0.5;

  if (isInView && onComplete) {
    setTimeout(onComplete, totalDuration * 1000);
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, position: 'relative', display: 'inline' }}
    >
      {/* ── Text with clip-path mask reveal ──
          clip-path: inset(0 100% 0 0) = fully hidden (100% clipped from right)
          clip-path: inset(0 0% 0 0) = fully visible (no clip)
          The mask slides from left to right — text is "pulled from the side" */}
      <motion.span
        style={{
          display: 'inline',
          clipPath: 'inset(0 100% 0 0)',
        }}
        animate={isInView ? {
          clipPath: 'inset(0 0% 0 0)',
        } : {
          clipPath: 'inset(0 100% 0 0)',
        }}
        transition={{
          delay: startDelay,
          duration: revealDuration,
          ease: EASE_CINEMA,
        }}
      >
        {text}
      </motion.span>

      {/* ── Soft blur edge at the reveal boundary ──
          A thin gradient that creates an "ink settling" effect
          at the rightmost edge of the revealed text.
          Fades in then out as the reveal progresses. */}
      <motion.span
        className="pointer-events-none"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '40px',
          background: 'linear-gradient(to right, transparent, var(--p1-ivory, #F5F0E8))',
          display: 'inline',
        }}
        initial={{ opacity: 0.7, x: '-40px' }}
        animate={isInView ? {
          opacity: [0, 0.6, 0.4, 0.2, 0],
          x: ['0%', '60%', '80%', '95%', '100%'],
        } : {
          opacity: 0,
        }}
        transition={{
          delay: startDelay,
          duration: revealDuration,
          ease: EASE_CINEMA,
        }}
        aria-hidden="true"
      />

      {/* ── Gold pen-line underline ──
          Draws from left to right in sync with the mask reveal.
          Like the trail of a pen moving across paper. */}
      {showPenLine && (
        <motion.div
          className="absolute left-0 pointer-events-none"
          style={{
            bottom: '-2px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--p1-gold, #C6A769), transparent)',
            maxWidth: '100%',
          }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: '100%' } : { width: '0%' }}
          transition={{
            delay: startDelay,
            duration: revealDuration + 0.3,
            ease: EASE_CINEMA,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
