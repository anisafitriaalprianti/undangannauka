'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

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
const PAUSE_AFTER_PERIOD = 2.5;    // biggest pause — sentence end
const PAUSE_AFTER_COMMA = 1.5;     // medium pause — clause end
const PAUSE_NORMAL = 1.0;          // standard gap between lines

// Overlap factor: next line starts when previous is ~50% revealed
const OVERLAP_FACTOR = 0.5;

interface HandwritingTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  charDelay?: number;
  startDelay?: number;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'div';
  onComplete?: () => void;
  inView?: boolean; // external inView control
}

/**
 * Calculate reveal duration for a line of text.
 * Formula: min(4.0, max(1.5, textLength × charDelay × 2.0))
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
  const [hasFiredComplete, setHasFiredComplete] = useState(false);

  // Use external inView if provided, otherwise fall back to internal useInView
  const isInView = externalInView !== undefined ? externalInView : internalInView;

  const revealDuration = calcRevealDuration(text, charDelay);

  // Total duration for onComplete callback — in useEffect to avoid re-render issues
  useEffect(() => {
    if (isInView && onComplete && !hasFiredComplete) {
      setHasFiredComplete(true);
      const timer = setTimeout(onComplete, (startDelay + revealDuration + 0.3) * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, onComplete, hasFiredComplete, startDelay, revealDuration]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, position: 'relative', display: 'inline' }}
    >
      {/* ── Clip-path mask reveal ──
          Using initial={false} so the component doesn't reset to hidden
          on re-render. Once it animates to visible, it stays visible. */}
      <motion.span
        initial={false}
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
        style={{
          display: 'inline',
          clipPath: 'inset(0 100% 0 0)',
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Utility: Calculate line gap with word-boundary pauses
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
 */
export function calcTotalAnimDuration(
  lines: string[],
  charDelay: number,
  baseDelay: number,
  pauseGap: number
): number {
  const delays = calcLineDelays(lines, charDelay, baseDelay, pauseGap);
  const lastReveal = calcRevealDuration(lines[lines.length - 1], charDelay);
  return delays[delays.length - 1] + lastReveal + 0.5;
}
