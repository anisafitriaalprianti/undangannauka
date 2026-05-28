'use client';

import { useInView } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';

/* ──────────────────────────────────────────────────────────────
   T5: HandwritingText — Mask Reveal (Irwan-Anira style)
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Core technique: clip-path: inset() horizontal mask wipe.
   Revealed from left to right — like watching someone write.

   IMPORTANT: We use CSS transition instead of Framer Motion
   for the clip-path animation. Reason: Framer Motion's animate
   prop can conflict with the style prop on re-render, causing
   the clip-path to reset mid-animation and text to disappear.
   CSS transitions are managed by the browser's compositor and
   are completely independent of React's render cycle.

   Key principles from Irwan-Anira:
   - clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)
   - Soft pacing: reveal speed proportional to text length
   - Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
   - Word-boundary pauses via startDelay

   NO gold lines, NO progress indicators, NO UI decorations.
   ────────────────────────────────────────────────────────────── */

const EASE_CSS = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

// Word-boundary pause multipliers (adapted from Irwan-Anira)
const PAUSE_AFTER_PERIOD = 2.5;
const PAUSE_AFTER_COMMA = 1.5;
const PAUSE_NORMAL = 1.0;

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
  inView?: boolean;
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
  const isInView = externalInView !== undefined ? externalInView : internalInView;

  // Track reveal state — starts hidden, becomes true after isInView + rAF
  // The rAF ensures the browser has painted the hidden state before we transition
  const [shouldReveal, setShouldReveal] = useState(false);
  const [hasFiredComplete, setHasFiredComplete] = useState(false);

  const revealDuration = calcRevealDuration(text, charDelay);

  // When inView becomes true, wait one frame then start the CSS transition
  useEffect(() => {
    if (isInView && !shouldReveal) {
      const raf = requestAnimationFrame(() => {
        setShouldReveal(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isInView, shouldReveal]);

  // onComplete callback — fires once after animation finishes
  const handleComplete = useCallback(() => {
    if (onComplete && !hasFiredComplete) {
      setHasFiredComplete(true);
      onComplete();
    }
  }, [onComplete, hasFiredComplete]);

  useEffect(() => {
    if (shouldReveal && onComplete && !hasFiredComplete) {
      const timer = setTimeout(handleComplete, (startDelay + revealDuration + 0.3) * 1000);
      return () => clearTimeout(timer);
    }
  }, [shouldReveal, handleComplete, hasFiredComplete, startDelay, revealDuration]);

  // CSS transition handles the clip-path animation
  // The browser manages this independently of React re-renders
  const clipPathStyle: React.CSSProperties = shouldReveal
    ? {
        clipPath: 'inset(0 0% 0 0)',
        transition: `clip-path ${revealDuration}s ${EASE_CSS} ${startDelay}s`,
      }
    : {
        clipPath: 'inset(0 100% 0 0)',
        transition: 'none', // no transition for initial hidden state
      };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, position: 'relative', display: 'inline' }}
    >
      <span
        style={{
          display: 'inline',
          ...clipPathStyle,
        }}
      >
        {text}
      </span>
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
