'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';

/* ──────────────────────────────────────────────────────────────
   T5: HandwritingText — Mask Reveal (Irwan-Anira style)
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Adapted from undangan-nira story section handwriting technique.

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
// These affect the GAP between sequential line reveals,
// not per-character timing (since we use mask reveal, not per-char)
const PAUSE_AFTER_PERIOD = 2.5;    // biggest pause — sentence end
const PAUSE_AFTER_COMMA = 1.5;     // medium pause — clause end
const PAUSE_NORMAL = 1.0;          // standard gap between lines

interface HandwritingTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  charDelay?: number;   // repurposed: base timing unit for reveal speed
  startDelay?: number;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'div';
  onComplete?: () => void;
  showPenLine?: boolean; // deprecated — kept for API compat, ignored
}

export default function HandwritingText({
  text,
  className = '',
  style = {},
  charDelay = 0.05,
  startDelay = 0,
  as: Tag = 'p',
  onComplete,
  showPenLine, // intentionally ignored
}: HandwritingTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  // Calculate reveal duration proportional to text length
  // Irwan-Anira story: stagger 0.05, charDuration 0.16 for descriptions
  // A 25-char line ≈ 25 × 0.05 + 0.16 ≈ 1.4s at char-level
  // For mask reveal, we compress slightly (mask is smoother than per-char)
  const textLength = text.length;
  const revealDuration = Math.max(0.8, textLength * charDelay * 1.2);

  // Total duration for onComplete
  const totalDuration = startDelay + revealDuration + 0.4;

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
