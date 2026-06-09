'use client';

import { useInView } from 'framer-motion';
import { useRef, useEffect, useCallback } from 'react';

/* ──────────────────────────────────────────────────────────────
   T5: HandwritingText — Mask Reveal (Irwan-Anira style)
   Premium-1 Islamic Faceless Cinematic Wedding Invitation

   Core technique: clip-path: inset() horizontal mask wipe.
   Revealed from left to right — like watching someone write.

   IMPLEMENTATION: Web Animation API (element.animate())
   This is the most reliable approach because:
   1. Zero React interference — animation is 100% browser-managed
   2. fill: 'forwards' keeps the final visible state permanently
   3. No style/animate prop fighting on re-render
   4. Works identically to CSS @keyframes but with dynamic values

   This is essentially the same as the CSS @keyframes approach
   used in the Irwan-Anira reference, but with programmatic control.
   ────────────────────────────────────────────────────────────── */

const EASE_CSS = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

const PAUSE_AFTER_PERIOD = 2.5;
const PAUSE_AFTER_COMMA = 1.5;
const PAUSE_NORMAL = 1.0;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const internalInView = useInView(containerRef, { once: true, margin: '-5% 0px -5% 0px' });
  const isInView = externalInView !== undefined ? externalInView : internalInView;

  // Track if we've already started the animation (prevent double-fire)
  const hasAnimatedRef = useRef(false);

  const revealDuration = calcRevealDuration(text, charDelay);

  // Fire onComplete once after animation finishes
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Start animation using Web Animation API when inView becomes true
  useEffect(() => {
    if (!isInView || hasAnimatedRef.current) return;

    const el = innerRef.current;
    if (!el) return;

    hasAnimatedRef.current = true;

    // Use Web Animation API — same as CSS @keyframes but with dynamic values
    // This is completely managed by the browser, immune to React re-renders
    const animation = el.animate(
      [
        { clipPath: 'inset(0 100% 0 0)' },  // start: fully hidden
        { clipPath: 'inset(0 0% 0 0)' },     // end: fully visible
      ],
      {
        duration: revealDuration * 1000,       // ms
        delay: startDelay * 1000,              // ms
        easing: EASE_CSS,
        fill: 'forwards',                      // keep visible state after animation
      }
    );

    // Set initial hidden state (in case animation hasn't started yet due to delay)
    el.style.clipPath = 'inset(0 100% 0 0)';

    // onComplete callback
    if (onCompleteRef.current) {
      animation.onfinish = () => {
        onCompleteRef.current?.();
      };
    }

    // Cleanup: cancel animation if component unmounts
    return () => {
      animation.cancel();
    };
  }, [isInView, revealDuration, startDelay]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ ...style, position: 'relative', display: 'block' }}
    >
      <span
        ref={innerRef}
        style={{
          display: 'inline-block',  // inline-block ensures clip-path works with text wrapping
          clipPath: 'inset(0 100% 0 0)', // initial hidden state
        }}
      >
        {text}
      </span>
    </div>
  );
}

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
