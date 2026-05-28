'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* ──────────────────────────────────────────────────────────────
   T5: HandwritingText — Mask Reveal (Irwan-Anira style)
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Core technique: clip-path: inset() horizontal mask wipe.
   The entire line is revealed from left to right — like watching
   someone write in real-time. No per-letter stagger.

   Key principles from Irwan-Anira:
   - clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)
   - Soft pacing: reveal speed proportional to text length
   - Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) — natural deceleration
   - Word-boundary pauses: longer gaps between lines that end with
     punctuation (periods = biggest pause, commas = medium)

   NO gold lines, NO progress indicators, NO UI decorations.
   Just clean mask reveal — like natural handwriting.
   ────────────────────────────────────────────────────────────── */

const EASE_NATURAL = [0.25, 0.46, 0.45, 0.94] as const;

// Word-boundary pause multipliers (adapted from Irwan-Anira)
// These affect the GAP between sequential line reveals
const PAUSE_AFTER_PERIOD = 2.5;    // biggest pause — sentence end
const PAUSE_AFTER_COMMA = 1.5;     // medium pause — clause end
const PAUSE_NORMAL = 1.0;          // standard gap between lines

// Overlap factor: next line starts when previous is ~50% revealed
// This creates a natural cascading effect like continuous writing
const OVERLAP_FACTOR = 0.5;

interface HandwritingTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  charDelay?: number;   // base timing unit for reveal speed
  startDelay?: number;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'div';
  onComplete?: () => void;
  inView?: boolean; // external inView control — if provided, overrides internal useInView
}

/**
 * Calculate reveal duration for a line of text.
 * Irwan-Anira reference: 2.5s for 13 chars hero = ~0.19s/char
 * Story descriptions: stagger 0.05 + charDuration 0.16 ≈ ~0.08-0.12s effective/char
 * For mask reveal (smoother than per-char), we use ~0.10s/char base rate.
 *
 * Formula: min(4.0, max(1.5, textLength × charDelay × 2.0))
 * - charDelay=0.05 → ~0.10s per char (matches Irwan-Anira story pacing)
 * - charDelay=0.06 → ~0.12s per char (slower, for heavy moments)
 * - charDelay=0.04 → ~0.08s per char (faster, for payoff)
 * - Capped at 4.0s max to prevent very long lines from taking forever
 */
export function calcRevealDuration(text: string, charDelay: number): number {
  return Math.min(4.0, Math.max(1.5, text.length * charDelay * 2.0));
}

export default function HandwritingText({
  text,
  className = '',
  style = {},
  charDelay = 0.05,
  startDelay = 0,
  as: Tag = 'p',
  onComplete,
  inView: externalInView,
}: HandwritingTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const internalInView = useInView(ref, { once: true, margin: '-5% 0px -5% 0px' });

  // Use external inView if provided, otherwise fall back to internal useInView
  const isInView = externalInView !== undefined ? externalInView : internalInView;

  const revealDuration = calcRevealDuration(text, charDelay);

  // Total duration for onComplete callback
  const totalDuration = startDelay + revealDuration + 0.3;

  if (isInView && onComplete) {
    setTimeout(onComplete, totalDuration * 1000);
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, position: 'relative', display: 'inline' }}
    >
      {/* ── Clip-path mask reveal ──
          inset(0 100% 0 0) = fully clipped from right → hidden
          inset(0 0% 0 0) = no clip → visible
          Smooth left-to-right wipe = text "ditarik dari samping" */}
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
          ease: EASE_NATURAL,
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Utility: Calculate line gap with word-boundary pauses

   Used by parent components to determine the delay gap
   between sequential HandwritingText lines.

   Adapted from Irwan-Anira word-boundary logic:
   - Normal line: PAUSE_NORMAL × baseGap
   - Line ending with comma: PAUSE_AFTER_COMMA × baseGap
   - Line ending with period: PAUSE_AFTER_PERIOD × baseGap
   ────────────────────────────────────────────────────────────── */

export function getLineGap(text: string, baseGap: number): number {
  const trimmed = text.trimEnd();
  const lastChar = trimmed[trimmed.length - 1];

  if (lastChar === '.' || lastChar === '!' || lastChar === '?') {
    return baseGap * PAUSE_AFTER_PERIOD;
  }
  if (lastChar === ',' || lastChar === ';' || lastChar === ':') {
    return baseGap * PAUSE_AFTER_COMMA;
  }
  if (lastChar === '—' || lastChar === '–') {
    return baseGap * PAUSE_AFTER_COMMA;
  }
  return baseGap * PAUSE_NORMAL;
}

/**
 * Calculate sequential line delays with overlap.
 * Each line starts when the previous line is ~50% revealed, plus a
 * punctuation-based pause. This creates a natural cascading writing effect
 * without making the total animation time too long.
 *
 * @param lines - Array of text lines
 * @param charDelay - Base timing unit (same as HandwritingText charDelay)
 * @param baseDelay - Initial delay before first line starts
 * @param pauseGap - Base gap between lines (multiplied by punctuation factor)
 * @returns Array of startDelay values for each line
 */
export function calcLineDelays(
  lines: string[],
  charDelay: number,
  baseDelay: number,
  pauseGap: number
): number[] {
  const delays: number[] = [baseDelay];
  for (let i = 1; i < lines.length; i++) {
    const prevReveal = calcRevealDuration(lines[i - 1], charDelay);
    const pause = getLineGap(lines[i - 1], pauseGap);
    delays.push(delays[i - 1] + prevReveal * OVERLAP_FACTOR + pause);
  }
  return delays;
}

/**
 * Calculate total animation duration for a set of lines.
 * Useful for determining when to resume auto-scroll.
 */
export function calcTotalAnimDuration(
  lines: string[],
  charDelay: number,
  baseDelay: number,
  pauseGap: number
): number {
  const delays = calcLineDelays(lines, charDelay, baseDelay, pauseGap);
  const lastReveal = calcRevealDuration(lines[lines.length - 1], charDelay);
  return delays[delays.length - 1] + lastReveal + 0.5; // +0.5s buffer
}
